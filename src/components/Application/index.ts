// 引入插件注册工具
import { withInstall } from '/@/utils';

// 引入logo组件,
import appLogo from './src/AppLogo.vue';
// 程序提供商
import appProvider from './src/AppProvider.vue';
// 搜索框
import appSearch from './src/search/AppSearch.vue';
import appLocalePicker from './src/AppLocalePicker.vue';
import appDarkModeToggle from './src/AppDarkModeToggle.vue';

export { useAppProviderContext } from './src/useAppContext';

export const AppLogo = withInstall(appLogo);
export const AppProvider = withInstall(appProvider);
export const AppSearch = withInstall(appSearch);
export const AppLocalePicker = withInstall(appLocalePicker);
export const AppDarkModeToggle = withInstall(appDarkModeToggle);
