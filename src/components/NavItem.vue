<template>
  <div class="nw">
    <div class="ni" :class="{ act: active }" @click="$emit('click')">
      <ion-icon :name="icon" />
      <span>{{ label }}</span>
      <span v-if="badge" class="nbadge">{{ badge }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
defineProps<{ icon: string; label: string; badge?: string; active?: boolean }>()
defineEmits(['click'])
</script>

<style scoped>
.nw { padding: 2px 10px; }
.ni {
  display: flex; align-items: center; gap: 11px;
  padding: 11px 14px; border-radius: 10px; cursor: pointer;
  color: #64748b; font-size: 14px; font-weight: 500;
  transition: all 0.18s; position: relative;
}
.ni:hover { background: rgba(255,255,255,0.06); color: #94a3b8; }
.ni.act { background: rgba(26,86,219,0.18); color: #60a5fa; }
.ni.act::before {
  content: ''; position: absolute; left: -10px; top: 50%;
  transform: translateY(-50%); width: 3px; height: 58%;
  background: var(--primary); border-radius: 0 3px 3px 0;
}
.nbadge { margin-left: auto; background: var(--primary); color: white; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
</style>
