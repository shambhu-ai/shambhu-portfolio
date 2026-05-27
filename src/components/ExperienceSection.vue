<template>
  <section id="experience" class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Career &amp; Education</span>
      <div class="section-eyebrow-line"></div>
    </div>

    <div class="relative pl-8">
      <div class="timeline-rail"></div>

      <div v-for="(job, idx) in store.experience" :key="job.id"
           class="relative mb-7 reveal">
        <!-- Timeline node -->
        <div class="timeline-node" :style="{ top: '14px', background: typeColor(job.type) }"></div>

        <div class="metric-card">
          <!-- Header -->
          <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-1 rounded text-[10px] font-semibold tracking-wide uppercase"
                      :style="{ color: typeColor(job.type), background: typeColor(job.type)+'12', border: '1px solid '+ typeColor(job.type)+'30' }">
                  {{ job.type }}
                </span>
              </div>
              <h3 class="text-lg font-bold leading-tight mb-1"
                  :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
                {{ job.company }}
              </h3>
              <p class="text-sm font-semibold" :style="{ color: typeColor(job.type) }">{{ job.role }}</p>
            </div>
            <div class="text-right text-xs">
              <div class="font-semibold mb-1" :class="ui.isDark ? 'text-slate-300' : 'text-slate-600'">
                {{ job.period }}
              </div>
              <div class="text-muted flex items-center gap-1.5 justify-end">
                <i class="fas fa-map-marker-alt text-[9px]"></i>{{ job.location }}
              </div>
            </div>
          </div>

          <!-- Bullets -->
          <ul class="space-y-2 mb-4">
            <li v-for="(b, bi) in job.bullets" :key="bi"
                class="flex gap-2.5 text-sm leading-relaxed"
                :class="ui.isDark ? 'text-slate-400' : 'text-slate-600'">
              <span class="mt-0.5 flex-shrink-0 text-xs" :style="{ color: typeColor(job.type) }">▸</span>
              {{ b }}
            </li>
          </ul>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in job.tags" :key="tag" class="tag-pill">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'
import { useUIStore } from '../stores/ui.js'

const store = usePortfolioStore()
const ui    = useUIStore()

function typeColor(t) {
  return { Work: '#c9922a', Education: '#10B981', Internship: '#3B82F6' }[t] ?? '#5a6a82'
}

onMounted(() => {
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>
