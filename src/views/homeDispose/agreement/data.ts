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
    title:'排序',
    dataIndex:'sequence',
    width: 50,
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 100,
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: 100,
  },
  // {
  //   title: '图片',
  //   dataIndex: 'imgUrl',
  //   width: 220,
  //   slots: { customRender: 'linkUrl' },
  // },

  {
    title: '发布时间',
    dataIndex: 'createTime',
    width: 100,
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
  {
    field: 'sequence',
    label: '排序',
    component: 'Input',
    required: true,
  },
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'createTime',
    label: '发布时间',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      // 显示的时间格式
      showTime: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    required: true,
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
