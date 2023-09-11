import { ref } from 'vue';
import { FormSchema } from '/@/components/Table';
import { performancesList } from '/@/api/demo/plane';

const performData = ref<any[]>([]);
performancesList().then((res) => {
  if (res && res.length) {
    let data = res[0];
    for (const key in data) {
      switch (key) {
        case 'value1':
          if (data[key])
            performData.value.push({
              value: '1',
              label: data[key],
            });
          break;
        case 'value2':
          if (data[key])
            performData.value.push({
              value: '2',
              label: data[key],
            });
          break;
        case 'value3':
          if (data[key])
            performData.value.push({
              value: '3',
              label: data[key],
            });
          break;
        case 'value4':
          if (data[key])
            performData.value.push({
              value: '4',
              label: data[key],
            });
          break;
        case 'value5':
          if (data[key])
            performData.value.push({
              value: '5',
              label: data[key],
            });
          break;
        case 'value6':
          if (data[key])
            performData.value.push({
              value: '6',
              label: data[key],
            });
          break;
      }
    }
  }
});

export const dataFormSchema: FormSchema[] = [
  {
    field: 'planeName',
    label: '飞机名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'planeNameEng',
    label: '飞机名称(英文)',
    component: 'Input',
  },
  {
    field: 'valueList',
    label: '性能及参数',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: performData.value,
    },
    defaultValue: [],
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
    component: 'Editer',
    required: true,
  },
  {
    field: 'subtitleEng',
    label: '副标题(英文)',
    component: 'Editer',
  },
];
