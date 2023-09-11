import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    field: 'connectPhone',
    label: '联系方式',
    component: 'Input',
    required: true,
  },
  {
    field: 'faxNumber',
    label: '传真号码',
    component: 'Input',
    required: true,
  },
  {
    field: 'email',
    label: '邮箱地址',
    component: 'Input',
    required: true,
  },
  {
    label: '联系我们',
    field: 'connectImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    label: '联系我们背景',
    field: 'backgroundImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
];
