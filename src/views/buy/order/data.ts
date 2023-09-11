import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

enum Status {
  '待支付',
  '待审核',
  '已支付',
  '众筹失败',
  '众筹成功',
  '已退款',
}

export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNo',
    width: 200,
  },
  {
    title: '众筹名称',
    dataIndex: 'crowdFundingName',
    width: 200,
  },
  {
    title: '客户姓名',
    dataIndex: 'infoName',
    width: 200,
  },
  {
    title: '客户电话',
    dataIndex: 'infoTel',
    width: 200,
  },
  {
    title: '众筹数量',
    dataIndex: 'crowdFundingCount',
    width: 120,
  },
  {
    title: '众筹单价',
    dataIndex: 'crowdFundingPrice',
    width: 120,
  },
  {
    title: '众筹总价',
    dataIndex: 'crowdFundingAmount',
    width: 120,
  },
  {
    title: '众筹状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return Status[record.status];
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'orderNo',
    label: '订单编号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'infoName',
    label: '客户姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'infoTel',
    label: '客户电话',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '订单状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '待支付', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已支付', value: 2 },
        { label: '众筹失败', value: 3 },
        { label: '众筹成功', value: 4 },
        { label: '已退款', value: 5 },
      ],
    },
    colProps: { span: 6 },
  },
  {
    field: 'createTime',
    label: '创建时间',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

export const editFormSchema: FormSchema[] = [
  {
    field: 'orderNo',
    label: '订单编号',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'status',
    label: '订单状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '待支付', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已支付', value: 2 },
        { label: '众筹失败', value: 3 },
        { label: '众筹成功', value: 4 },
        { label: '已退款', value: 5 },
      ],
      disabled: true,
    },
  },
  {
    field: 'infoName',
    label: '客户姓名',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'infoTel',
    label: '客户电话',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'crowdFundingCount',
    label: '众筹数量',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'crowdFundingPrice',
    label: '众筹单价',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'crowdFundingAmount',
    label: '众筹总价',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    label: '付款凭证',
    field: 'payInfo',
    component: 'FastUpload',
    componentProps: {
      disabled: true,
    },
    defaultValue: [],
    show: ({ values }) => {
      return values.status != 0;
    },
  },
  {
    label: '退款凭证',
    field: 'returnInfo',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
    show: ({ values }) => {
      return values.status == 1 || values.status == 2 || values.status == 3 || values.status == 5;
    },
  },
];
