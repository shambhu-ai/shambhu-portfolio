<template>
  <div class="metric-card reveal flex flex-col">
    <!-- Category tag -->
    <div class="flex items-start justify-between gap-3 mb-4">
      <div>
        <p class="text-[10px] font-semibold uppercase tracking-widest mb-2" style="color:#c9922a">
          <i class="fas fa-briefcase text-[9px] mr-1"></i>{{ project.affiliation }}
        </p>
        <h3 class="text-base font-bold leading-snug mb-1"
            :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
          {{ project.name }}
        </h3>
        <p class="text-xs font-medium" :class="ui.isDark ? 'text-slate-400' : 'text-slate-500'">
          {{ project.tagline }}
        </p>
      </div>
      <div class="flex gap-1.5 flex-shrink-0">
        <a v-if="project.github && project.github !== '#'" :href="project.github" target="_blank"
           class="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted hover:text-slate-300 hover:border-slate-600 transition-all text-xs">
          <i class="fab fa-github"></i>
        </a>
        <a v-if="project.live && project.live !== '#'" :href="project.live" target="_blank"
           class="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted hover:text-emerald hover:border-emerald/40 transition-all text-xs">
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>

    <!-- Divider -->
    <div class="gold-line mb-4"></div>

    <!-- Description -->
    <p class="text-sm leading-relaxed mb-5 flex-1"
       :class="ui.isDark ? 'text-slate-400' : 'text-slate-600'">
      {{ project.description }}
    </p>

    <!-- Highlights 2×2 grid -->
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div v-for="h in project.highlights" :key="h.title"
           class="p-3 rounded-lg border transition-colors"
           :style="{ borderColor: h.color+'20', background: h.color+'08' }">
        <div class="flex items-center gap-1.5 mb-1">
          <i :class="h.icon" class="text-[10px]" :style="{ color: h.color }"></i>
          <span class="text-[10px] font-bold uppercase tracking-wide" :style="{ color: h.color }">{{ h.title }}</span>
        </div>
        <p class="text-[11px] leading-relaxed"
           :class="ui.isDark ? 'text-slate-500' : 'text-slate-600'">{{ h.desc }}</p>
      </div>
    </div>

    <!-- Stack pills -->
    <div class="flex flex-wrap gap-1.5 mt-auto">
      <span v-for="tag in project.stack" :key="tag" class="tag-pill text-[10px]">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
import { useUIStore } from '../stores/ui.js'
defineProps({ project: { type: Object, required: true } })
const ui = useUIStore()
</script>
