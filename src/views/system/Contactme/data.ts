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
  // {
  //   title: '使用位置',
  //   dataIndex: 'usePlace',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     return UsePlace[Number(record.usePlace) - 1];
  //   },
  // },
  // {
  //   title: '演示数据',
  //   dataIndex: 'demoType',
  //   width: 80,
  //   slots: { customRender: 'demoType' },
  // },
  {
    title: '联系电话',
    dataIndex: 'content',
    width: 220,
    // slots: { customRender: 'linkUrl' },
  },

  {
    title: '添加时间',
    dataIndex: 'createTime',
    width: 220,
    // slots: { customRender: 'linkUrl' },
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
  // {
  //   field: 'area',
  //   label: '使用位置',
  //   component: 'Select',
  //   componentProps: {
  //     options: arrayList,
  //   },
  //   required: true,
  // },

  {
    field: 'content',
    label: '联系电话',
    component: 'Input',
    required: true,
    colProps: { span: 13 },
  },

  // {
  //   field: 'demoType',
  //   label: '数据类型',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '正常数据', value: '0' },
  //       { label: '演示数据', value: '1' },
  //     ],
  //   },
  //   colProps: { span: 13 },
  //   defaultValue: '0',
  // },
  // {
  //   label: '上传图片',
  //   field: 'imgUrl',
  //   component: 'FastUpload',
  //   componentProps: () => {
  //     return {
  //       imgSizeTips: '图片尺寸建议：100*100',
  //     };
  //   },
  //   defaultValue: '',
  //   required: true,
  // },
];
