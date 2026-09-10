<script setup lang="ts">
import { IonPage } from "@ionic/vue";
import { ref } from "vue";
import MainContent from "./MainContent.vue";
import Sidebar from "./Sidebar.vue";

// --- Types ---
interface RankingItem {
  position: string;
  name: string;
  className: string;
  module: string;
  points: string;
}

interface EventItem {
  title: string;
  time: string;
  speaker: string;
  color: string;
}

interface UserProfile {
  name: string;
  avatar: string;
}

// --- Sample Data ---
const user = ref<UserProfile>({
  name: "JULIANA",
  avatar: "/assets/juliana.jpg", // Replace with a local image path or a URL
});

const rankings = ref<RankingItem[]>([
  {
    position: "1",
    name: "Parija faiza",
    className: "PEMROGRAMAN",
    module: "L1",
    points: "1.234",
  },
  {
    position: "2",
    name: "Ardi wirayuda",
    className: "PEMROGRAMAN",
    module: "L3",
    points: "1.222",
  },
  {
    position: "3",
    name: "Nabila faiza",
    className: "MANAGEMENT SDM",
    module: "L2",
    points: "1.200",
  },
  {
    position: "4",
    name: "Salsabila ardi",
    className: "PEMROGRAMAN",
    module: "L1",
    points: "1.189",
  },
]);

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const dates = Array.from({ length: 31 }, (_, i) => i + 1).slice(12, 19); // Example dates around 16th

const events = ref<EventItem[]>([
  {
    title: "Storytelling dalam Pemasaran",
    time: "09:00 - 11:00",
    speaker: "Joni",
    color: "#6e44ff",
  },
  {
    title: "Pemrograman Frontend Modern",
    time: "12:00 - 14:00",
    speaker: "Dimas",
    color: "#ff7c7c",
  },
  {
    title: "Pengembangan API",
    time: "14:30 - 15:30",
    speaker: "Popo",
    color: "#ffd073",
  },
]);
</script>

<template>
  <ion-page>
    <ion-split-pane content-id="main-content" when="lg">
      <!-- ── SIDEBAR ── -->
      <ion-menu content-id="main-content" type="overlay">
        <Sidebar />
      </ion-menu>

      <!-- ── MAIN AREA ── -->
      <div id="main-content">
        <MainContent />
      </div>
    </ion-split-pane>
  </ion-page>
</template>

<style scoped>
#main-content {
  overflow: auto;
}
.menu-pane-visible {
  width: 0px;
  border: none;
}
</style>
