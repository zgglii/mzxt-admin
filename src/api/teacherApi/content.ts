import { defHttp } from '/@/utils/http/axios';
// 设置api枚举
enum Api {
  contentList = '/content/page',
  contentDel = '/content/del',
  contentEdit = '/content/edit',
}
/**
 * @description 获取内容列表
 * @param current - 当前页码
 * @param record - 查询内容,里面可以包括投资思路,盘面解析,组合走势
 * @param record.contentType -  0-投资思路,1-盘面解析,2-组合走势
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
