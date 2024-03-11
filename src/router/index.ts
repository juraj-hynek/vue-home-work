import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import AppRouteIndexPageAdmin from "@/views/AppRouteIndexPageAdmin.vue";
import AppRouteIndexPageUser from "@/views/AppRouteIndexPageUser.vue";
import PageLogin from "@/views/PageLogin.vue";
import Cookies from "js-cookie";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: PageLogin,
  },
  {
    path: "/admin-dashboard",
    component: AppRouteIndexPageAdmin,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "AdminPath1",
        component: () => import("@/views/PageAdminView1.vue"),
      },
      {
        path: "/admin-path2",
        name: "AdminPath2",
        component: () => import("@/views/PageAdminView2.vue"),
      },
      {
        path: "/admin-path3",
        name: "AdminPath3",
        component: () => import("@/views/PageAdminView3.vue"),
      },
      // Add more children routes as needed
    ],
  },
  {
    path: "/user-dashboard",
    component: AppRouteIndexPageUser,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "UserPath1",
        component: () => import("@/views/PageUserDashboard.vue"),
      },
      {
        path: "/user-path2",
        name: "UserPath2",
        component: () => import("@/views/PageUserView2.vue"),
      },
      {
        path: "/user-path3",
        name: "UserPath3",
        component: () => import("@/views/PageUserView2.vue"),
      },
      // Add more children routes as needed
    ],
  },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// login logic
// After successful authentication
// Cookies.set('isAuthenticated', true);

// logout logic
// After logout
// Cookies.remove('isAuthenticated');
