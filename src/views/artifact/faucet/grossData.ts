import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '数据日期',
    dataIndex: 'onDate',
  },
  {
    title: '代码',
    dataIndex: 'code',
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '强度值',
    dataIndex: 'strength',
  },
  {
    title: '导入时间',
    dataIndex: 'createTime',
    width: 170,
  },
];

/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '代码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'onDate',
    label: '数据日期',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];
/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    field: 'onDate',
    label: '数据日期',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'code',
    label: '代码',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'strength',
    label: '强度值',
    component: 'InputNumber',
    required: true,
  },
];

/**
 * @description 介绍
 */
export const infoFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'subTitle',
    label: '副标题',
    component: 'Input',
  },
  {
    label: '内容',
    field: 'content',
    component: 'Editer',
    required: true,
    colProps: {
      span: 24,
    },
  },
];
