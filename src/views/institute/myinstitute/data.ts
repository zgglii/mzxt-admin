import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { contentThird, contentClimb } from '/@/api/myInstitute/contents'; // teacher api

/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
  },
  // {
  //   title: '演示数据',
  //   dataIndex: 'demoType',
  //   width: 80,
  //   slots: { customRender: 'demoType' },
  // },
  // {
  //   title: '二级类别',
  //   dataIndex: 'secondaryCategory',
  //   slots: { customRender: 'secondaryCategory' },
  //   width: 120,
  // },
  {
    title: '文章标签',
    dataIndex: 'reportLabel',
    width: 80,
    slots: { customRender: 'reportLabel' },
  },
  {
    title: '文章标题',
    dataIndex: 'reportTitle',
    width: 200,
    slots: { customRender: 'reportTitle' },
  },
  {
    title: '公众号',
    dataIndex: 'reportSubtitle',
    width: 240,
  },
  {
    title: '分组',
    dataIndex: 'climbOrder',
    width: 40,
  },
  {
    title: '文章图片',
    dataIndex: 'reportImg',
    width: 80,
    slots: { customRender: 'reportImg' },
  },
  {
    title: '文章内容',
    dataIndex: 'reportContent',
    width: 220,
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
    width: 80,
    slots: { customRender: 'reTop' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
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
    field: 'secondaryCategory',
    label: '所属类别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '总量', value: 'MY_TOTAL' },
        { label: '制造', value: 'MY_PRODUCT' },
        { label: '消费', value: 'MY_CONSUMPTION' },
        { label: '周期', value: 'MY_CYCLE' },
        { label: '科技', value: 'MY_TECHNOLOGY' },
        { label: '其他', value: 'MY_OTHER' },
      ],
    },
    defaultValue: 'MY_TOTAL',
    colProps: { span: 13 },
  },
  // {
  //   field: 'thirdCategory',
  //   label: '二级类别',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '个股研报', value: 'STOCK_RESEARCH' },
  //       { label: '行业研报', value: 'INDUSTRY_REPORT' },
  //       { label: '深度公司', value: 'DEEP_COMPANY' },
  //       { label: '深度行业', value: 'DEPTH_INDUSTRY' },
  //     ],
  //   },
  //   colProps: { span: 13 },
  // },
  {
    field: 'labelTxt',
    label: '数据类型',
    component: 'Input',
    colProps: { span: 13 },
    defaultValue: '',
    show: false,
  },
  {
    label: '文章标签',
    field: 'reportLabel',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        maxTagCount: '1',
        mode: 'tags',
        api: contentThird,
        labelField: 'report_label',
        valueField: 'report_label',
        params: {
          thirdCategory: formModel.secondaryCategory,
        },
        resultField: 'records',
        onChange: (value) => {
          if (value.length > 0) {
            formModel.labelTxt = value[0];
            console.log(value, '哈哈哈');
            value.pop();
          }
        },
      };
    },
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
  {
    field: 'reportSubtitle',
    component: 'Input',
    componentProps: {
      placeholder: '输入格式为 xxxx券商,xxx组,公众号名称  用英文逗号隔开',
    },
    label: '公众号',
    // required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
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
        imgSizeTips: '仅支持pdf格式的文件',
        limit: 1,
        // onChange: (lists) => {
        //   lists = [lists[1] ? lists[1] : []];
        //   console.log(lists, '俩表');
        // },
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
    label: '研究内容',
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
    colProps: { span: 6 },
  },
  {
    field: 'reportTitle',
    label: '标题',
    component: 'Input',
    colProps: { span: 6 },
  },

  // {
  //   field: 'secondaryCategory',
  //   label: '二级类别',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '总量', value: 'MY_TOTAL' },
  //       { label: '制造', value: 'MY_PRODUCT' },
  //       { label: '消费', value: 'MY_CONSUMPTION' },
  //       { label: '周期', value: 'MY_CYCLE' },
  //       { label: '科技', value: 'MY_TECHNOLOGY' },
  //       { label: '其他', value: 'MY_OTHER' },
  //     ],
  //   },
  //   defaultValue: 'MY_TOTAL',
  //   colProps: { span: 10 },
  // },
  {
    label: '文章标签',
    field: 'reportLabel',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        maxTagCount: '1',
        mode: 'tags',
        api: contentThird,
        labelField: 'report_label',
        valueField: 'report_label',
        params: {
          thirdCategory: formModel.secondaryCategory ? formModel.secondaryCategory : 'MY_TOTAL',
        },
        resultField: 'records',
        onChange: (value, option) => {
          if (value.length > 0) {
            formModel.labelTxt = value = option = value.pop();
            console.log(value, option, formModel.labelTxt, 'onChange');
          }
        },
      };
    },
    colProps: { span: 6 },
  },
  {
    label: '分组',
    field: 'climbOrder',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        maxTagCount: '1',
        api: contentClimb,
        params: {
          thirdCategory: formModel.secondaryCategory,
        },
        resultField: 'records',
        onChange: (value) => {
          console.log(value, '值');
        },
      };
    },
    colProps: { span: 6 },
    defaultValue: '',
  },
  {
    field: 'reportSubtitle',
    label: '公众号',
    component: 'Input',
    colProps: { span: 6 },
  },
];
