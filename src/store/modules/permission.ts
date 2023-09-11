import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useI18n } from '/@/hooks/web/useI18n';
import { useUserStore } from './user';
import { useAppStoreWithOut } from './app';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';
import { cloneDeep } from 'lodash-es';

import projectSetting from '/@/settings/projectSetting';

import { PermissionModeEnum } from '/@/enums/appEnum';

import { asyncRoutes } from '/@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { filter } from '/@/utils/helper/treeHelper';

import { getPermCode, getUserInfo } from '/@/api/sys/user';

import { useMessage } from '/@/hooks/web/useMessage';
import { PageEnum } from '/@/enums/pageEnum';
// 权限状态
interface PermissionState {
  // 权限列表
  permCodeList: string[] | number[];
  // 路由是否已动态添加
  isDynamicAddedRoute: boolean;
  // 菜单最后更新时间
  lastBuildMenuTime: number;
  // 后台菜单权限列表
  backMenuList: Menu[];
  // 前台菜单列表
  frontMenuList: Menu[];
}
const routers = [
  {
    path: '/guide',
    name: 'guide',
    component: 'LAYOUT',
    redirect: '/guide/index',
    meta: {
      icon: 'ion:grid-outline',
      title: '首页',
      ignoreKeepAlive: true,
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: '/guide.vue',
        meta: {
          affix: true,
          title: '首页',
          currentActiveMenu: '/guide',
        },
      },
    ],
  },
];
const routerRender = (menus) => {
  const list = menus.map((item) => {
    return {
      path: item.path,
      name: item.name,
      component: item.component,
      meta: {
        title: item.title,
        icon: item.icon,
        ignoreKeepAlive: true,
      },
      children: item.children.map((item2) => {
        return {
          path: item2.path,
          name: item2.name,
          component: item2.component,
          meta: {
            hideMenu: item2.hideMenu,
            title: item2.title,
            icon: item2.icon,
            currentActiveMenu: item2.currentActiveMenu,
            ignoreKeepAlive: true,
          },
        };
      }),
    };
  });
  return list;
};
/**
 * @description: 角色权限信息存储
 */
export const usePermissionStore = defineStore({
  id: 'app-permission',
  // 状态定义及初始化
  state: (): PermissionState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    // 更新属性 permCodeList
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
    // 更新属性 backMenuList
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime(); // 记录菜单最后更新时间
    },
    // 更新属性 frontMenuList
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },
    // 更新属性 lastBuildMenuTime
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime(); // 一个代表时间毫秒数的数值
    },
    // 更新属性 isDynamicAddedRoute
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    // 重置状态属性
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    // 模拟从后台获得用户权限码,常用于后端权限模式下获取用户权限码。项目中使用了本地 Mock服务模拟。
    async changePermissionCode() {
      const codeList = await getPermCode();
      this.setPermCodeList(codeList);
    },
    // 用于动态路由及用户权限过滤，
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n(); // 国际化
      const userStore = useUserStore(); // 用户信息存储
      const appStore = useAppStoreWithOut(); // 项目配置信息存储

      let routes: AppRouteRecordRaw[] = [];
      // 用户角色列表
      const roleList = toRaw(userStore.getRoleList) || [];
      // 获取权限模式
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;
      // 基于角色过滤方法
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };
      // 基于 ignoreRoute 属性过滤
      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }
        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return;
      };
      // 不同权限模式处理逻辑
      switch (permissionMode) {
        // 前端方式控制(菜单和路由分开配置)
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;
        // 前端方式控制(菜单由路由配置自动生成)
        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);
          const menuList = transformRouteToMenu(routes, true);
          routes = filter(routes, routeRemoveIgnoreFilter);
          routes = routes.filter(routeRemoveIgnoreFilter);
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          this.setFrontMenuList(menuList);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;
        // 后台方式控制
        //  如果您确定不需要做后台动态权限，请在下面屏蔽整个判断
        case PermissionModeEnum.BACK:
          const { createMessage } = useMessage();

          createMessage.loading({
            content: t('sys.app.menuLoading'),
            duration: 1,
          });

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = [];
          try {
            // this.changePermissionCode();
            const userData = (await getUserInfo()) as AppRouteRecordRaw[];
            // debugger
            routeList = cloneDeep(routers.concat(routerRender(userData.menuList)));
          } catch (error) {
            console.error(error);
          }

          // Dynamically introduce components
          routeList = transformObjToRoute(routeList);

          //  Background routing to menu structure
          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRemoveIgnoreFilter);
          routeList = routeList.filter(routeRemoveIgnoreFilter);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          break;
      }
      // 添加`错误日志列表`页面路由
      routes.push(ERROR_LOG_ROUTE);
      patchHomeAffix(routes);
      // 返回路由列表
      return routes;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
