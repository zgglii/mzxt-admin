import { defHttp } from '/@/utils/http/axios';

enum Api {
  joinList = '/join/list',
  joinEdit = '/join/edit',
}

export const joinList = (params) => defHttp.post({ url: Api.joinList, params });

export const joinEdit = (params) => defHttp.post({ url: Api.joinEdit, params });
