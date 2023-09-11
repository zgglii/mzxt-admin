import { defHttp } from '/@/utils/http/axios';

enum Api {
  storeList = '/store/list',
  storeEdit = '/store/edit',
}

export const storeList = (params) => defHttp.post({ url: Api.storeList, params });

export const storeEdit = (params) => defHttp.post({ url: Api.storeEdit, params });
