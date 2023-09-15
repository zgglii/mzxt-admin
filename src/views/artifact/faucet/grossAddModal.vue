<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="700"
  >
    <BasicForm @register="registerForm" v-if="isUpdate" />
    <div style="padding: 50px 100px 0" v-if="!isUpdate">
      文件：<input type="file" @change="fileChange" accept=".xlsx" />
      <p style="margin: 10px 0 0 40px; color: #999">支持扩展名：.xls .xlsx</p>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataGetRender, dataSetRender } from '/@/utils/common';
  import { editFormSchema } from './grossData';
  import { faucetGrossImport, faucetGrossEdit } from '/@/api/demo/home';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AddModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();

      const isUpdate = ref(true);
      let id = 0;
      let file = null;

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 120,
        baseColProps: { span: 24 },
        schemas: editFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        file = null;
        id = 0;
        isUpdate.value = !!data?.isUpdate;
        if (isUpdate.value) {
          resetFields();
          setModalProps({ confirmLoading: false });
          if (unref(isUpdate)) {
            id = data.record.id;
            let data2 = dataGetRender(data.record, ['imgUrl']);
            setFieldsValue(data2);
          }
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? '新增热点板块总强度' : '编辑热点板块总强度',
      );

      const fileChange = (e) => {
        file = e.target.files[0];
      };

      async function handleSubmit() {
        try {
          if (isUpdate.value) {
            const values = await validate();
            if (id) values.id = id;
            setModalProps({ confirmLoading: true });
            // TODO custom api
            let data = dataSetRender(values, ['imgUrl']);
            if (values.imgUrl && !data.imgUrl) {
              createMessage.warning(`图片上传中`);
              return false;
            }
            faucetGrossEdit(data).then(() => {
              closeModal();
              emit('success');
            });
          } else {
            if (file) {
              setModalProps({ confirmLoading: true });
              const formData = new FormData();
              formData.append('excel', file);
              faucetGrossImport(formData).then(() => {
                closeModal();
                emit('success');
              });
            } else {
              createMessage.warning('请选择文件');
            }
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { isUpdate, registerModal, registerForm, getTitle, handleSubmit, fileChange };
    },
  });
</script>
