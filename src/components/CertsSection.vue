<template>
  <section class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Professional Certifications</span>
      <div class="section-eyebrow-line"></div>
      <span class="text-xs text-muted flex-shrink-0">{{ CERTS.length }} verified</span>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="cert in CERTS" :key="cert.name"
           class="metric-card reveal flex flex-col group">
        <!-- Issuer row -->
        <div class="flex items-center gap-2.5 mb-3">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
               :style="{ background: cert.color+'12', color: cert.color }">
            <i :class="cert.icon"></i>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-wide" :style="{ color: cert.color }">{{ cert.issuer }}</p>
          </div>
        </div>

        <!-- Cert name -->
        <p class="text-sm font-semibold leading-snug flex-1 mb-4"
           :class="ui.isDark ? 'text-slate-300 group-hover:text-slate-200' : 'text-slate-700 group-hover:text-slate-900'">
          {{ cert.name }}
        </p>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <span class="text-[10px] text-muted font-mono">{{ cert.issued }}</span>
          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide"
                :style="{ background: cert.color+'10', color: cert.color }">
            Verified
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

const CERTS = [
  { name: 'Database Structures and Management with MySQL', issuer: 'Meta',                issued: 'Feb 2026', icon: 'fab fa-meta',        color: '#1877F2' },
  { name: 'Power BI Fundamentals and Data Modeling',       issuer: 'Microsoft',           issued: 'Feb 2026', icon: 'fab fa-microsoft',   color: '#00A4EF' },
  { name: 'Excel Skills for Business',                     issuer: 'Macquarie Univ.',     issued: 'Dec 2025', icon: 'fas fa-table',        color: '#10B981' },
  { name: 'Linear Regression for Business Statistics',     issuer: 'Rice University',     issued: 'Sep 2025', icon: 'fas fa-chart-line',   color: '#003087' },
  { name: 'Fundamentals of Financial & Mgmt Accounting',  issuer: 'Politecnico Milano',  issued: 'Sep 2025', icon: 'fas fa-university',   color: '#c9922a' },
  { name: 'Firm Level Economics: Consumer & Producer',     issuer: 'Univ. of Illinois',   issued: 'Sep 2025', icon: 'fas fa-building',     color: '#E84A27' },
  { name: 'Quantitative Methods',                          issuer: 'Univ. of Amsterdam',  issued: 'Sep 2025', icon: 'fas fa-superscript',  color: '#8B5CF6' },
  { name: 'Corporate Finance II: Financing & Risk',        issuer: 'Univ. of Illinois',   issued: 'Dec 2025', icon: 'fas fa-landmark',     color: '#3B82F6' },
]

onMounted(() => {
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
})
</script>
