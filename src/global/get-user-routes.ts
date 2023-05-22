import { RouteRecordRaw } from 'vue-router'

/**
 * 动态添加该用户的路由
 * */
function getUserRoutes(userMenus: any): RouteRecordRaw[] {
  const userRoutes: RouteRecordRaw[] = []
  //1.获取所有的路由映射
  const allRoutes: RouteRecordRaw[] = []

  /**
   * require.context可以加载某一个文件夹，属于webpack的方法
   * 获取main文件夹下所有以.ts结尾的文件，
   * true代表递归查找
   */
  const routeFiles = require.context('../router/main', true, /\.ts/)
  //拿到文件的路径,调用keys方法，这是固定写法
  const filesPath = routeFiles.keys()
  filesPath.forEach((path) => {
    // 根据文件路径拿到每个文件导出的对象:
    const route = require(`@/router/main${path.split('.')[1]}`)
    route && allRoutes.push(route.default)
  })

  // 2.根据接口返回的用户菜单，筛选出用户具有的路由
  function pickUserMenu(userMenus: any) {
    userMenus.forEach((menu: any) => {
      //type为2时为具体的菜单
      if (menu.type === 2) {
        const matchRoute = allRoutes.find((route) => menu.url === route.path)
        if (matchRoute) userRoutes.push(matchRoute)
      } else {
        pickUserMenu(menu.children)
      }
    })
  }
  pickUserMenu(userMenus)

  return userRoutes
}

//根据用户菜单和页面的当前路径，拿到菜单中的id属性
export function getMenuIdByPath(userMenus: any, currentPath: any): any {
  for (const menu of userMenus) {
    if (menu.type === 2 && menu.url === currentPath) {
      return menu
    } else if (menu.children?.length > 0) {
      const matchMenu = getMenuIdByPath(menu.children, currentPath)
      if (matchMenu) {
        return matchMenu
      }
    }
  }
}

//根据当前路由获取面包屑
export function mapBreadCrumbByPath(userMenus: any, currentPath: any, breadCrumbs: any[] = []): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const matchMenu = mapBreadCrumbByPath(menu.children, currentPath, breadCrumbs)
      if (matchMenu) {
        breadCrumbs.push(menu)
        breadCrumbs.push(matchMenu)
        return breadCrumbs
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

//获取用户的按钮权限
export function getButtonPermission(userMenus: any) {
  const buttonPermissions: string[] = []
  const getPermissionRecurse = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        getPermissionRecurse(menu.children ?? [])
      } else if (menu.type === 3) {
        buttonPermissions.push(menu.permission)
      }
    }
  }
  getPermissionRecurse(userMenus)
  return buttonPermissions
}

//角色列表页面 回显(编辑)时选中的树形控件的叶子节点
// 叶子节点: 数据构中最上面一层的节点，这里表现为没有children的节点
export function getLeaveNodes(checkedMenus: any) {
  const menuIdList: number[] = []

  const getLeaveNodesRecurse = (menus: any) => {
    for (const menu of menus) {
      if (menu.children) {
        getLeaveNodesRecurse(menu.children)
      } else {
        menuIdList.push(menu.id)
      }
    }
  }
  getLeaveNodesRecurse(checkedMenus)
  return menuIdList
}

export default getUserRoutes
