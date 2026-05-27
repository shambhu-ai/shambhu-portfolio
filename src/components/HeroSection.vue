<template>
  <section id="hero" class="min-h-screen flex items-center py-20 px-4">
    <div class="max-w-6xl mx-auto w-full">

      <!-- Availability ribbon -->
      <div class="flex items-center gap-3 mb-10">
        <div class="flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer select-none"
             style="border-color:rgba(16,185,129,0.3); background:rgba(16,185,129,0.06)"
             @click="handleStatusClick">
          <span class="w-2 h-2 rounded-full bg-emerald pulse-dot"></span>
          <span class="text-xs font-semibold text-emerald tracking-wide">{{ store.hero.status }}</span>
        </div>
        <div class="h-px flex-1 max-w-xs" style="background:linear-gradient(to right,rgba(16,185,129,0.3),transparent)"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 items-start">

        <!-- Left: identity (3/5) -->
        <div class="lg:col-span-3">
          <h1 class="text-6xl lg:text-7xl font-bold leading-none mb-4 tracking-tight"
              :class="ui.isDark ? 'text-slate-100' : 'text-slate-900'">
            {{ store.hero.name }}
          </h1>

          <div class="flex items-center gap-4 mb-5">
            <div class="h-px w-12" style="background:linear-gradient(to right,#c9922a,#e8b84b)"></div>
            <p class="text-base font-semibold tracking-wide" style="color:#c9922a">
              {{ store.hero.title }}
            </p>
          </div>

          <p class="text-lg mb-4 leading-relaxed font-medium"
             :class="ui.isDark ? 'text-slate-300' : 'text-slate-700'">
            {{ store.hero.tagline }}
          </p>

          <p class="text-sm leading-relaxed mb-8 max-w-xl"
             :class="ui.isDark ? 'text-slate-400' : 'text-slate-500'">
            {{ store.hero.summary }}
          </p>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2 mb-10">
            <div v-for="badge in store.hero.badges" :key="badge.text"
                 class="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold"
                 :style="{ borderColor: badge.color+'35', background: badge.color+'0d', color: badge.color }">
              <i :class="badge.icon" class="text-[11px]"></i>
              {{ badge.text }}
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-3">
            <a href="#contact" class="btn-primary">
              <i class="fas fa-paper-plane text-xs"></i>Get in Touch
            </a>
            <a href="#projects" class="btn-outline">
              <i class="fas fa-briefcase text-xs"></i>Case Studies
            </a>
            <a href="#skills" class="btn-outline">
              <i class="fas fa-chart-pie text-xs"></i>Competencies
            </a>
          </div>
        </div>

        <!-- Right: profile card (2/5) -->
        <div class="lg:col-span-2 space-y-4">

          <!-- Photo + name card -->
          <div class="exec-panel" style="opacity:1">
            <div class="panel-header">
              <span class="panel-title">Executive Profile</span>
              <span class="panel-badge" style="background:rgba(201,146,42,0.1);color:#c9922a;border:1px solid rgba(201,146,42,0.25)">
                <i class="fas fa-id-badge text-[9px]"></i>MBA Candidate
              </span>
            </div>

            <!-- Profile photo -->
            <div class="flex items-center gap-4 px-5 pt-5 pb-4 border-b border-border">
              <div class="relative flex-shrink-0">
                <img v-if="photoLoaded"
                     src="/profile.jpg"
                     alt="Shambhu Patil"
                     class="w-16 h-16 rounded-xl object-cover object-top"
                     style="border: 2px solid rgba(201,146,42,0.4)" />
                <!-- Fallback monogram if photo not present -->
                <div v-else
                     class="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold"
                     style="background: linear-gradient(135deg,#c9922a,#e8b84b); color:#08090f">
                  SP
                </div>
                <!-- Online indicator -->
                <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 bg-emerald"
                      :style="{ borderColor: ui.isDark ? '#0f1117' : '#fff' }"></span>
              </div>
              <div>
                <p class="text-base font-bold" :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
                  {{ store.hero.name }}
                </p>
                <p class="text-xs font-medium mt-0.5" style="color:#c9922a">{{ store.hero.title }}</p>
                <p class="text-[10px] text-muted mt-1 flex items-center gap-1">
                  <i class="fas fa-map-marker-alt text-[8px]"></i>{{ store.hero.location }}
                </p>
              </div>
            </div>

            <!-- Data rows -->
            <div class="px-5 py-1">
              <div class="data-row">
                <span class="data-key">Institution</span>
                <span class="data-value text-xs">SCMHRD, Pune</span>
              </div>
              <div class="data-row">
                <span class="data-key">Programme</span>
                <span class="data-value text-xs">MBA (Infra. &amp; Mgmt) '27</span>
              </div>
              <div class="data-row">
                <span class="data-key">Undergraduate</span>
                <span class="data-value text-xs">VESIT — AI &amp; DS</span>
              </div>
              <div class="data-row">
                <span class="data-key">Current Role</span>
                <span class="data-value text-xs" style="color:#10B981">Summer Intern @ KONE</span>
              </div>
            </div>
          </div>

          <!-- Quick KPIs -->
          <div class="grid grid-cols-2 gap-3">
            <div v-for="kpi in quickKPIs" :key="kpi.label"
                 class="metric-card text-center py-4">
              <div class="stat-number mb-1" :style="{ color: kpi.color }">{{ kpi.value }}</div>
              <div class="label-chip">{{ kpi.label }}</div>
            </div>
          </div>

          <!-- Social links -->
          <div class="flex gap-2">
            <a href="https://linkedin.com/in/shambhu-patil" target="_blank"
               class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-xs font-medium transition-all"
               :class="ui.isDark ? 'text-slate-400 hover:border-blue-500/40 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'">
              <i class="fab fa-linkedin"></i>LinkedIn
            </a>
            <a href="mailto:shambhu@example.com"
               class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-xs font-medium transition-all"
               :class="ui.isDark ? 'text-slate-400 hover:border-gold/40 hover:text-gold' : 'text-slate-500 hover:text-amber-600'">
              <i class="fas fa-envelope"></i>Email
            </a>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'
import { useUIStore } from '../stores/ui.js'

const store = usePortfolioStore()
const ui    = useUIStore()

// Probe whether profile.jpg exists — show monogram fallback if not
const photoLoaded = ref(false)
onMounted(() => {
  const img = new Image()
  img.onload  = () => { photoLoaded.value = true }
  img.onerror = () => { photoLoaded.value = false }
  img.src = '/profile.jpg'
})

const quickKPIs = computed(() => [
  { value: '2',     label: 'Natl. Awards', color: '#c9922a' },
  { value: '8',     label: 'Certs',        color: '#10B981' },
  { value: '3',     label: 'Projects',     color: '#3B82F6' },
  { value: '95.4%', label: 'SSC Score',    color: '#8B5CF6' },
])

let clickCount = 0, resetTimer = null
function handleStatusClick() {
  clickCount++
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { clickCount = 0 }, 600)
  if (clickCount >= 3) { clickCount = 0; ui.toggleAdminModal() }
}
</script>
