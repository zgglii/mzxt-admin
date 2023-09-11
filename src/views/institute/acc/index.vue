<template>
  <div class="teacherInfoView">
    <BasicTable @register="registerTable" :searchInfo="searchInfo" v-if="isEdit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加公众号</a-button>
      </template>
      <template #secondary="{ record }">
        {{ secondaryCom(record) }}
      </template>
      <template #climbStatus="{ record }">
        {{ record.climbStatus === 'Y' ? '正在爬取' : '爬取成功' }}
      </template>

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
  </div>
</template>
<script lang="ts">
  export default {
    name: 'Investment',
  };
</script>
<script lang="ts" setup>
  import { reactive, ref, nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import moment from 'moment';
  import { contentAccList, contentAccEdit, contentAccDel } from '/@/api/myInstitute/contents'; // teacher api
  import { columns, searchFormSchema, upImageFormSchema } from './data';

  // 消息控制器
  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({}); //search Object
  const { t } = useI18n();
  // 所属研究所
  const secondaryList = [
    { label: '总量', value: 'MY_TOTAL' },
    { label: '制造', value: 'MY_PRODUCT' },
    { label: '消费', value: 'MY_CONSUMPTION' },
    { label: '周期', value: 'MY_CYCLE' },
    { label: '科技', value: 'MY_TECHNOLOGY' },
    { label: '其他', value: 'MY_OTHER' },
  ];
  function secondaryCom(rowData) {
    let res = secondaryList.filter((item) => {
      return item.value === rowData.secondary;
    });
    return res.length && res[0].label;
  }
  const [registerTable, { reload }] = useTable({
    title: '公众号管理',
    api: contentAccList,
    rowKey: 'id',
    beforeFetch: (value): any => {
      let obj = value;
      console.log('请求钱', value);
      value = {
        record: {
          // reportCategory: 'DAILY_PICKS',
          ...value.record,
        },
        current: value.current,
        size: value.size,
      };
      if (Object.keys(obj).length > 2) {
        for (let key in obj) {
          if (key !== 'size' && key !== 'current') {
            value.record[key] = obj[key];
          }
        }
      }

      return value;
    },
    afterFetch: (response) => {},
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
      console.log(obj, '????');
      return { record: obj };
    },
  });
  // init Form
  const [registerForm, { setFieldsValue, validate, setProps, resetFields, getFieldsValue }] =
    useForm({
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
        text: '提交',
      },
    });
  const isEdit = ref(true);
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
    }, 1000);
  }
  // Del Btn
  function handleDelete(record: Recordable): void {
    contentAccDel({ id: record.id }).then(() => {
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
      let data2 = values;
      data2.reportCategory = 'DAILY_PICKS';
      data2.sendTime = moment(data2.sendTime).format('YYYY-MM-DD HH:mm:ss');

      console.log(values, data2, " console.log(value, '发送请钱参数编辑');");
      contentAccEdit(data2).then(() => {
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
</script>
<style lang="less" scoped>
  .formView {
    margin: 10px;
    background: #fff;
    padding: 16px;
    min-height: 50vh;
  }
</style>
