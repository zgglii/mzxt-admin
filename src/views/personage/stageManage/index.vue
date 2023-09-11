<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加周期阶段</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除',
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
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { ArticlePageList, ArticleDel } from '/@/api/demo/aceilrt';
import { PageWrapper } from '/@/components/Page';

import { columns, searchFormSchema } from './stageManage.data';
import { useGo } from '/@/hooks/web/usePage';

export default defineComponent({
  name: 'StageManage',
  components: { BasicTable, PageWrapper, TableAction },
  setup() {
    const go = useGo();
    const { createMessage } = useMessage();
    const searchInfo = reactive<Recordable>({
      record: {
        articleType: 'STAGE_MANAGEMENT ',
      },
    });
    const [registerTable, { reload }] = useTable({
      title: '阶段管理列表',
      api: ArticlePageList,
      rowKey: 'id',
      columns,
      formConfig: {
        labelWidth: 80,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
      },
      useSearchForm: true,
      showTableSetting: false,
      showIndexColumn: false,
      bordered: true,
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
      handleSearchInfoFn: (obj) => {
        obj.articleType = 'STAGE_MANAGEMENT ';
        return { record: obj };
      },
    });

    function handleCreate() {
      go('/personage/stageDetail');
    }

    function handleEdit(record: Recordable) {
      go('/personage/stageDetail/' + record.id);
    }

    function handleDelete(record: Recordable) {
      ArticleDel({ id: record.id }).then(() => {
        createMessage.success(`删除成功`);
        reload();
      });
    }

    return {
      registerTable,
      handleCreate,
      handleEdit,
      handleDelete,
      searchInfo,
    };
  },
});
</script>
