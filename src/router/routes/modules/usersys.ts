import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
const followme: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/about/index',
  meta: {
    orderNo: 600,
    icon: 'ion:settings-outline',
    title: '用户管理',
  },
  children: [
    {
      path: 'userinfo',
      name: 'UserInfo',
      component: () => import('/@/views/usersys/userinfo/index.vue'),
      meta: {
        title: '联系我们',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'userlevel',
      name: 'UserLevel',
      component: () => import('/@/views/usersys/userlevel/index.vue'),
      meta: {
        title: '免费福利',
        ignoreKeepAlive: true,
      },
    },
  ],
};
export default followme;
