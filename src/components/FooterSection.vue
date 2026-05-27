<template>
  <footer class="border-t mt-8 py-8 px-5"
          :class="ui.isDark ? 'border-border' : 'border-slate-200'">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">

      <!-- Identity -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
             style="background: linear-gradient(135deg,#c9922a,#e8b84b); color:#08090f">
          SP
        </div>
        <div>
          <p class="text-sm font-semibold" :class="ui.isDark ? 'text-slate-300' : 'text-slate-700'">Shambhu Patil</p>
          <p class="text-[10px] text-muted">MBA'27 SCMHRD · AI &amp; Data Science</p>
        </div>
      </div>

      <!-- Built with -->
      <p class="text-[10px] text-muted text-center">
        Built with Vue 3 · Pinia · Supabase · Tailwind CSS v4
      </p>

      <!-- Social -->
      <div class="flex items-center gap-2">
        <a href="https://linkedin.com/in/shambhu-patil" target="_blank"
           class="w-8 h-8 rounded-lg border flex items-center justify-center text-xs transition-all"
           :class="ui.isDark ? 'border-border text-muted hover:text-blue-400 hover:border-blue-400/40' : 'border-slate-200 text-slate-400 hover:text-blue-600'">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="mailto:shambhu@example.com"
           class="w-8 h-8 rounded-lg border flex items-center justify-center text-xs transition-all"
           :class="ui.isDark ? 'border-border text-muted hover:text-gold hover:border-gold/40' : 'border-slate-200 text-slate-400 hover:text-amber-600'">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useUIStore } from '../stores/ui.js'
const ui = useUIStore()
</script>
