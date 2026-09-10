<script setup lang="ts">
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
} from "@ionic/vue";
import {
  calendarNumberOutline,
  chevronBackOutline,
  chevronForwardOutline,
  mailOutline,
  notificationsOutline,
  personOutline,
  settingsOutline,
} from "ionicons/icons";

import { ref } from "vue";

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
  <div class="main-body-content">
    <div class="main-content-column">
      <header class="global-header">
        <div class="nav-and-actions">
          <span class="page-title">LEARNING MANAGEMENT SYSTEM</span>
          <ion-searchbar
            placeholder="Search classes..."
            class="header-search"
          ></ion-searchbar>
          <ion-icon :icon="notificationsOutline" class="header-icon"></ion-icon>
          <ion-icon :icon="mailOutline" class="header-icon"></ion-icon>
          <div class="search-and-notifications"></div>
        </div>
      </header>
      <ion-card class="featured-card ion-no-margin">
        <ion-card-header>
          <div class="card-meta">
            <ion-label class="category">PEMROGRAMAN</ion-label>
          </div>
          <ion-card-title>
            Pemrograman Frontend Modern dengan React dan Angular
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud...
          </p>
          <div class="footer">
            <div class="author-info">
              <div class="speaker">
                <ion-icon :icon="personOutline"></ion-icon>
                Pemateri By Josep
              </div>
              <div class="date">
                <ion-icon :icon="calendarNumberOutline"></ion-icon>
                14-06-2025
              </div>
            </div>
            <div>
              <ion-button fill="solid" class="action-button"
                >MULAI LEARNING</ion-button
              >
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <div class="section-title">
        <h2>MODUL KOMPETENSI</h2>
      </div>
      <div class="class-cards-container">
        <ion-card class="class-card">
          <ion-card-header>
            <div class="class-image placeholder dark-bg">
              <span>PEMROGRAMAN</span>
            </div>
            <div class="module-info-pill">L1</div>
            <ion-card-title>Pemrograman</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                Pemrograman Frontend Modern dengan React dan Angular
              </ion-item>
              <ion-item class="highlighted">
                Pengembangan API Berstandar Industri dengan GraphQL dan REST
              </ion-item>
              <ion-item>
                Menerapkan Clean-Code dan Design Pattern dalam Pengembangan
                Software
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <ion-card class="class-card">
          <ion-card-header>
            <div class="class-image placeholder light-red-bg">
              <span>CREATIVE MARKETING</span>
            </div>
            <div class="module-info-pill">L2</div>
            <ion-card-title>Creative Marketing</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                Storytelling dalam Pemasaran: Mengubah Data menjadi Cerita yang
                Menginspirasi
              </ion-item>
              <ion-item>
                Pemasaran Viral: Bagaimana Menciptakan Konten yang Cepat
                Menyebar
              </ion-item>
              <ion-item>
                Memaksimalkan User-Generated Content dalam Strategi Pemasaran
                Kreatif
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <ion-card class="class-card">
          <ion-card-header>
            <div class="class-image placeholder light-yellow-bg">
              <span>MANAGEMENT SDM</span>
            </div>
            <div class="module-info-pill">L3</div>
            <ion-card-title>Management SDM</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                Storytelling dalam Pemasaran: Mengubah Data menjadi Cerita yang
                Menginspirasi
              </ion-item>
              <ion-item>
                Pemasaran Viral: Bagaimana Menciptakan Konten yang Cepat
                Menyebar
              </ion-item>
              <ion-item>
                Memaksimalkan User-Generated Content dalam Strategi Pemasaran
                Kreatif
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>

      <div class="ranking-container">
        <div class="title">
          <h2>NILAI PESERTA</h2>
        </div>

        <ion-grid class="ranking-grid ion-no-padding">
          <ion-row class="header-row">
            <ion-col size="1.5">Rank</ion-col>
            <ion-col size="3.5">Name</ion-col>
            <ion-col size="3">Class</ion-col>
            <ion-col size="1.5" class="ion-text-center">MODUL</ion-col>
            <ion-col size="2.5">Point</ion-col>
          </ion-row>

          <ion-row
            v-for="(rank, index) in rankings"
            :key="index"
            class="data-row"
          >
            <ion-col size="1.5" class="rank-col">{{ rank.position }}</ion-col>
            <ion-col size="3.5" class="name-col">{{ rank.name }}</ion-col>
            <ion-col size="3" class="class-col">{{ rank.className }}</ion-col>
            <ion-col size="1.5" class="module-col ion-text-center">{{
              rank.module
            }}</ion-col>
            <ion-col size="2.5" class="point-col">
              <span class="point-value">{{ rank.points }} Point</span>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>

    <aside class="user-sidebar-column">
      <div class="profile-section">
        <div class="profile-pic-container">
          <ion-avatar>
            <img :src="user.avatar" alt="User Profile" />
          </ion-avatar>
          <ion-icon :icon="settingsOutline" class="settings-icon"></ion-icon>
        </div>
        <h3>SELAMAT DATANG, {{ user.name }}</h3>
        <p>DI LMS by Adhivasindo</p>
      </div>

      <div class="calendar-widget">
        <div class="calendar-header">
          <ion-icon :icon="chevronBackOutline" class="arrow-icon"></ion-icon>
          <span>April 2025</span>
          <ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
        </div>
        <div class="calendar-days-row">
          <div v-for="day in days" :key="day" class="calendar-day">
            {{ day }}
          </div>
        </div>
        <div class="calendar-dates-row">
          <div
            v-for="date in dates"
            :key="date"
            class="calendar-date"
            :class="{ active: date === 16 }"
          >
            {{ date }}
          </div>
        </div>
      </div>

      <div class="section-title-small">
        <h2>JADWAL PEMATERI</h2>
      </div>
      <ion-list class="schedule-list" lines="none">
        <ion-item
          v-for="(event, index) in events"
          :key="index"
          button
          class="schedule-item"
        >
          <div
            slot="start"
            class="colored-pill"
            :style="{ backgroundColor: event.color }"
          ></div>
          <ion-label>
            <h3>{{ event.title }}</h3>
            <p>{{ event.time }} With mr. {{ event.speaker }}</p>
          </ion-label>
          <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
        </ion-item>
      </ion-list>

      <ion-card class="learning-path-card ion-no-margin">
        <ion-card-header>
          <ion-card-title>Frontend Developer</ion-card-title>
          <p>Learning Path</p>
        </ion-card-header>
        <ion-card-content>
          <p>Mulai Karirmu Sebagai Front-End Developer Profesional Sekarang!</p>
          <div class="path-graphic placeholder-graphic"></div>
        </ion-card-content>
      </ion-card>
    </aside>
  </div>
  <ion-router-outlet />
</template>
