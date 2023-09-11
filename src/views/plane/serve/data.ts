import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    label: '售后说明图片',
    field: 'topImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'preSale',
    label: '售前服务',
    component: 'InputTextArea',
    required: true,
    colProps: {
      span: 9,
    },
  },
  {
    field: 'preSaleEng',
    label: '售前服务(英文)',
    component: 'InputTextArea',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'onSale',
    label: '售中服务',
    component: 'InputTextArea',
    required: true,
    colProps: {
      span: 9,
    },
  },
  {
    field: 'onSaleEng',
    label: '售中服务(英文)',
    component: 'InputTextArea',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'afterSale',
    label: '售后服务',
    component: 'InputTextArea',
    required: true,
    colProps: {
      span: 9,
    },
  },
  {
    field: 'afterSaleEng',
    label: '售后服务(英文)',
    component: 'InputTextArea',
    colProps: {
      span: 9,
    },
  },
  {
    label: '售后图片一',
    field: 'afterImg1',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    label: '售后图片二',
    field: 'afterImg2',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    label: '售后图片三',
    field: 'afterImg3',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'serviceContent',
    label: '服务内容',
    component: 'Editer',
    required: true,
  },
  {
    field: 'serviceContentEng',
    label: '服务内容(英文)',
    component: 'Editer',
  },
  {
    label: '覆盖网点图',
    field: 'netImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
];
