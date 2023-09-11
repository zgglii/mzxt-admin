import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const guide: AppRouteModule = {
  path: '/guide',
  name: 'guide',
  component: LAYOUT,
  redirect: '/guide/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '首页',
    ignoreKeepAlive: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('/@/views/guide.vue'),
      meta: {
        hideMenu: true,
        // affix: true,
        title: '首页',
        currentActiveMenu: '/guide',
      },
    },
  ],
};

export default guide;
