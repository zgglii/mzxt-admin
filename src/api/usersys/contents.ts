import { defHttp } from "/@/utils/http/axios";
import { ContentTypeEnum } from "/@/enums/httpEnum";

// 设置api枚举
enum Api {
  // 获取用户列表
  userList = "/custom/page",
  // 修改用户级别
  userLevelEdit = "/user/level",
  // 获取级别列表
  contentLevelList = "/user/level/page",
  // 用户级别编辑
  contentLevelEdit = "/user/level/edit",
  // 删除用户级别
  contentLevelDel = "/user/level/del",
  // 生成推荐码
  ramCode = "/user/ram/code",
  // 根据用户id删除用户
  delUser = "/user/del",
  //查询文章价格
  getArticlePrice = "/dispose/article",
  //设置文章价格
  setArticlePrice = "/dispose/article",
}

/**
 * @description 获取用户列表
 * @param current - 当前页码
 * @param record - 查询内容
 * @param record.userTel - 手机号
 * @param record.userLevel - 用户级别
 * @param size - 每页显示多少条
 */

export const userList = (params) => defHttp.get({
  headers: {
    "content-type": ContentTypeEnum.FORM_URLENCODED
  },
  url: Api.userList,
  params
});



// 修改用户级别
export const userLevelEdit = (params) => defHttp.get({ url: Api.userLevelEdit, params });
/**
 * @description 获取级别列表
 * @param current - 当前页码
 * @param record - 查询内容,
 * @param size - 每页显示多少条
 */
export const contentLevelList = (params) => defHttp.post({ url: Api.contentLevelList, params });
/**
 * @description 用户级别编辑
 * @param current - 当前页码
 * @param record - 查询内容,
 * @param size - 每页显示多少条
 */
export const contentLevelEdit = (params) => defHttp.post({ url: Api.contentLevelEdit, params });
/**
 * @description 用户级别删除
 * @param id - 级别id
 */
export const contentLevelDel = (params) => defHttp.get({ url: Api.contentLevelDel, params });
/**
 * @description 用户级别删除
 * @param id - 级别id
 */
export const ramCode = (params) => defHttp.get({ url: Api.ramCode, params });

/**
 * @description 用户删除
 * @param id - 级别id
 */
export const delUser = (params) => defHttp.get({ url: Api.delUser, params });
/**
 * @description 查询文章价格
 */
export const getArticlePrice = () => defHttp.get({ url: Api.getArticlePrice });

/**
 * @description 设置文章价格
 * @param price - 价格
 */
export const setArticlePrice = (params) =>
  defHttp.post({
    headers: {
      "content-type": ContentTypeEnum.FORM_DATA
    },
    url: Api.setArticlePrice,
    params
  });
