<template>
  <div class="teacherInfoView">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #miniAvatarUrl="{ record }">
        <Image :width="40" :src="record.miniAvatarUrl" />
      </template>
      <!-- Switch -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:barcode-outlined',
              tooltip: '生成推荐码',
              onClick: handleRamCode.bind(null, record),
              ifShow: () => {
                return !record.mineCode;
              },
            },
            {
              icon: 'ant-design:delete-outlined',
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  export default {
    name: 'UserInfo',
  };
</script>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Image } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  // 引入原装的抽屉
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { userList, ramCode, delUser } from '/@/api/usersys/contents';
  import { columns, searchFormSchema } from './data';

  // 消息控制器
  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({}); //search Object
  const [registerDrawer, { openDrawer }] = useDrawer();

  const { t } = useI18n();
  // init table
  const [registerTable, { reload }] = useTable({
    title: '用户信息',
    api: userList,
    rowKey: 'id',
    beforeFetch: (value): any => {
      let obj = value;
      value = {
        mobile:value.mobile,
        current: value.current,
        size: value.size,
        startTime:'',
        endTime:''
      };
      if (obj.termDate) {
        value.startTime = obj.termDate[0];
        value.endTime = obj.termDate[1];
        delete value.termDate;
      }
      return value;
    },
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
    // actionColumn: {
    //   width: 120,
    //   title: '编辑',
    //   dataIndex: 'action',
    //   slots: { customRender: 'action' },
    // },
    // 搜索之前处理请求参数
    handleSearchInfoFn: (obj) => {
      return { record: obj };
    },
  });
  function handleSuccess() {
    reload();
    createMessage.success(t('component.cropper.uploadSuccess'));
  }
  // Edit Btn
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  // function handleRamCode(record: Recordable) {
  //   ramCode({ id: record.id }).then((res) => {
  //     record.mineCode = res.mineCode;
  //     createMessage.success('操作成功');
  //   });
  // }
  // Del Btn
  function handleDelete(record: Recordable): void {
    delUser({ id: record.id }).then(() => {
      createMessage.success(`删除成功`);
      reload();
    });
  }
</script>
<style lang="less" scoped>
  .formView {
    margin: 10px;
    background: #fff;
    padding: 16px;
  }
</style>
