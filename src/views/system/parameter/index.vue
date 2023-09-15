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
  import { paramConfigList } from '/@/api/demo/home';
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
        title: '参数配置',
        api: paramConfigList,
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
          if (obj.startTime && obj.endTime) {
            obj.startTime = obj.startTime.slice(0, 10) + ' 00:00:00';
            obj.endTime = obj.endTime.slice(0, 10) + ' 23:59:59';
          }
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
