<template>
  <section id="skills" class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Core Competencies</span>
      <div class="section-eyebrow-line"></div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Competency groups (2/3 width) -->
      <div class="lg:col-span-2 grid sm:grid-cols-2 gap-4">
        <div v-for="group in store.skills.groups" :key="group.id"
             class="metric-card reveal">
          <div class="flex items-center gap-2.5 mb-4">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                 :style="{ background: group.color+'15', color: group.color }">
              <i :class="group.icon"></i>
            </div>
            <div>
              <p class="text-xs font-bold" :style="{ color: group.color }">{{ group.name }}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="skill in group.skills" :key="skill" class="tag-pill">{{ skill }}</span>
          </div>
        </div>
      </div>

      <!-- Proficiency radar (1/3 width) -->
      <div class="metric-card flex flex-col">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-1.5 h-4 rounded-full" style="background:#c9922a"></div>
          <span class="text-xs font-bold uppercase tracking-wider" style="color:#c9922a">Proficiency Radar</span>
        </div>
        <p class="text-[11px] text-muted mb-4">Strategic competency profile vs. 70% industry benchmark</p>
        <SkillsChart
          :labels="store.skills.radarLabels"
          :values="store.skills.radarValues"
          :benchmark="store.skills.benchmarkValue"
        />
        <div class="mt-4 flex items-center gap-5 text-[10px] text-muted">
          <div class="flex items-center gap-1.5">
            <div class="w-3 h-0.5 rounded" style="background:#c9922a"></div>
            <span>Profile</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-3 h-0.5 rounded" style="border-top:1px dashed #3B82F6; background:none"></div>
            <span>Benchmark ({{ store.skills.benchmarkValue }})</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'
import SkillsChart from './SkillsChart.vue'

const store = usePortfolioStore()

onMounted(() => {
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>
