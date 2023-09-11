<template>
  <div class="teacherInfoView">
    <BasicTable @register="registerTable" :searchInfo="searchInfo" v-show="isEdit">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加盘面分析</a-button>
      </template>
      <template #contentResource="{ record }">
        <Image :width="40" :src="record.contentResource" v-if="record.resourceType == 0" />
        <Image :width="40" :src="record.resourceImg" v-else />
      </template>
      <template #demoType="{ record }">
        {{ record.demoType == 0 ? '正常' : '演示' }}
      </template>
      <template #resourceType="{ record }">
        {{ record.demoType == 0 ? '图片' : '视频' }}
      </template>
      <template #teacherIntroduce="{ record }">
        <div v-html="record.teacherIntroduce" style="max-height: 60px; overflow: auto"></div>
      </template>
      <template #teacherAffirmation="{ record }">
        <div v-html="record.teacherIntroduce" style="max-height: 60px; overflow: auto"></div>
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
    <div class="formView" v-show="!isEdit">
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
  import { reactive, ref } from 'vue';
  import { Image, Switch } from 'ant-design-vue';
  import { dataSetRender } from '/@/utils/common';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import moment from 'moment';

  import { contentList, contentDel, contentEdit } from '/@/api/teacherApi/content'; // teacher api
  import { columns, searchFormSchema, upImageFormSchema } from './data';

  // 消息控制器
  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({}); //search Object
  const { t } = useI18n();

  // init table
  const [registerTable, { reload }] = useTable({
    title: '盘面解析',
    api: contentList,
    rowKey: 'id',
    beforeFetch: (value): any => {
      let obj = value;
      value = {
        record: {
          contentType: 1,
          ...value.record,
        },
        current: value.current,
        size: value.size,
      };
      if (Object.keys(obj).length > 2) {
        for (let key in obj) {
          if (key !== 'size' && key !== 'current' && key !== 'record') {
            value.record[key] = obj[key];
          }
        }
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
      obj.contentType = 1;
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
  let teacherId = 0;
  function handleEdit(record: Recordable) {
    handleCreate();
    teacherId = record.id;
    console.log(record);
    record.demoType = record.demoType.toString();
    record.teacherId = record.teacherId.toString();
    record.resourceType = record.resourceType.toString();
    if (Boolean(record.contentResource)) {
      record.contentResource = [
        {
          url: record.contentResource,
          response: { data: record.contentResource },
          uid: 'contentResource',
          status: 'done',
        },
      ];
    }
    if (record.resourceImg) {
      record.resourceImg = [
        {
          url: record.resourceImg,
          response: { data: record.resourceImg },
          uid: 'resourceImg',
          status: 'done',
        },
      ];
    }

    setFieldsValue(record);
  }
  // Del Btn
  function handleDelete(record: Recordable): void {
    contentDel({ id: record.id }).then(() => {
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
      if (!!teacherId) values.id = teacherId;
      // TODO custom api
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      values.contentType = 1;

      // 因为现在values里面的图片teacherImg还是数组,而要求的是string,所以要递归去转化一下,dataSetRender第一个参数是数据源,第二个参数是需要剥离的key
      let data2 = dataSetRender(values, ['contentResource', 'resourceImg']);
      data2.sendTime = moment(data2.sendTime).format('YYYY-MM-DD HH:mm:ss');
      contentEdit(data2).then(() => {
        isEdit.value = true;
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
        reload();
        resetFields();
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
