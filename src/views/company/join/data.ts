import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    label: '顶部图片',
    field: 'topImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'sendEmail',
    label: '简历投放邮箱',
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
    field: 'titleEng',
    label: '标题(英文)',
    component: 'Input',
  },
  {
    field: 'subtitle',
    label: '副标题',
    component: 'Editer',
    required: true,
  },
  {
    field: 'subtitleEng',
    label: '副标题(英文)',
    component: 'Editer',
  },
];
