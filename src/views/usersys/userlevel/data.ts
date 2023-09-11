import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
/**
 * @description tabel 限时字段
 */
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
  },
  {
    title: '级别名称',
    dataIndex: 'levelName',
    width: 80,
  },
  {
    title: '我的研究所限时天数',
    dataIndex: 'myInstituteDay',
    width: 120,
  },

  {
    title: '我的研究所阅读数量',
    dataIndex: 'myInstituteRead',
    width: 120,
  },
  {
    title: '研究报告限时天数',
    dataIndex: 'researchReportDay',
    width: 120,
  },
  {
    title: '研究报告阅读数量',
    dataIndex: 'researchReportRead',
    width: 120,
  },
  {
    title: '调研纪要限时天数',
    dataIndex: 'surveySummaryDay',
    width: 120,
  },
  {
    title: '调研纪要阅读数量',
    dataIndex: 'surveySummaryRead',
    width: 120,
  },
  {
    title: '调研纪要每天可阅读数量',
    dataIndex: 'surveySummaryReadMore',
    width: 120,
  },
  {
    title: '每日精选限时天数',
    dataIndex: 'dailyPicksDay',
    width: 120,
  },
  {
    title: '每日精选每天阅读数量',
    dataIndex: 'dailyPicksRead',
    width: 120,
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
    field: 'levelName',
    label: '级别名称',
    component: 'Input',
    colProps: { span: 13 },
    defaultValue: '',
  },
  // {
  //   field: 'threePersonBank',
  //   label: '三人行',
  //   component: 'Switch',
  //   componentProps: {
  //     checkedChildren: '已启用',
  //     unCheckedChildren: '已禁用',
  //   },
  //   labelWidth: 220,
  //   colProps: { span: 12 },
  //   required: true,
  //   defaultValue: true,
  // },
  {
    field: 'followMe',
    label: '跟我学',
    component: 'Switch',
    componentProps: {
      checkedChildren: '已启用',
      unCheckedChildren: '已禁用',
      checked: true,
    },
    defaultValue: false,
    labelWidth: 220,
    colProps: { span: 12 },
    required: true,
  },
  // {
  //   field: 'investmentWeaponSpectrum',
  //   label: '投资兵器谱',
  //   component: 'Switch',
  //   componentProps: {
  //     checkedChildren: '已启用',
  //     unCheckedChildren: '已禁用',
  //     checked: true,
  //   },
  //   labelWidth: 220,
  //   colProps: { span: 12 },
  //   required: true,
  // },
  {
    field: 'queryMethod',
    label: '搜索功能',
    component: 'Switch',
    componentProps: {
      checkedChildren: '已启用',
      unCheckedChildren: '已禁用',
      checked: true,
    },
    defaultValue: false,
    labelWidth: 220,
    colProps: { span: 12 },
    required: true,
  },
  {
    field: 'myInstituteDay',
    component: 'InputNumber',
    label: '我的研究所限时天数',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'myInstituteRead',
    component: 'InputNumber',
    label: '我的研究所阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'myInstituteReadMore',
    component: 'InputNumber',
    label: '超过设置天数后每天可阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'researchReportDay',
    component: 'InputNumber',
    label: '研究报告限时天数',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'researchReportRead',
    component: 'InputNumber',
    label: '研究报告阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'researchReportReadMore',
    component: 'InputNumber',
    label: '超过设置天数后每天可阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'dailyPicksDay',
    component: 'InputNumber',
    label: '每日精选限时天数',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'dailyPicksRead',
    component: 'InputNumber',
    label: '每日精选阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'dailyPicksReadMore',
    component: 'InputNumber',
    label: '超过设置天数后每天可阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'surveySummaryDay',
    component: 'InputNumber',
    label: '调研纪要限时天数',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'surveySummaryRead',
    component: 'InputNumber',
    label: '调研纪要阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  {
    field: 'surveySummaryReadMore',
    component: 'InputNumber',
    label: '超过设置天数后每天可阅读数量',
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
  },
  // {
  //   field: 'surveySummaryRead',
  //   component: 'InputNumber',
  //   label: '调研纪要阅读数量',
  //   required: true,
  //   labelWidth: 220,
  //   colProps: { span: 8 },
  //   defaultValue: '',
  // },
  {
    field: 'chargeStatus',
    label: '在线付费升级',
    component: 'Switch',
    componentProps: {
      checkedChildren: '已启用',
      unCheckedChildren: '已禁用',
      checked: true,
      checkedValue: 2,
      unCheckedValue: 1,
    },
    labelWidth: 220,
    colProps: { span: 8 },
  },
  {
    field: 'amount',
    label: '付费金额',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
    },
    required: true,
    labelWidth: 220,
    colProps: { span: 8 },
    defaultValue: '',
    ifShow: ({ values }) => {
      return values.chargeStatus == 2;
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
    field: 'levelName',
    label: '级别',
    component: 'Input',
    colProps: { span: 10 },
  },
];
