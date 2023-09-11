import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

const statusData = [
  { label: '已启用', value: '1' },
  { label: '已禁用', value: '2' },
];
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '封面',
    dataIndex: 'imgUrl',
    width: 220,
    slots: { customRender: 'imgUrlTpl' },
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: '外链小程序',
    dataIndex: 'externalAppId',
    align: 'left',
    width: 200,
  },
  {
    title: '跳转地址',
    dataIndex: 'linkAddress',
    align: 'left',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return statusData[statusData.findIndex((item) => item.value == record.status)].label;
    },
    width: 100,
  },
  {
    title: '发布时间',
    dataIndex: 'createTime',
    width: 200,
  },
];

/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'externalAppId',
    label: '外链小程序',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'createTime',
    label: '发布时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];
/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
  },
  {
    label: '封面',
    field: 'imgUrl',
    component: 'FastUpload',
    componentProps: () => {
      return {
        imgSizeTips: '图片尺寸建议：320*180',
      };
    },
    defaultValue: '',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'Switch',
    componentProps: {
      checkedChildren: statusData[0].label,
      unCheckedChildren: statusData[1].label,
      checkedValue: statusData[0].value,
      unCheckedValue: statusData[1].value,
    },
    defaultValue: statusData[0].value,
    required: true,
  },
  {
    field: 'externalAppId',
    label: '外链小程序ID',
    component: 'Input',
    required: true,
  },
  {
    field: 'linkAddress',
    label: '跳转地址',
    component: 'Input',
    required: true,
  },
];
