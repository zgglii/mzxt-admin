import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    label: '个人中心图片',
    field: 'topImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    label: '订单中心图片',
    field: 'orderImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
];
