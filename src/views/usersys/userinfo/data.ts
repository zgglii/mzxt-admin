import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 170,
  },
  {
    title: '用户ID',
    dataIndex: 'id',
  },
  {
    title: '微信ID',
    dataIndex: 'openId',
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    width: 170,
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    width: 170,
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
    field: 'id',
    label: '客户ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'mobile',
    label: '手机号码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'openId',
    label: '微信ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'nickname',
    label: '客户昵称',
    component: 'Input',
    colProps: { span: 6 },
  },
];
