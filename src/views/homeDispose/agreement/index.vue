<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #demoType="{ record }">
        {{ record.demoType == 0 ? '正常' : '演示' }}
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增公告</a-button>
      </template>
      <template #linkUrl="{ record }">
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
  import { defineComponent, reactive, nextTick } from 'vue';

  import { Image } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { noticList, noticDet } from '/@/api/demo/home';
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
      // 初始化table
      const [registerTable, { reload }] = useTable({
        title: '轮播图管理',
        api: noticList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        // useSearchForm: true,
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
      // 是否上传新的轮播图,用来切换的
      // const isEdit = ref(true);
      function handleCreate() {
        // 如果isEdit为false,则隐藏表单
        // isEdit.value = false;
        nextTick(() => {
          openModal(true, {
            isUpdate: false,
          });
        });
      }

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

      // 删除
      function handleDelete(record: Recordable) {
        noticDet({ id: record.id }).then(() => {
          createMessage.success(`删除成功`);
          reload();
        });
      }

      function handleSuccess() {
        // isEdit.value = true;
        // createMessage.success(`上传成功`);
        reload();
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      return {
        // isEdit,
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
