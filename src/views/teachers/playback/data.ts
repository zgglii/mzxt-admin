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
    dataIndex: 'videoTitle',
    width: 120,
  },
  {
    title: '内容',
    dataIndex: 'videoContent',
    width: 80,
    slots: { customRender: 'intensiveContent' },
  },
  {
    title: '封面图片',
    dataIndex: 'videoIma',
    width: 80,
    slots: { customRender: 'videoIma' },
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
    required: true,
    colProps: { span: 13 },
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
    field: 'videoTitle',
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
    label: '视频封面',
    field: 'videoIma',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    label: '视频地址',
    field: 'videoUrl',
    component: 'FastUpload',
    componentProps: {
      name: 'video',
      accept: '.mp4',
      action: '/yjs/upload/video',
      fileSize: 100,
    },
    defaultValue: [],
    required: true,
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'videoTitle',
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
        },
      };
    },
    colProps: { span: 6 },
  },
];
