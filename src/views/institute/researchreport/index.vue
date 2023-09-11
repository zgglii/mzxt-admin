<template>
  <div class="teacherInfoView">
    <BasicTable @register="registerTable" :searchInfo="searchInfo" v-if="isEdit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加研究报告</a-button>
      </template>

      <template #reportLabel="{ record }">
        {{ reportLabelCom(record) }}
      </template>
      <template #reportImg="{ record }">
        <Image :width="40" :src="record.reportImg" />
      </template>
      <template #demoType="{ record }">
        {{ record.demoType == 0 ? '正常' : '演示' }}
      </template>
      <template #thirdCategory="{ record }">
        {{ thirdCategoryCom(record) }}
      </template>
      <template #reportTitle="{ record }">
        <div @click="copyTitle(record)" style="max-height: 60px; overflow: auto">{{
          record.reportTitle
        }}</div>
      </template>
      <template #reportContent="{ record }">
        <div v-html="record.reportContent" style="max-height: 60px; overflow: auto"></div>
      </template>
      <template #status="{ record }">
        <!-- <div v-html="record.status"></div> -->
        <Switch
          :checked="teacherState(record.status)"
          @change="changeStatus(record)"
          checked-children="已启用"
          un-checked-children="已禁用"
        />
      </template>
      <template #reTop="{ record }">
        <!-- <div v-html="record.status"></div> -->
        <Switch
          :checked="teacherReTop(record.reTop)"
          @change="changeReTop(record)"
          checked-children="已置顶"
          un-checked-children="未置顶"
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
  </div>
</template>
<script lang="ts">
  export default {
    name: 'Investment',
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
  import moment from 'moment';
  import { contentList, contentEdit, contentDel } from '/@/api/myInstitute/contents'; // teacher api
  import { columns, searchFormSchema, upImageFormSchema } from './data';

  // 消息控制器
  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({}); //search Object
  const { t } = useI18n();
  function reportLabelCom(value) {
    return value.labelName;
  }
  const thirdCategoryList = [
    { label: '个股研报', value: 'COMPANY_RESEARCH' },
    { label: '行业研报', value: 'INDUSTRY_RESEARCH' },
    { label: '宏观研究', value: 'COMPANY_DEPTH' },
    { label: '策略报告', value: 'INDUSTRY_DEPTH' },
  ];
  function thirdCategoryCom(rowData) {
    let res = thirdCategoryList.filter((item) => {
      return item.value === rowData.thirdCategory;
    });
    return res.length && res[0].label;
  }
  // init table
  const [registerTable, { reload }] = useTable({
    title: '研究报告',
    api: contentList,
    rowKey: 'id',
    beforeFetch: (value): any => {
      let obj = value;
      value = {
        record: {
          reportCategory: 'RESEARCH_REPORT',
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
    afterFetch: (response) => {
      if (response.length) {
        response.map((item) => {
          if (item.resourceUrl) {
            item.contentOrFile = false;
          }
          return item;
        });
      }
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
   function teacherReTop(status): boolean {
    if (!status) return false;
    return true;
  }
  function changeReTop(rowData: any): void {
    if (rowData.reTop) {
      rowData.reTop = 0;
    } else {
      rowData.reTop = 1;
    }
    rowData.contentType = 1;
    let query = {
      id: rowData.id,
      reTop: rowData.reTop,
    };
    contentEdit(query).then(() => {
      reload();
      createMessage.success('保存成功');
    });
  }
  function changeStatus(rowData: any): void {
    if (rowData.status === 0) {
      rowData.status = 1;
    } else {
      rowData.status = 0;
    }
    rowData.contentType = 1;
    let query = {
      id: rowData.id,
      status: rowData.status,
    };
    contentEdit(query).then(() => {
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
      record.demoType = record.demoType.toString();
      record.reportImg = [
        {
          url: record.reportImg,
          response: { data: record.reportImg },
          uid: 'reportImg',
          status: 'done',
        },
      ];
      record.resourceUrl = [
        {
          url: record.resourceUrl,
          response: { data: record.resourceUrl },
          uid: 'resourceUrl',
          status: 'done',
        },
      ];

      setFieldsValue(record);
    });
  }
  // Del Btn
  function handleDelete(record: Recordable): void {
    contentDel({ id: record.id }).then(() => {
      createMessage.success(`删除成功`);
      reload();
    });
  }
  // 复制标题
  async function copyTitle(record: Recordable): void {
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard 向剪贴板写文本
      createMessage.success('复制成功');
      return navigator.clipboard.writeText(record.reportTitle);
    } else {
      // 创建text area
      const textArea = document.createElement('textarea');
      textArea.value = record.reportTitle;
      // 使text area不在viewport，同时设置不可见
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // 执行复制命令并移除文本框
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
        createMessage.success('复制成功');
      });
    }
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
      let data2 = dataSetRender(values, ['resourceUrl', 'reportImg']);
      data2.reportCategory = 'RESEARCH_REPORT';
      data2.sendTime = moment(data2.sendTime).format('YYYY-MM-DD HH:mm:ss');

      console.log(values, data2, " console.log(value, '发送请钱参数编辑');");
      contentEdit(data2).then(() => {
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
  }
</style>
