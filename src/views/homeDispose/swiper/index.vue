<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增轮播图</a-button>
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
  import { swiperList, swiperDel } from '/@/api/demo/home';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import AddModal from './addModal.vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal } from 'ant-design-vue';

  import { columns } from './data';

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
        api: swiperList,
        rowKey: 'id',
        columns,
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
        Modal.confirm({
          title: '提示',
          icon: createVNode(ExclamationCircleOutlined),
          content: '你将删除当前轮播图信息，你还要继续吗？',
          okText: '继续',
          cancelText: '取消',
          onOk() {
            swiperDel({ id: record.id }).then(() => {
              createMessage.success(`删除成功`);
              reload();
            });
          },
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
