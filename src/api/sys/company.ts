import { defHttp } from '/@/utils/http/axios';
import { iCommonlist } from './model/common';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  newslist = '/news/query/list',
  saveNewsInfo = '/news/edit',
  getNewsInfo = '/news/detail',
  delNews = '/news/del',
  stationList = '/station/query/list',
  delStation = '/station/del',
  saveStationInfo = '/station/edit',
  getStationInfo = '/station/detail',
}

/**
 * @description: news api
 */
export function getNewsList(params: {}, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<iCommonlist>(
    {
      url: Api.newslist,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: save news api
 */
export function saveNewsInfo(params: {}, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<iCommonlist>(
    {
      url: Api.saveNewsInfo,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: get news api
 */
export function getNewsInfo(id: String, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<iCommonlist>(
    {
      url: Api.getNewsInfo + '?id=' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: del news api
 */
export function delNews(id: String, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<iCommonlist>(
    {
      url: Api.delNews + '?id=' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: edit station api
 */
export function stationInfoEdit(params: {}, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<iCommonlist>(
    {
      url: Api.saveStationInfo,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: get stationInfo api
 */
export function getStationInfo(id: String, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<iCommonlist>(
    {
      url: Api.getStationInfo + '?id=' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: station list api
 */
export function getStationList(params: {}, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<iCommonlist>(
    {
      url: Api.stationList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description: del station api
 */
export function delStation(id: String, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<iCommonlist>(
    {
      url: Api.delStation + '?id=' + id,
    },
    {
      errorMessageMode: mode,
    },
  );
}
