<template>
  <div class="teacherInfoView">
    <div class="formView">
      <BasicForm @register="registerForm" />
    </div>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'Disclaimers',
  };
</script>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { dataSetRender } from '/@/utils/common';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { contentList, contentEdit } from '/@/api/about/contents'; // teacher api
  import { upImageFormSchema } from './data';

  // 消息控制器
  const { createMessage } = useMessage();
  const { t } = useI18n();
  // 页面挂载后
  onMounted(() => {
    usTelListFN();
  });
  // getData
  function usTelListFN(): records {
    contentList({
      current: 1,
      record: {
        contentType: 0,
      },
      size: 10,
    }).then(({ records }) => {
      let { contentTitle, content, id } = records.length
        ? records[0]
        : { contentTitle: '', content: '', id: '' };
      setFieldsValue({
        contentTitle,
        content,
        id,
      });
      return Promise.resolve(records);
    });
  }
  // init Form
  const [registerForm, { setFieldsValue, validate, setProps, resetFields }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 18 },
    schemas: upImageFormSchema,
    showResetButton: false,
    submitFunc: handleSubmit,
    actionColOptions: {
      span: 24,
      style: { textAlign: 'center' },
    },
    submitButtonOptions: {
      text: '提 交',
    },
  });
  // form submit
  async function handleSubmit(): void {
    try {
      // 校验
      const values = await validate();
      // 此步骤用来判断是编辑还是添加
      // TODO custom api
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      // 因为现在values里面的图片teacherImg还是数组,而要求的是string,所以要递归去转化一下,dataSetRender第一个参数是数据源,第二个参数是需要剥离的key
      let data2 = dataSetRender(values, ['connectService']);
      data2.contentType = 0;
      contentEdit(data2).then(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
        resetFields();
        usTelListFN();
        createMessage.success(t('component.cropper.uploadSuccess'));
      });
    } finally {
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }
</script>
<style lang="less" scoped>
  .formView {
    margin: 10px;
    background: #fff;
    padding: 16px;
  }
</style>
