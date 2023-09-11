import { defHttp } from '/@/utils/http/axios';

enum Api {
  ArticlePageList = '/article/query/list',
  ArticleList = '/article/list',
  ArticleDetail = '/article/detail',
  ArticleEdit = '/article/edit',
  ArticleDel = '/article/del',
}

export const ArticlePageList = (params) => defHttp.post({ url: Api.ArticlePageList, params });

export const ArticleList = (params) => defHttp.post({ url: Api.ArticleList, params });

export const ArticleDetail = (params) => defHttp.get({ url: Api.ArticleDetail, params });

export const ArticleEdit = (params) => defHttp.post({ url: Api.ArticleEdit, params });

export const ArticleDel = (params) => defHttp.get({ url: Api.ArticleDel, params });
