import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import AppRouteIndexPage from "../views/AppRouteIndexPage.vue";
import Cookies from "js-cookie";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    component: AppRouteIndexPage,
    meta: { requiresAuth: true }, // Protected route
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "home",
        component: () => import("../views/PageAdmin.vue"),
      },
      {
        path: "/detail",
        component: () => import("../views/PageDetail.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("../views/PageUserDashboard.vue"),
      },
      
      {
        path: "radio",
        component: () => import("../views/PageRadio.vue"),
      },
      {
        path: "library",
        component: () => import("../views/PageLibrary.vue"),
      },
      {
        path: "search",
        component: () => import("../views/PageRadio.vue"),
      },
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});
// Cookies.set('isAuthenticated', true);
router.beforeEach((to, from, next) => {
  const isAuthenticated =
    /* Check authentication status here */ Cookies.get("isAuthenticated") ===
    "true"; // Replace with your authentication logic
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login"); // Redirect to login page if not authenticated
    } else {
      next(); // Continue to the route if authenticated
    }
  } else {
    next(); // Continue to non-protected routes
  }
});

export default router;
// login logic
// After successful authentication
// Cookies.set('isAuthenticated', true);

// logout logic
// After logout
// Cookies.remove('isAuthenticated');
