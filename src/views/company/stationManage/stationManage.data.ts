import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { stationInfoEdit } from '/@/api/sys/company';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '招聘岗位',
    dataIndex: 'stationName',
    align: 'left',
  },
  {
    title: '招聘岗位(英文)',
    dataIndex: 'stationNameEng',
    align: 'left',
  },
  {
    title: '部门',
    dataIndex: 'recruitPosition',
    align: 'left',
  },
  {
    title: '部门(英文)',
    dataIndex: 'recruitPositionEng',
    align: 'left',
  },
  {
    title: '工作地点',
    dataIndex: 'address',
    align: 'left',
  },
  {
    title: '工作地点(英文)',
    dataIndex: 'addressEng',
    align: 'left',
  },
  {
    title: '发布状态',
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
          stationInfoEdit({
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
    title: '发布时间',
    dataIndex: 'createTime',
    align: 'left',
  },
  {
    title: '招聘人数',
    dataIndex: 'recruitNum',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationName',
    label: '岗位',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'subtitle',
    label: '部门',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '发布状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已发布', value: true },
        { label: '未发布', value: false },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'createTime',
    label: '发布时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];

export const stationFormSchema: FormSchema[] = [
  {
    field: 'stationName',
    label: '招聘岗位',
    component: 'Input',
    required: true,
  },
  {
    field: 'stationNameEng',
    label: '招聘岗位(英文)',
    component: 'Input',
  },
  {
    field: 'recruitPosition',
    label: '招聘部门',
    component: 'Input',
    required: true,
  },
  {
    field: 'recruitPositionEng',
    label: '招聘部门(英文)',
    component: 'Input',
  },
  {
    field: 'address',
    label: '工作地点',
    component: 'Input',
    required: true,
  },
  {
    field: 'addressEng',
    label: '工作地点(英文)',
    component: 'Input',
  },
  {
    field: 'recruitNum',
    label: '招聘人数',
    component: 'Input',
    required: true,
  },
  {
    field: 'jobResponsibilities',
    label: '任职要求和职责',
    component: 'Editer',
    required: true,
  },
  {
    field: 'jobResponsibilitiesEng',
    label: '任职要求和职责(英文)',
    component: 'Editer',
  },
];
