<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { useRouter } from "vue-router";
const router = useRouter();
const modules = [
  {
    cls: "mc-p",
    label: "PEMROGRAMAN",
    count: "11 Materi • 45 Jam",
    emoji: "💻",
    items: [
      "React & Angular Framework",
      "GraphQL API Development",
      "Clean Code & Design Patterns",
    ],
  },
  {
    cls: "mc-m",
    label: "CREATIVE MARKETING",
    count: "9 Materi • 32 Jam",
    emoji: "📣",
    items: [
      "Storytelling Efektif",
      "Viral Marketing Strategy",
      "User-Generated Content",
    ],
  },
  {
    cls: "mc-s",
    label: "MANAGEMENT SDM",
    count: "8 Materi • 28 Jam",
    emoji: "👥",
    items: [
      "Rekrutmen Berbasis Data",
      "Manajemen Kinerja",
      "Budaya Organisasi",
    ],
  },
];
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="pi">
        <div class="pg-hd">
          <h1>Modul Pembelajaran</h1>
          <p>Semua modul kompetensi tersedia</p>
        </div>
        <div class="grid">
          <div
            v-for="m in modules"
            :key="m.label"
            class="m-card"
            @click="router.push('/app/contents')"
          >
            <div class="m-hd" :class="m.cls">
              <span style="font-size: 40px">{{ m.emoji }}</span>
            </div>
            <div class="m-bd">
              <div class="m-cat">{{ m.label }}</div>
              <div class="m-count">{{ m.count }}</div>
              <div class="m-items">
                <div v-for="it in m.items" :key="it" class="m-item">
                  <span style="color: var(--primary); font-weight: 700">›</span>
                  {{ it }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.pi {
  padding: 88px 24px;
}
.pg-hd {
  margin-bottom: 20px;
}
.pg-hd h1 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}
.pg-hd p {
  font-size: 13px;
  color: #64748b;
  margin-top: 3px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 16px;
}
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.m-card {
  background: white;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  animation: fadeUp 0.3s ease both;
}
.m-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-color: transparent;
}
.m-hd {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.mc-p {
  background: linear-gradient(135deg, #1a56db, #6d28d9);
}
.mc-m {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
}
.mc-s {
  background: linear-gradient(135deg, #10b981, #0ea5e9);
}
.m-bd {
  padding: 16px;
}
.m-cat {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary);
  margin-bottom: 5px;
}
.m-count {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
}
.m-item {
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}
</style>
