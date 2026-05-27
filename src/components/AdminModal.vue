<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="ui.adminModalOpen"
           class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
           style="background: rgba(11,15,25,0.85); backdrop-filter: blur(4px)"
           @click.self="ui.closeAdminModal()">
        <div class="os-window w-full max-w-sm" style="opacity:1">
          <div class="os-titlebar">
            <span class="traffic-light tl-red" @click="ui.closeAdminModal()"></span>
            <span class="traffic-light tl-yellow"></span>
            <span class="traffic-light tl-green"></span>
            <span class="titlebar-path"><span>~/admin</span><span class="text-slate-500 ml-2">$ authenticate</span></span>
          </div>
          <div class="p-6">
            <div class="terminal-line mb-4 space-y-1">
              <div><span class="terminal-prompt">➜ </span><span class="text-slate-400">admin.login()</span></div>
              <div class="text-muted text-xs">Enter credentials to enable edit mode.</div>
              <div class="text-muted text-xs opacity-60">Dev shortcut: admin / admin</div>
            </div>
            <form @submit.prevent="doLogin" class="space-y-3">
              <div>
                <label class="block font-mono text-[10px] text-muted mb-1">Email</label>
                <input v-model="email" type="text" placeholder="admin" autofocus
                       class="admin-input" />
              </div>
              <div>
                <label class="block font-mono text-[10px] text-muted mb-1">Password</label>
                <input v-model="password" type="password" placeholder="••••••••"
                       class="admin-input" />
              </div>
              <p v-if="auth.authError" class="font-mono text-xs text-red-400">
                ✗ {{ auth.authError }}
              </p>
              <button type="submit" :disabled="loading"
                      class="w-full py-2.5 rounded bg-emerald text-slate-900 font-mono font-semibold text-sm hover:bg-emerald/90 transition-colors disabled:opacity-50">
                {{ loading ? 'Authenticating...' : '$ authenticate' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useUIStore } from '../stores/ui.js'
import { useAuthStore } from '../stores/auth.js'

const ui = useUIStore()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)

async function doLogin() {
  loading.value = true
  await auth.login(email.value, password.value)
  loading.value = false
}
</script>

<style scoped>
.admin-input {
  width: 100%;
  background: #0B0F19;
  border: 1px solid #1f2d45;
  border-radius: 6px;
  padding: 8px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.15s;
}
.admin-input:focus { border-color: rgba(16,185,129,0.6); }
.admin-input::placeholder { color: #4b5563; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
