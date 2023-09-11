<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="700"
  >
    <div style="text-align: center">
      <Image :width="200" :src="qrUrl" />
      <!-- {{ qrUrl }} -->
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, onBeforeUpdate } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { dataGetRender, dataSetRender } from '/@/utils/common';
  import { Image } from 'ant-design-vue';

  import { contentask, contentqr, contentoption } from '/@/api/myInstitute/contents'; // teacher api

  export default defineComponent({
    name: 'AddModal',
    components: { BasicModal, Image },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const isUpdate = ref(true);
      let id = 0;
      let qrUrl = ref('hhh');
      contentqr({}).then((data) => {
        qrUrl.value = 'data:image/png;base64,' + data;
        return data;
      });
      onBeforeUpdate(() => {
        console.log('onBeforeUpdate');
      });
      const [registerModal, { setModalProps, closeModal, getVisible }] = useModalInner(
        async (data) => {
          id = 0;
          setModalProps({ confirmLoading: false });
          isUpdate.value = !!data?.isUpdate;
          if (unref(isUpdate)) {
            id = data.record.id;
            let data2 = dataGetRender(data.record, ['linkUrl']);
            setFieldsValue(data2);
          }
        },
      );
      const getTitle = computed(() => (!unref(isUpdate) ? '绑定公众号' : '编辑轮播图'));

      async function handleSubmit() {
        try {
          //  swiperEdit(data2).then(() => {
          closeModal();
          emit('success');
          // });
          return;
          const values = await validate();
          if (id) values.id = id;
          setModalProps({ confirmLoading: true });
          // TODO custom api
          let data2 = dataSetRender(values, ['linkUrl']);
          data2.resourceType = 0;
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, getTitle, handleSubmit, qrUrl };
    },
  });
</script>
