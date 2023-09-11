import {
  AccountParams,
  MenuParams,
  RolePageParams,
  MenuListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel
} from "./model/systemModel";
import { defHttp } from "/@/utils/http/axios";
import { ContentTypeEnum } from "/@/enums/httpEnum";

String.prototype.formateValue = function(substring: string, ...args: any[]): string {
  const sub = [substring, ...args];
  return (this as string).replace(/\{\d+\}/g, (v) => {
    const io = v.match(/\{(\d+)\}/);
    if (io !== null) {
      return sub[Number(io[1])];
    } else {
      return "";
    }
  });
};

enum Api {
  AccountList = "/admin/user/page",
  AccountEdit = "/admin/user/add",
  Accountupdate="/admin/user/update",
  AccountDel = "/sys/user/delete",
  AccountReset = "/sys/user/reset/{0}",

  RolePageList = "/sys/role/query/list",
  RoleList = "/sys/role/list",
  RoleEdit = "/sys/role/edit",
  RoleDel = "/sys/role/delete/{0}",

  MenuList = "/sys/menu/list",
  MenuEdit = "/sys/menu/edit",
  MenuDel = "/sys/menu/delete/{0}",

  PayList = "/pay/list",
  PayEdit = "/pay/edit",

  LoadList = "/loading/list",
  LoadEdit = "/loading/edit",
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({
    headers: {
      "content-type": ContentTypeEnum.FORM_URLENCODED
    },
    url: Api.AccountList,
    params
  });

export const Accountupdate = (params) => defHttp.post({ url: Api.Accountupdate, params });
// 后台用户添加接口
export const AccountEdit = (params) => defHttp.post({ url: Api.AccountEdit, params });

export const AccountDel = (params) => defHttp.get({ url: Api.AccountDel, params });

export const AccountReset = (id) => defHttp.get({ url: Api.AccountReset.formateValue(id) });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const RoleList = (params) => defHttp.post({ url: Api.RoleList, params });

export const RoleEdit = (params) => defHttp.post({ url: Api.RoleEdit, params });

export const RoleDel = (id) => defHttp.get({ url: Api.RoleDel.formateValue(id) });

export const getMenuList = (params?: MenuParams) =>
  defHttp.post<MenuListGetResultModel>({ url: Api.MenuList, params });

export const MenuEdit = (params) => defHttp.post({ url: Api.MenuEdit, params });

export const MenuDel = (id) => defHttp.get({ url: Api.MenuDel.formateValue(id) });

export const payList = (params) => defHttp.post({ url: Api.PayList, params });

export const payEdit = (params) => defHttp.post({ url: Api.PayEdit, params });

export const loadList = (params) => defHttp.post({ url: Api.LoadList, params });

export const loadEdit = (params) => defHttp.post({ url: Api.LoadEdit, params });
