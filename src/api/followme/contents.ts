import { defHttp } from '/@/utils/http/axios';
// api列表
enum Api {
  // 列表
  contentList = '/learn/query/list',
  // 删除
  contentDel = '/learn/del',
  // 添加活修改
  contentEdit = '/learn/edit',
}

export const contentList = (params) => defHttp.post({ url: Api.contentList, params });
export const contentEdit = (params) => defHttp.post({ url: Api.contentEdit, params });
export const contentDel = (params) => defHttp.get({ url: Api.contentDel, params });
