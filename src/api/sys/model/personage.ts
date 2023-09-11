import { defHttp } from '/@/utils/http/axios';
import { iCommonlist } from './common';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  userCenterlist = '/userInfo/query/list',
  userCenterEdit = '/userInfo/frozen',

  userPicList = '/userCenter/list',
  userPicEdit = '/userCenter/edit',
}

/**
 * @description: news api
 */
export function getUserCenterlist(params: {}, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<iCommonlist>(
    {
      url: Api.userCenterlist,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export const userCenterEdit = (params) => defHttp.post({ url: Api.userCenterEdit, params });

export const userPicList = (params) => defHttp.post({ url: Api.userPicList, params });

export const userPicEdit = (params) => defHttp.post({ url: Api.userPicEdit, params });
