import { FormSchema } from '/@/components/Table';
// 我的研究所的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'content',
    component: 'Input',
    label: '轮播图公告',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
  },
  {
    field: 'contentExt',
    component: 'Input',
    label: '研究报告公告',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
  },

  {
    field: 'id',
    component: 'Input',
    label: 'id',
    // required: true,
    colProps: {
      span: 13,
    },
    show: false,
    defaultValue: '',
  },
];
