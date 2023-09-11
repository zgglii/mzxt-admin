import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { RoleList } from '/@/api/demo/system';

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'name',
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
  },
  // {
  //   title: '邮箱',
  //   dataIndex: 'email',
  // },
  {
    title: '角色',
    dataIndex: 'sysRoleNames',
    slots: { customRender: 'sysRoleNames' },
  },
  // {
  //   title: '启用状态',
  //   dataIndex: 'enabled',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.disabled === true,
  //       checkedChildren: '已启用',
  //       unCheckedChildren: '已禁用',
  //       loading: record.disabled,
  //       onChange(checked: boolean) {
  //         record.disabled = true;
  //         const newStatus = checked ? true : false;
  //         const { createMessage } = useMessage();
  //         Accountupdate({
  //           id: record.id,
  //           disabled: newStatus,
  //         })
  //           .then(() => {
  //             record.disabled = newStatus;
  //             createMessage.success(`已成功修改用户状态`);
  //           })
  //           .catch(() => {})
  //           .finally(() => {
  //             record.disabled = false;
  //           });
  //       },
  //     });
  //   },
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'nikName',
    label: '昵称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'userTel',
    label: '联系电话',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入账号',
      },
      {
        message: '最少5位',
        min: 5,
      },
      {
        message: '最多20位',
        max: 20,
      },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    rules: [
      {
        required: true,
        message: '请输入账号',
      },
      {
        message: '最少2位',
        min: 2,
      },
    ],
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入账号',
      },
      {
        message: '最少2位',
        min: 2,
      },
      {
        message: '最多20位',
        max: 20,
      },
    ],
  },
  // {
  //   label: '头像',
  //   field: 'userImg',
  //   component: 'FastUpload',
  //   componentProps: {
  //     imgSizeTips: '图片尺寸建议：100*100',
  //   },
  //   defaultValue: [],
  //   required: true,
  // },
  {
    label: '联系电话',
    field: 'mobile',
    component: 'Input',
  },
  {
    label: '角色',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      api: RoleList,
      labelField: 'nameZh',
      valueField: 'id',
    },
    required: true,
  },
  // {
  //   field: 'disabled',
  //   label: '状态',
  //   component: 'RadioButtonGroup',
  //   defaultValue: true,
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: true },
  //       { label: '禁用', value: false },
  //     ],
  //   },
  // },
];
