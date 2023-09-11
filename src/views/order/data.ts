import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { comMeadList } from '/@/api/demo/home';

const arrayList = [
  { label: '待付款', value: '1' },
  { label: '已完成', value: '2' },
  { label: '已退款', value: '3' },
  { label: '申请退款', value: '4' },
];
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '微信ID',
    dataIndex: 'userId',
    width: 150,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '登录手机号',
    dataIndex: 'userMobile',
    width: 110,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '订单编号',
    dataIndex: 'orderNo',
    width: 200,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '订单手机号',
    dataIndex: 'mobile',
    width: 120,
  },

  {
    title: '购买金额',
    dataIndex: 'amount',
    width: 120,
  },
  {
    title: '服务类型',
    dataIndex: 'mealName',
    width: '170',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    ellipsis: true,
    slots: { customRender: 'status' },
  },
  {
    title: '回执单状态',
    dataIndex: 'receiptStatus',
    width: 120,
    ellipsis: true,
    slots: { customRender: 'receiptStatus' },
  },
  {
    title: '身份证号码',
    dataIndex: 'idCard',
    width: 170,
  },
  {
    title: '企业名称',
    dataIndex: 'enName',
    width: 300,
  },
  {
    title: '信用代码',
    dataIndex: 'enCode',
    width: 180,
  },
  {
    title: '注册时间',
    dataIndex: 'regTime',
    width: 120,
  },

  {
    title: '法人',
    dataIndex: 'juridical',
    width: 120,
  },
  {
    title: '支付时间',
    dataIndex: 'payTime',
    width: 150,
  },
  {
    title: '退款原因',
    dataIndex: 'remark',
    width: 150,
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'orderNo',
    label: '订单编号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '订单手机号',
    field: 'mobile',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'userId',
    label: '微信ID',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: 'termDate',
    label: '创建时间',
    component: 'RangePicker',
    componentProps: () => {
      return {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        onChange: (date) => {
          if (date.length) {
            date[0].startOf('day');
            date[1].endOf('day');
          }
        },
      };
    },
    colProps: { span: 10 },
  },
  {
    field: 'enName',
    label: '企业名称',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    label: '服务类型',
    field: 'mealId',
    component: 'ApiSelect',
    colProps: { span: 4 },
    componentProps: ({}) => {
      return {
        api: comMeadList,
        labelField: 'name',
        valueField: 'id',
        params: {
          current: 1,
          size: 999,
        },
        resultField: 'records',
        // onChange: (value, option) => {
        //   console.log(value,option);
        //   formModel.teacherName = option && option.label;
        //   console.log(formModel.teacherName, option, '~~~~~~~~~~~~');
        //   console.log(value);
        // },
      };
    },
  },

  {
    label: '状态',
    field: 'status',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: arrayList,
    },
  },
];

/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    label: '上传回执',
    field: 'receiptUrls',
    component: 'FastUpload',
    componentProps: () => {
      return {
        name: 'file',
        accept: '*',
        // action: "/fm/upload/file",
        action: '/eh/upload/file',
        limit: 5,
        multiple: true,
      };
    },
    defaultValue: '',
    required: true,
  },
];
