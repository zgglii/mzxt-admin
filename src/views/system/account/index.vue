<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #sysRoleNames="{ record }">
        {{ record.sysRoleNames != null ? record.sysRoleNames[0].nameZh : "" }}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            // {
            //   icon: 'ant-design:sync-outlined',
            //   color: 'warning',
            //   tooltip: '重置密码',
            //   popConfirm: {
            //     title: '是否确认重置密码',
            //     placement: 'left',
            //     confirm: handleReset.bind(null, record),
            //   },
            // },
            // {
            //   icon: 'ant-design:delete-outlined',
            //   color: 'error',
            //   tooltip: '删除此账号',
            //   popConfirm: {
            //     title: '是否确认删除',
            //     placement: 'left',
            //     confirm: handleDelete.bind(null, record),
            //   },
            // },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

import { useMessage } from "/@/hooks/web/useMessage";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { getAccountList, AccountDel, AccountReset } from "/@/api/demo/system";
import { PageWrapper } from "/@/components/Page";

import { useModal } from "/@/components/Modal";
import AccountModal from "./AccountModal.vue";

import { columns, searchFormSchema } from "./account.data";

export default defineComponent({
  name: "AccountManagement",
  components: { BasicTable, PageWrapper, AccountModal, TableAction },
  setup() {
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: "账号列表",
      api: getAccountList,
      rowKey: "id",
      columns,
      formConfig: {
        labelWidth: 80,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      useSearchForm: true,
      showTableSetting: false,
      showIndexColumn: false,
      bordered: true,
      actionColumn: {
        width: 120,
        title: "操作",
        dataIndex: "action",
        slots: { customRender: "action" }
      },
      handleSearchInfoFn: (obj) => {
        return { record: obj };
      }
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false
      });
    }

    function handleEdit(record: Recordable) {
      if (record.sysRoleNames!=null){
        record.roleId = record.sysRoleNames[0].id;
        record.Type='编辑'
      }else {
        delete record.roleId;
      }
      openModal(true, {
        record,
        isUpdate: true
      });
    }

    function handleDelete(record: Recordable) {
      AccountDel({ id: record.id }).then(() => {
        createMessage.success(`删除成功`);
        reload();
      });
    }

    function handleSuccess() {
      reload();
    }

    function handleSelect(deptId = "") {
      searchInfo.deptId = deptId;
      reload();
    }

    function handleReset(record: Recordable) {
      AccountReset(record.id).then(() => {
        createMessage.success(`重置成功`);
        reload();
      });
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      handleReset,
      searchInfo
    };
  }
});
</script>
