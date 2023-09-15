import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { newsEdit } from '/@/api/demo/home';

const typeData = [
  { label: '系统消息', value: 1 },
  { label: '明知学堂', value: 2 },
];
const statusData = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 2 },
];
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '消息类型',
    dataIndex: 'type',
    customRender: ({ record }) => {
      return typeData[typeData.findIndex((item) => item.value == record.type)]?.label;
    },
    width: 130,
  },
  {
    title: '封面图片',
    dataIndex: 'imgUrl',
    width: 220,
    slots: { customRender: 'imgUrlTpl' },
  },
  {
    title: '消息标题',
    dataIndex: 'title',
    align: 'left',
    slots: { customRender: 'textTpl' },
  },
  {
    title: '消息内容',
    dataIndex: 'content',
    align: 'left',
    slots: { customRender: 'textTpl' },
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
        checked: record.status === statusData[0].value,
        checkedChildren: statusData[0].label,
        unCheckedChildren: statusData[1].label,
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? statusData[0].value : statusData[1].value;
          const { createMessage } = useMessage();
          newsEdit({
            id: record.id,
            status: newStatus,
          })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`操作成功`);
            })
            .catch(() => {})
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
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
    colProps: { span: 8 },
  },
  {
    field: 'type',
    label: '消息类型',
    component: 'Select',
    componentProps: {
      options: typeData,
    },
    colProps: { span: 6 },
  },
  {
    field: 'title',
    label: '消息内容',
    component: 'Input',
    colProps: { span: 6 },
  },
];
/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    field: 'type',
    label: '消息类型',
    component: 'Select',
    componentProps: {
      options: typeData,
    },
    required: true,
  },
  {
    field: 'title',
    label: '消息标题',
    component: 'Input',
    required: true,
  },
  {
    label: '封面图片',
    field: 'imgUrl',
    component: 'FastUpload',
    componentProps: () => {
      return {
        imgSizeTips: '图片尺寸建议：690*340',
      };
    },
    defaultValue: '',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Switch',
    componentProps: {
      checkedChildren: statusData[0].label,
      unCheckedChildren: statusData[1].label,
      checkedValue: statusData[0].value,
      unCheckedValue: statusData[1].value,
    },
    defaultValue: statusData[0].value,
    required: true,
  },
  {
    label: '消息内容',
    field: 'content',
    component: 'InputTextArea',
    required: true,
    colProps: {
      span: 24,
    },
  },
];
