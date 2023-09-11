import { defHttp } from '/@/utils/http/axios';
// 设置api枚举
enum Api {
  teacherList = '/teacher/page',
  teacherDel = '/teacher/del',
  teacherEdit = '/teacher/edit',
}
/**
 * @description 获取老师列表
 * @param current - 当前页码
 * @param size - 每页显示多少条
 */
export const teacherList = (params) => defHttp.post({ url: Api.teacherList, params });
/**
 * @description 删除老师
 * @param id - 老师id
 */
export const teacherDel = (params) => defHttp.get({ url: Api.teacherDel, params });
/**
 * @description 老师相关api
 * @param teacherList - 获取老师列表
 * @param teacherDel - 删除老师,传id
 * @param teacherEdit - 添加老师
 */
export const teacherEdit = (params) => defHttp.post({ url: Api.teacherEdit, params });
