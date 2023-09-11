import { defHttp } from '/@/utils/http/axios';

enum Api {
  shareList = '/share/plane/list',
  shareEdit = '/share/plane/edit',
}

export const shareList = (params) => defHttp.post({ url: Api.shareList, params });

export const shareEdit = (params) => defHttp.post({ url: Api.shareEdit, params });
