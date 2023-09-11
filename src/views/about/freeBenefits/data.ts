import { FormSchema } from '/@/components/Table';
// 我的研究所的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'contentTitle',
    component: 'Input',
    label: '标题',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
    show: false,
  },
  {
    field: 'id',
    component: 'Input',
    label: 'id',
    required: true,
    colProps: {
      span: 13,
    },
    show: false,
  },
  {
    label: '福利内容',
    field: 'content',
    component: 'Editer',
    required: true,
    colProps: {
      span: 24,
    },
  },
];
