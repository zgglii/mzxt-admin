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
  // {
  //   title: '所属类别',
  //   dataIndex: 'thirdCategory',
  //   width: 80,
  //   slots: { customRender: 'thirdCategory' },
  // },
  {
    title: '文章标题',
    dataIndex: 'reportTitle',
    width: 240,
    slots: { customRender: 'reportTitle' },
  },
  // {
  //   title: '文章副标题',
  //   dataIndex: 'reportSubtitle',
  //   width: 120,
  // },
  {
    title: '文章图片',
    dataIndex: 'reportImg',
    width: 80,
    slots: { customRender: 'reportImg' },
  },
  {
    title: '精选内容',
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
  // {
  //   field: 'thirdCategory',
  //   label: '所属类别',
  //   component: 'Select',
  //   componentProps: {
  //     options: [{ label: '每日精选', value: 'DAILY_PICKS' }],
  //   },
  //   required: true,
  //   colProps: { span: 13 },
  // },
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
  //   label: '文章副标题',
  //   required: true,
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
    required: true,
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
    ifShow: ({ values }) => {
      return !values.contentOrFile;
    },
  },
  {
    field: 'reportContent',
    component: 'Editer',
    label: '报告介绍',
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

  // {
  //   field: 'thirdCategory',
  //   label: '所属类别',
  //   component: 'Select',
  //   componentProps: {
  //     options: [{ label: '每日精选', value: 'DAILY_PICKS' }],
  //   },
  //   colProps: { span: 10 },
  // },
];
