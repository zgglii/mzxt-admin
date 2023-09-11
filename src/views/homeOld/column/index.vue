<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #imgUrl="{ record }">
        <Image :width="200" :src="record.imgUrl" />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
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

import { Image } from 'ant-design-vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { columnList } from '/@/api/demo/home';
import { PageWrapper } from '/@/components/Page';

import { useModal } from '/@/components/Modal';
import AddModal from './addModal.vue';

import { columns } from './data';

export default defineComponent({
  name: 'columnManagement',
  components: { Image, BasicTable, PageWrapper, AddModal, TableAction },
  setup() {
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: '栏目管理',
      api: columnList,
      rowKey: 'id',
      columns,
      useSearchForm: false,
      showTableSetting: false,
      showIndexColumn: false,
      bordered: true,
      actionColumn: {
        width: 100,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });

    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleEdit,
      handleSuccess,
      searchInfo,
    };
  },
});
</script>
