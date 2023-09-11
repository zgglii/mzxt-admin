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
    title: '演示数据',
    dataIndex: 'demoType',
    width: 80,
    slots: { customRender: 'demoType' },
  },
  {
    title: '类型',
    dataIndex: 'contentType',
    width: 80,
    slots: { customRender: 'contentType' },
  },
  {
    title: '学习级别',
    dataIndex: 'learnType',
    width: 120,
    slots: { customRender: 'learnType' },
  },
  {
    title: '文章标题',
    dataIndex: 'learnTitle',
    width: 240,
    slots: { customRender: 'learnTitle' },
  },
  {
    title: '图标',
    dataIndex: 'learnIcon',
    width: 80,
    slots: { customRender: 'learnIcon' },
  },
  {
    title: '图文内容',
    dataIndex: 'learnContent',
    width: 80,
    slots: { customRender: 'learnContent' },
  },
  {
    title: '发布时间',
    dataIndex: 'sendTime',
    width: 120,
  },
  {
    title: '是否置顶',
    dataIndex: 'reTop',
    width: 120,
    slots: { customRender: 'reTop' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    slots: { customRender: 'status' },
  },
];
// 我的研究所的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'demoType',
    label: '数据类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常数据', value: '0' },
        { label: '演示数据', value: '1' },
      ],
    },
    colProps: { span: 13 },
    defaultValue: '0',
  },
  {
    field: 'contentType',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '音频', value: '0' },
        { label: '图文', value: '1' },
      ],
    },
    colProps: { span: 13 },
    defaultValue: '0',
    required: true,
  },
  {
    field: 'learnType',
    label: '学习级别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '登堂入室', value: '0' },
        { label: '进阶之路', value: '1' },
      ],
    },
    required: true,
    defaultValue: '0',
    colProps: { span: 13 },
  },
  {
    field: 'learnTitle',
    component: 'Input',
    label: '标题',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
  },
  {
    field: 'learnSubtitle',
    component: 'Input',
    label: '副标题',
    colProps: {
      span: 13,
    },
    defaultValue: '',
    show: false,
  },
  {
    field: 'learnLabel',
    component: 'Input',
    label: '标签',
    colProps: {
      span: 13,
    },
    defaultValue: '',
    show: false,
  },
  {
    field: 'sendTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    label: '发布时间',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
  },
  // {
  //   label: '上传图标',
  //   field: 'learnIcon',
  //   component: 'FastUpload',
  //   componentProps: () => {
  //     return {
  //       imgSizeTips: '图片尺寸建议：100*100',
  //       limit: 1,
  //     };
  //   },
  //   defaultValue: '',
  //   required: true,
  //   ifShow: ({ values }) => {
  //     return values.contentType === '0';
  //   },
  // },
  {
    label: '音频文件',
    field: 'audioUrl',
    component: 'FastUpload',
    componentProps: () => {
      return {
        name: 'audio',
        accept: '.mp3',
        action: '/yjs/upload/audio',
        imgSizeTips: '音频格式为:mp3',
        limit: 1,
      };
    },
    defaultValue: '',
    required: true,
    ifShow: ({ values }) => {
      return values.contentType === '0';
    },
  },
  {
    field: 'learnContent',
    component: 'Editer',
    label: '报告介绍',
    required: true,
    colProps: {
      span: 24,
    },
    ifShow: ({ values }) => {
      return values.contentType === '1';
    },
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'learnTitle',
    label: '标题',
    component: 'Input',
    colProps: { span: 10 },
  },

  {
    field: 'contentType',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '音频', value: '0' },
        { label: '图文', value: '1' },
      ],
    },
    colProps: { span: 10 },
  },
];
