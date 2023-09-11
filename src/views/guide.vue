<template>
  <div class="main-container">
    <p>您好，{{ realName }}，祝你开心每一天！</p>
    <div class="resetForm" v-if="isFirstTime">
      <p>您的密码为初始密码，为了系统安全，请设置新密码！</p>
      <BasicForm @register="registerForm" />
    </div>
  </div>
</template>

<script lang="ts">
  import { useMessage } from '/@/hooks/web/useMessage';
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useUserStore } from '/@/store/modules/user';
  import { editUserInfo } from '/@/api/sys/user';

  export default defineComponent({
    components: {
      BasicForm,
    },
    setup() {
      // 消息组件
      const { createMessage } = useMessage();
      // 用户信息仓库
      const userStore = useUserStore();
      // 用户信息
      const userInfo = userStore.getUserInfo;
      // 用户姓名
      const realName = userInfo.name;
      // !!常常用来做类型判断，在第一步!（变量）之后再做逻辑取反运算，判断变量是不是有值
      // 判断用户是不是第一次登录
      let isFirstTime = ref(!!userInfo.inPass);
      // 获取用户id
      const userId = userInfo.id;
      // 验证密码
      const validatePass = async (rule: RuleObject, value: string) => {
        const d = getFieldsValue();
        if (!d.password) {
          return Promise.reject('请输入新密码！');
        } else if (d.password != d.cPassword) {
          return Promise.reject('两次输入密码不一致！');
        }
        return Promise.resolve();
      };
      const [registerForm, { getFieldsValue, validate, setProps }] = useForm({
        labelWidth: 80,
        // labelCol: {span: 3},
        wrapperCol: {},
        baseColProps: { span: 19 },
        rowProps: { align: 'middle', justify: 'center' },
        schemas: [
          {
            field: 'password',
            label: '新密码',
            component: 'Input',
            required: true,
          },
          {
            field: 'cPassword',
            label: '确认密码',
            component: 'Input',
            rules: [{ required: true, validator: validatePass, trigger: 'change' }],
          },
        ],
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
      async function handleSubmit() {
        try {
          const values = await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          let data = {
            id: userId,
            password: values.password,
          };
          editUserInfo(data).then((res) => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            if (res == userId) {
              createMessage.success('修改成功！');
              isFirstTime.value = false;
              return;
            }

            createMessage.error('修改失败！');
          });
        } catch (error) {}
      }
      return {
        realName,
        isFirstTime,
        registerForm,
      };
    },
  });
</script>

<style lang="less" scoped>
  .main-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    font-size: 20px;
    flex-flow: column;
    .resetForm {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
