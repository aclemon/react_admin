import * as api from '@/services/menu.js';
// import {dynamic} from 'umi'

let dynamicRoutes = [];

// export function buildRoutes(authRoutes) {
//   return (authRoutes || []).map((item) => {
//     if (item.children && item.children.length > 0) {
//       return {
//         path: item.path,
//         name: item.name,
//         routes: buildRoutes(item.children),
//       };
//     }
//     console.log(`@/pages${item.component || item.url}`,'item.component');
//     return {
//       path: item.path,
//       name: item.name,
//       // component: dynamic({ component: () => import(`@/pages${item.component || item.url}`) }),
//
//       component: require(`@/pages${item.component || item.url}`),
//       // com: `@/pages${item.component || item.url}`
//     };
//   });
// }
/**
 *
 * @param routes constantRoutes
 */
export function patchRoutes({ routes }) {
  console.log(routes,'patchRoutes');
  // 清空左侧路由
  // routes[0].routes[1].routes.splice(0, 100);
  // buildRoutes(dynamicRoutes).forEach((item) => {
  //   routes[0].routes[1].routes.push(item);
  // });
  // console.log(routes[0].routes[1].routes,'routes[0].routes[0].routes');
}


/**
 * 该方法会在patchRoutes之前进行执行。
 * @param oldRender
 */
export function render(oldRender) {
  console.log('render');
  // 权限路由。
  api.getMenuTree().then(
    (resp)=>{
      dynamicRoutes = resp?.data || [];
      oldRender();
    }
  )

  // 系统配置信息
  // siteInfo();
}
