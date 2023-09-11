import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    label: '共享飞机图片',
    field: 'topImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'title',
    label: '共享飞机标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'titleEng',
    label: '共享飞机标题(英文)',
    component: 'Input',
  },
  {
    field: 'serviceContent',
    label: '共享飞机内容',
    component: 'Editer',
    required: true,
  },
  {
    field: 'serviceContentEng',
    label: '共享飞机内容(英文)',
    component: 'Editer',
  },
  {
    label: '共享价值图片',
    field: 'shareImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'shareValue',
    label: '共享价值标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'shareValueEng',
    label: '共享价值标题(英文)',
    component: 'Input',
  },
  {
    field: 'shareContent',
    label: '共享价值内容',
    component: 'Editer',
    required: true,
  },
  {
    field: 'shareContentEng',
    label: '共享价值内容(英文)',
    component: 'Editer',
  },
  {
    label: '适应范围图片',
    field: 'scopeImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'scopeTitle',
    label: '适应范围标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'scopeTitleEng',
    label: '适应范围标题(英文)',
    component: 'Input',
  },
  {
    field: 'scopeContent',
    label: '适应范围内容',
    component: 'Editer',
    required: true,
  },
  {
    field: 'scopeContentEng',
    label: '适应范围内容(英文)',
    component: 'Editer',
  },
  {
    field: 'parentsExplain',
    label: '合作伙伴说明',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentsExplainEng',
    label: '合作伙伴说明(英文)',
    component: 'Input',
  },
];
