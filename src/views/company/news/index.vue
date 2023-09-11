<template>
  <div class="main-content">
    <div class="table-container">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" class="mr-2" @click="handleEdit('create')">添加文章</a-button>
        </template>
        <template #topImg="{ record }">
          <Image :width="200" :src="record.topImg" />
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from '/@/hooks/web/useMessage';
import { Image } from 'ant-design-vue';
import { getNewsList, delNews } from '/@/api/sys/company';
import { Button, Switch } from 'ant-design-vue';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { columns, searchFormSchema } from './news.data';
export default defineComponent({
  components: {
    [Button.name]: Button,
    [Switch.name]: Switch,
    BasicTable,
    TableAction,
    Image,
    CheckOutlined,
    CloseOutlined,
  },
  setup() {
    const router = useRouter();
    const { createMessage } = useMessage();
    const [registerTable, { reload }] = useTable({
      title: '公司新闻',
      api: getNewsList,
      rowKey: 'id',
      columns,
      formConfig: {
        labelWidth: 80,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      showTableSetting: false,
      bordered: true,
      showIndexColumn: false,
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        fixed: 'right',
      },
      handleSearchInfoFn: (obj) => {
        return { record: obj };
      },
    });

    function handleEdit(type, record?: Recordable) {
      if (type === 'create') {
        jumpTo('editNew');
        return false;
      }
      jumpTo('editNew', (record as Recordable).id);
    }

    function handleDelete(record: Recordable) {
      delNews(record.id).then((res) => {
        if (res == 1) {
          createMessage.success(`删除成功`);
          reload();
        }
      });
    }

    function jumpTo(target: string, id?: string | number): void {
      router.push({
        path: `/company/${target}${!id ? '' : '/' + id}`,
      });
    }
    return {
      registerTable,
      handleEdit,
      handleDelete,
      jumpTo,
    };
  },
});
</script>

<style lang="less" scoped>
.main-content {
  width: 100%;
  height: 100%;
  .main-title {
    padding: 24px 0 0;
    h2 {
      font-size: 20px;
      font-weight: bold;
      margin: 0 40px;
    }
  }
  .form-wrap {
    padding: 10px 16px;
    .upload-tip {
      display: block;
      margin: 5px 4px;
      color: #999;
    }
  }
  .table-container {
    padding: 10px 16px;
    .action-btn-wrap {
      margin: 10px;
    }
  }
}
</style>
