import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

const typeData = [
  { label: '课程中心', value: 1 },
  { label: '实战直播', value: 2 },
  { label: '实战操盘系统-更多', value: 3 },
  { label: '全方位系统课程-更多', value: 4 },
];
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'type',
    customRender: ({ record }) => {
      return typeData[typeData.findIndex((item) => item.value == record.type)]?.label;
    },
  },
  {
    title: '跳转小程序',
    dataIndex: 'externalAppId',
  },
  {
    title: '跳转地址',
    dataIndex: 'linkAddress',
  },
];

/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '标题',
    component: 'Select',
    componentProps: {
      options: typeData,
      disabled: true,
    },
  },
  {
    field: 'externalAppId',
    label: '跳转小程序',
    component: 'Input',
    required: true,
  },
  {
    field: 'linkAddress',
    label: '跳转地址',
    component: 'Input',
    required: true,
  },
];
