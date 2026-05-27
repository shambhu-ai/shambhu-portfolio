<template>
  <section class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Recognitions &amp; Highlights</span>
      <div class="section-eyebrow-line"></div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in highlights" :key="item.title"
           class="metric-card reveal flex flex-col">
        <!-- Icon -->
        <div class="w-11 h-11 rounded-xl mb-4 flex items-center justify-center"
             :style="{ background: item.color+'12' }">
          <i :class="item.icon" class="text-lg" :style="{ color: item.color }"></i>
        </div>
        <!-- Category -->
        <p class="text-[10px] font-bold uppercase tracking-widest mb-2" :style="{ color: item.color }">
          {{ item.category }}
        </p>
        <!-- Title -->
        <h4 class="text-sm font-bold leading-snug mb-2 flex-1"
            :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
          {{ item.title }}
        </h4>
        <!-- Description -->
        <p class="text-xs leading-relaxed mb-4"
           :class="ui.isDark ? 'text-slate-500' : 'text-slate-500'">
          {{ item.desc }}
        </p>
        <!-- Footer chip -->
        <div class="mt-auto pt-3 border-t border-border">
          <span class="px-2.5 py-1 rounded text-[10px] font-semibold"
                :style="{ background: item.color+'10', color: item.color }">
            {{ item.date }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUIStore } from '../stores/ui.js'

const ui = useUIStore()

const highlights = [
  {
    icon: 'fas fa-trophy', color: '#c9922a', category: 'National Award',
    title: 'National Winner — Ecovate 2025',
    desc: 'Won the national sustainability & business innovation competition at SIBM Pune, competing against teams from top B-schools across India.',
    date: 'Ecovate 2025 · SIBM Pune',
  },
  {
    icon: 'fas fa-star', color: '#3B82F6', category: 'National Finalist',
    title: 'V-Guard Big Idea Business Plan Competition',
    desc: 'Reached national finals with a comprehensive Smart Air Fryer market entry strategy including 5-year financial model and 21-day GTM campaign.',
    date: 'V-Guard BPC 2025',
  },
  {
    icon: 'fas fa-building', color: '#10B981', category: 'Industry Internship',
    title: 'Summer Intern — KONE',
    desc: 'Selected for internship at KONE, a global leader in the elevator and escalator industry, working on strategic analytics and KPI dashboards.',
    date: 'KONE · May 2026',
  },
  {
    icon: 'fas fa-graduation-cap', color: '#8B5CF6', category: 'Post-Graduate',
    title: 'MBA — SCMHRD Pune (Batch 2027)',
    desc: 'Pursuing MBA in Infrastructure Development & Management at Symbiosis Centre for Management & Human Resource Development, Pune.',
    date: '2025 – 2027',
  },
  {
    icon: 'fas fa-robot', color: '#F59E0B', category: 'Research Project',
    title: 'Autonomous Driving Agent — DDQN',
    desc: '65% improvement in lap completion rate using Double Deep Q-Networks in simulation. Published as capstone project at VESIT Mumbai.',
    date: 'VESIT · 2024',
  },
  {
    icon: 'fas fa-certificate', color: '#E84A27', category: 'Certifications',
    title: '8 Professional Certifications',
    desc: 'Earned verified certifications from Meta, Microsoft, Macquarie, Rice, Politecnico di Milano, University of Illinois, and University of Amsterdam.',
    date: '2025 – 2026',
  },
]

onMounted(() => {
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>
