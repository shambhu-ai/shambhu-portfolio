<template>
  <div ref="panelEl" class="exec-panel mb-5">
    <!-- Panel header -->
    <div class="panel-header">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-4 rounded-full" :style="{ background: accentColor }"></div>
        <span class="panel-title">{{ title }}</span>
      </div>
      <div class="flex items-center gap-2">
        <slot name="badge" />
        <button @click="isCollapsed = !isCollapsed"
                class="w-6 h-6 rounded flex items-center justify-center text-muted hover:text-slate-400 transition-colors text-xs ml-1">
          <i :class="isCollapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-up'"></i>
        </button>
      </div>
    </div>
    <!-- Content -->
    <Transition name="collapse">
      <div v-show="!isCollapsed">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { animate, inView } from 'motion'

const props = defineProps({
  title:       { type: String, default: 'Section' },
  accentColor: { type: String, default: '#c9922a' },
  delay:       { type: Number, default: 0 },
})

const panelEl    = ref(null)
const isCollapsed = ref(false)
let stopInView   = null

onMounted(() => {
  if (!panelEl.value) return
  stopInView = inView(panelEl.value, () => {
    animate(
      panelEl.value,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.5, delay: props.delay / 1000, easing: [0.22, 1, 0.36, 1] }
    )
  }, { amount: 0.06 })
})

onUnmounted(() => { if (stopInView) stopInView() })
</script>

<style scoped>
.collapse-enter-active, .collapse-leave-active { transition: max-height 0.3s ease, opacity 0.3s ease; max-height: 3000px; }
.collapse-enter-from, .collapse-leave-to { max-height: 0; opacity: 0; }
</style>
