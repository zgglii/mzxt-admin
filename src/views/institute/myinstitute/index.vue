<template>
  <div class="teacherInfoView">
    <BasicTable @register="registerTable" :searchInfo="searchInfo" v-if="isEdit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加研究内容</a-button>

        <Select
          ref="select"
          v-model:value="value1"
          style="width: 120px"
          :options="options1"
          placeholder="公众号批次"
          @dropdownVisibleChange="getList"
        />
        <a-button type="primary" @click="createdGzh">获取公众号信息</a-button>
      </template>

      <template #reportLabel="{ record }">
        {{ reportLabelCom(record) }}
      </template>
      <!-- <template #secondaryCategory="{ record }">
        {{ secondaryCategoryCom(record.secondaryCategory) }}
      </template> -->
      <template #reportImg="{ record }">
        <Image :width="40" :src="record.reportImg" />
      </template>
      <template #demoType="{ record }">
        {{ record.demoType == 0 ? '正常' : '演示' }}
      </template>
      <template #reportContent="{ record }">
        <div v-html="record.reportContent" style="max-height: 60px; overflow: auto"></div>
      </template>
      <template #reportTitle="{ record }">
        <div @click="copyTitle(record)" style="max-height: 60px; overflow: auto">{{
          record.reportTitle
        }}</div>
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
    <Modal v-model:visible="visible" title="绑定公众号" @ok="handleOk" @cancel="handleCancel">
      <div class="contentView">
        <div class="qrCodeView">
          <Image :width="200" :src="qrUrl" />
          <div class="qrStatus" v-if="Status !== 0">
            <Icon icon="grommet-icons:status-good" size="24" color="#8dc149" v-if="Status === 1" />
            {{ Msg }}
          </div>
          <div v-else>
            {{ Msg }}
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'Investment',
  };
</script>
<script lang="ts" setup>
  import { reactive, ref, nextTick } from 'vue';
  import { Image, Switch, Modal, Select } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { dataSetRender } from '/@/utils/common';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import moment from 'moment';
  import {
    contentList,
    contentEdit,
    contentDel,
    contentqr,
    contentask,
    contentoption,
    contentClimb,
  } from '/@/api/myInstitute/contents'; // teacher api
  import { columns, searchFormSchema, upImageFormSchema } from './data';

  // 扫码公众号相关
  const visible = ref(false); //显示模态框
  const qrUrl = ref(''); //二维码图片地址
  let timer = ref(0); //轮询扫描状态定时器id
  const Msg = ref('请扫码'); //扫码状态信息
  const Status = ref(0); //扫码状态信息
  const value1 = ref(null); //公众号批次
  let options1 = ref<SelectProps['options']>([]);
  async function getList() {
    await contentClimb({}).then((res) => {
      let result = [];
      if (res.length) {
        res.map((item) => {
          result.push({
            value: item,
            label: item,
          });
        });
      }
      options1.value = result;
      return result;
    });
  }
  // 获取二维码,并开始轮询
  async function createdGzh() {
    await contentqr({}).then((data) => {
      qrUrl.value = 'data:image/png;base64,' + data;
      return data;
    });
    timer = setInterval(function () {
      contentask().then(({ message, code }) => {
        // console.log(code, '查询状态', timer);
        Msg.value = message;
        Status.value = code;
        if (code === 1) {
          handleCancel();
          contentoption({
            climbOrder: value1.value,
          }).then((res) => {
            // console.log(res, '哈哈哈');
            createMessage.success('执行成功');
            handleOk();
          });
        }
      });
    }, 2000);
    visible.value = true;
  }
  function handleOk() {
    visible.value = false;
  }
  function handleCancel() {
    clearInterval(timer);
  }

  // 消息控制器
  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({}); //search Object
  const { t } = useI18n();
  function reportLabelCom(value) {
    return value.labelName ? value.labelName : value.reportLabel;
  }
  // const secondaryCategoryList = [
  //   { label: '总量', value: 'MY_TOTAL' },
  //   { label: '制造', value: 'MY_PRODUCT' },
  //   { label: '消费', value: 'MY_CONSUMPTION' },
  //   { label: '周期', value: 'MY_CYCLE' },
  //   { label: '科技', value: 'MY_TECHNOLOGY' },
  //   { label: '其他', value: 'MY_OTHER' },
  // ];
  // function secondaryCategoryCom(value) {
  //   const res = secondaryCategoryList.filter((item) => {
  //     return item.value === value;
  //   });
  //   if (res.length) return res[0].label;
  //   return '暂无';
  // }
  // init table
  const [registerTable, { reload }] = useTable({
    title: '我的研究所',
    api: contentList,
    rowKey: 'id',
    beforeFetch: (value): any => {
      let obj = value;
      value = {
        record: {
          reportCategory: 'MY_INSTITUTE',
          ...value.record,
        },
        current: value.current,
        size: value.size,
      };
      // if (!(obj.record && obj.record.secondaryCategory)) {
      //   value.record.secondaryCategory = 'MY_CONSUMPTION';
      // }
      if (Object.keys(obj).length > 2) {
        for (let key in obj) {
          if (key !== 'size' && key !== 'current' && key !== 'record' && key !== 'labelTxt') {
            value.record[key] = obj[key];
          }
        }
      }
      if (obj['labelTxt']) {
        value.record['reportLabel'] = obj.labelTxt;
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
      width: 80,
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
      if (Boolean(record.reportImg)) {
        record.reportImg = [
          {
            url: record.reportImg,
            response: { data: record.reportImg },
            uid: 'reportImg',
            status: 'done',
          },
        ];
      }
      if (Boolean(record.resourceUrl)) {
        record.resourceUrl = [
          {
            url: record.resourceUrl,
            response: { data: record.resourceUrl },
            uid: 'resourceUrl',
            status: 'done',
          },
        ];
      }
      if (record.reportLabel === '' || !record.reportLabel) {
        record.reportLabel = [];
      }
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
      let label = values.labelTxt || null;
      let data2 = dataSetRender(values, ['resourceUrl', 'reportImg']);
      data2.reportCategory = 'MY_INSTITUTE';

      if (Array.isArray(data2.labelTxt)) {
        data2.reportLabel = '';
      } else {
        data2.reportLabel = data2.labelTxt;
      }
      console.log('发送前', data2, values);
      if (!Boolean(data2.reportLabel)) {
        Reflect.deleteProperty(data2, 'reportLabel');
      }
      Reflect.deleteProperty(data2, 'labelTxt');
      data2.sendTime = moment(data2.sendTime).format('YYYY-MM-DD HH:mm:ss');
      // if(label)data2.
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
  .contentView {
    text-align: center;
    font-size: 24px;
    .qrCodeView {
      position: relative;
      .qrStatus {
        position: absolute;
        top: 0;
        left: calc(50% - 100px);
        background: rgba(255, 255, 255, 0.8);
        width: 200px;
        height: 200px;
        font-size: 20px;
        color: rgba(#333, 0.8);
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
