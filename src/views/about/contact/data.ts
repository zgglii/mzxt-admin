import { FormSchema } from '/@/components/Table';
// 我的研究所的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'connectTel',
    component: 'Input',
    label: '联系电话',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
  },
  {
    field: 'id',
    component: 'Input',
    label: 'id',
    required: true,
    colProps: {
      span: 13,
    },
    show: false,
  },
  {
    label: '上传图标',
    field: 'connectService',
    component: 'FastUpload',
    componentProps: () => {
      return {
        imgSizeTips: '图片尺寸建议：100*100',
        limit: 1,
      };
    },
    defaultValue: '',
    required: true,
  },
];
