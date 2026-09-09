import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
const BASE = import.meta.env.PROD ? "/lms-adhivasindo/" : "/";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    component: () => import("@/views/AuthPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
