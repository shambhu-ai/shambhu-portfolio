<template>
  <section id="contact" class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Get in Touch</span>
      <div class="section-eyebrow-line"></div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">

      <!-- Info side -->
      <div class="space-y-4">
        <div class="metric-card">
          <h3 class="text-lg font-bold mb-1" :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
            Open to Conversations
          </h3>
          <p class="text-sm mb-5 leading-relaxed"
             :class="ui.isDark ? 'text-slate-400' : 'text-slate-600'">
            Whether it's a role, a collaboration, a case discussion, or just a coffee chat — I'd love to hear from you.
          </p>
          <div class="space-y-2">
            <a v-for="link in contactLinks" :key="link.label"
               :href="link.href" :target="link.target"
               class="flex items-center gap-3 p-3 rounded-lg border transition-all group"
               :class="ui.isDark ? 'border-border hover:border-opacity-60' : 'border-slate-200 hover:border-opacity-60'"
               :style="{ '--hover-border': link.color }">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                   :style="{ background: link.color+'12', color: link.color }">
                <i :class="link.icon"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[10px] font-semibold uppercase tracking-wide mb-0.5 text-muted">{{ link.label }}</p>
                <p class="text-sm font-medium truncate"
                   :class="ui.isDark ? 'text-slate-300 group-hover:text-slate-200' : 'text-slate-600 group-hover:text-slate-800'">
                  {{ link.value }}
                </p>
              </div>
              <i class="fas fa-arrow-right text-[10px] text-muted group-hover:translate-x-0.5 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Availability summary -->
        <div class="metric-card">
          <div class="space-y-0">
            <div class="data-row">
              <span class="data-key text-xs">Availability</span>
              <span class="text-xs font-semibold" style="color:#10B981">Open</span>
            </div>
            <div class="data-row">
              <span class="data-key text-xs">Response time</span>
              <span class="data-value text-xs">Within 24 hours</span>
            </div>
            <div class="data-row">
              <span class="data-key text-xs">Time zone</span>
              <span class="data-value text-xs">IST (UTC +5:30)</span>
            </div>
            <div class="data-row">
              <span class="data-key text-xs">Preferred channel</span>
              <span class="data-value text-xs">LinkedIn · Email</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="metric-card">
        <h3 class="text-base font-bold mb-5" :class="ui.isDark ? 'text-slate-200' : 'text-slate-800'">
          Send a Message
        </h3>
        <form @submit.prevent="sendMessage" class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-semibold uppercase tracking-wide text-muted mb-1.5">Name *</label>
              <input v-model="form.from_name" required placeholder="Your full name" class="form-input" />
            </div>
            <div>
              <label class="block text-[10px] font-semibold uppercase tracking-wide text-muted mb-1.5">Email *</label>
              <input v-model="form.from_email" type="email" required placeholder="your@email.com" class="form-input" />
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-semibold uppercase tracking-wide text-muted mb-1.5">Subject</label>
            <input v-model="form.subject" placeholder="e.g. Collaboration Opportunity" class="form-input" />
          </div>
          <div>
            <label class="block text-[10px] font-semibold uppercase tracking-wide text-muted mb-1.5">Message *</label>
            <textarea v-model="form.message" required rows="5" placeholder="Write your message here…" class="form-input resize-none"></textarea>
          </div>
          <div class="flex items-center gap-3 pt-1">
            <button type="submit" :disabled="submitting" class="btn-primary">
              <i class="fas fa-paper-plane text-xs"></i>
              {{ submitting ? 'Sending…' : 'Send Message' }}
            </button>
            <p v-if="msg" class="text-xs font-medium" :class="msgOk ? 'text-emerald' : 'text-red-400'">{{ msg }}</p>
          </div>
        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'
import { useUIStore } from '../stores/ui.js'

const store = usePortfolioStore()
const ui    = useUIStore()

const form = reactive({ from_name: '', from_email: '', subject: '', message: '' })
const submitting = ref(false)
const msg    = ref('')
const msgOk  = ref(false)

const contactLinks = [
  { label: 'LinkedIn', value: 'linkedin.com/in/shambhu-patil', href: 'https://linkedin.com/in/shambhu-patil', target: '_blank', icon: 'fab fa-linkedin', color: '#0A66C2' },
  { label: 'Email',    value: 'shambhu@example.com',            href: 'mailto:shambhu@example.com',            target: '',        icon: 'fas fa-envelope', color: '#c9922a' },
  { label: 'Location', value: 'Pune, Maharashtra, India',       href: '#',                                      target: '',        icon: 'fas fa-map-marker-alt', color: '#10B981' },
]

async function sendMessage() {
  submitting.value = true; msg.value = ''
  const { ok, msg: errMsg } = await store.submitContact({ ...form })
  submitting.value = false
  if (ok) {
    msgOk.value = true; msg.value = '✓ Message sent!'
    Object.assign(form, { from_name: '', from_email: '', subject: '', message: '' })
  } else {
    msgOk.value = false; msg.value = errMsg ?? 'Failed — try LinkedIn.'
  }
}
</script>
