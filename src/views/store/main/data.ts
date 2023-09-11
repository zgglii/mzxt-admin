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
    label: '链接一图片',
    field: 'storeUrl1Img',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'storeUrl1Detail',
    label: '链接一详细说明',
    component: 'Input',
    required: true,
  },
  {
    field: 'storeUrl1DetailEng',
    label: '链接一详细说明(英文)',
    component: 'Input',
  },
  {
    field: 'storeUrl1',
    label: '链接一地址',
    component: 'Input',
    required: true,
  },
  {
    label: '链接二图片',
    field: 'storeUrl2Img',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'storeUrl2Detail',
    label: '链接二详细说明',
    component: 'Input',
    required: true,
  },
  {
    field: 'storeUrl2DetailEng',
    label: '链接二详细说明(英文)',
    component: 'Input',
  },
  {
    field: 'storeUrl2',
    label: '链接二地址',
    component: 'Input',
    required: true,
  },
  {
    label: '链接三图片',
    field: 'storeUrl3Img',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'storeUrl3Detail',
    label: '链接三详细说明',
    component: 'Input',
    required: true,
  },
  {
    field: 'storeUrl3DetailEng',
    label: '链接三详细说明(英文)',
    component: 'Input',
  },
  {
    field: 'storeUrl3',
    label: '链接三地址',
    component: 'Input',
    required: true,
  },
];
