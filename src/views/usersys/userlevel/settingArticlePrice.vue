<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    title="修改单篇价格"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" class="settingForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { setArticlePrice } from '/@/api/usersys/contents';
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setFieldsValue({ conDep: data.conDep });
  });
  const emit = defineEmits(['success']);
  const schemas: FormSchema[] = [
    {
      field: 'conDep',
      component: 'InputNumber',
      label: '单篇价格',
      required: true,
      colProps: {
        span: 24,
      },
      componentProps: {
        placeholder: '请输入单篇价格',
        min: 0,
        precision: 2,
      },
    },
  ];
  const [registerForm, { setFieldsValue, resetFields, validate, clearValidate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      setArticlePrice(values).then(() => {
        closeModal();
        emit('success');
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
<style scoped lang="less">
  .settingForm {
    /deep/ .ant-input-number {
      width: 100% !important;
      max-width: 100%;
    }
  }
</style>
