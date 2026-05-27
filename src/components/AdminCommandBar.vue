<template>
  <Teleport to="body">
    <Transition name="admin-bar">
      <div v-if="auth.isAdmin"
           class="fixed bottom-0 left-0 right-0 z-[9998] border-t border-emerald/30"
           style="background: rgba(13,22,38,0.97); backdrop-filter: blur(8px)">
        <div class="max-w-6xl mx-auto px-4 h-12 flex items-center gap-4">
          <!-- Status -->
          <DbStatusBadge />
          <span v-if="store.isDirty" class="font-mono text-[10px] text-amber flex items-center gap-1.5">
            <i class="fas fa-circle text-[8px]"></i>Unsaved changes
          </span>
          <span v-if="store.loading" class="font-mono text-[10px] text-blue-400 flex items-center gap-1.5">
            <i class="fas fa-circle-notch fa-spin text-[10px]"></i>Syncing...
          </span>

          <div class="flex-1"></div>

          <!-- Discard -->
          <button @click="discard"
                  class="px-3 py-1.5 rounded border border-border text-muted font-mono text-[11px] hover:border-red-500/40 hover:text-red-400 transition-all">
            <i class="fas fa-undo mr-1.5 text-[10px]"></i>Discard
          </button>

          <!-- Commit -->
          <button @click="commit" :disabled="!store.isDirty || store.loading"
                  class="px-3 py-1.5 rounded bg-emerald text-slate-900 font-mono font-semibold text-[11px] hover:bg-emerald/90 transition-all disabled:opacity-40">
            <i class="fas fa-cloud-upload-alt mr-1.5 text-[10px]"></i>Commit Changes
          </button>

          <!-- Logout -->
          <button @click="auth.logout()"
                  class="w-7 h-7 rounded border border-border text-muted flex items-center justify-center hover:border-red-500/40 hover:text-red-400 transition-all text-xs">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import { usePortfolioStore } from '../stores/portfolio.js'
import { useUIStore } from '../stores/ui.js'
import DbStatusBadge from './DbStatusBadge.vue'

const auth  = useAuthStore()
const store = usePortfolioStore()
const ui    = useUIStore()

async function discard() {
  await store.bootstrap()
  ui.pushLog('info', 'ADMIN  discarded changes — re-fetched defaults')
}

async function commit() {
  ui.pushLog('info', 'ADMIN  commit initiated (no-op in static mode)')
  store.isDirty = false
}
</script>
