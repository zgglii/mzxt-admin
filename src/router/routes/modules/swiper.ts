import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const swiper: AppRouteModule = {
  path: '/swiper',
  name: 'swiper',
  // component: LAYOUT,
  redirect: '/swiper',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: '轮播图管理',
    ignoreKeepAlive: false,
    hideChildrenInMenu: false,
  },
  component: () => import('/@/views/swiper/index.vue'),
};
export default swiper;
