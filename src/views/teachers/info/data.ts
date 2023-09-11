import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

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
    title: '老师姓名',
    dataIndex: 'teacherName',
    width: 80,
  },
  {
    title: '老师头像',
    dataIndex: 'teacherImg',
    width: 80,
    slots: { customRender: 'teacherImg' },
  },
  {
    title: '老师标签',
    dataIndex: 'teacherLabel',
    width: 120,
  },
  {
    title: '老师职位',
    dataIndex: 'teacherPosition',
    width: 80,
  },
  {
    title: '擅长内容',
    dataIndex: 'teacherGoodAt',
    width: 120,
  },
  {
    title: '老师介绍',
    dataIndex: 'teacherIntroduce',
    width: 120,
    slots: { customRender: 'teacherIntroduce' },
  },
  {
    title: '老师申明',
    dataIndex: 'teacherAffirmation',
    width: 120,
    slots: { customRender: 'teacherAffirmation' },
  },
  {
    title: '老师状态',
    dataIndex: 'status',
    width: 120,
    slots: { customRender: 'status' },
  },
];
// 老师的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    component: 'Input',
    label: '老师姓名',
    required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      placeholder: '请输入老师姓名',
    },
  },
  {
    label: '老师头像',
    field: 'teacherImg',
    component: 'FastUpload',
    componentProps: ({ formModel }) => {
      return {
        imgSizeTips: '图片尺寸建议：100*100',
        onChange: (imageData) => {
          formModel.teacherImg = imageData[0] && imageData[0].response.data;
        },
      };
    },
    defaultValue: '',
    required: true,
  },
  {
    field: 'teacherLabel',
    component: 'Input',
    label: '老师标签',
    required: true,
    colProps: {
      span: 13,
    },
    componentProps: {
      placeholder: '请输入老师标签',
      maxLength: 6,
    },
  },
  {
    field: 'teacherPosition',
    component: 'Input',
    label: '老师职位',
    required: true,
    colProps: {
      span: 13,
    },
    componentProps: {
      placeholder: '请输入老师职位',
    },
  },
  {
    field: 'teacherGoodAt',
    component: 'Input',
    label: '擅长内容',
    required: true,
    colProps: {
      span: 13,
    },
    componentProps: {
      placeholder: '请输入擅长内容',
    },
  },
  {
    field: 'teacherIntroduce',
    component: 'InputTextArea',
    label: '老师介绍',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'teacherAffirmation',
    component: 'InputTextArea',
    label: '老师申明',
    required: true,
    colProps: {
      span: 24,
    },
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    label: '老师姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'teacherPosition',
    label: '老师职位',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '使用位置',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 6 },
  },
];
