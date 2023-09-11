import type { UserInfo } from '/#/store';
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  grantType:string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: 获取授权用户和菜单列表的描述接口
 */
export interface GetUserInfoModel {
  authSysUser: UserInfo;
  menuList: Array<any>;
}
