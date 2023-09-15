<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="700"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataGetRender, dataSetRender } from '/@/utils/common';
  import { editFormSchema } from './data';
  import { swiperEdit } from '/@/api/demo/home';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AddModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const isUpdate = ref(true);
      let id = 0;

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
        id = 0;
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          id = data.record.id;
          let data2 = dataGetRender(data.record, ['imgUrl']);
          setFieldsValue(data2);
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增轮播图' : '编辑轮播图'));

      async function handleSubmit() {
        try {
          const values = await validate();
          if (id) values.id = id;
          setModalProps({ confirmLoading: true });
          // TODO custom api
          let data2 = dataSetRender(values, ['imgUrl']);
          if (values.imgUrl && !data2.imgUrl) {
            createMessage.warning(`图片上传中`);
            return false;
          }
          swiperEdit(data2).then(() => {
            closeModal();
            emit('success');
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
