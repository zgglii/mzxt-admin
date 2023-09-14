import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

const arrayList = [
  { label: '待支付', value: 1 },
  { label: '已支付', value: 2 },
  { label: '已取消', value: 3 },
  { label: '已退款', value: 4 },
];
const priceTypes = ['月卡', '季卡', '年卡'];
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
    title: '用户ID',
    dataIndex: 'customId',
    width: 150,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '订单编号',
    dataIndex: 'orderNo',
    width: 150,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '用户昵称',
    dataIndex: 'customNickname',
    width: 150,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '手机号码',
    dataIndex: 'customMobile',
    width: 150,
    slots: { customRender: 'textTpl' },
  },

  {
    title: '订单商品',
    dataIndex: 'artifactPriceName',
    width: 150,
    customRender: ({ record }) => {
      return record.artifactPriceName + priceTypes[record.artifactPriceTermType - 1];
    },
  },
  {
    title: '订单金额',
    dataIndex: 'payAmount',
    width: '150',
    slots: { customRender: 'textTpl' },
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    width: 150,
    slots: { customRender: 'status' },
  },
  // {
  //   title: '剩余有效期',
  //   dataIndex: 'receiptStatus',
  //   width: 120,
  // },
  {
    title: '到期时间',
    dataIndex: 'expireTime',
    width: 150,
    slots: { customRender: 'textTpl' },
  },
  {
    title: '微信支付订单号',
    dataIndex: 'transactionId',
    width: 150,
    slots: { customRender: 'textTpl' },
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'createTime',
    label: '创建时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
  {
    field: 'customId',
    label: '用户ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '手机号码',
    field: 'customMobile',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'customNickname',
    label: '用户昵称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '订单状态',
    field: 'status',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: arrayList,
    },
  },
];
