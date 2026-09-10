<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="m-bg"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="m-box">
        <div class="m-hd">
          <div class="m-ttl">
            {{ isEdit ? "Edit Konten" : "Buat Konten Baru" }}
          </div>
          <button class="m-cls" @click="$emit('update:modelValue', false)">
            <ion-icon :icon="closeOutline" />
          </button>
        </div>

        <div class="m-bd">
          <div class="fg">
            <label class="fl">Judul <span class="req">*</span></label>
            <input
              v-model="form.title"
              class="fi"
              type="text"
              placeholder="Masukkan judul konten..."
            />
          </div>

          <div class="frow">
            <div class="fg">
              <label class="fl">Kategori</label>
              <select v-model="form.category" class="fsel">
                <option value="">Pilih kategori</option>
                <option value="PEMROGRAMAN">Pemrograman</option>
                <option value="CREATIVE MARKETING">Creative Marketing</option>
                <option value="MANAGEMENT SDM">Management SDM</option>
              </select>
            </div>
            <div class="fg">
              <label class="fl">Status</label>
              <select v-model="form.status" class="fsel">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div class="fg">
            <label class="fl">Deskripsi</label>
            <textarea
              v-model="form.description"
              class="fta"
              placeholder="Ringkasan konten..."
              style="min-height: 75px"
            />
          </div>

          <div class="fg">
            <label class="fl">Isi Konten <span class="req">*</span></label>
            <textarea
              v-model="form.body"
              class="fta"
              placeholder="Tulis isi konten di sini..."
              style="min-height: 130px"
            />
          </div>

          <div class="fg">
            <label class="fl">
              Tags
              <small
                style="font-weight: 400; color: #94a3b8; text-transform: none"
                >(Enter untuk tambah)</small
              >
            </label>
            <div class="tw" @click="tagInputRef?.focus()">
              <span v-for="t in form.tags" :key="t" class="tp">
                {{ t }}<span class="tr" @click.stop="removeTag(t)">×</span>
              </span>
              <input
                ref="tagInputRef"
                v-model="tagInput"
                class="ti"
                placeholder="Tambah tag..."
                @keydown="onTag"
              />
            </div>
          </div>
        </div>

        <div class="m-ft">
          <button class="btn-cancel" @click="$emit('update:modelValue', false)">
            Batal
          </button>
          <button class="btn-save" @click="submit" :disabled="saving">
            {{
              saving ? "Menyimpan..." : isEdit ? "Perbarui" : "Simpan Konten"
            }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Content, ReadonlyContent } from "@/services/store";
import { IonIcon } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { reactive, ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  isEdit: boolean;
  editData?: ReadonlyContent | null;
}>();
const emit = defineEmits<{
  "update:modelValue": [val: boolean];
  submit: [data: Partial<Content>];
}>();

const saving = ref(false);
const tagInput = ref("");
const tagInputRef = ref<HTMLInputElement>();

const form = reactive({
  title: "",
  description: "",
  body: "",
  category: "",
  status: "draft" as Content["status"],
  tags: [] as string[],
});

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      if (props.isEdit && props.editData) {
        Object.assign(form, {
          title: props.editData.title,
          description: props.editData.description || "",
          body: props.editData.body || "",
          category: props.editData.category || "",
          status: props.editData.status,
          tags: [...Array.from(props.editData.tags || [])],
        });
      } else {
        Object.assign(form, {
          title: "",
          description: "",
          body: "",
          category: "",
          status: "draft",
          tags: [],
        });
      }
      tagInput.value = "";
    }
  },
);

function onTag(e: KeyboardEvent) {
  if (e.key === "Enter") {
    e.preventDefault();
    const v = tagInput.value.trim().toLowerCase().replace(/\s+/g, "-");
    if (v && !form.tags.includes(v)) form.tags.push(v);
    tagInput.value = "";
  } else if (e.key === "Backspace" && !tagInput.value && form.tags.length) {
    form.tags.pop();
  }
}

function removeTag(t: string) {
  form.tags = form.tags.filter((x) => x !== t);
}

async function submit() {
  if (!form.title.trim() || !form.body.trim()) return;
  saving.value = true;
  await new Promise((r) => setTimeout(r, 300));
  emit("submit", { ...form, tags: [...form.tags] });
  saving.value = false;
  emit("update:modelValue", false);
}
</script>

<style scoped>
.m-bg {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s;
}
.m-box {
  background: white;
  border-radius: 18px;
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  animation: modalUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.m-hd {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  border-radius: 18px 18px 0 0;
}
.m-ttl {
  font-size: 16px;
  font-weight: 800;
}
.m-cls {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 14px;
  transition: all 0.15s;
}
.m-cls:hover {
  background: #fee2e2;
  color: #ef4444;
  border-color: #ef4444;
}
.m-bd {
  padding: 22px 24px;
}
.m-ft {
  padding: 14px 24px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
.req {
  color: #ef4444;
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
  transition: all 0.18s;
}
.fi:focus {
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.1);
}
.frow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
@media (max-width: 500px) {
  .frow {
    grid-template-columns: 1fr;
  }
}
.fta {
  width: 100%;
  padding: 12px 15px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  color: #0f172a;
  background: #f8fafc;
  outline: none;
  resize: vertical;
  transition: all 0.18s;
}
.fta:focus {
  border-color: var(--primary);
  background: white;
}
.fsel {
  width: 100%;
  padding: 12px 15px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  color: #0f172a;
  background: #f8fafc;
  outline: none;
  cursor: pointer;
}
.fsel:focus {
  border-color: var(--primary);
}
.tw {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 12px;
  min-height: 44px;
  background: #f8fafc;
  transition: border-color 0.18s;
  cursor: text;
}
.tw:focus-within {
  border-color: var(--primary);
  background: white;
}
.tp {
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--primary-light);
  color: var(--primary);
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.tr {
  cursor: pointer;
  opacity: 0.7;
  font-size: 14px;
  line-height: 1;
}
.tr:hover {
  opacity: 1;
}
.ti {
  border: none;
  background: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  flex: 1;
  min-width: 80px;
  color: #0f172a;
}
.btn-cancel {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: white;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: #0f172a;
  transition: all 0.15s;
}
.btn-cancel:hover {
  border-color: #94a3b8;
}
.btn-save {
  padding: 10px 24px;
  border-radius: 10px;
  background: var(--primary);
  color: white;
  border: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-save:hover {
  background: var(--primary-dark);
}
.btn-save:disabled {
  opacity: 0.65;
  cursor: default;
}
</style>
