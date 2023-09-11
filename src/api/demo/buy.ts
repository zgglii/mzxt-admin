import { defHttp } from '/@/utils/http/axios';

enum Api {
  buyList = '/share/buy/list',
  buyEdit = '/share/buy/edit',

  buyManageList = '/crowd/funding/query/list',
  buyManageEdit = '/crowd/funding/edit',
  buyManageDel = '/crowd/funding/del',

  buyOrderList = '/crowd/funding/list/page/buss',
  buyOrderCollection = '/crowd/funding/list/exam',
  buyOrderRefund = '/crowd/funding/list/refund',
}

export const buyList = (params) => defHttp.post({ url: Api.buyList, params });

export const buyEdit = (params) => defHttp.post({ url: Api.buyEdit, params });

export const buyManageList = (params) => defHttp.post({ url: Api.buyManageList, params });

export const buyManageEdit = (params) => defHttp.post({ url: Api.buyManageEdit, params });

export const buyManageDel = (params) => defHttp.get({ url: Api.buyManageDel, params });

export const buyOrderList = (params) => defHttp.post({ url: Api.buyOrderList, params });

export const buyOrderCollection = (params) => defHttp.post({ url: Api.buyOrderCollection, params });

export const buyOrderRefund = (params) => defHttp.post({ url: Api.buyOrderRefund, params });
