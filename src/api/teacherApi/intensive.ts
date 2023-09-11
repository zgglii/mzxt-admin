import { defHttp } from '/@/utils/http/axios';
// 个股精研
// 设置api枚举
enum Api {
  intensiveList = '/intensive/page',
  intensiveDel = '/intensive/del',
  intensiveEdit = '/intensive/edit',
}
/**
 * @description 获取内容列表
 * @param current - 当前页码
 * @param size - 每页显示多少条
 */
export const intensiveList = (params) => defHttp.post({ url: Api.intensiveList, params });
/**
 * @description 删除
 * @param id - id
 */
export const intensiveDel = (params) => defHttp.get({ url: Api.intensiveDel, params });
/**
 * @description 相关api
 */
export const intensiveEdit = (params) => defHttp.post({ url: Api.intensiveEdit, params });
