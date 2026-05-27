<template>
  <section class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Performance Dashboard</span>
      <div class="section-eyebrow-line"></div>
    </div>

    <!-- KPI row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label"
           class="metric-card text-center reveal">
        <div class="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
             :style="{ background: kpi.color+'12' }">
          <i :class="kpi.icon" class="text-lg" :style="{ color: kpi.color }"></i>
        </div>
        <div class="stat-number mb-1" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <div class="label-chip">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Competition + Academic split -->
    <div class="grid md:grid-cols-2 gap-5">

      <!-- Awards -->
      <div class="metric-card reveal">
        <div class="flex items-center gap-2.5 mb-5">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center" style="background:rgba(201,146,42,0.12)">
            <i class="fas fa-trophy text-xs" style="color:#c9922a"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-wider" style="color:#c9922a">Competition Record</p>
          </div>
        </div>
        <div class="space-y-3">
          <div class="award-card">
            <div class="award-icon" style="background:rgba(201,146,42,0.12)">
              <i class="fas fa-medal" style="color:#c9922a"></i>
            </div>
            <div>
              <p class="text-sm font-bold" :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
                National Winner — Ecovate 2025
              </p>
              <p class="text-xs mt-0.5" :class="ui.isDark ? 'text-slate-500' : 'text-slate-500'">
                SIBM Pune · Sustainability &amp; Business Innovation
              </p>
            </div>
          </div>
          <div class="award-card">
            <div class="award-icon" style="background:rgba(59,130,246,0.12)">
              <i class="fas fa-star" style="color:#3B82F6"></i>
            </div>
            <div>
              <p class="text-sm font-bold" :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
                National Finalist — V-Guard Big Idea 2025
              </p>
              <p class="text-xs mt-0.5" :class="ui.isDark ? 'text-slate-500' : 'text-slate-500'">
                V-Guard Industries · Business Plan Competition
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Academic performance -->
      <div class="metric-card reveal">
        <div class="flex items-center gap-2.5 mb-5">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center" style="background:rgba(16,185,129,0.12)">
            <i class="fas fa-graduation-cap text-xs" style="color:#10B981"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-wider" style="color:#10B981">Academic Record</p>
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="edu in eduStats" :key="edu.label">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs font-medium" :class="ui.isDark ? 'text-slate-400' : 'text-slate-600'">{{ edu.label }}</span>
              <span class="text-sm font-bold font-mono" :style="{ color: edu.color }">{{ edu.val }}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: edu.pct + '%', background: edu.color }"></div>
            </div>
          </div>

          <div class="pt-3 border-t border-border space-y-2">
            <div class="data-row py-2">
              <span class="data-key text-xs">MBA Institute</span>
              <span class="data-value text-xs" style="color:#c9922a">SCMHRD Pune</span>
            </div>
            <div class="data-row py-2">
              <span class="data-key text-xs">Current Internship</span>
              <span class="data-value text-xs" style="color:#10B981">KONE · May 2026</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'
import { useUIStore } from '../stores/ui.js'

const store = usePortfolioStore()
const ui    = useUIStore()

const kpis = computed(() => [
  { icon: 'fas fa-trophy',         color: '#c9922a', value: store.metrics.nationalWins,    label: 'National Wins'  },
  { icon: 'fas fa-medal',          color: '#3B82F6', value: store.metrics.nationalFinalist, label: 'Finalist'       },
  { icon: 'fas fa-certificate',    color: '#10B981', value: store.metrics.certifications,   label: 'Certifications' },
  { icon: 'fas fa-university',     color: '#8B5CF6', value: store.metrics.universities,     label: 'Institutes'     },
])

const eduStats = computed(() => [
  { label: 'HSC — Shri Dawale Jr College (2018)', pct: store.metrics.hscGrade,  val: store.metrics.hscGrade  + '%', color: '#10B981' },
  { label: 'SSC — Shri Shivaji High School (2016)', pct: store.metrics.sscGrade,  val: store.metrics.sscGrade + '%', color: '#c9922a' },
])

onMounted(() => {
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>
