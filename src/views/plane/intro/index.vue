<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="registerForm" />
  </PageWrapper>
</template>

<script>
import { defineComponent } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { PageWrapper } from '/@/components/Page';
import { useMessage } from '/@/hooks/web/useMessage';
import { dataGetRender, dataSetRender } from '/@/utils/common';
import { planeList, planeEdit } from '/@/api/demo/plane';
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
    planeList().then((res) => {
      if (res && res.length) {
        let data = dataGetRender(res[0], ['topImg']);
        data.valueList = data.valueList ? data.valueList.split(',') : [];
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
        let data = dataSetRender(values, ['topImg']);
        data.valueList = data.valueList.join(',');
        if (id) data.id = id;
        planeEdit(data).then((res) => {
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
