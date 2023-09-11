import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

enum UsePlace {
  '首页',
  '公司介绍',
  '飞机介绍',
  '共享飞机',
  '合作伙伴',
  '商品详细介绍',
}

export const columns: BasicColumn[] = [
  {
    title: '使用位置',
    dataIndex: 'usePlace',
    width: 120,
    customRender: ({ record }) => {
      return UsePlace[Number(record.usePlace) - 1];
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
  },
  {
    title: '英文标题',
    dataIndex: 'titleEng',
    width: 200,
  },
  {
    title: '副标题',
    dataIndex: 'subtitle',
    width: 120,
  },
  {
    title: '英文副标题',
    dataIndex: 'subtitleEng',
    width: 200,
  },
  {
    title: '图片',
    dataIndex: 'resourceImg',
    width: 220,
    slots: { customRender: 'resourceImg' },
  },
  {
    title: '链接',
    dataIndex: 'linkUrl',
    width: 220,
    slots: { customRender: 'linkUrl' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'usePlace',
    label: '使用位置',
    component: 'Select',
    componentProps: {
      options: [
        { label: '首页', value: '1' },
        { label: '公司介绍', value: '2' },
        { label: '飞机介绍', value: '3' },
        { label: '共享飞机', value: '4' },
        { label: '合作伙伴', value: '5' },
        { label: '商品详细介绍', value: '6' },
      ],
    },
    colProps: { span: 6 },
  },
];

export const editFormSchema: FormSchema[] = [
  {
    field: 'usePlace',
    label: '使用位置',
    component: 'Select',
    componentProps: {
      options: [
        { label: '首页', value: '1' },
        { label: '公司介绍', value: '2' },
        { label: '飞机介绍', value: '3' },
        { label: '共享飞机', value: '4' },
        { label: '合作伙伴', value: '5' },
        { label: '商品详细介绍', value: '6' },
      ],
    },
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
    component: 'Input',
    required: true,
  },
  {
    field: 'subtitleEng',
    label: '副标题(英文)',
    component: 'Input',
  },
  {
    field: 'linkUrl',
    label: '链接地址',
    component: 'Input',
  },
  {
    field: 'resourceType',
    label: '类型',
    component: 'RadioButtonGroup',
    componentProps: ({ formModel }) => {
      return {
        options: [
          {
            label: '图片',
            value: '0',
          },
          {
            label: '视频',
            value: '1',
          },
        ],
        onChange: () => {
          formModel.resourceImg = [];
        },
      };
    },
    defaultValue: '0',
  },
  {
    label: '图片',
    field: 'resourceImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
    ifShow: ({ values }) => {
      return values.resourceType === '0';
    },
  },
  {
    label: '视频',
    field: 'resourceImg',
    component: 'FastUpload',
    componentProps: {
      name: 'video',
      accept: '.mp4',
      action: '/yjs/upload/video',
      fileSize: 100,
    },
    defaultValue: [],
    required: true,
    ifShow: ({ values }) => {
      return values.resourceType === '1';
    },
  },
  {
    label: '视频封面',
    field: 'videoPreview',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
    ifShow: ({ values }) => {
      return values.resourceType === '1';
    },
  },
];
