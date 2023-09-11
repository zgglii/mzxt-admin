import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useMessage } from '/@/hooks/web/useMessage';
import { saveNewsInfo } from '/@/api/sys/company';
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: '英文标题',
    dataIndex: 'titleEng',
    align: 'left',
  },
  {
    title: '副标题',
    dataIndex: 'subtitle',
    align: 'left',
    width: 150,
  },
  {
    title: '发布状态',
    width: 150,
    dataIndex: 'status',
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status == false,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? false : true;
          const { createMessage } = useMessage();
          saveNewsInfo({
            id: record.id,
            status: newStatus,
          })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改发布状态`);
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
    title: '图片地址',
    width: 150,
    dataIndex: 'topImg',
    slots: { customRender: 'topImg' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'subtitle',
    label: '副标题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '发布状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已发布', value: false },
        { label: '未发布', value: true },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'titleEng',
    label: '标题(英文)',
    component: 'Input',
  },
  {
    field: 'subtitle',
    label: '副标题',
    component: 'Input',
    required: true,
  },
  {
    field: 'subtitleEng',
    label: '副标题(英文)',
    component: 'Input',
  },
  {
    label: '顶部图片',
    field: 'topImg',
    component: 'FastUpload',
    componentProps: {
      imgSizeTips: '图片尺寸建议：100*100',
    },
    defaultValue: [],
    required: true,
  },
  {
    field: 'newsDetails',
    label: '文章详情',
    component: 'Editer',
    required: true,
  },
  {
    field: 'newsDetailsEng',
    label: '文章详情(英文)',
    component: 'Editer',
  },
];

export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        state: true,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
}
