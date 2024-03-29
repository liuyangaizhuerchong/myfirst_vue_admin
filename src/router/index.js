import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    meta: { title: '轮播图管理', icon: 'banner' },
    children: [
      {
        path: 'list',
        name: 'BannerList',
        component: () => import('@/views/banner/list.vue'),
        meta: { title: '轮播图列表', icon: 'bannerlist' }
      },
      {
        path: 'add',
        name: 'BannerAdd',
        component: () => import('@/views/banner/Add.vue')
      },
      {
        path: 'edit',
        name: 'BannerEdit',
        component: () => import('@/views/banner/Edit.vue')
      },
      {
        path: 'detail',
        name: 'BannerDetail',
        component: () => import('@/views/banner/Detail.vue')
      },
      {
        path: 'categorylist',
        name: 'CategoryList',
        component: () => import('@/views/banner/category/list.vue'),
        meta: { title: '轮播图分类', icon: 'bannerlist' }
      },
      {
        path: 'categoryadd',
        name: 'CategoryAdd',
        component: () => import('@/views/banner/category/Add.vue')
      },
      {
        path: 'categoryedit',
        name: 'CategoryEdit',
        component: () => import('@/views/banner/category/Edit.vue')
      },
      {
        path: 'categorydetail',
        name: 'CategoryDetail',
        component: () => import('@/views/banner/category/Detail.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'banner' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list.vue'),
        meta: { title: '用户列表', icon: 'bannerlist' }
      },
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('@/views/user/Add.vue')
      },
      {
        path: 'edit',
        name: 'UserEdit',
        component: () => import('@/views/user/Edit.vue')
      },
      {
        path: 'detail',
        name: 'UserDetail',
        component: () => import('@/views/user/Detail.vue')
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    meta: { title: '商品管理', icon: 'table' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/products/list.vue'),
        meta: { title: '商品列表' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/products/category/category.vue'),
        meta: { title: '商品分类' }
      },
      {
        path: 'newcategory',
        name: 'NewCategory',
        component: () => import('@/views/products/category/NewCategory.vue')
      },
      {
        path: 'editcategory',
        name: 'EditCategory',
        component: () => import('@/views/products/category/EditCategory.vue')
      },
      {
        path: 'detailcategory',
        name: 'DetailCategory',
        component: () => import('@/views/products/category/DetailCategory.vue')
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/products/Add')
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/products/Detail')
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/products/Edit')
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '个人中心', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
