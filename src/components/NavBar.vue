<template>
  <nav class="sticky top-0 z-50 transition-all duration-300"
       :class="scrolled ? 'bg-nav shadow-lg' : 'bg-transparent'">
    <div class="max-w-6xl mx-auto px-5 h-15 flex items-center justify-between" style="height:60px">

      <!-- Monogram + name -->
      <a href="#hero" class="flex items-center gap-3 group">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
             style="background: linear-gradient(135deg,#c9922a,#e8b84b); color:#08090f">
          SP
        </div>
        <div class="hidden sm:block">
          <div class="text-sm font-semibold leading-tight" :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
            Shambhu Patil
          </div>
          <div class="text-[10px] font-medium" style="color:#c9922a; letter-spacing:0.06em">
            MBA Candidate · SCMHRD'27
          </div>
        </div>
      </a>

      <!-- Nav links -->
      <div class="hidden md:flex items-center gap-1">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
           class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
           :class="ui.isDark
             ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
             : 'text-slate-500 hover:text-slate-800 hover:bg-black/5'">
          {{ link.label }}
        </a>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <button @click="ui.toggleTheme()"
                class="w-8 h-8 rounded-lg border transition-all text-xs flex items-center justify-center"
                :class="ui.isDark
                  ? 'border-border text-slate-500 hover:text-gold hover:border-gold/40'
                  : 'border-slate-300 text-slate-500 hover:text-amber-600 hover:border-amber-400/50'">
          <i :class="ui.isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <a href="/resume.pdf" download
           class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
           style="border: 1px solid rgba(201,146,42,0.4); color:#c9922a"
           onmouseover="this.style.background='rgba(201,146,42,0.1)'"
           onmouseout="this.style.background='transparent'">
          <i class="fas fa-download text-[10px]"></i>
          <span class="hidden sm:inline">Resume</span>
        </a>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUIStore } from '../stores/ui.js'

const ui = useUIStore()
const scrolled = ref(false)

const navLinks = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Case Studies' },
  { href: '#skills',     label: 'Competencies' },
  { href: '#analytics',  label: 'Analytics' },
  { href: '#contact',    label: 'Contact' },
]

function onScroll() { scrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.bg-nav {
  background: rgba(8, 9, 15, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(30, 42, 58, 0.8);
}
</style>
