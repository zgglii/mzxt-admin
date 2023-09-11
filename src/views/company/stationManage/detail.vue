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
import { stationFormSchema } from './stationManage.data';
import { getStationInfo, stationInfoEdit } from '/@/api/sys/company';
import { PageWrapper } from '/@/components/Page';
export default defineComponent({
  name: 'StationDetail',
  components: { PageWrapper, BasicForm },
  setup() {
    const route = useRoute();
    const { setTitle, closeCurrent } = useTabs();
    const { createMessage } = useMessage();
    const go = useGo();
    const rowId = ref(route.params?.id);

    const [registerForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
      labelWidth: 160,
      baseColProps: { span: 18 },
      schemas: stationFormSchema,
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

    setTitle((rowId.value ? '修改' : '添加') + '岗位');

    if (rowId.value) {
      getStationInfo(rowId.value).then((res) => {
        setFieldsValue(res);
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
        stationInfoEdit(values).then(() => {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          closeCurrent();
          createMessage.success('提交成功！');
          go('/company/stationManage');
        });
      } catch (error) {}
    }

    return { registerForm };
  },
});
</script>
