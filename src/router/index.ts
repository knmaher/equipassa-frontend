import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import("../views/LandingPage.vue"),
      meta: { requiresAuth: false }
    },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/InventoryView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: () => import('../views/ReservationsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('../views/MembersView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/check-in-out',
    name: 'CheckInOut',
    component: () => import('../views/CheckInOutView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/billing',
    name: 'Billing',
    component: () => import('../views/BillingView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import('../views/MaintenanceView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../views/AnalyticsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/register-org',
    name: 'RegisterOrg',
    component: () => import('../views/RegisterOrgView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  ],
})

router.beforeEach(to => {
  const { token } = useAuthStore()
  const isLoggedIn = Boolean(token || localStorage.getItem('token'))
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { path: '/' }
  }
  if (isLoggedIn && (to.path === '/' || to.path === '/login')) {
    return { path: '/dashboard' }
  }
})

export default router
