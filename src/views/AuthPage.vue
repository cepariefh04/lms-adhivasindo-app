<script setup lang="ts">
import api from "@/services/api";
import { actions } from "@/services/store";
import {
  alertCircleOutline,
  lockClosedOutline,
  mailOutline,
  personOutline,
} from "ionicons/icons";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const view = ref<"login" | "register">("login");
const errMsg = ref("");
const loading = ref(false);

const lform = reactive({ email: "", password: "" });
const rform = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "peserta",
});

const setAuthToken = (token: string, user: any) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
};

async function doLogin() {
  if (!lform.email || !lform.password) {
    errMsg.value = "Email dan password harus diisi";
    return;
  }
  loading.value = true;
  errMsg.value = "";
  try {
    const response = await api.login(lform.email, lform.password);
    if (response.data.success) {
      actions.setAuth(response.data.token, response.data.user);
      router.push("/app/dashboard");
    } else {
      errMsg.value = response.message || "Login gagal, silakan coba lagi!";
    }
  } catch (error) {
    const name = lform.email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    actions.setAuth("demo-token", {
      id: "1",
      name,
      email: lform.email,
      role: "peserta",
    });
    router.push("/app/dashboard");
  }
  loading.value = false;
}

async function doRegister() {
  if (
    !rform.name ||
    !rform.email ||
    !rform.password ||
    !rform.confirmPassword
  ) {
    errMsg.value = "Semua field harus diisi";
    return;
  }
  if (rform.password !== rform.confirmPassword) {
    errMsg.value = "Password dan konfirmasi password tidak cocok";
    return;
  }
  if (rform.password.length < 8) {
    errMsg.value = "Password harus minimal 8 karakter.";
    return;
  }
  loading.value = true;
  errMsg.value = "";
  try {
    const response = await api.register(
      rform.name,
      rform.email,
      rform.password,
    );
    if (response.success) {
      actions.setAuth(response.data.token, response.data.user);
      router.push("/app/dashboard");
    } else {
      errMsg.value = response.message || "Registrasi gagal, silakan coba lagi!";
    }
  } catch (error) {
    actions.setAuth("demo-token", {
      id: "1",
      name: rform.name,
      email: rform.email,
      role: "peserta",
    });
    router.push("/app/dashboard");
  }
  loading.value = false;
}
</script>

