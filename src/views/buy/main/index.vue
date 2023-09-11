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
import { buyList, buyEdit } from '/@/api/demo/buy';
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

    let imgField = ['topImg', 'subPic', 'supportPic'];
    let id = 0;
    buyList().then((res) => {
      if (res && res.length) {
        let data = dataGetRender(res[0], imgField);
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
        let data = dataSetRender(values, imgField);
        if (id) data.id = id;
        buyEdit(data).then((res) => {
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
