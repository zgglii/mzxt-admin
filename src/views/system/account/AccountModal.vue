<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
// import { dataGetRender, dataSetRender } from "/@/utils/common";
import { accountFormSchema } from "./account.data";
import { AccountEdit,Accountupdate} from "/@/api/demo/system";

export default defineComponent({
  name: "AccountModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    let userId = 0;

    const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
      labelWidth: 80,
      baseColProps: { span: 24 },
      schemas: accountFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 24,
        style: { textAlign: "center" }
      }
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      userId = 0;
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        userId = data.record.id;
        // let data2 = dataGetRender(data.record, ['userImg']);
        let data2 = data.record;
        setFieldsValue(data2);
      }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? "新增账号" : "编辑账号"));

    async function handleSubmit() {
      try {
        const values = await validate();
        if (userId) values.id = userId;
        setModalProps({ confirmLoading: true });
        // let data2 = dataSetRender(values, ['userImg']);
        let data2 = values;
        let dataText = getTitle._value;
        if (dataText == "新增账号") {
          AccountEdit(data2).then(() => {
            closeModal();
            emit("success");
          });
        } else {
          console.log(data2);

          Accountupdate(data2).then(() => {
            closeModal();
            emit("success");
          });
        }

      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
