<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
const peserta = [
  {
    rank: 1,
    name: "Parja Faiza",
    kelas: "PEMROGRAMAN",
    modul: 11,
    point: "1,234",
  },
  {
    rank: 2,
    name: "Adit Firmansyah",
    kelas: "PEMROGRAMAN",
    modul: 11,
    point: "1,100",
  },
  {
    rank: 3,
    name: "Siti Rahayu",
    kelas: "CREATIVE MARKETING",
    modul: 9,
    point: "980",
  },
  {
    rank: 4,
    name: "Budi Santoso",
    kelas: "MANAGEMENT SDM",
    modul: 8,
    point: "875",
  },
  {
    rank: 5,
    name: "Dewi Lestari",
    kelas: "CREATIVE MARKETING",
    modul: 7,
    point: "740",
  },
  {
    rank: 6,
    name: "Eko Prasetyo",
    kelas: "PEMROGRAMAN",
    modul: 6,
    point: "610",
  },
];
function rkCls(r: number) {
  return ["r1", "r2", "r3"][r - 1] || "rn";
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="pi">
        <div class="pg-hd">
          <h1>Peserta</h1>
          <p>Daftar dan peringkat peserta</p>
        </div>
        <div class="lb-card">
          <div class="lb-hd">Leaderboard Peserta</div>
          <table class="lb-tbl">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Modul</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in peserta" :key="p.rank">
                <td>
                  <span class="rk" :class="rkCls(p.rank)">{{ p.rank }}</span>
                </td>
                <td>
                  <strong>{{ p.name }}</strong>
                </td>
                <td>{{ p.kelas }}</td>
                <td>{{ p.modul }}</td>
                <td>
                  <strong style="color: var(--primary)"
                    >{{ p.point }} Point</strong
                  >
                </td>
              </tr>
            </tbody>
          </table>
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
.lb-card {
  background: white;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  overflow: hidden;
}
.lb-hd {
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  font-weight: 700;
}
.lb-tbl {
  width: 100%;
  border-collapse: collapse;
}
.lb-tbl thead th {
  background: #f8fafc;
  padding: 10px 18px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
}
.lb-tbl tbody tr {
  border-top: 1px solid #f1f5f9;
  transition: background 0.15s;
}
.lb-tbl tbody tr:hover {
  background: #f8fafc;
}
.lb-tbl tbody td {
  padding: 11px 18px;
  font-size: 13px;
}
.rk {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}
.r1 {
  background: #fef9c3;
  color: #854d0e;
}
.r2 {
  background: #f1f5f9;
  color: #475569;
}
.r3 {
  background: #fff7ed;
  color: #9a3412;
}
.rn {
  background: #f8fafc;
  color: #94a3b8;
}
</style>
