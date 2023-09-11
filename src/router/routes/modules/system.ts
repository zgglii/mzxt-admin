import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 9000,
    icon: 'ion:settings-outline',
    title: t('routes.mine.system.moduleName'),
  },
  children: [
    {
      path: 'pay',
      name: 'pay',
      meta: {
        title: '支付配置',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/pay/index.vue'),
    },
    {
      path: 'load',
      name: 'load',
      meta: {
        title: '加载更多',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/load/index.vue'),
    },
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.mine.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/system/account/index.vue'),
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: t('routes.mine.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: () => import('/@/views/system/account/AccountDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.mine.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/role/index.vue'),
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.mine.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/menu/index.vue'),
    },
    {
      path: 'poster',
      name: 'Poster',
      meta: {
        title: t('routes.mine.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/system/poster/index.vue'),
    },
    // material-symbols:image-outline-rounded
  ],
};

export default system;
