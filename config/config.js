// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
// import systeMenus from './menuss/system';
// import codeMenus from './menus/code';
// import logMenus from './menus/log';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    // 是否启用 dva model 的热更新。
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },

  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './login',
            },
            // {
            //   name: 'register',
            //   path: '/user/register',
            //   component: './register',
            // },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // Routes: ['src/pages/Authorized'],
          routes: [
            // codeMenus,
            // systeMenus,
            // logMenus,
            {
              path: '/',
              redirect: '/index',
            },
            {
              path: '/index',
              component: './index',
            },
            {
              name: 'system',
              path: '/system',
              routes:[
                {
                  path: 'user',
                  name: 'user',
                  icon: 'smile',
                  component: './user',
                },
                {
                  path: 'role',
                  name: 'role',
                  icon: 'smile',
                  component: './role',
                },
                {
                  path: 'menu',
                  name: 'menu',
                  icon: 'smile',
                  component: './menu',
                },
              ]
            },
            {
              path: '/mnt',
              name: 'mnt',
              icon: 'crown',
              component: '../layouts/BasicLayout',
              routes: [
                {
                  path: 'user',
                  name: 'user',
                  icon: 'smile',
                  component: './acUser',
                },
                {
                  path: 'check',
                  name: 'check',
                  icon: 'smile',
                  component: './acCheck',
                },
                {
                  path: 'dept',
                  name: 'dept',
                  icon: 'smile',
                  component: './acDept',
                },
                {
                  path: 'contract',
                  name: 'contract',
                  icon: 'smile',
                  component: './acContract',
                },
                {
                  path: 'interview',
                  name: 'interview',
                  icon: 'smile',
                  component: './acInterview',
                },
                {
                  path: 'job',
                  name: 'job',
                  icon: 'smile',
                  component: './acJob',
                },
              ],
            },
            {
              component: './exception/404',
            },
          ],
        },

      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
