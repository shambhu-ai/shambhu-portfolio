<template>
  <section class="py-4 px-6">
    <div class="flex items-center gap-3 mb-8">
      <span class="section-label">Peer Recommendations — Guestbook</span>
      <div class="flex-1 h-px bg-border"></div>
      <DbStatusBadge />
    </div>

    <!-- Approved recommendations grid -->
    <div v-if="store.recommendations.length" class="grid md:grid-cols-2 gap-4 mb-8">
      <div v-for="rec in store.recommendations" :key="rec.id"
           class="metric-card">
        <div class="flex items-start gap-3 mb-3">
          <div class="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
            <span class="font-mono text-sm font-bold text-gold">{{ rec.author_name[0] }}</span>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-300">{{ rec.author_name }}</p>
            <p class="font-mono text-[10px] text-muted">{{ rec.author_title }}{{ rec.company ? ' · ' + rec.company : '' }}</p>
          </div>
          <span v-if="rec.relationship" class="ml-auto px-2 py-0.5 rounded text-[9px] font-mono border border-emerald/30 text-emerald bg-emerald/5">
            {{ rec.relationship }}
          </span>
        </div>
        <p class="text-sm text-slate-400 leading-relaxed italic">"{{ rec.testimonial_text }}"</p>
      </div>
    </div>

    <div v-else class="metric-card text-center py-8 mb-8">
      <i class="fas fa-quote-right text-3xl text-muted mb-3"></i>
      <p class="text-muted font-mono text-sm">No approved recommendations yet. Be the first!</p>
    </div>

    <!-- Submission form -->
    <div class="metric-card max-w-xl">
      <div class="flex items-center gap-2 mb-5">
        <i class="fas fa-pen text-gold text-sm"></i>
        <span class="section-label">Submit a Recommendation</span>
      </div>

      <form @submit.prevent="submitForm" class="space-y-3">
        <div class="grid sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-mono text-[10px] text-muted mb-1">Name *</label>
            <input v-model="form.author_name" required placeholder="Your full name"
                   class="input-field" />
          </div>
          <div>
            <label class="block font-mono text-[10px] text-muted mb-1">Title / Role *</label>
            <input v-model="form.author_title" required placeholder="e.g. Product Manager"
                   class="input-field" />
          </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-mono text-[10px] text-muted mb-1">Company</label>
            <input v-model="form.company" placeholder="Company name"
                   class="input-field" />
          </div>
          <div>
            <label class="block font-mono text-[10px] text-muted mb-1">Relationship</label>
            <input v-model="form.relationship" placeholder="e.g. Classmate, Mentor"
                   class="input-field" />
          </div>
        </div>
        <div>
          <label class="block font-mono text-[10px] text-muted mb-1">Testimonial *</label>
          <textarea v-model="form.testimonial_text" required rows="4"
                    placeholder="Share your experience working with Shambhu..."
                    class="input-field resize-none"></textarea>
        </div>
        <div class="flex items-center gap-3 pt-1">
          <button type="submit" :disabled="submitting"
                  class="flex items-center gap-2 px-4 py-2 rounded bg-gold text-slate-900 font-semibold text-sm hover:bg-amber-500 transition-colors disabled:opacity-50">
            <i class="fas fa-paper-plane text-xs"></i>
            {{ submitting ? 'Submitting...' : 'Submit Recommendation' }}
          </button>
          <p v-if="msg" class="font-mono text-xs" :class="msgOk ? 'text-emerald' : 'text-red-400'">
            {{ msg }}
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { usePortfolioStore } from '../stores/portfolio.js'
import DbStatusBadge from './DbStatusBadge.vue'

const store = usePortfolioStore()

const form = reactive({ author_name: '', author_title: '', company: '', relationship: '', testimonial_text: '' })
const submitting = ref(false)
const msg = ref('')
const msgOk = ref(false)

async function submitForm() {
  submitting.value = true
  msg.value = ''
  const { ok, msg: errMsg } = await store.submitRecommendation({ ...form })
  submitting.value = false
  if (ok) {
    msgOk.value = true
    msg.value = '✓ Submitted! Awaiting approval — thank you.'
    Object.assign(form, { author_name: '', author_title: '', company: '', relationship: '', testimonial_text: '' })
  } else {
    msgOk.value = false
    msg.value = errMsg ?? 'Submission failed'
  }
}
</script>

<style scoped>
.input-field {
  width: 100%;
  background: #0B0F19;
  border: 1px solid #1f2d45;
  border-radius: 6px;
  padding: 8px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.15s;
}
.input-field:focus { border-color: rgba(217,119,6,0.6); }
.input-field::placeholder { color: #4b5563; }
</style>
