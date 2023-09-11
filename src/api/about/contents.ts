import { defHttp } from '/@/utils/http/axios';
// 设置api枚举
enum Api {
  usTelList = '/connect/us/page',
  usTelEdit = '/connect/us/edit',
  // usTelDel = '/connect/us/del',
  contentList = '/about/content/page',
  contentDel = '/about/content/del',
  contentEdit = '/about/content/edit',
}
// 联系我们
export const usTelList = (params) => defHttp.post({ url: Api.usTelList, params });
// 联系我们修改
export const usTelEdit = (params) => defHttp.post({ url: Api.usTelEdit, params });
// 联系我们删除
// export const usTelDel = (params) => defHttp.post({ url: Api.usTelDel, params });
/**
 * @description 获取内容列表
 * @param current - 当前页码
 * @param record - 查询内容,里面可以包括0-免责申明,1-用户协议,2-隐私政策
 * @param record.contentType -  0-免责申明,1-用户协议,2-隐私政策
 * @param size - 每页显示多少条
 */
export const contentList = (params) => defHttp.post({ url: Api.contentList, params });

/**
 * @description 删除老师
 * @param id - 老师id
 */
export const contentDel = (params) => defHttp.get({ url: Api.contentDel, params });
/**
 * @description 老师相关api
 * @param contentList - 获取老师列表
 * @param contentDel - 删除老师,传id
 * @param contentEdit - 添加老师
 */
export const contentEdit = (params) => defHttp.post({ url: Api.contentEdit, params });
