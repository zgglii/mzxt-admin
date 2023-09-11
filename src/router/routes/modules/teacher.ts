import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const teachers: AppRouteModule = {
  path: '/teachers',
  name: 'teachers',
  component: LAYOUT,
  redirect: '/teachers/info/index',
  meta: {
    orderNo: 200,
    icon: 'ion:settings-outline',
    title: '老师管理',
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      meta: {
        title: '老师信息',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/teachers/info/index.vue'),
    },
    {
      path: 'investment',
      name: 'Investment',
      meta: {
        title: '投资思路',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/teachers/investment/index.vue'),
    },
    {
      path: 'analysis',
      name: 'Analysis',
      meta: {
        title: '盘面解析',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/teachers/analysis/index.vue'),
    },
    {
      path: 'trend',
      name: 'Trend',
      meta: {
        title: '组合走势',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/teachers/trend/index.vue'),
    },
    {
      path: 'Research',
      name: 'Research',
      meta: {
        title: '个股精研',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/teachers/Research/index.vue'),
    },
    {
      path: 'playback',
      name: 'Playback',
      meta: {
        title: '直播回放',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/teachers/playback/index.vue'),
    },
  ],
};

export default teachers;
