import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { swiperEdit } from '/@/api/demo/home';

const statusData = [
  { label: '已启用', value: 1 },
  { label: '已禁用', value: 2 },
];

/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '图片地址',
    dataIndex: 'imgUrl',
  },
  {
    title: '图片预览',
    dataIndex: 'imgUrl',
    slots: { customRender: 'imgUrlTpl' },
  },
  {
    title: '跳转地址',
    dataIndex: 'link',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
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
          swiperEdit({
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
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

/**
 * @description 修改或添加轮播图
 */
export const editFormSchema: FormSchema[] = [
  {
    label: '上传图片',
    field: 'imgUrl',
    component: 'FastUpload',
    componentProps: () => {
      return {
        imgSizeTips: '图片尺寸建议：750*280',
      };
    },
    defaultValue: '',
    required: true,
  },
  {
    label: '跳转地址',
    field: 'link',
    component: 'Input',
    helpMessage: ['仅信任域名可访问'],
  },
  {
    label: '排序',
    field: 'sort',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      max: 1000,
      precision: 0,
    },
    defaultValue: 0,
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
  },
];
