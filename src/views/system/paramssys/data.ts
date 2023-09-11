import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
  },
  {
    title: '参数名称',
    dataIndex: 'valueName',
    width: 80,
    slots: { customRender: 'valueName' },
  },
  {
    title: '参数内容',
    dataIndex: 'valueContent',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    slots: { customRender: 'status' },
  },
];
// 我的研究所的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'valueName',
    label: '参数名称',
    component: 'Input',
    colProps: { span: 13 },
    defaultValue: '',
  },
  {
    field: 'valueContent',
    label: '参数内容',
    component: 'Input',
    defaultValue: '',
    colProps: { span: 13 },
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
    colProps: { span: 10 },
  },
  {
    field: 'valueName',
    label: '参数名称',
    component: 'Input',
    colProps: { span: 10 },
  },
];