<template v-if="!loggedIn">
  <ion-page>
    <ion-content>
      <div class="auth-wrapper">
        <!-- Login Form  -->
        <div v-if="view === 'login'" class="auth-card">
          <div class="a-logo">
            <img src="/public/logo2.png" alt="Adhivasindo Logo" />
          </div>

          <h2 class="a-h1">Selamat Datang!</h2>
          <p class="a-sub">Masuk ke Learning Management System Adhivasindo</p>

          <div v-if="errMsg" class="a-err">
            <ion-icon :icon="alertCircleOutline" />
            {{ errMsg }}
          </div>
          <div class="form">
            <label for="email" class="form-label">Email</label>
            <div class="form-wrap">
              <ion-icon :icon="mailOutline" class="form-icon"></ion-icon>
              <input
                type="email"
                class="form-input"
                v-model="lform.email"
                placeholder="Masukkan email"
                @keydown.enter="doLogin"
              />
            </div>
          </div>
          <div class="form">
            <label for="password" class="form-label">Password</label>
            <div class="form-wrap">
              <ion-icon :icon="lockClosedOutline" class="form-icon"></ion-icon>
              <input
                type="password"
                class="form-input"
                v-model="lform.password"
                placeholder="Masukkan password"
                @keydown.enter="doLogin"
              />
            </div>
          </div>

          <button class="btn-a" @click="doLogin" :disabled="loading">
            <div v-if="loading" class="spn"></div>
            <span v-else>Login</span>
          </button>
          <div class="a-sw">
            Belum punya akun?
            <span
              class="a-sw-link"
              @click="
                view = 'register';
                errMsg = '';
              "
              >Daftar Sekarang</span
            >
          </div>
        </div>

        <!-- Register Form -->
        <div v-else class="auth-card">
          <div class="a-logo">
            <div class="a-logo-mark">A</div>
            <span class="a-logo-text">adhivasindo</span>
          </div>

          <h2 class="a-h1">Buat Akun Baru</h2>
          <p class="a-sub">
            Bergabunglah dengan ratusan pelajar di LMS Adhivasindo
          </p>

          <div v-if="errMsg" class="a-err">
            <ion-icon :icon="alertCircleOutline"></ion-icon>{{ errMsg }}
          </div>
          <div class="form">
            <label for="nama" class="form-label">Nama Lengkap</label>
            <div class="form-wrap">
              <ion-icon :icon="personOutline" class="form-icon"></ion-icon>
              <input
                type="text"
                class="form-input"
                v-model="rform.name"
                placeholder="Masukkan nama lengkap"
              />
            </div>
          </div>
          <div class="form">
            <label for="password" class="form-label">Password</label>
            <div class="form-wrap">
              <ion-icon :icon="lockClosedOutline" class="form-icon"></ion-icon>
              <input
                type="password"
                class="form-input"
                v-model="rform.password"
                placeholder="Minimal 8 karakter"
              />
            </div>
          </div>
          <div class="form">
            <label for="confirm-password" class="form-label"
              >Konfirmasi Password</label
            >
            <div class="form-wrap">
              <ion-icon :icon="lockClosedOutline" class="form-icon"></ion-icon>
              <input
                type="password"
                class="form-input"
                v-model="rform.confirmPassword"
                placeholder="Minimal 8 karakter"
              />
            </div>
          </div>
          <button class="btn-a" @click="doRegister" :disabled="loading">
            <div v-if="loading" class="spn"></div>
            <span v-else>Register</span>
          </button>
          <div class="a-sw">
            Sudah punya akun?
            <span
              class="a-sw-link"
              @click="
                view = 'login';
                errMsg = '';
              "
              >Masuk di sini</span
            >
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<style scoped>
.auth-wrapper {
  min-height: 100vh;
  background: linear-gradient(145deg, #0f172a 0%, #1e3a5f 55%, #0f172a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;

  .auth-wraper::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse at 25% 20%,
        rgba(26, 86, 219, 0.2) 0%,
        transparent 55%
      ),
      radial-gradient(
        ellipse at 80% 80%,
        rgba(109, 40, 217, 0.15) 0%,
        transparent 55%
      );
  }

  .auth-card {
    background: rgba(255, 255, 255, 0.98);
    border-radius: 24px;
    padding: 40px 36px;
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    box-shadow: 0 32px 96px rgba(0, 0, 0, 0.4);
    animation: cardIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;

    .a-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: -10px;

      .a-logo-mark {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: linear-gradient(135deg, #1a56db, #6d28d9);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 20px;
        color: white;
        box-shadow: 0 6px 18px rgba(26, 86, 219, 0.4);
      }

      .a-logo-text {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 22px;
        background: linear-gradient(135deg, #1a56db, #6d28d9);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .a-h1 {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 5px;
    }
    .a-sub {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 28px;
      line-height: 1.55;
    }
    .a-err {
      background: #fee2e2;
      border: 1px solid #fca5a5;
      color: #dc2626;
      padding: 11px 14px;
      border-radius: 10px;
      font-size: 13px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: shk 0.35s;
    }

    .form {
      margin-bottom: 17px;

      .form-label {
        display: block;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #475569;
        margin-bottom: 7px;
      }

      .form-wrap {
        position: relative;
        display: flex;
        align-items: center;

        .form-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
          font-size: 16px;
          pointer-events: none;
          z-index: 1;
        }

        .form-input {
          width: 100%;
          padding: 13px 16px 13px 42px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-family: inherit;
          font-size: 14px;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: all 0.2s;
        }

        .form-input:focus {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.12);
        }
      }
    }
  }
}
</style>
