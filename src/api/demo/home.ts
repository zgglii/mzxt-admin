import { defHttp } from '/@/utils/http/axios';
// import params from "/@/views/plane/params/index.vue";

enum Api {
  swiperList = '/banner/page',
  swiperEdit = '/banner/edit',
  swiperDel = '/banner/del',

  connectList = '/connect/list',
  connectEdit = '/connect/edit',

  columnList = '/column/query/list',
  columnEdit = '/column/edit',

  // 首页公告列表
  noticList = '/notice/list',
  // 首页公告删除
  noticDet = '/notice/del',
  // 首页公告添加
  noticAdd = '/notice/edit',

  // 企业认证配置
  stageVerifyEdit = '/stageVerify/edit',
  // 企业认证配置分页
  stageVerifyPage = '/stageVerify/page',
  // 企业认证配置删除
  stageVerifyDel = '/stageVerify/del',
  // 企业查询次数列表
  numConfig = '/numConfig/page',
  numConfigEdit = '/numConfig/edit',

  // 套餐配置添加
  comMeadEdit = '/com/meal/edit',
  // 套餐配置列表
  comMeadList = '/com/meal/page',
  // 套餐配置列表删除
  comMeadDel = '/com/meal/del',
  // 回执单
  receiptList = '/indent/receipt',

  // 资讯 *
  informationList = '/information/page',
  informationEdit = '/information/edit',
  informationDel = '/information/del',
  // 实战操盘 *
  actualCombatList = '/actualCombat/page',
  actualCombatEdit = '/actualCombat/edit',
  actualCombatDel = '/actualCombat/del',
  // 系统课程 *
  courseList = '/course/page',
  courseEdit = '/course/edit',
  courseDel = '/course/del',
  // 龙头总强度 *
  faucetGrossList = '/faucetGross/page',
  faucetGrossImport = '/faucetGross/import',
  faucetGrossEdit = '/faucetGross/edit',
  faucetGrossDel = '/faucetGross/del',
  // 龙头异动 *
  faucetDifferencesList = '/faucetDifference/page',
  faucetDifferencesImport = '/faucetDifference/import',
  faucetDifferencesEdit = '/faucetDifference/edit',
  faucetDifferencesDel = '/faucetDifference/del',
}

export const informationList = (params) => defHttp.get({ url: Api.informationList, params });
export const informationEdit = (params) => defHttp.post({ url: Api.informationEdit, params });
export const informationDel = (params) => defHttp.get({ url: Api.informationDel, params });

export const actualCombatList = (params) => defHttp.get({ url: Api.actualCombatList, params });
export const actualCombatEdit = (params) => defHttp.post({ url: Api.actualCombatEdit, params });
export const actualCombatDel = (params) => defHttp.get({ url: Api.actualCombatDel, params });

export const courseList = (params) => defHttp.get({ url: Api.courseList, params });
export const courseEdit = (params) => defHttp.post({ url: Api.courseEdit, params });
export const courseDel = (params) => defHttp.get({ url: Api.courseDel, params });

export const faucetGrossList = (params) => defHttp.get({ url: Api.faucetGrossList, params });
export const faucetGrossImport = (params) => defHttp.post({ url: Api.faucetGrossImport, params });
export const faucetGrossEdit = (params) => defHttp.post({ url: Api.faucetGrossEdit, params });
export const faucetGrossDel = (params) => defHttp.get({ url: Api.faucetGrossDel, params });

export const faucetDifferencesList = (params) =>
  defHttp.get({ url: Api.faucetDifferencesList, params });
export const faucetDifferencesImport = (params) =>
  defHttp.post({ url: Api.faucetDifferencesImport, params });
export const faucetDifferencesEdit = (params) =>
  defHttp.post({ url: Api.faucetDifferencesEdit, params });
export const faucetDifferencesDel = (params) =>
  defHttp.get({ url: Api.faucetDifferencesDel, params });

// 套餐配置删除
export const comMeadDel = (params) => defHttp.get({ url: Api.comMeadDel, params });
// 套餐配置修改
export const comMeadEdit = (params) => defHttp.post({ url: Api.comMeadEdit, params });
// 套餐配置分页
export const comMeadList = (params) => defHttp.get({ url: Api.comMeadList, params });

export const receiptList = (params) => defHttp.post({ url: Api.receiptList, params });

export const numConfigEdit = (params) => defHttp.post({ url: Api.numConfigEdit, params });
export const numConfig = (params) => defHttp.get({ url: Api.numConfig, params });

// 企业认证配置
export const stageVerifyEdit = (params) => defHttp.post({ url: Api.stageVerifyEdit, params });
// 企业认证配置删除
export const stageVerifyDel = (params) => defHttp.get({ url: Api.stageVerifyDel, params });
// 企业认证配置分页
export const stageVerifyPage = (params) => defHttp.get({ url: Api.stageVerifyPage, params });

export const swiperList = (params) => defHttp.get({ url: Api.swiperList, params });

// 公告列表
export const noticList = (params) => defHttp.get({ url: Api.noticList, params });

// 删除公告
export const noticDet = (params) => defHttp.get({ url: Api.noticDet, params });
// 添加公告
export const noticAdd = (params) => defHttp.post({ url: Api.noticAdd, params });

export const swiperEdit = (params) => defHttp.post({ url: Api.swiperEdit, params });

export const swiperDel = (params) => defHttp.get({ url: Api.swiperDel, params });

export const connectList = (params) => defHttp.post({ url: Api.connectList, params });

export const connectEdit = (params) => defHttp.post({ url: Api.connectEdit, params });

export const columnList = (params) => defHttp.post({ url: Api.columnList, params });

export const columnEdit = (params) => defHttp.post({ url: Api.columnEdit, params });
