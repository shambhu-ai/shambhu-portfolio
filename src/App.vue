<template>
  <div :class="ui.isDark ? 'dark' : ''">
    <NavBar />

    <main class="max-w-6xl mx-auto px-4 pb-20">

      <!-- Hero — full-bleed, no panel wrapper -->
      <HeroSection />

      <!-- Work & Education Timeline -->
      <OsWindow title="Career & Education Timeline" accent-color="#c9922a">
        <ExperienceSection />
      </OsWindow>

      <!-- Case Studies -->
      <OsWindow title="Strategic Case Studies" accent-color="#3B82F6">
        <ProjectsSection />
      </OsWindow>

      <!-- Core Competencies -->
      <OsWindow title="Core Competencies & Skills" accent-color="#10B981">
        <StackSection />
      </OsWindow>

      <!-- Performance KPIs -->
      <OsWindow title="Performance Dashboard" accent-color="#c9922a">
        <MetricsDashboard />
      </OsWindow>

      <!-- Analytics Toolkit -->
      <OsWindow title="Business Analytics Toolkit" accent-color="#8B5CF6">
        <AlgoSection />
      </OsWindow>

      <!-- Awards & Recognitions -->
      <OsWindow title="Awards & Recognitions" accent-color="#F59E0B">
        <GithubSection />
      </OsWindow>

      <!-- Certifications -->
      <OsWindow title="Professional Certifications" accent-color="#10B981">
        <CertsSection />
      </OsWindow>

      <!-- Peer Recommendations -->
      <OsWindow title="Peer Recommendations" accent-color="#8B5CF6">
        <RecommendationsSection />
      </OsWindow>

      <!-- Contact -->
      <OsWindow title="Get in Touch" accent-color="#c9922a">
        <ContactSection />
      </OsWindow>

    </main>

    <FooterSection />
    <AdminModal />
    <AdminCommandBar />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from './stores/portfolio.js'
import { useUIStore } from './stores/ui.js'

import NavBar                 from './components/NavBar.vue'
import OsWindow               from './components/OsWindow.vue'
import HeroSection            from './components/HeroSection.vue'
import ExperienceSection      from './components/ExperienceSection.vue'
import ProjectsSection        from './components/ProjectsSection.vue'
import StackSection           from './components/StackSection.vue'
import MetricsDashboard       from './components/MetricsDashboard.vue'
import AlgoSection            from './components/AlgoSection.vue'
import GithubSection          from './components/GithubSection.vue'
import CertsSection           from './components/CertsSection.vue'
import RecommendationsSection from './components/RecommendationsSection.vue'
import ContactSection         from './components/ContactSection.vue'
import FooterSection          from './components/FooterSection.vue'
import AdminModal             from './components/AdminModal.vue'
import AdminCommandBar        from './components/AdminCommandBar.vue'

const store = usePortfolioStore()
const ui    = useUIStore()

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault()
      ui.toggleAdminModal()
    }
  })
  store.bootstrap()
})
</script>
