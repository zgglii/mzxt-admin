import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '栏目名称',
    dataIndex: 'columnName',
    width: 200,
  },
  {
    title: '英文栏目名称',
    dataIndex: 'columnEngName',
    width: 200,
  },
  {
    title: '图片',
    dataIndex: 'imgUrl',
    width: 220,
    slots: { customRender: 'imgUrl' },
  },
];

export const editFormSchema: FormSchema[] = [
  {
    field: 'columnName',
    label: '栏目名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'columnEngName',
    label: '栏目名称(英文)',
    component: 'Input',
  },
  {
    label: '图片',
    field: 'imgUrl',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
];
