import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
const followme: AppRouteModule = {
  path: '/followme',
  name: 'followmwIndex',
  component: LAYOUT,
  redirect: '/followme/followme/index',
  meta: {
    orderNo: 400,
    icon: 'ion:settings-outline',
    title: '跟我学',
  },
  children: [
    {
      path: 'followme',
      name: 'Followme',
      component: () => import('/@/views/followme/followme/index.vue'),
      meta: {
        title: '跟我学',
        ignoreKeepAlive: true,
      },
    },
  ],
};
export default followme;
