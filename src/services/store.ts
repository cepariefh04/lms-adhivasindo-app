import { reactive, readonly } from "vue";
import { api } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  body: string;
  category: string;
  status: "publisher" | "draft" | "archived";
  view_count: number;
  tags: readonly string[];
  author: { name: string };
  emoji?: string;
  bg?: string;
}

export type readonlyContent = Readonly<Content>;

const EMOJI_MAP: Record<string, string> = {
  PEMOGRAMAN: "💻",
  "CREATIVE MARKETING": "📈",
  "MANAGEMENT SDM": "👥",
  "": "📝",
};

const BG_MAP: Record<string, string> = {
  PEMROGRAMAN: "linear-gradient(135deg,#1a56db,#6d28d9)",
  "CREATIVE MARKETING": "linear-gradient(135deg,#f59e0b,#ef4444)",
  "MANAGEMENT SDM": "linear-gradient(135deg,#10b981,#0ea5e9)",
  "": "linear-gradient(135deg,#64748b,#475569)",
};

export function getEmoji(cat: string) {
  return EMOJI_MAP[cat] || EMOJI_MAP[""];
}
export function getBg(cat: string) {
  return BG_MAP[cat] || BG_MAP[""];
}

// Global state
const _state = reactive({
  user: JSON.parse(localStorage.getItem("lms_user") || "null") as User | null,
  token: localStorage.getItem("lms_token") || "",
  contents: [] as Content[],
  isLoading: false,
  toasts: [] as { id: number; msg: string; type: "ok" | "err" }[],
});

export const state = readonly(_state);

export const actions = {
  // --- AUTH ACTIONS ---
  async login(email: string, pass: string) {
    try {
      const res = await api.login(email, pass);
      if (res.token && res.user) {
        this.setAuth(res.token, res.user);
        this.toast("Login berhasil!");
      } else {
        this.toast("Login gagal: Respon tidak valid", "err");
      }
    } catch (e) {
      this.toast(
        "Login gagal: " + (e instanceof Error ? e.message : "Unknown error"),
        "err",
      );
    }
  },

  setAuth(token: string, user: User) {
    _state.token = token;
    _state.user = user;
    localStorage.setItem("lms_token", token);
    localStorage.setItem("lms_user", JSON.stringify(user));
  },

  logout() {
    _state.token = "";
    _state.user = null;
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");
  },

  // --- CONTENT ACTIONS (DATABASE LINKED) ---
  async fetchContents() {
    _state.isLoading = true;
    try {
      const res = await api.getContents();
      _state.contents = res.data.contents.map((c: Content) => ({
        ...c,
        emoji: getEmoji(c.category),
        bg: getBg(c.category),
      }));
      console.log("Processed Contents:", _state.contents);
    } catch (e) {
      this.toast(
        "Failed to fetch contents: " +
          (e instanceof Error ? e.message : "Unknown error"),
        "err",
      );
    } finally {
      _state.isLoading = false;
    }
  },

  async addContent(c: Partial<Content>) {
    try {
      const newContent = await api.createContent(c);
      _state.contents.unshift({
        ...newContent,
        emoji: getEmoji(newContent.category),
        bg: getBg(newContent.category),
      });
      this.toast("Konten berhasil ditambahkan", "ok");
    } catch (e) {
      this.toast("Gagal menyimpan konten", "err");
    }
  },

  async updateContent(id: string, data: Partial<Content>) {
    try {
      const updated = await api.updateContent(id, data);
      const i = _state.contents.findIndex((c) => c.id === id);
      if (i !== -1) {
        _state.contents[i] = {
          ..._state.contents[i],
          ...updated,
          emoji: getEmoji(updated.category || _state.contents[i].category),
          bg: getBg(updated.category || _state.contents[i].category),
        };
      }
      this.toast("Berhasil diperbarui", "ok");
    } catch (e) {
      this.toast("Gagal memperbarui konten", "err");
    }
  },

  async deleteContent(id: string) {
    try {
      await api.deleteContent(id);
      const i = _state.contents.findIndex((c) => c.id === id);
      if (i !== -1) _state.contents.splice(i, 1);
      this.toast("Konten dihapus", "ok");
    } catch (e) {
      this.toast("Gagal menghapus konten", "err");
    }
  },

  toast(msg: string, type: "ok" | "err" = "ok") {
    const id = Date.now();
    _state.toasts.push({ id, msg, type });
    setTimeout(() => {
      const idx = _state.toasts.findIndex((t) => t.id === id);
      if (idx !== -1) _state.toasts.splice(idx, 1);
    }, 3000);
  },
};
