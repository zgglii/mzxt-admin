<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="众筹详情"
    @ok="collection"
    :width="700"
  >
    <BasicForm @register="registerForm" />
    <template #footer>
      <a-button type="primary" @click="collection" v-if="rowData.status == 1">确认收款</a-button>
      <a-button
        danger
        @click="refund"
        v-if="rowData.status == 1 || rowData.status == 2 || rowData.status == 3"
        >退款</a-button
      >
      <a-button @click="closeModal">取消</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { dataGetRender, dataSetRender } from '/@/utils/common';
import { editFormSchema } from './data';
import { buyOrderCollection, buyOrderRefund } from '/@/api/demo/buy';

export default defineComponent({
  name: 'AddModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowData = ref({});
    let id = 0;

    const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
      labelWidth: 120,
      baseColProps: { span: 21 },
      schemas: editFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
        style: { textAlign: 'center' },
      },
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      id = 0;
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowData.value = data.record;
        id = data.record.id;
        let data2 = dataGetRender(data.record, ['payInfo', 'returnInfo']);
        setFieldsValue(data2);
      }
    });

    function collection() {
      buyOrderCollection({
        id: id,
        status: 2,
      }).then(() => {
        closeModal();
        emit('success');
      });
    }

    async function refund() {
      try {
        const values = await validate();
        if (id) values.id = id;
        setModalProps({ confirmLoading: true });
        // TODO custom api
        let data2 = dataSetRender(values, ['payInfo', 'returnInfo']);
        buyOrderRefund({
          id: id,
          returnInfo: data2.returnInfo,
        }).then(() => {
          closeModal();
          emit('success');
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { rowData, registerModal, registerForm, collection, refund, closeModal };
  },
});
</script>
