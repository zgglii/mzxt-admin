<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="registerForm" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { editFormSchema } from './data';
  import { articleList, articleEdit } from '/@/api/demo/home';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: { PageWrapper, BasicForm },
    setup() {
      const { createMessage } = useMessage();
      const [registerForm, { setFieldsValue, validate, setProps }] = useForm({
        labelWidth: 120,
        baseColProps: { span: 24 },
        schemas: editFormSchema,
        showResetButton: false,
        submitFunc: handleSubmit,
        actionColOptions: {
          span: 23,
        },
        submitButtonOptions: {
          text: '提交',
        },
      });

      let dataInfo = { id: 0, type: 2 };
      articleList({
        type: 2,
      }).then((res) => {
        if (res.length) {
          dataInfo = res[0];
          setFieldsValue(dataInfo);
        }
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          values.id = dataInfo.id;
          values.type = dataInfo.type;
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          let data = values;
          articleEdit(data).then(() => {
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
