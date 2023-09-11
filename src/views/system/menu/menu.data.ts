import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 220,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 60,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 80,
  },
  {
    title: '层级',
    dataIndex: 'level',
    width: 80,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

const isMenu = (type: Boolean) => type === false;

export const formSchema: FormSchema[] = [
  {
    field: 'isMenu',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '目录', value: false },
        { label: '菜单', value: true },
      ],
    },
  },
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    ifShow: ({ values }) => !isMenu(values.isMenu),
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    helpMessage: ['值越小，排序越靠前'],
  },
  {
    field: 'redirect',
    label: '主页',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isMenu(values.isMenu),
  },
  {
    field: 'name',
    label: '菜单别名',
    component: 'Input',
    required: true,
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'component',
    label: '组件',
    component: 'Input',
    required: true,
  },
  {
    field: 'hideMenu',
    label: '隐藏菜单',
    helpMessage: ['当前路由不在菜单显示'],
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
    ifShow: ({ values }) => !isMenu(values.isMenu),
  },
  {
    field: 'currentActiveMenu',
    label: '激活菜单',
    helpMessage: ['当前激活的菜单'],
    component: 'Input',
    ifShow: ({ values }) => !isMenu(values.isMenu) && values.hideMenu,
    required: true,
  },
  {
    field: 'icon',
    label: '目录图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => isMenu(values.isMenu),
  },
];
