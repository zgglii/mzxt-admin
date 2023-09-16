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
              onClick: handleDelete.bind(null, record),
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
        title: '超短异动管理',
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
        beforeFetch: (obj) => {
          if (obj.startTime && obj.endTime) {
            obj.startTime = obj.startTime.slice(0, 10) + ' 00:00:00';
            obj.endTime = obj.endTime.slice(0, 10) + ' 23:59:59';
          }
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
        Modal.confirm({
          title: '提示',
          icon: createVNode(ExclamationCircleOutlined),
          content: '你将删除当前超短异动信息，你还要继续吗？',
          okText: '继续',
          cancelText: '取消',
          onOk() {
            faucetDifferencesDel([record.id]).then(() => {
              createMessage.success(`删除成功`);
              reload();
            });
          },
        });
      }

      // 删除
      function handleDels() {
        let list = getSelectRows();
        if (list.length == 0) {
          createMessage.warning('请选择数据');
        } else {
          let ids = list.map((item) => item.id);
          Modal.confirm({
            title: '提示',
            icon: createVNode(ExclamationCircleOutlined),
            content: '你将删除' + ids.length + '条超短异动信息，你还要继续吗？',
            okText: '继续',
            cancelText: '取消',
            onOk() {
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
