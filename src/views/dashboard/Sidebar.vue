<script setup lang="ts">
import { actions } from "@/services/store";
import {
  bookOutline,
  calendarNumberOutline,
  chatboxOutline,
  gridOutline,
  logOutOutline,
  peopleOutline,
  schoolOutline,
  settingsOutline,
} from "ionicons/icons";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const mainNav = [
  { path: "/app/dashboard", icon: gridOutline, label: "Dashboard" },
  { path: "/app/modul", icon: bookOutline, label: "Modul", badge: "3" },
  { path: "/app/peserta", icon: peopleOutline, label: "Peserta" },
  {
    path: "/app/groupchat",
    icon: chatboxOutline,
    label: "Group Chat",
    badge: "5",
  },
  { path: "/app/pemateri", icon: schoolOutline, label: "Pemateri" },
];
const profileMenu = [
  { path: "/app/settings", icon: settingsOutline, label: "Settings" },
  { path: "/app/kalender", icon: calendarNumberOutline, label: "Kalender" },
];

function isActive(path: string) {
  return route.path === path;
}

function go(path: string) {
  router.push(path);
}

function doLogout() {
  actions.logout();
  router.push("/auth");
}
</script>

<template>
  <aside class="sidebar-container">
    <!-- Nav -->
    <div class="sb-scroll">
      <div class="sidebar-logo">
        <img src="/public/logo2.png" alt="Adhivasindo Logo" class="logo-img" />
      </div>
      <div class="sidebar-body">
        <ion-list class="sidebar-list" lines="none">
          <ion-item
            v-for="item in mainNav"
            button
            class="menu-item"
            :class="{ 'active-menu': isActive(item.path) }"
            @click="go(item.path)"
          >
            <ion-icon :icon="item.icon" slot="start"></ion-icon>
            <ion-label>{{ item.label }}</ion-label>
            <div slot="end" class="active-pill"></div>
          </ion-item>

          <div class="section-divider">PROFILE</div>

          <ion-item
            v-for="item in profileMenu"
            button
            class="menu-item"
            :class="{ 'active-menu': isActive(item.path) }"
            @click="go(item.path)"
          >
            <ion-icon :icon="item.icon" slot="start"></ion-icon>
            <ion-label>{{ item.label }}</ion-label>
          </ion-item>

          <div class="section-divider"></div>

          <ion-item button class="logout-item" lines="none" @click="doLogout">
            <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
            <ion-label>Log Out</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sb-scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}
.sb-scroll::-webkit-scrollbar {
  display: none;
}
</style>
