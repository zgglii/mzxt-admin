import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

enum Status {
  '未开始',
  '众筹中',
  '众筹完成',
  '众筹失败',
}

export const columns: BasicColumn[] = [
  {
    title: '众筹名称',
    dataIndex: 'crowdFundingName',
    width: 200,
  },
  {
    title: '飞机名称',
    dataIndex: 'planeName',
    width: 200,
  },
  {
    title: '众筹总价',
    dataIndex: 'crowdFundingTotal',
    width: 120,
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
    title: '众筹服务',
    dataIndex: 'crowdFundingService',
    width: 200,
  },
  {
    title: '众筹开始时间',
    dataIndex: 'crowdFundingBeginTime',
    width: 120,
  },
  {
    title: '众筹结束时间',
    dataIndex: 'crowdFundingEndTime',
    width: 140,
  },
  {
    title: '众筹状态',
    dataIndex: 'crowdFundingStatus',
    width: 140,
    customRender: ({ record }) => {
      return Status[record.crowdFundingStatus];
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'planeName',
    label: '飞机名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const editFormSchema: FormSchema[] = [
  {
    field: 'crowdFundingName',
    label: '众筹名称',
    component: 'Input',
    required: true,
  },
  {
    label: '飞机图片',
    field: 'planePic',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'planeName',
    label: '飞机名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'planeNameEng',
    label: '飞机名称(英文)',
    component: 'Input',
  },
  {
    field: 'crowdFundingTotal',
    label: '众筹总价',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'crowdFundingCount',
    label: '众筹数量',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'crowdFundingPrice',
    label: '众筹单价',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'crowdFundingService',
    label: '众筹服务',
    component: 'Input',
    helpMessage: '不同服务之间，用逗号分隔',
    required: true,
  },
  {
    field: 'crowdFundingServiceEng',
    label: '众筹服务(英文)',
    component: 'Input',
  },
  {
    field: 'crowdFundingTime',
    label: '众筹时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm:ss' },
    },
    required: true,
  },
];
