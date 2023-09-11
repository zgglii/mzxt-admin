import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { contentLevelList } from '/@/api/usersys/contents';

/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
  },
  {
    title: 'id',
    dataIndex: 'id',
    width: 240,
    slots: { customRender: 'openId' },
  },
  {
    title: '微信ID',
    dataIndex: 'openId',
    width: 240,
    slots: { customRender: 'openId' },
  },
  {
    title: '已搜索次数',
    dataIndex: 'userNum',
    width: 120,
  },
  {
    title: '用户电话',
    dataIndex: 'mobile',
    width: 120,
    slots: { customRender: 'userTel' },
  },
];
// 我的研究所的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'miniAvatarUrl',
    label: '用户头像',
    component: 'Image',
    componentProps: ({ formModel }) => {
      return {
        src: formModel.miniAvatarUrl,
      };
    },
    colProps: { span: 13 },
    defaultValue: '0',
  },
  {
    field: 'openId',
    label: '微信ID',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    colProps: { span: 13 },
    defaultValue: '0',
    required: true,
  },
  {
    field: 'nickName',
    label: '微信昵称',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    colProps: { span: 13 },
    defaultValue: '0',
    required: true,
  },
  {
    field: 'userTel',
    label: '用户电话',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    colProps: { span: 13 },
    defaultValue: '0',
    required: true,
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'termDate',
    label: '创建时间',
    component: 'RangePicker',
    componentProps: () => {
      return {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        onChange: (date) => {
          if (date.length) {
            date[0].startOf('day');
            date[1].endOf('day');
          }
        },
      };
    },
    colProps: { span: 10 },
  },
];
