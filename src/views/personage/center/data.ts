import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { userCenterEdit } from '/@/api/sys/model/personage';
import { useMessage } from '/@/hooks/web/useMessage';

enum Sex {
  '',
  '男',
  '女',
}

export const columns: BasicColumn[] = [
  {
    title: '客户头像',
    dataIndex: 'userImg',
    slots: { customRender: 'userImg' },
  },
  {
    title: '客户姓名',
    dataIndex: 'username',
  },
  {
    title: '客户电话',
    dataIndex: 'userTel',
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
  },
  {
    title: '最后登录IP',
    dataIndex: 'lastLoginIp',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    customRender: ({ record }) => {
      return Sex[record.sex];
    },
  },
  {
    title: '生日',
    dataIndex: 'birthday',
  },
  {
    title: '所属行业',
    dataIndex: 'industry',
  },
  {
    title: '职业',
    dataIndex: 'occupation',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === true,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          userCenterEdit({
            id: record.id,
            status: newStatus,
          })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改状态`);
            })
            .catch(() => {})
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '微信',
    dataIndex: 'wechatNo',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '客户名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'userTel',
    label: '客户电话',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'createTime',
    label: '创建时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];
