<template>
  <div>
    <PageWrapper contentBackground contentClass="p-4">
      <BasicForm @register="registerForm" />
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { dataGetRender, dataSetRender } from '/@/utils/common';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './introduction.data';
  import { ArticleList, ArticleEdit } from '/@/api/demo/aceilrt';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicForm,
    },
    setup() {
      const { createMessage } = useMessage();

      const [registerForm, { setFieldsValue, validate, setProps }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 18 },
        schemas: formSchema,
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
      ArticleList({
        articleType: 'COMPANY_INTRODUCE',
      }).then((res) => {
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
          values.articleType = 'COMPANY_INTRODUCE';
          if (id) values.id = id;
          let data = dataSetRender(values, ['topImg']);
          ArticleEdit(data).then((res) => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            id = res;
            createMessage.success('提交成功！');
          });
        } catch (error) {}
      }

      return { registerForm };
    },
  });
</script>
