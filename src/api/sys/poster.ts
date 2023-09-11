import { defHttp } from '/@/utils/http/axios';

enum Api {
  posterList = '/poster/page',
  posterEdit = '/poster/edit',
  posterDel = '/poster/del',
}

export const posterList = (params) => defHttp.post({ url: Api.posterList, params });

export const posterEdit = (params) => defHttp.post({ url: Api.posterEdit, params });

export const posterDel = (params) => defHttp.get({ url: Api.posterDel, params });
