import { defHttp } from '/@/utils/http/axios';
// 设置api枚举
enum Api {
  videoList = '/video/page',
  videoDel = '/video/del',
  videoEdit = '/video/edit',
}
/**
 * @description 获取内容列表
 * @param current - 当前页码
 * @param size - 每页显示多少条
 */
export const videoList = (params) => defHttp.post({ url: Api.videoList, params });
/**
 * @description 删除
 * @param id - id
 */
export const videoDel = (params) => defHttp.get({ url: Api.videoDel, params });
/**
 * @description 相关api
 * @param videoDel - 删除,传id
 */
export const videoEdit = (params) => defHttp.post({ url: Api.videoEdit, params });
