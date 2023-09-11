<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="700"
  >
    <BasicForm @register="registerForm" v-if="isUpdate" />
    <div style="padding: 50px 100px 0" v-if="!isUpdate">
      <div style="margin-bottom: 16px">
        时间段：<RadioGroup v-model:value="slotVal">
          <RadioButton :value="1">上午</RadioButton>
          <RadioButton :value="2">下午</RadioButton>
        </RadioGroup>
      </div>
      <span style="padding-left: 14px">文件：</span
      ><input type="file" @change="fileChange" accept=".xlsx" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataGetRender, dataSetRender } from '/@/utils/common';
  import { editFormSchema } from './differenceData';
  import { faucetDifferencesImport, faucetDifferencesEdit } from '/@/api/demo/home';
  import { Radio } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AddModal',
    components: {
      BasicModal,
      BasicForm,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();

      const isUpdate = ref(true);
      let id = 0;
      let file = null;
      let slotVal = ref(1);

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
        file = null;
        id = 0;
        isUpdate.value = !!data?.isUpdate;
        if (isUpdate.value) {
          resetFields();
          setModalProps({ confirmLoading: false });
          if (unref(isUpdate)) {
            id = data.record.id;
            let data2 = dataGetRender(data.record, ['imgUrl']);
            setFieldsValue(data2);
          }
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增龙头板块异动' : '编辑龙头板块异动'));

      const fileChange = (e) => {
        file = e.target.files[0];
      };

      async function handleSubmit() {
        try {
          if (isUpdate.value) {
            const values = await validate();
            if (id) values.id = id;
            setModalProps({ confirmLoading: true });
            // TODO custom api
            let data = dataSetRender(values, ['imgUrl']);
            faucetDifferencesEdit(data).then(() => {
              closeModal();
              emit('success');
            });
          } else {
            if (file) {
              setModalProps({ confirmLoading: true });
              const formData = new FormData();
              formData.append('excel', file);
              formData.append('slot', slotVal.value);
              faucetDifferencesImport(formData).then(() => {
                closeModal();
                emit('success');
              });
            } else {
              createMessage.warning('请选择文件');
            }
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { isUpdate, slotVal, registerModal, registerForm, getTitle, handleSubmit, fileChange };
    },
  });
</script>
