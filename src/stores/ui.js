import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const adminModalOpen = ref(false)
  const isDark = ref(true)

  const systemLogs = ref([])
  const MAX_LOGS = 120

  function toggleAdminModal() {
    adminModalOpen.value = !adminModalOpen.value
  }
  function closeAdminModal() {
    adminModalOpen.value = false
  }

  function pushLog(level, msg) {
    systemLogs.value.unshift({ id: Date.now() + Math.random(), level, msg, ts: new Date().toISOString().slice(11,19) })
    if (systemLogs.value.length > MAX_LOGS) systemLogs.value.length = MAX_LOGS
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    if (isDark.value) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return { adminModalOpen, isDark, systemLogs, toggleAdminModal, closeAdminModal, pushLog, toggleTheme }
})
