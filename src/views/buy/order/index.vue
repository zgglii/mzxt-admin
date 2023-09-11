<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AddModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { buyOrderList, buyManageDel } from '/@/api/demo/buy';
import { PageWrapper } from '/@/components/Page';

import { useModal } from '/@/components/Modal';
import AddModal from './addModal.vue';

import { columns, searchFormSchema } from './data';

export default defineComponent({
  name: 'OrderManagement',
  components: { BasicTable, PageWrapper, AddModal, TableAction },
  setup() {
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: '众筹列表',
      api: buyOrderList,
      rowKey: 'id',
      columns,
      formConfig: {
        labelWidth: 80,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: false,
      },
      useSearchForm: true,
      showTableSetting: false,
      showIndexColumn: false,
      bordered: true,
      actionColumn: {
        width: 100,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
      handleSearchInfoFn: (obj) => {
        return { record: obj };
      },
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDelete(record: Recordable) {
      buyManageDel({ id: record.id }).then(() => {
        createMessage.success(`删除成功`);
        reload();
      });
    }

    function handleSuccess() {
      reload();
    }

    function handleSelect(deptId = '') {
      searchInfo.deptId = deptId;
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      searchInfo,
    };
  },
});
</script>
