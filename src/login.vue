<script setup lang="ts">
import { ref } from "vue";

const API = "http://localhost:3000/api";

const authView = ref<"login" | "register">("login");
const authErr = ref("");
const authLoading = ref(false);
const loggedIn = ref(false);

const lform = ref({
  email: "",
  password: "",
});

const rform = ref({
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

const doLogin = async () => {
  authErr.value = "";
  if (!lform.value.email || !lform.value.password) {
    authErr.value = "Email dan password harus diisi";
    return;
  }
  authLoading.value = true;

  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lform.value),
    });

    const data = await response.json();

    if (data.success) {
      setAuthToken(data.token, data.user);
    }

    if (response.status === 200) {
      loggedIn.value = true;
    } else {
      authErr.value = data.message || "Login gagal, silakan coba lagi!";
    }
  } catch (error) {
    authErr.value = "Terjadi kesalahan saat login";
  } finally {
    authLoading.value = false;
    loggedIn.value = false;
  }
};

const doRegister = async () => {
  authErr.value = "";
  if (
    !rform.value.name ||
    !rform.value.email ||
    !rform.value.password ||
    !rform.value.confirmPassword
  ) {
    authErr.value = "Semua field harus diisi";
    return;
  }
  if (rform.value.password !== rform.value.confirmPassword) {
    authErr.value = "Password dan konfirmasi password tidak cocok";
    return;
  }
  if (rform.value.password.length < 8) {
    authErr.value = "Password harus minimal 8 karakter.";
    return;
  }
  authLoading.value = true;

  try {
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rform.value),
    });

    const data = await response.json();

    if (data.success) {
      setAuthToken(data.token, data.user);
    }

    if (response.status === 200) {
      loggedIn.value = true;
    } else {
      authErr.value = data.message || "Registrasi gagal, silakan coba lagi!";
    }
  } catch (error) {
    authErr.value = "Terjadi kesalahan saat registrasi";
  } finally {
    authLoading.value = false;
    loggedIn.value = false;
  }
};
</script>

<template v-if="!loggedIn">
  <div class="auth-wrapper">
    <!-- Login Form  -->
    <div v-if="authView === 'login'" class="auth-card">
      <div class="a-logo">
        <div class="a-logo-mark">A</div>
        <span class="a-logo-text">adhivasindo</span>
      </div>

      <h2 class="a-h1">Selamat Datang!</h2>
      <p class="a-sub">Masuk ke Learning Management System Adhivasindo</p>

      <div v-if="authErr" class="a-err">
        <ion-icon name="alert-circle-outline"></ion-icon>{{ authErr }}
      </div>
      <div class="form">
        <label for="email" class="form-label">Email</label>
        <div class="form-wrap">
          <ion-icon name="mail-outline" class="form-icon"></ion-icon>
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
          <ion-icon name="lock-closed-outline" class="form-icon"></ion-icon>
          <input
            type="password"
            class="form-input"
            v-model="lform.password"
            placeholder="Masukkan password"
            @keydown.enter="doLogin"
          />
        </div>
      </div>

      <button class="btn-a" @click="doLogin" :disabled="authLoading">
        <div v-if="authLoading" class="spn"></div>
        <span v-else>Login</span>
      </button>
      <div class="a-sw">
        Belum punya akun?
        <span
          class="a-sw-link"
          @click="
            authView = 'register';
            authErr = '';
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

      <div v-if="authErr" class="a-err">
        <ion-icon name="alert-circle-outline"></ion-icon>{{ authErr }}
      </div>
      <div class="form">
        <label for="nama" class="form-label">Nama Lengkap</label>
        <div class="form-wrap">
          <ion-icon name="person-outline" class="form-icon"></ion-icon>
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
          <ion-icon name="lock-closed-outline" class="form-icon"></ion-icon>
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
          <ion-icon name="lock-closed-outline" class="form-icon"></ion-icon>
          <input
            type="password"
            class="form-input"
            v-model="rform.confirmPassword"
            placeholder="Minimal 8 karakter"
          />
        </div>
      </div>
      <button class="btn-a" @click="doRegister" :disabled="authLoading">
        <div v-if="authLoading" class="spn"></div>
        <span v-else>Register</span>
      </button>
      <div class="a-sw">
        Sudah punya akun?
        <span
          class="a-sw-link"
          @click="
            authView = 'login';
            authErr = '';
          "
          >Masuk di sini</span
        >
      </div>
    </div>
  </div>
</template>
