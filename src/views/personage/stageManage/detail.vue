<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="registerForm" />
  </PageWrapper>
</template>

<script>
import { defineComponent, ref, computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import { useGo } from '/@/hooks/web/usePage';
import { useTabs } from '/@/hooks/web/useTabs';
import { useMessage } from '/@/hooks/web/useMessage';
import { BasicForm, useForm } from '/@/components/Form/index';
import { dataGetRender, dataSetRender } from '/@/utils/common';
import { stageFormSchema } from './stageManage.data';
import { ArticleDetail, ArticleEdit } from '/@/api/demo/aceilrt';
import { PageWrapper } from '/@/components/Page';
export default defineComponent({
  name: 'StageManageDetail',
  components: { PageWrapper, BasicForm },
  setup() {
    const route = useRoute();
    const { setTitle, closeCurrent } = useTabs();
    const { createMessage } = useMessage();
    const go = useGo();
    const rowId = ref(route.params?.id);

    const [registerForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
      labelWidth: 100,
      baseColProps: { span: 18 },
      schemas: stageFormSchema,
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

    setTitle((rowId.value ? '修改' : '添加') + '周期阶段');

    if (rowId.value) {
      ArticleDetail({ id: rowId.value }).then((res) => {
        let data = dataGetRender(res, ['topImg']);
        setFieldsValue(data);
      });
    }

    async function handleSubmit() {
      try {
        const values = await validate();
        setProps({
          submitButtonOptions: {
            loading: true,
          },
        });
        if (rowId.value) values.id = rowId.value;
        values.articleType = 'STAGE_MANAGEMENT ';
        let data = dataSetRender(values, ['topImg']);
        ArticleEdit(data).then(() => {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          closeCurrent();
          createMessage.success('提交成功！');
          go('/personage/stageManage');
        });
      } catch (error) {}
    }

    return { registerForm };
  },
});
</script>
