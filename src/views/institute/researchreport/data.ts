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
    title: '所属类别',
    dataIndex: 'thirdCategory',
    width: 80,
    slots: { customRender: 'thirdCategory' },
  },
  {
    title: '文章标题',
    dataIndex: 'reportTitle',
    width: 240,
    slots: { customRender: 'reportTitle' },
  },
  // {
  //   title: '公众号',
  //   dataIndex: 'reportSubtitle',
  //   width: 120,
  // },
  // {
  //   title: '文章图片',
  //   dataIndex: 'reportImg',
  //   width: 80,
  //   slots: { customRender: 'reportImg' },
  // },
  {
    title: '文章内容',
    dataIndex: 'reportContent',
    width: 80,
    slots: { customRender: 'reportContent' },
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
    field: 'thirdCategory',
    label: '所属类别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '个股研报', value: 'COMPANY_RESEARCH' },
        { label: '行业研报', value: 'INDUSTRY_RESEARCH' },
        { label: '宏观研究', value: 'COMPANY_DEPTH' },
        { label: '策略报告', value: 'INDUSTRY_DEPTH' },
      ],
    },
    required: true,
    colProps: { span: 13 },
  },
  {
    field: 'reportTitle',
    component: 'Input',
    label: '文章标题',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
  },
  // {
  //   field: 'reportSubtitle',
  //   component: 'Input',
  //   componentProps: {
  //     placeholder: '输入格式为 xxxx券商,xxx组,公众号名称  用英文逗号隔开',
  //   },
  //   label: '公众号',
  //   colProps: {
  //     span: 13,
  //   },
  //   defaultValue: '',
  // },
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
  {
    field: 'contentOrFile',
    label: '内容或者文件',
    component: 'Switch',
    componentProps: {
      checkedChildren: '内容',
      unCheckedChildren: '文件',
    },
    colProps: { span: 12 },
    required: true,
    defaultValue: true,
  },
  {
    label: '封面图片',
    field: 'reportImg',
    component: 'FastUpload',
    componentProps: () => {
      return {
        imgSizeTips: '图片尺寸建议：100*100',
        limit: 1,
      };
    },
    defaultValue: '',
    // required: true,
    show: false,
  },
  {
    label: '上传pdf文件',
    field: 'resourceUrl',
    component: 'FastUpload',
    componentProps: () => {
      return {
        name: 'file',
        action: '/yjs/upload/file',
        accept: '.pdf',
        limit: 1,
      };
    },
    defaultValue: '',
    ifShow: ({ values }) => {
      return !values.contentOrFile;
    },
  },
  {
    field: 'reportContent',
    component: 'Editer',
    label: '报告介绍',
    required: true,
    colProps: {
      span: 24,
    },
    ifShow: ({ values }) => {
      return values.contentOrFile;
    },
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'createTime',
    label: '创建时间',
    component: 'RangePicker',
    colProps: { span: 10 },
  },
  {
    field: 'reportTitle',
    label: '标题',
    component: 'Input',
    colProps: { span: 10 },
  },

  {
    field: 'thirdCategory',
    label: '所属类别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '个股研报', value: 'COMPANY_RESEARCH' },
        { label: '行业研报', value: 'INDUSTRY_RESEARCH' },
        { label: '宏观研究', value: 'COMPANY_DEPTH' },
        { label: '策略报告', value: 'INDUSTRY_DEPTH' },
      ],
    },
    colProps: { span: 10 },
  },
];
