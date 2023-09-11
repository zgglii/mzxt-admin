<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #userImg="{ record }">
        <Image :width="50" :src="record.userImg" v-if="record.userImg" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getUserCenterlist } from '/@/api/sys/model/personage';
import { PageWrapper } from '/@/components/Page';

import { columns, searchFormSchema } from './data';

export default defineComponent({
  name: 'PersonageManagement',
  components: { BasicTable, PageWrapper, TableAction },
  setup() {
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: '个人中心',
      api: getUserCenterlist,
      rowKey: 'id',
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        fieldMapToTime: [['createTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
      },
      useSearchForm: true,
      showTableSetting: false,
      showIndexColumn: false,
      bordered: true,
      handleSearchInfoFn: (obj) => {
        return { record: obj };
      },
    });

    function handleSuccess() {
      reload();
    }

    function handleSelect(deptId = '') {
      searchInfo.deptId = deptId;
      reload();
    }

    function handleReset(record: Recordable) {
      console.log(record);
    }

    return {
      registerTable,
      handleSuccess,
      handleSelect,
      handleReset,
      searchInfo,
    };
  },
});
</script>
