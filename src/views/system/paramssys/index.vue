<template>
  <div class="teacherInfoView">
    <BasicTable @register="registerTable" :searchInfo="searchInfo" v-if="isEdit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加参数内容</a-button>
      </template>
      <template #isDelete="{ record }">
        {{ record.isDelete == 0 ? '正常' : '删除' }}
      </template>
      <template #reportsetting="{ record }">
        <div v-html="record.reportsetting" style="max-height: 60px; overflow: auto"></div>
      </template>
      <template #status="{ record }">
        <!-- <div v-html="record.status"></div> -->
        <Switch
          :checked="teacherState(record.status)"
          @change="changeStatus(record)"
          checkedChildren="正常"
          unCheckedChildren="停用"
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
  import { Switch } from 'ant-design-vue';
  import { dataSetRender } from '/@/utils/common';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { settingList, settingEdit, settingDel } from '/@/api/sys/paramssys'; // teacher api
  import { columns, searchFormSchema, upImageFormSchema } from './data';

  // 消息控制器
  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({}); //search Object
  const { t } = useI18n();
  // init table
  const [registerTable, { reload }] = useTable({
    title: '参数管理',
    api: settingList,
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
      if (!(obj.record && obj.record.secondaryCategory)) {
        value.record.secondaryCategory = 'MY_CONSUMPTION';
      }
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
  function changeStatus(rowData: any): void {
    if (rowData.status === 0) {
      rowData.status = 1;
    } else {
      rowData.status = 0;
    }
    settingEdit({
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
    settingDel({ id: record.id }).then(() => {
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
      let data2;
      data2 = dataSetRender(values, []);
      if (Array.isArray(data2.labelTxt)) {
        data2.reportLabel = '';
      } else {
        data2.reportLabel = data2.labelTxt;
      }
      Reflect.deleteProperty(data2, 'labelTxt');
      console.log(values, data2, " console.log(value, '发送请钱参数编辑');");
      settingEdit(data2).then(() => {
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
