<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="registerForm" />
  </PageWrapper>
</template>

<script>
import { defineComponent } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { PageWrapper } from '/@/components/Page';
import { dataGetRender, dataSetRender } from '/@/utils/common';
import { useMessage } from '/@/hooks/web/useMessage';
import { joinList, joinEdit } from '/@/api/demo/join';
import { dataFormSchema } from './data';
export default defineComponent({
  components: { PageWrapper, BasicForm },
  setup() {
    const { createMessage } = useMessage();

    const [registerForm, { setFieldsValue, validate, setProps }] = useForm({
      labelWidth: 140,
      baseColProps: { span: 18 },
      schemas: dataFormSchema,
      showResetButton: false,
      submitFunc: handleSubmit,
      actionColOptions: {
        span: 24,
        style: { textAlign: 'center' },
      },
      submitButtonOptions: {
        text: '提交',
      },
    });

    let id = 0;
    joinList().then((res) => {
      if (res && res.length) {
        let data = dataGetRender(res[0], ['topImg']);
        setFieldsValue(data);
        id = data.id;
      }
    });

    async function handleSubmit() {
      try {
        const values = await validate();
        setProps({
          submitButtonOptions: {
            loading: true,
          },
        });
        if (id) values.id = id;
        let data = dataSetRender(values, ['topImg']);
        joinEdit(data).then(() => {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          createMessage.success('提交成功！');
        });
      } catch (error) {}
    }

    return { registerForm };
  },
});
</script>
