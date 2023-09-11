import { defHttp } from '/@/utils/http/axios';
// 设置api枚举
enum Api {
  // 获取订单列表
  orderList = '/indent/page',

  // 订单退款
  drawback = '/indent/refund',

  // 审批退款
  ApprovedPay = '/indent/exam/refund',
}

export const orderList = (params) => defHttp.get({ url: Api.orderList, params });
export const drawback = (params) => defHttp.post({ url: Api.drawback, params });
export const ApprovedPay = (params) => defHttp.post({ url: Api.ApprovedPay, params });
