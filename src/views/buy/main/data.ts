import { FormSchema } from '/@/components/Table';

export const dataFormSchema: FormSchema[] = [
  {
    label: '众筹买飞机图片',
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
    label: '众筹买飞机标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'titleEng',
    label: '众筹买飞机标题(英文)',
    component: 'Input',
  },
  {
    field: 'subtitle',
    label: '众筹买飞机内容',
    component: 'Editer',
    required: true,
  },
  {
    field: 'subtitleEng',
    label: '众筹买飞机内容(英文)',
    component: 'Editer',
  },
  {
    label: '分割图片',
    field: 'subPic',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    label: '支持者背景图片',
    field: 'supportPic',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
];
