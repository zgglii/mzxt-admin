import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { contentAccCType, contentClimb } from '/@/api/myInstitute/contents'; // teacher api
/**
 * @description tabel 显示字段
 */
export const columns: BasicColumn[] = [
  {
    title: '爬取时间',
    dataIndex: 'updateTime',
    width: 120,
  },
  {
    title: '证券名称',
    dataIndex: 'cate',
    width: 120,
  },
  {
    title: '所属标签',
    dataIndex: 'offiType',
    width: 120,
  },
  {
    title: '公众号名称',
    dataIndex: 'offiName',
    width: 120,
  },
  {
    title: '所属研究所',
    dataIndex: 'secondary',
    width: 120,
    slots: { customRender: 'secondary' },
  },
  {
    title: '分组',
    dataIndex: 'climbOrder',
    width: 80,
  },
  {
    title: '成功数量',
    dataIndex: 'successCount',
    width: 80,
  },
  {
    title: '失败原因',
    dataIndex: 'failReason',
    width: 80,
  },
  {
    title: '爬取状态',
    dataIndex: 'climbStatus',
    width: 80,
    slots: { customRender: 'climbStatus' },
  },
];
// 我的研究所的新增或者修改配置项
export const upImageFormSchema: FormSchema[] = [
  {
    field: 'cate',
    component: 'Input',
    label: '证券名称',
    required: true,
    colProps: {
      span: 13,
    },
    defaultValue: '',
  },
  // {
  //   field: 'offiType',
  //   component: 'Input',
  //   label: '所属标签',
  //   required: true,
  //   colProps: {
  //     span: 13,
  //   },
  //   defaultValue: '',
  // },
  {
    label: '所属标签',
    field: 'offiType',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        maxTagCount: '1',
        mode: 'tags',
        api: contentAccCType,
        maxChose: 1,
        // resultField: 'offiType',
        // onChange: (value) => {
        //   if (value.length > 0) {
        //     formModel.labelTxt = value[0];
        //     formModel.offiType = value[0];
        //     console.log(formModel.offiType, '哈哈哈');
        //     value.pop();
        //   }
        // },
      };
    },
    colProps: { span: 13 },
  },
  {
    field: 'offiName',
    label: '公众号名称',
    component: 'Input',
    colProps: { span: 13 },
    required: true,
  },
  {
    label: '所属研究所',
    field: 'secondary',
    component: 'Select',
    required: true,
    componentProps: () => {
      return {
        // reportCategory = 总量 MY_TOTAL,制造 MY_PRODUCT,消费 MY_CONSUMPTION,   周期 MY_CYCLE,科技 MY_TECHNOLOGY,其他 MY_OTHER
        options: [
          { label: '总量', value: 'MY_TOTAL' },
          { label: '制造', value: 'MY_PRODUCT' },
          { label: '消费', value: 'MY_CONSUMPTION' },
          { label: '周期', value: 'MY_CYCLE' },
          { label: '科技', value: 'MY_TECHNOLOGY' },
          { label: '其他', value: 'MY_OTHER' },
        ],
      };
    },
    colProps: { span: 13 },
  },

  {
    label: '分组',
    field: 'climbOrder',
    component: 'ApiSelect',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        mode: 'tags',
        maxTagCount: '1',
        api: contentClimb,
        maxChose: 1,
        params: {
          thirdCategory: formModel.secondaryCategory,
        },
        resultField: 'records',
        onChange: (value) => {
          console.log(value, '值');
        },
      };
    },
    colProps: { span: 13 },
  },
];
/**
 * @description 搜索表单架构
 */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'offiName',
    label: '公众号名称',
    component: 'Input',
    colProps: { span: 8 },
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
    colProps: { span: 8 },
    defaultValue: '',
  },
];
