<script setup lang="ts">
import ContentModal from "@/components/ContentModal.vue";
import {
  actions,
  state,
  type Content,
  type ReadonlyContent,
} from "@/services/store";

import { IonContent, IonIcon, IonPage } from "@ionic/vue";
import {
  addOutline,
  chevronBackOutline,
  chevronForwardOutline,
  pencilOutline,
  searchOutline,
  trashOutline,
} from "ionicons/icons";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const searchQ = ref((route.query.q as string) || "");
const catF = ref("");
const statF = ref("");
const curPg = ref(1);
const PER_PG = 6;

const showModal = ref(false);
const isEdit = ref(false);
const editData = ref<ReadonlyContent | null>(null);

watch(
  () => route.query.q,
  (q) => {
    if (q) searchQ.value = q as string;
  },
);
watch([searchQ, catF, statF], () => {
  curPg.value = 1;
});

const filtered = computed(() =>
  state.contents.filter((c) => {
    const q = searchQ.value.toLowerCase();
    return (
      (!q ||
        c.title.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q)) &&
      (!catF.value || c.category === catF.value) &&
      (!statF.value || c.status === statF.value)
    );
  }),
);

const totalPgs = computed(() => Math.ceil(filtered.value.length / PER_PG));
const paged = computed(() =>
  filtered.value.slice((curPg.value - 1) * PER_PG, curPg.value * PER_PG),
);

function openCreate() {
  isEdit.value = false;
  editData.value = null;
  showModal.value = true;
}
function openEdit(c: ReadonlyContent) {
  isEdit.value = true;
  editData.value = c;
  showModal.value = true;
}

async function onSubmit(data: Partial<Content>) {
  if (isEdit.value && editData.value) {
    // MODE EDIT
    try {
      await actions.updateContent(editData.value.id, data);
      showModal.value = false;
    } catch (err) {
      console.error("Gagal update:", err);
    }
  } else {
    // MODE CREATE
    try {
      // Pastikan data author minimal terisi untuk UI
      const payload = {
        ...data,
        author: { name: state.user?.name || "Admin" },
      };
      await actions.addContent(payload as Content);
      showModal.value = false;
    } catch (err) {
      console.error("Gagal create:", err);
    } finally {
      actions.fetchContents();
    }
  }
}

async function delContent(id: string) {
  if (!confirm("Yakin hapus konten ini?")) return;

  try {
    await actions.deleteContent(id);
    // Jika curPg menjadi kosong setelah hapus, mundurkan halaman
    if (paged.value.length === 1 && curPg.value > 1) {
      curPg.value--;
    }
  } catch (err) {
    console.error("Gagal menghapus:", err);
  } finally {
    actions.fetchContents();
  }
}

function stCls(s: string) {
  return (
    { published: "s-pub", draft: "s-dft", archived: "s-arc" }[s] || "s-dft"
  );
}

