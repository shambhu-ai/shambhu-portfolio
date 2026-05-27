import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase.js'
import { useUIStore } from './ui.js'

export const useAuthStore = defineStore('auth', () => {
  const isAdmin = ref(false)
  const authError = ref('')

  async function login(email, password) {
    authError.value = ''
    const ui = useUIStore()

    // Dev-mode offline shortcut
    if (!supabase) {
      if (email === 'admin' && password === 'admin') {
        isAdmin.value = true
        ui.closeAdminModal()
        ui.pushLog('info', 'AUTH  dev-mode bypass — admin flag set')
        return true
      }
      authError.value = 'Invalid credentials'
      return false
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { authError.value = error.message; return false }
    isAdmin.value = true
    ui.closeAdminModal()
    ui.pushLog('info', `AUTH  signed in as ${email}`)
    return true
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut()
    isAdmin.value = false
    const ui = useUIStore()
    ui.pushLog('info', 'AUTH  signed out')
  }

  return { isAdmin, authError, login, logout }
})
