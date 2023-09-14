<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">导入</a-button>
        <a-button type="primary" danger @click="handleDels">删除</a-button>
      </template>
      <template #imgUrlTpl="{ record }">
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
  import { defineComponent, reactive, nextTick, createVNode } from 'vue';

  import { Image } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { faucetDifferencesDel, faucetDifferencesList } from '/@/api/demo/home';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import AddModal from './differenceAddModal.vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal } from 'ant-design-vue';

  import { columns, searchFormSchema } from './differenceData';

  export default defineComponent({
    name: 'SwiperManagement',
    components: { Image, BasicTable, PageWrapper, AddModal, TableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      // 初始化table
      const [registerTable, { reload, getSelectRows }] = useTable({
        title: '热点板块异动管理',
        api: faucetDifferencesList,
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
        rowSelection: {
          type: 'checkbox',
        },
      });
      function handleCreate() {
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
        faucetDifferencesDel({ ids: [record.id] }).then(() => {
          createMessage.success(`删除成功`);
          reload();
        });
      }

      // 删除
      function handleDels() {
        let list = getSelectRows();
        if (list.length == 0) {
          createMessage.warning('请选择数据');
        } else {
          Modal.confirm({
            title: '提示',
            icon: createVNode(ExclamationCircleOutlined),
            content: '确定删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              let ids = list.map((item) => item.id);
              faucetDifferencesDel(ids).then(() => {
                createMessage.success(`删除成功`);
                reload();
              });
            },
          });
        }
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        searchInfo,
        handleDels,
      };
    },
  });
</script>
