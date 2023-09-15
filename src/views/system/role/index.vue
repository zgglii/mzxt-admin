<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
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
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, createVNode } from 'vue';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleListByPage, RoleDel } from '/@/api/demo/system';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal } from 'ant-design-vue';

  import { columns, searchFormSchema } from './role.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getRoleListByPage,
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
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
        afterFetch: (d) => {
          let d2 = d.map((item) => {
            item.menuIds = item.menuIds.map((n) => String(n));
            return item;
          });
          return d2;
        },
        // handleSearchInfoFn: (obj) => {
        //   return { record: obj };
        // },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        Modal.confirm({
          title: '提示',
          icon: createVNode(ExclamationCircleOutlined),
          content: '你将删除当前角色信息，你还要继续吗？',
          okText: '继续',
          cancelText: '取消',
          onOk() {
            RoleDel(record.id).then(() => {
              createMessage.success(`删除成功`);
              reload();
            });
          },
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
