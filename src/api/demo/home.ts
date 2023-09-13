import { defHttp } from '/@/utils/http/axios';

enum Api {
  swiperList = '/banner/page',
  swiperEdit = '/banner/edit',
  swiperDel = '/banner/del',

  // 资讯 *
  informationList = '/information/page',
  informationEdit = '/information/edit',
  informationDel = '/information/del',
  // 甄选新闻 *
  newsReportList = '/newsReport/page',
  newsReportEdit = '/newsReport/edit',
  newsReportDel = '/newsReport/del',
  // 实战操盘 *
  actualCombatList = '/actualCombat/page',
  actualCombatEdit = '/actualCombat/edit',
  actualCombatDel = '/actualCombat/del',
  // 系统课程 *
  courseList = '/course/page',
  courseEdit = '/course/edit',
  courseDel = '/course/del',
  // 热点总强度 *
  faucetGrossList = '/faucetGross/page',
  faucetGrossImport = '/faucetGross/import',
  faucetGrossEdit = '/faucetGross/edit',
  faucetGrossDel = '/faucetGross/batch/del',
  // 热点异动 *
  faucetDifferencesList = '/faucetDifference/page',
  faucetDifferencesImport = '/faucetDifference/import',
  faucetDifferencesEdit = '/faucetDifference/edit',
  faucetDifferencesDel = '/faucetDifference/batch/del',
  // 克希尔投资策略思维图 *
  strategyList = '/strategy/page',
  strategyEdit = '/strategy/edit',
  strategyDel = '/strategy/del',
  // 系统消息 *
  newsList = '/news/page',
  newsEdit = '/news/edit',
  newsDel = '/news/del',
  // 首页配置 *
  homeConfigList = '/homeConfig/page',
  homeConfigEdit = '/homeConfig/edit',
  // 文章 *
  articleList = '/article/list',
  articleEdit = '/article/edit',
  // 参数配置 *
  paramConfigList = '/paramConfig/page',
  paramConfigEdit = '/paramConfig/edit',
  // 神器定价 *
  artifactPriceList = '/artifactPrice/page',
  artifactPriceEdit = '/artifactPrice/edit',
}

export const swiperList = (params) => defHttp.get({ url: Api.swiperList, params });
export const swiperEdit = (params) => defHttp.post({ url: Api.swiperEdit, params });
export const swiperDel = (params) => defHttp.get({ url: Api.swiperDel, params });

export const informationList = (params) => defHttp.get({ url: Api.informationList, params });
export const informationEdit = (params) => defHttp.post({ url: Api.informationEdit, params });
export const informationDel = (params) => defHttp.get({ url: Api.informationDel, params });

export const newsReportList = (params) => defHttp.get({ url: Api.newsReportList, params });
export const newsReportEdit = (params) => defHttp.post({ url: Api.newsReportEdit, params });
export const newsReportDel = (params) => defHttp.get({ url: Api.newsReportDel, params });

export const actualCombatList = (params) => defHttp.get({ url: Api.actualCombatList, params });
export const actualCombatEdit = (params) => defHttp.post({ url: Api.actualCombatEdit, params });
export const actualCombatDel = (params) => defHttp.get({ url: Api.actualCombatDel, params });

export const courseList = (params) => defHttp.get({ url: Api.courseList, params });
export const courseEdit = (params) => defHttp.post({ url: Api.courseEdit, params });
export const courseDel = (params) => defHttp.get({ url: Api.courseDel, params });

export const faucetGrossList = (params) => defHttp.get({ url: Api.faucetGrossList, params });
export const faucetGrossImport = (params) => defHttp.post({ url: Api.faucetGrossImport, params });
export const faucetGrossEdit = (params) => defHttp.post({ url: Api.faucetGrossEdit, params });
export const faucetGrossDel = (params) => defHttp.post({ url: Api.faucetGrossDel, params });

export const faucetDifferencesList = (params) =>
  defHttp.get({ url: Api.faucetDifferencesList, params });
export const faucetDifferencesImport = (params) =>
  defHttp.post({ url: Api.faucetDifferencesImport, params });
export const faucetDifferencesEdit = (params) =>
  defHttp.post({ url: Api.faucetDifferencesEdit, params });
export const faucetDifferencesDel = (params) =>
  defHttp.post({ url: Api.faucetDifferencesDel, params });

export const strategyList = (params) => defHttp.get({ url: Api.strategyList, params });
export const strategyEdit = (params) => defHttp.post({ url: Api.strategyEdit, params });
export const strategyDel = (params) => defHttp.get({ url: Api.strategyDel, params });

export const newsList = (params) => defHttp.get({ url: Api.newsList, params });
export const newsEdit = (params) => defHttp.post({ url: Api.newsEdit, params });
export const newsDel = (params) => defHttp.get({ url: Api.newsDel, params });

export const homeConfigList = (params) => defHttp.get({ url: Api.homeConfigList, params });
export const homeConfigEdit = (params) => defHttp.post({ url: Api.homeConfigEdit, params });

export const articleList = (params) => defHttp.get({ url: Api.articleList, params });
export const articleEdit = (params) => defHttp.post({ url: Api.articleEdit, params });

export const paramConfigList = (params) => defHttp.get({ url: Api.paramConfigList, params });
export const paramConfigEdit = (params) => defHttp.post({ url: Api.paramConfigEdit, params });

export const artifactPriceList = (params) => defHttp.get({ url: Api.artifactPriceList, params });
export const artifactPriceEdit = (params) => defHttp.post({ url: Api.artifactPriceEdit, params });
