import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

String.prototype.formateValue = function (substring: string, ...args: any[]):string {
  console.log(this);
  let sub = [substring, ...args];
  return (this as string).replace(/\{\d+\}/g, (v) => {
    let io = v.match(/\{(\d+)\}/);
    if(io !== null) {
      return sub[Number(io[1])];
    }else {
      return ''
    }
  });
}
enum Api {
  DEMO_LIST = '/table/getDemoList/{0}/{1}',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST.formateValue(1, 2),
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });