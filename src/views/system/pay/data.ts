import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    label: '支付宝收款码',
    field: 'alipayImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    label: '微信收款码',
    field: 'wechatImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
];
