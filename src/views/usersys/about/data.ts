import { FormSchema } from '/@/components/Table';

/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
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
