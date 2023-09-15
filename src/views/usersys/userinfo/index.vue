<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo"> </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { userList } from '/@/api/usersys/contents';
  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    components: { BasicTable, PageWrapper },
    setup() {
      const searchInfo = reactive<Recordable>({});
      // 初始化table
      const [registerTable] = useTable({
        title: '用户信息',
        api: userList,
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
        handleSearchInfoFn: (obj) => {
          if (obj.startTime && obj.endTime) {
            obj.startTime = obj.startTime.slice(0, 10) + ' 00:00:00';
            obj.endTime = obj.endTime.slice(0, 10) + ' 23:59:59';
          }
        },
      });

      return {
        registerTable,
        searchInfo,
      };
    },
  });
</script>
