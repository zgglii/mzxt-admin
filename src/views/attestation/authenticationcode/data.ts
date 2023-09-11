import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

// enum UsePlace {
//   '首页',
//   '跟我学',
//   '调研纪要',
//   '研究报告',
//   '每日精选',
// }
const arrayList = [
  { label: '首页', value: '1' },
  { label: '跟我学', value: '2' },
  { label: '调研纪要', value: '3' },
  { label: '研究报告', value: '4' },
  { label: '每日精选', value: '5' },
];
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '认证码',
    dataIndex: 'content',
    width: 220
  },

  {
    title: '添加时间',
    dataIndex: 'createTime',
    width: 220,
  },
];

/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'usePlace',
    label: '使用位置',
    component: 'Select',
    componentProps: {
      options: arrayList,
    },
    colProps: { span: 6 },
  },
];
/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    label:'认证码',
    field:'content',
    component:'Input',
    required:true
  }
];
