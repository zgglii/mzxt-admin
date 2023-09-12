import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

const typeData = [
  { label: '演示模式', value: 1 },
  { label: '咨询热线', value: 2 },
  { label: '试用期限', value: 3 },
];
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '参数名称',
    dataIndex: 'type',
    customRender: ({ record }) => {
      return typeData[typeData.findIndex((item) => item.value == record.type)]?.label;
    },
  },
  {
    title: '配置项',
    dataIndex: 'parameter',
  },
  {
    title: '描述',
    dataIndex: 'name',
  },
];

/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '参数名称',
    component: 'Select',
    componentProps: {
      options: typeData,
      disabled: true,
    },
  },
  {
    field: 'parameter',
    label: '配置项',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '描述',
    component: 'Input',
    required: true,
  },
];
