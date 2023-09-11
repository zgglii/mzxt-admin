<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleExport">导出订单</a-button>
      </template>
      <template #textTpl="{ text }">
        {{ text }}
      </template>
      <template #status="{ record }">
        <div v-if="record.status == 1">待付款</div>
        <div v-if="record.status == 2">已经付</div>
        <div v-if="record.status == 3">已退款</div>
        <div v-if="record.status == 4">申请退款</div>
      </template>
      <template #validDay="{ record }">
        {{ record.validDay == -1 ? '不限' : record.validDay }}
      </template>
      <template #termDate="{ record }">
        {{ record.validDay == -1 ? '不限' : record.termDate }}
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:account-book-outlined',
              tooltip: '退款',
              popConfirm: {
                title: '是否确认退款',
                placement: 'left',
                confirm: drawback1.bind(null, record),
              },
            },
            {
              icon: 'ant-design:carry-out-outlined',
              tooltip: '审批退款',
              popConfirm: {
                title: '是否确认退款',
                placement: 'left',
                confirm: Approved.bind(null, record),
              },
            },
            {
              icon: 'ant-design:close-outlined',
              tooltip: '拒绝退款',
              popConfirm: {
                title: '是否拒绝退款',
                placement: 'left',
                confirm: Cancel.bind(null, record),
              },
            },
            {
              icon: 'ant-design:close-outlined',
              tooltip: '拒绝退款',
              popConfirm: {
                title: '是否拒绝退款',
                placement: 'left',
                confirm: Cancel.bind(null, record),
              },
            },
            {
              icon: 'ant-design:close-outlined',
              tooltip: '上传回执',
              popConfirm: {
                title: '是否拒绝退款',
                placement: 'left',
                confirm: Cancel.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { orderList, drawback, ApprovedPay } from '/@/api/order/index';
  import { columns, searchFormSchema } from './data';
  import axios from 'axios';
  import { getToken } from '/@/utils/auth';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { message } from 'ant-design-vue';
  // import { disposeCoordSysRecordIfNeeded } from "echarts/types/src/component/dataZoom/roams";

  const searchInfo = reactive<Recordable>({});

  interface QueryData {
    status?: Number;
    startTime?: any;
    endTime?: any;
  }

  // init table
  let queryData: QueryData = reactive({});
  const { createMessage } = useMessage();
  let dataSerch = ref({});
  const [registerTable, { reload }] = useTable({
    title: '订单管理',
    api: orderList,
    rowKey: 'id',
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
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    beforeFetch: (value): any => {
      let obj = value;
      value = {
        current: value.current,
        mealId: value.mealId,
        mobile: value.mobile,
        orderNo: value.orderNo,
        size: value.size,
        status: value.status,
        userId: value.userId,
        enName: value.enName,
        startTime: '',
        endTime: '',
      };
      if (obj.termDate) {
        value.startTime = obj.termDate[0];
        value.endTime = obj.termDate[1];
        delete value.termDate;
      }
      dataSerch = value;
      return value;
    },
    // 搜索之前处理请求参数
    handleSearchInfoFn: (obj) => {
      dataSerch = obj;
      console.log(dataSerch);
    },
  });

  // 退款
  function drawback1(record: Recordable) {
    drawback({ id: record.id })
      .catch((err) => {
        if (err.request.status === 500) {
          let err1 = JSON.parse(err.request.responseText);
          createMessage.error(err1.message);
        } else {
        }
      })
      .then((res) => {
        // createMessage.success(`退款成功`);
        // console.log(res);
        // if (res.code == 0) {
        //   createMessage.success(`退款成功`);
        // } else {
        //   createMessage.success(`退款失败`);
        // }
        reload();
      });
  }

  // 审批通过
  function Approved(record: Recordable) {
    ApprovedPay({
      id: record.id,
      status: 3,
    }).then((res) => {
      if (res.code == 0) {
        message.success('审批退款成功');
      } else {
        message.error('审批退款失败');
      }
    });
  }

  // 审批拒绝
  function Cancel(record: Recordable) {
    ApprovedPay({
      id: record.id,
      status: 2,
    }).then((res) => {
      if (res.code == 0) {
        message.success('拒绝退款成功');
      } else {
        message.error('拒绝退款失败');
      }
    });
  }

  function downloadBlob(options) {
    const { file, name } = options;
    const blob = new Blob([file]);
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = decodeURI(name); // 下载后文件名
    downloadElement.style.display = 'none';
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href);
  }

  async function downloadExportFile(url, method, params) {
    let config = {
      url: url,
      method: method,
      headers: {},
      data: params,
      responseType: 'blob',
    };
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    //  添加新的token名称
    config.headers['X-Auth-Token'] = `${getToken()}`;
    const res = await axios.request(config);
    downloadBlob({
      file: res.data,
      name: '订单列表.xlsx',
    });
  }

  function handleExport() {
    // const baseApi = process.env.NODE_ENV === "/zh" ? "" : "/api";
    // if (queryData.startTime) {
    //   queryData.startTime = moment(moment(queryData.startTime).startOf("day").valueOf()).format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    // }
    // console.log(queryData);
    //
    // if (queryData.endTime) {
    //   queryData.endTime = moment(moment(queryData.endTime).endOf("day").valueOf()).format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    // }
    // downloadExportFile(  baseApi + '/indent/export', 'get', Object.assign({status:3},queryData));
    // baseApi + "eh/indent/export",
    console.log(dataSerch);
    console.log(dataSerch.startTime);

    downloadExportFile(
      '/eh/indent/export',
      'post',
      Object.assign(
        {
          startTime: dataSerch.startTime,
          endTime: dataSerch.endTime,
          mealId: dataSerch.mealId,
          mobile: dataSerch.mobile,
          orderNo: dataSerch.orderNo,
          status: dataSerch.status,
          userId: dataSerch.userId,
          enName: dataSerch.enName,
        },
        queryData,
      ),
    );
  }
</script>
