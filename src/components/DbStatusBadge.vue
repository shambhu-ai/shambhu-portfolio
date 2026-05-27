<template>
  <span class="panel-badge" :class="badgeClass">
    <span class="w-1.5 h-1.5 rounded-full" :class="dotClass"></span>
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'

const store = usePortfolioStore()

const label = computed(() => ({
  hydrated:       'Live',
  local_fallback: 'Offline',
  pending:        'Connecting…',
}[store.dbStatus] ?? store.dbStatus))

const badgeClass = computed(() => ({
  hydrated:       'bg-emerald/10 text-emerald border border-emerald/25',
  local_fallback: 'bg-amber/10 text-amber-400 border border-amber/25',
  pending:        'bg-slate-800 text-slate-500 border border-slate-700',
}[store.dbStatus] ?? ''))

const dotClass = computed(() => ({
  hydrated:       'bg-emerald',
  local_fallback: 'bg-amber-400',
  pending:        'bg-slate-500',
}[store.dbStatus] ?? 'bg-slate-500'))
</script>
