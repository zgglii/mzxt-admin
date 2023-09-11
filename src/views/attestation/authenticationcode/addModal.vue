<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="700"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { dataGetRender, dataSetRender } from "/@/utils/common";
import { editFormSchema } from "./data";
import { stageVerifyEdit } from "/@/api/demo/home";
import { values } from "lodash-es";

export default defineComponent({
  name: "AddModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    let id = 0;

    const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
      labelWidth: 120,
      baseColProps: { span: 24 },
      schemas: editFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 10
      }
    });
    const [registerModal, { setModalProps, closeModal, getVisible }] = useModalInner(
      async (data) => {
        id = 0;
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          id = data.record.id;
          let data2 = data.record;
          setFieldsValue(data2);
        }
      }
    );
    const getTitle = computed(() => (!unref(isUpdate) ? "新增企业认证码" : "编辑企业认证码"));

    async function handleSubmit() {
      try {
        const values = await validate();
        if (id) values.id = id;
        setModalProps({ confirmLoading: true });
        // TODO custom api
        // let data2 = dataSetRender(values, ["imgUrl"]);
        // data2.resourceType = 0;
        // console.log(data2);
        // console.log(data2.imgUrl[0].response.data);

        // let data2 = {
        //   imgUrl: data22.imgUrl[0].response.data
        // };
        console.log(values);
        let data2 = {
          type: 1,
          content: values.content
        };

        stageVerifyEdit(data2).then(() => {
          closeModal();
          emit("success");
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
