import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const personage: AppRouteModule = {
  path: '/personage',
  name: 'personage',
  component: LAYOUT,
  redirect: '/personage/center',
  meta: {
    orderNo: 8000,
    icon: 'ion:settings-outline',
    title: t('routes.personage.manage.personage'),
  },
  children: [
    {
      path: 'center',
      name: 'center',
      meta: {
        title: t('routes.personage.manage.personage'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/personage/center/index.vue'),
    },
    {
      path: 'stageManage',
      name: 'stageManage',
      meta: {
        title: t('routes.personage.manage.stageManage'),
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: () => import('/@/views/personage/stageManage/index.vue'),
      children: [
        {
          path: 'stageDetail/:id?',
          name: 'stageDetail',
          meta: {
            hideMenu: true,
            title: t('routes.personage.manage.edit_detail'),
            ignoreKeepAlive: true,
            showMenu: false,
            currentActiveMenu: '/personage/stageManage',
          },
          component: () => import('/@/views/personage/stageManage/detail.vue'),
        },
      ],
    },
    {
      path: 'pics',
      name: 'pics',
      meta: {
        title: '图片管理',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/personage/pics/index.vue'),
    },
  ],
};

export default personage;
