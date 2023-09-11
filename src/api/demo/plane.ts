import { defHttp } from '/@/utils/http/axios';

enum Api {
  planeList = '/plane/info/list',
  planeEdit = '/plane/info/edit',

  performancesList = '/performances/list',
  performancesEdit = '/performances/edit',

  serviceList = '/customer/service/list',
  serviceEdit = '/customer/service/edit',
}

export const planeList = (params) => defHttp.post({ url: Api.planeList, params });

export const planeEdit = (params) => defHttp.post({ url: Api.planeEdit, params });

export const performancesList = (params?) => defHttp.post({ url: Api.performancesList, params });

export const performancesEdit = (params) => defHttp.post({ url: Api.performancesEdit, params });

export const serviceList = (params) => defHttp.post({ url: Api.serviceList, params });

export const serviceEdit = (params) => defHttp.post({ url: Api.serviceEdit, params });
