<template>
  <div class="relative">
    <Radar v-if="ready" :data="chartData" :options="chartOptions" />
    <div v-else class="h-64 flex items-center justify-center text-muted text-sm">Loading…</div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps({
  labels:    { type: Array,  default: () => [] },
  values:    { type: Array,  default: () => [] },
  benchmark: { type: Number, default: 70 },
})

const ready = ref(false)
onMounted(() => { ready.value = true })

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Proficiency',
      data: props.values,
      backgroundColor: 'rgba(201,146,42,0.1)',
      borderColor: '#c9922a',
      borderWidth: 2,
      pointBackgroundColor: '#c9922a',
      pointRadius: 3,
    },
    {
      label: 'Benchmark',
      data: props.labels.map(() => props.benchmark),
      backgroundColor: 'rgba(59,130,246,0.03)',
      borderColor: 'rgba(59,130,246,0.35)',
      borderWidth: 1,
      borderDash: [4, 4],
      pointRadius: 0,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}` } },
  },
  scales: {
    r: {
      min: 0, max: 100,
      ticks: { display: false, stepSize: 25 },
      grid: { color: 'rgba(30,42,58,0.9)' },
      angleLines: { color: 'rgba(30,42,58,0.9)' },
      pointLabels: {
        color: '#5a6a82',
        font: { family: 'Inter', size: 10, weight: '600' },
      },
    },
  },
}
</script>
