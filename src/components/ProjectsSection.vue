<template>
  <section id="projects" class="py-6 px-6">
    <div class="section-eyebrow">
      <span class="section-eyebrow-text">Strategic Case Studies</span>
      <div class="section-eyebrow-line"></div>
      <span class="text-xs font-mono text-muted flex-shrink-0">{{ store.projects.length }} initiatives</span>
    </div>

    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      <ProjectCard v-for="project in store.projects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '../stores/portfolio.js'
import ProjectCard from './ProjectCard.vue'
const store = usePortfolioStore()
</script>