onMounted(() => {
  actions.fetchContents(); // Memicu pengambilan data dari database
});
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="pi">
        <div class="pg-hd">
          <h1>Content Management</h1>
          <p>Kelola semua konten pembelajaran</p>
        </div>

        <!-- Toolbar -->
        <div class="tool-row">
          <div class="tool-s">
            <ion-icon :icon="searchOutline" />
            <input
              v-model="searchQ"
              type="text"
              placeholder="Cari judul atau deskripsi..."
            />
          </div>
          <select v-model="catF" class="tool-sel">
            <option value="">Semua Kategori</option>
            <option value="PEMROGRAMAN">Pemrograman</option>
            <option value="CREATIVE MARKETING">Creative Marketing</option>
            <option value="MANAGEMENT SDM">Management SDM</option>
          </select>
          <select v-model="statF" class="tool-sel">
            <option value="">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button class="btn-new" @click="openCreate">
            <ion-icon :icon="addOutline" /> Buat Konten
          </button>
        </div>

        <!-- Grid -->
        <div class="cnt-grid">
          <div v-if="state.isLoading" class="empty-st">
            <ion-spinner name="crescent"></ion-spinner>
            <div>Memuat konten...</div>
          </div>

          <div v-if="paged.length === 0" class="empty-st">
            <div class="empty-ico">📄</div>
            <div class="empty-ttl">Konten tidak ditemukan</div>
            <div>Coba ubah filter atau buat konten baru.</div>
          </div>

          <div
            v-for="(c, ci) in paged"
            :key="c.id"
            class="cnt-card"
            :style="{ animationDelay: ci * 0.05 + 's' }"
          >
            <div class="cnt-thumb" :style="'background:' + c.bg">
              <span>{{ c.emoji }}</span>
              <span class="cnt-stat" :class="stCls(c.status)">{{
                c.status
              }}</span>
            </div>
            <div class="cnt-bd">
              <div class="cnt-cat">{{ c.category || "UMUM" }}</div>
              <div class="cnt-ttl">{{ c.title }}</div>
              <div class="cnt-dsc">{{ c.description }}</div>
              <div class="cnt-tags">
                <span
                  v-for="t in (c.tags || []).slice(0, 3)"
                  :key="t"
                  class="tag-pill"
                  >{{ t }}</span
                >
              </div>
              <div class="cnt-ft">
                <div class="cnt-au">
                  <div class="au-ch">{{ c.author.name.charAt(0) }}</div>
                  {{ c.author.name }}
                </div>
                <div class="cnt-acts">
                  <button class="act-b" @click.stop="openEdit(c)">
                    <ion-icon :icon="pencilOutline" />
                  </button>
                  <button class="act-b del" @click.stop="delContent(c.id)">
                    <ion-icon :icon="trashOutline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPgs > 1" class="pgn">
          <button class="pg-b" @click="curPg--" :disabled="curPg <= 1">
            <ion-icon :icon="chevronBackOutline" />
          </button>
          <button
            v-for="p in totalPgs"
            :key="p"
            class="pg-b"
            :class="{ cur: p === curPg }"
            @click="curPg = p"
          >
            {{ p }}
          </button>
          <button class="pg-b" @click="curPg++" :disabled="curPg >= totalPgs">
            <ion-icon :icon="chevronForwardOutline" />
          </button>
        </div>
      </div>
    </ion-content>

    <!-- Modal -->
    <ContentModal
      v-model="showModal"
      :is-edit="isEdit"
      :edit-data="editData"
      @submit="onSubmit"
    />
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

.tool-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}
.tool-s {
  flex: 1;
  min-width: 180px;
  display: flex;
  align-items: center;
  gap: 9px;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 0 14px;
  height: 40px;
  transition: border-color 0.2s;
}
.tool-s:focus-within {
  border-color: var(--primary);
}
.tool-s input {
  border: none;
  background: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  flex: 1;
  color: #0f172a;
}
.tool-s ion-icon {
  color: #94a3b8;
  font-size: 16px;
  flex-shrink: 0;
}
.tool-sel {
  height: 40px;
  padding: 0 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  font-family: inherit;
  font-size: 13px;
  color: #0f172a;
  outline: none;
  cursor: pointer;
}
.tool-sel:focus {
  border-color: var(--primary);
}
.btn-new {
  height: 40px;
  padding: 0 18px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
  transition: all 0.18s;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(26, 86, 219, 0.28);
}
.btn-new:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.cnt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
@media (max-width: 700px) {
  .cnt-grid {
    grid-template-columns: 1fr;
  }
}

.cnt-card {
  background: white;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.22s,
    box-shadow 0.22s;
  animation: fadeUp 0.3s ease both;
}
.cnt-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-color: transparent;
}
.cnt-thumb {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 46px;
  position: relative;
}
.cnt-stat {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.s-pub {
  background: #d1fae5;
  color: #065f46;
}
.s-dft {
  background: #fef3c7;
  color: #92400e;
}
.s-arc {
  background: #f1f5f9;
  color: #94a3b8;
}
.cnt-bd {
  padding: 14px 16px;
}
.cnt-cat {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary);
  margin-bottom: 5px;
}
.cnt-ttl {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 7px;
  line-height: 1.4;
  color: #0f172a;
}
.cnt-dsc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.cnt-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}
.tag-pill {
  background: var(--primary-light);
  color: var(--primary);
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}
.cnt-ft {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 11px;
  border-top: 1px solid #f1f5f9;
}
.cnt-au {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #64748b;
}
.au-ch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: white;
}
.cnt-acts {
  display: flex;
  gap: 5px;
}
.act-b {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all 0.18s;
}
.act-b:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}
.act-b.del:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: #fee2e2;
}

.empty-st {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
  grid-column: 1/-1;
}
.empty-ico {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.35;
}
.empty-ttl {
  font-size: 16px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 5px;
}

.pgn {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 18px;
}
.pg-b {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  border: 1.5px solid #e2e8f0;
  background: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  transition: all 0.15s;
  font-family: inherit;
}
.pg-b:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.pg-b.cur {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
.pg-b:disabled {
  opacity: 0.35;
  pointer-events: none;
}
</style>
