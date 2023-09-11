<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增轮播图</a-button>
      </template>
      <template #linkUrl="{ record }">
        <a target="_blank" :href="record.linkUrl">{{ record.linkUrl }}</a>
      </template>
      <template #resourceImg="{ record }">
        <Image :width="200" :src="record.resourceImg" v-if="record.resourceType == '0'" />
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
              ifShow: () => {
                return record.crowdFundingStatus != 0;
              },
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
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { swiperList, swiperDel } from '/@/api/demo/home';
import { PageWrapper } from '/@/components/Page';

import { useModal } from '/@/components/Modal';
import AddModal from './addModal.vue';

import { columns, searchFormSchema } from './data';

export default defineComponent({
  name: 'SwiperManagement',
  components: { Image, BasicTable, PageWrapper, AddModal, TableAction },
  setup() {
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: '轮播图管理',
      api: swiperList,
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
      setTimeout(() => {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }, 0);
    }

    function handleDelete(record: Recordable) {
      swiperDel({ id: record.id }).then(() => {
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
