<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加岗位</a-button>
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
import { getStationList, delStation } from '/@/api/sys/company';
import { PageWrapper } from '/@/components/Page';

import { columns, searchFormSchema } from './stationManage.data';
import { useGo } from '/@/hooks/web/usePage';

export default defineComponent({
  name: 'stationManage',
  components: { BasicTable, PageWrapper, TableAction },
  setup() {
    const go = useGo();
    const { createMessage } = useMessage();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: '岗位管理列表',
      api: getStationList,
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
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
      handleSearchInfoFn: (obj) => {
        if (obj.createTime && obj.createTime.length) {
          obj.startTime = obj.createTime[0];
          obj.endTime = obj.createTime[1];
          delete obj.createTime
        }
        return { record: obj };
      },
    });

    function handleCreate() {
      go('/company/editStation');
    }

    function handleEdit(record: Recordable) {
      go('/company/editStation/' + record.id);
    }

    function handleDelete(record: Recordable) {
      delStation(record.id).then(() => {
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
