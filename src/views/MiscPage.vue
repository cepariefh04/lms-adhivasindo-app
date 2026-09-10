<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
defineProps<{ title: string; icon: string; desc: string }>();
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="mep">
        <div class="ico">{{ icon }}</div>
        <h3>{{ title }}</h3>
        <p>{{ desc }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.mep {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 40px 24px;
}
.ico {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.35;
}
h3 {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
}
p {
  font-size: 14px;
  color: #94a3b8;
}
</style>
