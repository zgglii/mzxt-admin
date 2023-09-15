<template>
  <div>
    <BasicTable @register="registerTable">
      <template #status="{ record }">
        <div v-if="record.status == 1">待付款</div>
        <div v-if="record.status == 2">已支付</div>
        <div v-if="record.status == 3">已取消</div>
        <div v-if="record.status == 4">已退款</div>
      </template>
      <template #textTpl="{ text }">
        {{ text }}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:account-book-outlined',
              tooltip: '退款',
              popConfirm: {
                title: '是否确认退款',
                placement: 'left',
                confirm: toRefund.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { indentList, indentRefund } from '/@/api/demo/home';
  import { columns, searchFormSchema } from './data';
  import axios from 'axios';
  import { getToken } from '/@/utils/auth';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  let dataSerch = ref({});
  const [registerTable, { reload }] = useTable({
    title: '订单管理',
    api: indentList,
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
      if (obj.startTime && obj.endTime) {
        obj.startTime = obj.startTime.slice(0, 10) + ' 00:00:00';
        obj.endTime = obj.endTime.slice(0, 10) + ' 23:59:59';
      }
    },
  });

  // 退款
  function toRefund(record: Recordable) {
    indentRefund({ id: record.id }).then((res) => {
      reload();
    });
  }
</script>
