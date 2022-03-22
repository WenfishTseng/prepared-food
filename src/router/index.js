import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: '加熱煮藝 - 首頁'
        },
        component: () => import('../views/Front/HomeView.vue')
      },
      {
        name: 'products',
        path: 'products',
        component: () => import('../views/Front/ProductsView.vue'),
        meta: {
          title: '加熱煮藝 - 產品'
        }
      },
      {
        path: 'products/:id',
        component: () => import('../views/Front/ProductView.vue'),
        meta: {
          title: '產品列表 - 加熱煮藝 '
        }
      },
      {
        path: 'cart',
        component: () => import('../views/Front/CartView.vue'),
        meta: {
          title: '購物車 - 加熱煮藝'
        }
      },
      {
        path: 'order',
        component: () => import('../views/Front/OrderView.vue'),
        meta: {
          title: '訂單確認 - 加熱煮藝'
        }
      },
      {
        path: 'result',
        component: () => import('../views/Front/OrderResultView.vue'),
        meta: {
          title: '訂購結果 - 加熱煮藝'
        }
      },
      {
        path: 'login',
        component: () => import('../views/Front/LoginView.vue'),
        meta: {
          title: '管理者登入'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/Admin/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Admin/AdminProducts.vue'),
        meta: {
          title: '產品 - 後台修改'
        }
      },
      {
        path: 'order',
        component: () => import('../views/Admin/AdminOrder.vue'),
        meta: {
          title: '訂單 - 後台修改'
        }
      },
      {
        path: 'coupon',
        component: () => import('../views/Admin/AdminCoupon.vue'),
        meta: {
          title: '優惠券 - 後台修改'
        }
      }
    ]
  },
  // 重導向
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/Front/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
