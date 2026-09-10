<script setup lang="ts">
import { actions, state } from "@/services/store";
import { IonContent, IonPage } from "@ionic/vue";
import { ref } from "vue";

const name = ref(state.user?.name || "");
function save() {
  actions.toast("Pengaturan disimpan! ✨");
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="pi">
        <div class="pg-hd">
          <h1>Settings</h1>
          <p>Pengaturan akun Anda</p>
        </div>
        <div class="s-card">
          <h3 class="s-sec">Profil Saya</h3>
          <div class="fg">
            <label class="fl">Nama Lengkap</label
            ><input class="fi" v-model="name" />
          </div>
          <div class="fg">
            <label class="fl">Email</label
            ><input class="fi" :value="state.user?.email" disabled />
          </div>
          <div class="fg">
            <label class="fl">Role</label
            ><input class="fi" :value="state.user?.role" disabled />
          </div>
          <button class="btn-save" @click="save">Simpan Perubahan</button>
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
.s-card {
  background: white;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  padding: 24px;
  max-width: 480px;
}
.s-sec {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 18px;
}
.fg {
  margin-bottom: 16px;
}
.fl {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #475569;
  margin-bottom: 7px;
}
.fi {
  width: 100%;
  padding: 12px 15px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  color: #0f172a;
  background: #f8fafc;
  outline: none;
}
.fi:focus {
  border-color: var(--primary);
}
.fi:disabled {
  opacity: 0.6;
  cursor: default;
}
.btn-save {
  padding: 11px 24px;
  border-radius: 10px;
  background: var(--primary);
  color: white;
  border: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.btn-save:hover {
  background: var(--primary-dark);
}
</style>
