import { defHttp } from '/@/utils/http/axios';
// 设置api枚举
enum Api {
  settingList = '/setting/page',
  settingDel = '/setting/del',
  settingEdit = '/setting/edit',
}
/**
 * @description 获取内容列表
 * @param current - 当前页码
 * @param record - 查询内容,里面可以包括投资思路,盘面解析,组合走势
 * @param record.settingType -  0-投资思路,1-盘面解析,2-组合走势
 * @param size - 每页显示多少条
 */
export const settingList = (params) => defHttp.post({ url: Api.settingList, params });
/**
 * @description 删除老师
 * @param id - 老师id
 */
export const settingDel = (params) => defHttp.get({ url: Api.settingDel, params });
/**
 * @description 老师相关api
 * @param settingList - 获取老师列表
 * @param settingDel - 删除老师,传id
 * @param settingEdit - 添加老师
 */
export const settingEdit = (params) => defHttp.post({ url: Api.settingEdit, params });
