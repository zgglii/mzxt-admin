import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { teacherList } from '/@/api/teacherApi/teacherInfo'; // teacher api

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
    title: '所属老师',
    dataIndex: 'teacherName',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'contentTitle',
    width: 120,
  },
  {
    title: '数据类型',
    dataIndex: 'resourceType',
    width: 120,
    slots: { customRender: 'resourceType' },
  },
  {
    title: '内容',
    dataIndex: 'contentResource',
    width: 80,
    slots: { customRender: 'contentResource' },
  },
  {
    title: '发布时间',
    dataIndex: 'sendTime',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    slots: { customRender: 'status' },
  },
];
// 老师的新增或者修改配置项
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
    field: 'teacherName',
    component: 'Input',
    label: '老师姓名',
    required: true,
    colProps: {
      span: 13,
    },
    show: false,
  },
  {
    label: '角色',
    field: 'teacherId',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: teacherList,
        labelField: 'teacherName',
        valueField: 'id',
        params: {
          current: 1,
          size: 999,
        },
        resultField: 'records',
        onChange: (value, option) => {
          formModel.teacherName = option && option.label;
        },
      };
    },
    required: true,
    colProps: { span: 13 },
  },
  {
    field: 'contentTitle',
    component: 'InputTextArea',
    label: '标题',
    required: true,
    colProps: {
      span: 13,
    },
    componentProps: {
      placeholder: '请输入标题',
    },
  },
  {
    field: 'resourceType',
    label: '图文类型',
    component: 'Select',
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '图片', value: '0' },
          { label: '视频', value: '1' },
        ],
      };
    },
    colProps: { span: 13 },
    defaultValue: '0',
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
    label: '上传图片',
    field: 'contentResource',
    component: 'FastUpload',
    componentProps: ({ formModel }) => {
      return {
        imgSizeTips: '图片尺寸建议：100*100',
        onChange: (imageData) => {
          formModel.contentResource = imageData[0] && imageData[0].response.data;
        },
        limit: 1,
      };
    },
    ifShow: ({ values }) => {
      return values.resourceType === '0';
    },
    defaultValue: '',
  },
  {
    label: '视频',
    field: 'contentResource',
    component: 'FastUpload',
    componentProps: {
      name: 'video',
      accept: '.mp4',
      action: '/yjs/upload/video',
      fileSize: 100,
    },
    defaultValue: [],
    ifShow: ({ values }) => {
      return values.resourceType === '1';
    },
  },

  {
    label: '视频封面',
    field: 'resourceImg',
    component: 'FastUpload',
    componentProps: ({ formModel }) => {
      return {
        imgSizeTips: '图片尺寸建议：100*100',
        onChange: (imageData) => {
          formModel.resourceImg = imageData[0] && imageData[0].response.data;
        },
        limit: 1,
      };
    },
    ifShow: ({ values }) => {
      return values.resourceType === '1';
    },
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'contentTitle',
    label: '标题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '所属老师',
    field: 'teacherId',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        api: teacherList,
        labelField: 'teacherName',
        valueField: 'id',
        params: {
          current: 1,
          size: 999,
        },
        resultField: 'records',
        onChange: (value, option) => {
          formModel.teacherName = option && option.label;
          console.log(formModel.teacherName, option, '~~~~~~~~~~~~');
          console.log(value);
        },
      };
    },
    colProps: { span: 6 },
  },
  {
    field: 'resourceType',
    label: '数据类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '图片', value: '0' },
        { label: '视频', value: '1' },
      ],
    },
    colProps: { span: 6 },
  },
];
