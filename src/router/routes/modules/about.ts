import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
const followme: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/about/index',
  meta: {
    orderNo: 500,
    icon: 'ion:settings-outline',
    title: '关于我们',
  },
  children: [
    {
      path: 'contact',
      name: 'Contact',
      component: () => import('/@/views/about/contact/index.vue'),
      meta: {
        title: '联系我们',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'freeBenefits',
      name: 'FreeBenefits',
      component: () => import('/@/views/about/freeBenefits/index.vue'),
      meta: {
        title: '免费福利',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'agreement',
      name: 'Agreement',
      component: () => import('/@/views/about/agreement/index.vue'),
      meta: {
        title: '用户协议',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'privacy',
      name: 'Privacy',
      component: () => import('/@/views/about/privacy/index.vue'),
      meta: {
        title: '首页公告',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'disclaimers',
      name: 'Disclaimers',
      component: () => import('/@/views/about/disclaimers/index.vue'),
      meta: {
        title: '免责申明',
        ignoreKeepAlive: true,
      },
    },
    {
      path: 'conceal',
      name: 'Conceal',
      component: () => import('/@/views/about/conceal/index.vue'),
      meta: {
        title: '隐私政策',
        ignoreKeepAlive: true,
      },
    },
  ],
};
export default followme;
