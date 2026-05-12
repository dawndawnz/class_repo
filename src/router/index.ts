import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('../pages/shared/LoginPage.vue') },
    { path: '/profile', component: () => import('../pages/shared/ProfilePage.vue') },
    { path: '/addresses', component: () => import('../pages/shared/AddressPage.vue') },
    { path: '/customer/home', component: () => import('../pages/customer/HomePage.vue') },
    { path: '/customer/merchant/:id', component: () => import('../pages/customer/MerchantDetailPage.vue') },
    { path: '/customer/cart', component: () => import('../pages/customer/CartPage.vue') },
    { path: '/customer/orders', component: () => import('../pages/customer/OrderListPage.vue') },
    { path: '/customer/orders/:id', component: () => import('../pages/customer/OrderDetailPage.vue') },
    { path: '/customer/review/:orderId', component: () => import('../pages/customer/ReviewPage.vue') },
    { path: '/merchant/dashboard', component: () => import('../pages/merchant/DashboardPage.vue') },
    { path: '/merchant/dishes', component: () => import('../pages/merchant/DishManagePage.vue') },
    { path: '/merchant/orders', component: () => import('../pages/merchant/OrderManagePage.vue') },
    { path: '/rider/orders', component: () => import('../pages/rider/AvailableOrdersPage.vue') },
    { path: '/rider/delivery/:id', component: () => import('../pages/rider/DeliveryDetailPage.vue') }
  ]
})

export default router
