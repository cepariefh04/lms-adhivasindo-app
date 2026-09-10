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
  {
    path: "/app/dashboard",
    component: () => import("@/views/dashboard/Index.vue"),
  },
  {
    path: "/app",
    component: () => import("@/views/MainLayout.vue"),
    children: [
      {
        path: "contents",
        component: () => import("@/views/ContentsPage.vue"),
      },
      { path: "modul", component: () => import("@/views/ModulPage.vue") },
      {
        path: "peserta",
        component: () => import("@/views/PesertaPage.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/SettingsPage.vue"),
      },
      {
        path: "groupchat",
        component: () => import("@/views/MiscPage.vue"),
        props: {
          title: "Group Chat",
          icon: "💬",
          desc: "Fitur sedang dalam pengembangan.",
        },
      },
      {
        path: "pemateri",
        component: () => import("@/views/MiscPage.vue"),
        props: {
          title: "Pemateri",
          icon: "👨‍🏫",
          desc: "Daftar pengajar aktif akan tampil di sini.",
        },
      },
      {
        path: "kalender",
        component: () => import("@/views/MiscPage.vue"),
        props: {
          title: "Kalender",
          icon: "📅",
          desc: "Fitur kalender lengkap segera hadir.",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(BASE),
  routes,
});

// Navigation guard
router.beforeEach((to) => {
  const token = localStorage.getItem("lms_token");
  if (!token && to.path.startsWith("/app")) {
    return "/auth";
  }
  if (token && to.path === "/auth") {
    return "/app/dashboard";
  }
});

export default router;
