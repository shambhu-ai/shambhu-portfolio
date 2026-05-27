<template>
  <section id="analytics" class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Business Analytics Toolkit</span>
      <div class="section-eyebrow-line"></div>
      <span class="text-xs text-muted flex-shrink-0 font-mono">{{ store.analytics_data.patterns.length }} methods</span>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">

      <!-- Proficiency bars -->
      <div ref="containerEl" class="metric-card">
        <div class="flex items-center gap-2.5 mb-5">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center" style="background:rgba(201,146,42,0.12)">
            <i class="fas fa-chart-bar text-xs" style="color:#c9922a"></i>
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-wider" style="color:#c9922a">Method Proficiency</p>
            <p class="text-[10px] text-muted mt-0.5">Tools &amp; frameworks across finance, analytics &amp; tech</p>
          </div>
        </div>

        <div class="space-y-0.5">
          <div v-for="(p, i) in store.analytics_data.patterns" :key="p.name + i"
               class="flex items-center gap-3 py-1.5 border-b border-border/40 last:border-0">
            <div class="flex items-center gap-2 w-44 flex-shrink-0">
              <i :class="p.icon" class="text-[10px] flex-shrink-0" :style="{ color: p.color }"></i>
              <span class="text-xs" :class="ui.isDark ? 'text-slate-400' : 'text-slate-600'">{{ p.name }}</span>
            </div>
            <div class="flex-1 progress-track">
              <div class="progress-fill"
                   :style="{ width: isVisible ? p.pct + '%' : '0%', background: p.color }"></div>
            </div>
            <span class="text-xs font-bold font-mono w-9 text-right flex-shrink-0"
                  :style="{ color: p.color }">{{ p.pct }}%</span>
          </div>
        </div>
      </div>

      <!-- Domain summary -->
      <div class="space-y-4">
        <div v-for="domain in domains" :key="domain.label"
             class="metric-card reveal">
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                   :style="{ background: domain.color+'12' }">
                <i :class="domain.icon" class="text-sm" :style="{ color: domain.color }"></i>
              </div>
              <div>
                <p class="text-xs font-bold" :style="{ color: domain.color }">{{ domain.label }}</p>
                <p class="text-[10px] text-muted mt-0.5">{{ domain.tools }}</p>
              </div>
            </div>
            <span class="text-xl font-bold font-mono flex-shrink-0" :style="{ color: domain.color }">{{ domain.avg }}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill"
                 :style="{ width: isVisible ? domain.avg + '%' : '0%', background: domain.color }"></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'
import { useUIStore } from '../stores/ui.js'

const store = usePortfolioStore()
const ui    = useUIStore()
const containerEl = ref(null)
const isVisible   = ref(false)

const domains = [
  { label: 'Corporate Finance & Modeling',   icon: 'fas fa-chart-line',  color: '#c9922a', avg: 87, tools: 'Excel · NPV · DCF · Scenario Planning' },
  { label: 'Market Strategy & GTM',          icon: 'fas fa-bullhorn',    color: '#10B981', avg: 85, tools: 'Segmentation · Competitive Analysis · GTM' },
  { label: 'Data Analytics & BI',            icon: 'fas fa-chart-bar',   color: '#3B82F6', avg: 85, tools: 'Power BI · SQL · Excel · Regression' },
  { label: 'AI / ML Engineering',            icon: 'fas fa-brain',       color: '#8B5CF6', avg: 76, tools: 'Python · TensorFlow · YOLOv5 · OpenCV' },
]

onMounted(() => {
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) { isVisible.value = true; e.target.classList.add('visible') } }),
    { threshold: 0.15 }
  )
  if (containerEl.value) obs.observe(containerEl.value)
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>
