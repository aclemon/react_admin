import * as api from '@/services/menu.js';


let dynamicRoutes = [];




function buildRoutes(authRoutes) {
  return (authRoutes || []).map((item) => {

    // 2 表示为按钮
    if (item.children && item.children.length > 0&&item.children[0].type<2) {
      return {
        path: item.path,
        name: item.name,
        exact: false,
        routes: buildRoutes(item.children),
      };
    }
    console.log(`@/pages/user${item.component || item.url}`,'item.component');
    return {
      path: item.path||'',
      name: item.name||'',
      component:item.component? require(`@/pages${item.component || item.url}`).default:'',
      exact: true,
    }
  });
}
/**
 *
 * @param routes constantRoutes
 */
export function patchRoutes({ routes }) {
  console.log(routes,'patchRoutes');
  // 清空左侧路由
  // routes[0].routes[1].routes.splice(0, 100);

  const buidRrr = buildRoutes(dynamicRoutes)

  // console.log(buidRrr,'buidRrr');

  routes[0].routes[1].routes = [...buidRrr,...routes[0].routes[0].routes,]


  console.log(routes[0].routes[1],'routes[0].routes[0].routes');
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
