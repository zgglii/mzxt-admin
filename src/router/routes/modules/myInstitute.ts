import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const myInstitute: AppRouteModule = {
  path: '/institute',
  name: 'Institute',
  component: LAYOUT,
  redirect: '/institute/myinstitute/index',
  meta: {
    orderNo: 200,
    icon: 'ion:settings-outline',
    title: '内容管理',
  },
  children: [
    {
      path: 'myinstitute',
      name: 'MyInstitute',
      meta: {
        title: '我的研究所',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/institute/myinstitute/index.vue'),
    },
    {
      path: 'researchreport',
      name: 'ResearchReport',
      meta: {
        title: '研究报告',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/institute/researchreport/index.vue'),
    },
    {
      path: 'surveysummary',
      name: 'SurveySummary',
      meta: {
        title: '调研纪要',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/institute/surveysummary/index.vue'),
    },
    {
      path: 'mrjx',
      name: 'mrjx',
      meta: {
        title: '每日精选',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/institute/mrjx/index.vue'),
    },
    {
      path: 'acc',
      name: 'acc',
      meta: {
        title: '公众号管理',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/institute/acc/index.vue'),
    },
  ],
};

export default myInstitute;
