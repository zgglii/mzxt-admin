import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';

// 定义一个接口UserState
interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  // 使用UserState接口约束state
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // 登录是否过期
    sessionTimeout: false,
    // 上次请求时间
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    // 设置会话超时
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: 获取菜单列表,用户等级
     * @params {object} LoginParams - 登录参数
     * @params {string} LoginParams.username - 登录账号
     * @params {string} LoginParams.password - 登录密码
     * @params {boolean} goHome - 是否返回首页
     * @params {string} mode - 提示信息模式
     */
    async login(
      // & 表示交集,
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      // |:表示取值能够为多种类型中的一种
      try {
        const { goHome = true, mode, ...loginParams } = params;
        // 获取授权用户和token和菜单列表
        const data = await loginApi(loginParams, mode);
        const { token } = data;
        // save token
        this.setToken(token);
        console.log(token, 'TOKEN');
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 获取完授权用户和菜单列表,token后执行此函数
    async afterLoginAction(goHome?: boolean): Promise<any> {
      // 如果没有token 则终止动作
      if (!this.getToken) return null;
      // 获取用户信息并将用户信息,列表等存入本地
      const authSysUser = await this.getUserInfoAction();
      // 获取是否过期
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        // ?.:可选链,若是遇到 null 或 undefined 就能够当即中止某些表达式的运行,
        // 此处含义是如果后台返回了homePath路径,那么就重定向到homepath,否则返回首页
        goHome && (await router.replace(authSysUser?.homePath || PageEnum.BASE_HOME));
      }
      return authSysUser;
    },
    // 获取用户信息
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      // 获取用户信息
      const { authSysUser } = await getUserInfo();

      // 这里取出的是授权用户身份信息,此处为roles
      const { roles = [] } = authSysUser;
      if (isArray(roles)) {
        // 这里后台返回的roles没有value,所以是[undefined],应该还是有问题的
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        // 把这个列表存入本地
        this.setRoleList(roleList);
      } else {
        authSysUser.roles = [];
        this.setRoleList([]);
      }
      // 设置用户信息
      this.setUserInfo(authSysUser);
      return authSysUser;
    },
    /**
     * @description: 退出
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
