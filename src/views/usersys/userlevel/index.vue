<template>
  <div class="teacherInfoView">
    <BasicTable @register="registerTable" :searchInfo="searchInfo" v-if="isEdit">
      <template #toolbar>
        <a-button type="primary" @click="handleSetting">单篇价格设置</a-button>
        <a-button type="primary" @click="handleCreate">添加用户级别</a-button>
      </template>

      <template #reportLabel="{ record }">
        {{ reportLabelCom(record) }}
      </template>
      <template #learnIcon="{ record }">
        <Image :width="40" :src="record.learnIcon" />
      </template>
      <template #demoType="{ record }">
        {{ record.demoType == 0 ? '正常' : '演示' }}
      </template>
      <template #contentType="{ record }">
        {{ record.contentType == 0 ? '音频' : '图文' }}
      </template>
      <template #learnType="{ record }">
        {{ record.learnType == 0 ? '进阶之路' : '登堂入室' }}
      </template>
      <template #thirdCategory="{ record }">
        {{ thirdCategoryCom(record) }}
      </template>
      <template #learnContent="{ record }">
        <div v-html="record.learnContent" style="max-height: 60px; overflow: auto"></div>
      </template>
      <template #status="{ record }">
        <Switch
          :checked="teacherState(record.status)"
          @change="changeStatus(record)"
          checked-children="已启用"
          un-checked-children="已禁用"
        />
      </template>
      <!-- Switch -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: () => {
                return record.crowdFundingStatus != 0;
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <div class="formView" v-if="!isEdit">
      <BasicForm @register="registerForm" />
    </div>
    <settingArticlePrice @register="register" :minHeight="100" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  export default {
    name: 'UserLevel',
  };
</script>
<script lang="ts" setup>
  import { reactive, ref, nextTick } from 'vue';
  import { Image, Switch } from 'ant-design-vue';
  import { dataSetRender } from '/@/utils/common';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    contentLevelList,
    contentLevelEdit,
    contentLevelDel,
    getArticlePrice,
  } from '/@/api/usersys/contents'; // teacher api
  import { columns, searchFormSchema, upImageFormSchema } from './data';
  import settingArticlePrice from './settingArticlePrice.vue';
  import { useModal } from '/@/components/Modal';

  // 消息控制器
  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({}); //search Object
  const { t } = useI18n();
  const [register, { openModal: openModal }] = useModal();
  function reportLabelCom(value) {
    return value.labelName;
  }
  const thirdCategoryList = [
    { label: '公司研究', value: 'COMPANY_RESEARCH' },
    { label: '行业研究', value: 'INDUSTRY_RESEARCH' },
    { label: '公司深度', value: 'COMPANY_DEPTH' },
    { label: '行业深度', value: 'INDUSTRY_DEPTH' },
  ];
  function thirdCategoryCom(rowData) {
    let res = thirdCategoryList.filter((item) => {
      return item.value === rowData.thirdCategory;
    });
    return res.length && res[0].label;
  }
  // init table
  const [registerTable, { reload }] = useTable({
    title: '用户级别',
    api: contentLevelList,
    rowKey: 'id',
    beforeFetch: (value): any => {
      let obj = value;
      value = {
        record: {
          ...value.record,
        },
        current: value.current,
        size: value.size,
      };
      if (obj.contentType) {
        value.record.contentType = obj.contentType;
        console.log(value, '!!!!!!!!!!!');
      }
      return value;
    },
    afterFetch: (value): any => {
      // data2.followMe = data2.followMe ? 1 : 0;
      // data2.investmentWeaponSpectrum = data2.investmentWeaponSpectrum ? 1 : 0;
      // data2.queryMethod = data2.queryMethod ? 1 : 0;
      // data2.threePersonBank = data2.threePersonBank ? 1 : 0;
      if (value.length) {
        value.map((element) => {
          element.followMe = element.followMe ? false : true;
          element.investmentWeaponSpectrum = element.investmentWeaponSpectrum ? false : true;
          element.queryMethod = element.queryMethod ? true : false;
          element.threePersonBank = element.threePersonBank ? false : true;
          return element;
        });
      }
      console.log(value, '返回值');
    },
    columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: false,
    showIndexColumn: false,
    bordered: true,
    actionColumn: {
      width: 120,
      title: '编辑',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    // 搜索之前处理请求参数
    handleSearchInfoFn: (obj) => {
      return { record: obj };
    },
  });
  // init Form
  const [registerForm, { setFieldsValue, validate, setProps, resetFields, clearValidate }] =
    useForm({
      labelWidth: 180,
      baseColProps: { span: 18 },
      schemas: upImageFormSchema,
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
  const isEdit = ref(true);
  /**
   * @description 计算老师状态
   * @param status - Number
   * @return boolean
   */
  function teacherState(status): boolean {
    if (!!status) return false;
    return true;
  }
  function changeStatus(rowData: any): void {
    if (rowData.status === 0) {
      rowData.status = 1;
    } else {
      rowData.status = 0;
    }
    contentLevelEdit({
      id: rowData.id,
      status: rowData.status,
    }).then(() => {
      reload();
      createMessage.success('保存成功');
    });
  }
  // create teacher
  function handleCreate() {
    // 如果isEdit为false,则隐藏表单,代表要添加或者修改老师信息
    isEdit.value = false;
  }
  // Edit Btn
  let activeID = 0;
  function handleEdit(record: Recordable) {
    handleCreate();
    nextTick(() => {
      activeID = record.id;
      setFieldsValue(record);
    });
  }
  // Del Btn
  function handleDelete(record: Recordable): void {
    contentLevelDel({ id: record.id }).then(() => {
      createMessage.success(`删除成功`);
      reload();
    });
  }
  // form submit
  async function handleSubmit(): void {
    try {
      // 校验
      const values = await validate();
      // 此步骤用来判断是编辑还是添加
      if (!!activeID) values.id = activeID;
      // TODO custom api
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      // 因为现在values里面的图片teacherImg还是数组,而要求的是string,所以要递归去转化一下,dataSetRender第一个参数是数据源,第二个参数是需要剥离的key
      let data2 = dataSetRender(values, []);
      data2.followMe = data2.followMe ? 0 : 1;
      data2.investmentWeaponSpectrum = data2.investmentWeaponSpectrum ? 0 : 1;
      data2.queryMethod = data2.queryMethod ? 1 : 0;
      data2.threePersonBank = data2.threePersonBank ? 0 : 1;
      contentLevelEdit(data2).then(() => {
        isEdit.value = true;
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
        reload();
        resetFields();
        activeID = 0;
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
  function handleSetting() {
    getArticlePrice().then((res) => {
      openModal(true, {
        conDep: res ? res.conDep : 0,
      });
    });
  }
  function handleSuccess() {
    createMessage.success(`提交成功`);
    reload();
  }
</script>
<style lang="less" scoped>
  .formView {
    margin: 10px;
    background: #fff;
    padding: 16px;
  }
</style>
