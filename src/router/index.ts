import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import AppRouteIndexPageAdmin from "@/views/AppRouteIndexPageAdmin.vue";
import AppRouteIndexPageUser from "@/views/AppRouteIndexPageUser.vue";
import PageLogin from "@/views/PageLogin.vue";
import PageError from '@/views/PageError.vue';
import Cookies from "js-cookie";

// Define your routes
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    beforeEnter: (to, from, next) => {
      next(); // Proceed to the login page
    },
  },
  {
    path: "/login",
    name: "Login",
    component: PageLogin,
    beforeEnter: (to, from, next) => {
      deleteAuthCokie();
      next(); // Proceed to the login page
    },
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AppRouteIndexPageAdmin,
    // meta: { requiresAuth: true, isAdmin: true },
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
    ],
    beforeEnter: (to, from, next) => {
      if (!isAdminLoggedIn()) {
        next("/login"); // Redirect to login if admin is not logged in
      } else {
        next(); // Proceed to the admin dashboard
      }
    },
  },
  {
    path: "/user-dashboard",
    component: AppRouteIndexPageUser,
    name: "UserDashboard",
    // meta: { requiresAuth: true, isUser: true },
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
        component: () => import("@/views/PageUserView3.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!isUserLoggedIn()) {
        next("/login"); // Redirect to login if user is not logged in
      } else {
        next(); // Proceed to the user dashboard
      }
    },
  },
  {
    path: '/:catchAll(.*)',
    component: PageError // Route for all unmatched paths
  },
];

// Function to check if admin is logged in
function isAdminLoggedIn(): boolean {
  const sid = Cookies.get("connect.sid");
  const admin = Boolean(Cookies.get("isAdmin"));

  console.log("isAdminLoggedIn called", { admin, sid });

  return sid && admin;
}

// Function to check if user is logged in (You need to implement this according to your authentication logic)
function isUserLoggedIn(): boolean {
  const sid = Cookies.get("connect.sid");
  const admin = Boolean(Cookies.get("isUser"));

  console.log("isUserLoggedIn called", { admin, sid });
  return sid && admin;
}

export function deleteAuthCokie() {
  console.log("deleteAuthCokie called");
  Cookies.remove("connect.sid");
  Cookies.remove("isAdmin");
  Cookies.remove("isAuthenticated");
  Cookies.remove("isUser");
}

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
