<script setup lang="ts">
import { actions, state } from "@/services/store";
import {
  IonIcon,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonSearchbar,
  IonSplitPane,
} from "@ionic/vue";
import {
  bookOutline,
  calendarNumberOutline,
  chatboxOutline,
  gridOutline,
  logOutOutline,
  mailOutline,
  notificationsOutline,
  peopleOutline,
  schoolOutline,
  settingsOutline,
} from "ionicons/icons";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const initial = computed(
  () => state.user?.name?.charAt(0).toUpperCase() || "?",
);

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

function onSearch(e: CustomEvent) {
  const q = (e.target as HTMLIonSearchbarElement).value || "";
  if (q) router.push({ path: "/app/contents", query: { q } });
}

function doLogout() {
  actions.logout();
  router.push("/auth");
}
</script>

<template>
  <ion-page>
    <ion-split-pane content-id="main-content" when="lg">
      <!-- ── SIDEBAR ── -->
      <ion-menu content-id="main-content" type="overlay">
        <div class="sidebar-container">
          <!-- Nav -->
          <div class="sb-scroll">
            <div class="sidebar-logo">
              <img
                src="/public/logo2.png"
                alt="Adhivasindo Logo"
                class="logo-img"
              />
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

                <ion-item
                  button
                  class="logout-item"
                  lines="none"
                  @click="doLogout"
                >
                  <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
                  <ion-label>Log Out</ion-label>
                </ion-item>
              </ion-list>
            </div>
          </div>
        </div>
      </ion-menu>

      <!-- ── MAIN AREA ── -->
      <div id="main-content" class="ion-page">
        <header class="global-header">
          <div class="nav-and-actions">
            <span class="page-title">LEARNING MANAGEMENT SYSTEM</span>
            <div>
              <div class="search-notification">
                <ion-searchbar
                  placeholder="Search classes..."
                  class="header-search"
                ></ion-searchbar>
                <ion-icon
                  :icon="notificationsOutline"
                  class="header-icon"
                ></ion-icon>
                <ion-icon :icon="mailOutline" class="header-icon"></ion-icon>
                <ion-buttons slot="end" style="margin-right: 10px">
                  <div class="tb-avatar">{{ initial }}</div>
                </ion-buttons>
              </div>
            </div>
          </div>
        </header>

        <ion-router-outlet />
      </div>
    </ion-split-pane>
  </ion-page>
</template>

<style scoped>
.menu-pane-visible {
  width: 0px;
  border: none;
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.global-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--ion-background-color, #fff);
  height: 84px;

  .nav-and-actions {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;

    .page-title {
      font-weight: bold;
      font-size: 1rem;
      color: var(--ion-color-text-light);
    }

    .search-notification {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .header-search {
      --background: #fff;
      --box-shadow: none;
      --border-radius: 10px;
      width: 100%;
      border: solid 0.5px var(--ion-color-dark);
      border-radius: 10px;
    }
    .header-icon {
      font-size: 2rem;
      color: #7a7a7a;
      cursor: pointer;
    }
    .search-and-notifications {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
  }
}

.sb-logo {
  padding: 26px 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.sb-logo-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1a56db, #6d28d9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
  color: white;
  flex-shrink: 0;
}
.sb-logo-txt {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: white;
}
.sb-logo-sub {
  font-size: 10px;
  color: #475569;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.sb-scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
}
.sb-scroll::-webkit-scrollbar {
  display: none;
}
.sb-sec {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #334155;
  padding: 18px 20px 7px;
}

.sb-user {
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 12px 10px;
}
.sb-user-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s;
}
.sb-user-inner:hover {
  background: rgba(255, 255, 255, 0.06);
}
.av-sm {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a56db, #6d28d9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}
.sb-user-info {
  flex: 1;
  min-width: 0;
}
.sb-uname {
  font-size: 13px;
  font-weight: 600;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sb-urole {
  font-size: 11px;
  color: #475569;
  text-transform: capitalize;
}
.logout-ico {
  color: #ef4444;
  cursor: pointer;
  font-size: 18px;
  flex-shrink: 0;
  transition: opacity 0.15s;
}
.logout-ico:hover {
  opacity: 0.8;
}

.tb-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
}
.tb-title span {
  color: var(--primary);
}
.tb-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a56db, #6d28d9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
}
</style>
