import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    label: '参数说明图片',
    field: 'topImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'value1',
    label: '参数一',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value1Eng',
    label: '参数一(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value1Explain',
    label: '参数一说明',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value1ExplainEng',
    label: '参数一说明(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value2',
    label: '参数二',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value2Eng',
    label: '参数二(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value2Explain',
    label: '参数二说明',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value2ExplainEng',
    label: '参数二说明(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value3',
    label: '参数三',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value3Eng',
    label: '参数三(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value3Explain',
    label: '参数三说明',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value3ExplainEng',
    label: '参数三说明(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value4',
    label: '参数四',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value4Eng',
    label: '参数四(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value4Explain',
    label: '参数四说明',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value4ExplainEng',
    label: '参数四说明(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value5',
    label: '参数五',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value5Eng',
    label: '参数五(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value5Explain',
    label: '参数五说明',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value5ExplainEng',
    label: '参数五说明(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value6',
    label: '参数六',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value6Eng',
    label: '参数六(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value6Explain',
    label: '参数六说明',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    field: 'value6ExplainEng',
    label: '参数六说明(英文)',
    component: 'Input',
    colProps: {
      span: 9,
    },
  },
  {
    label: '性能图片',
    field: 'bottomImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
];
