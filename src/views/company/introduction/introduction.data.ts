import { FormSchema } from '/@/components/Table';

export const formSchema: FormSchema[] = [
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
    field: 'detail',
    label: '内容',
    component: 'Editer',
    required: true,
  },
  {
    field: 'detailEng',
    label: '内容(英文)',
    component: 'Editer',
  },
];
