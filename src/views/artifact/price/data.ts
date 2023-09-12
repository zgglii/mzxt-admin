import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

const typeData = [
  { label: '龙头板块', value: 1 },
  { label: '伯克希尔投资策略', value: 2 },
];
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '板块',
    dataIndex: 'type',
    customRender: ({ record }) => {
      return typeData[typeData.findIndex((item) => item.value == record.type)]?.label;
    },
  },
  {
    title: '月卡原价',
    dataIndex: 'monthPrice',
  },
  {
    title: '月卡现价',
    dataIndex: 'monthCurrent',
  },
  {
    title: '季卡原价',
    dataIndex: 'quarterPrice',
  },
  {
    title: '季卡现价',
    dataIndex: 'quarterCurrent',
  },
  {
    title: '年卡原价',
    dataIndex: 'yearPrice',
  },
  {
    title: '年卡现价',
    dataIndex: 'yearCurrent',
  },
];

/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '板块',
    component: 'Select',
    componentProps: {
      options: typeData,
      disabled: true,
    },
  },
  {
    field: 'monthPrice',
    label: '月卡原价',
    component: 'InputNumber',
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    required: true,
  },
  {
    field: 'monthCurrent',
    label: '月卡现价',
    component: 'InputNumber',
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    required: true,
  },
  {
    field: 'quarterPrice',
    label: '季卡原价',
    component: 'InputNumber',
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    required: true,
  },
  {
    field: 'quarterCurrent',
    label: '季卡现价',
    component: 'InputNumber',
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    required: true,
  },
  {
    field: 'yearPrice',
    label: '年卡原价',
    component: 'InputNumber',
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    required: true,
  },
  {
    field: 'yearCurrent',
    label: '年卡现价',
    component: 'InputNumber',
    componentProps: {
      min: 0.01,
      precision: 2,
    },
    required: true,
  },
];
