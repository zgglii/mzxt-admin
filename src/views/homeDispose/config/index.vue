<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
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

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { homeConfigList } from '/@/api/demo/home';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import AddModal from './addModal.vue';

  import { columns } from './data';

  export default defineComponent({
    name: 'SwiperManagement',
    components: { BasicTable, PageWrapper, AddModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      // 初始化table
      const [registerTable, { reload }] = useTable({
        title: '首页配置',
        api: homeConfigList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 80,
          autoSubmitOnEnter: true,
        },
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
          return { record: obj };
        },
      });

      // 编辑
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
        setTimeout(() => {
          openModal(true, {
            record,
            isUpdate: true,
          });
        }, 0);
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
