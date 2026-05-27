import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase.js'
import { useUIStore } from './ui.js'

// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — edit only this block to update content
// ─────────────────────────────────────────────────────────────
const DEFAULTS = {
  hero: {
    name: 'Shambhu Patil',
    title: 'MBA Candidate · Strategy & Analytics',
    tagline: 'Where Business Acumen Meets Data Intelligence',
    summary: 'MBA candidate at SCMHRD Pune uniquely positioned at the intersection of technical AI/Data Science precision and strategic business logic. National award winner with proven track record in high-stakes competitive environments.',
    status: 'Open to Opportunities',
    location: 'Pune, Maharashtra, India',
    email: 'shambhu@example.com',
    linkedin: 'https://linkedin.com/in/shambhu-patil',
    badges: [
      { text: "MBA'27 SCMHRD", color: '#D97706', icon: 'fas fa-graduation-cap' },
      { text: 'National Winner Ecovate 2025', color: '#10B981', icon: 'fas fa-trophy' },
      { text: 'V-Guard Finalist 2025', color: '#3B82F6', icon: 'fas fa-medal' },
      { text: 'AI & Data Science', color: '#8B5CF6', icon: 'fas fa-brain' },
    ],
  },

  experience: [
    {
      id: 'kone-intern',
      company: 'KONE',
      role: 'Summer Intern',
      period: 'May 2026 – Present',
      location: 'Mumbai, India',
      type: 'Internship',
      bullets: [
        'Conducting strategic analysis and KPI structuring for infrastructure operations management',
        'Developing data-driven insights to support long-term operational planning and efficiency improvements',
        'Collaborating cross-functionally to deliver analytics dashboards using Power BI',
      ],
      tags: ['Strategy', 'KPI Analysis', 'Power BI', 'Operations', 'Infrastructure'],
    },
    {
      id: 'scmhrd-mba',
      company: 'SCMHRD Pune',
      role: 'MBA — Infrastructure Development & Management',
      period: 'Jul 2025 – Jun 2027',
      location: 'Pune, India',
      type: 'Education',
      bullets: [
        'Specializing in Infrastructure Development & Management with focus on analytics-driven strategy',
        'National Winner — Ecovate 2025 (SIBM Pune): sustainability & business innovation competition',
        'National Finalist — V-Guard Big Idea Business Plan Competition 2025',
        'Building 5-year revenue models and financial projections under diverse market scenarios',
      ],
      tags: ['Corporate Finance', 'Strategy', 'Financial Modeling', 'Operations', 'Leadership'],
    },
    {
      id: 'vesit-be',
      company: 'VESIT Mumbai',
      role: 'B.E. — Artificial Intelligence & Data Science',
      period: 'Jun 2020 – May 2024',
      location: 'Mumbai, India',
      type: 'Education',
      bullets: [
        'Graduated in Artificial Intelligence & Data Science Engineering',
        'Built autonomous driving agent using DDQN achieving 65% improvement in lap completion rate',
        'Developed YOLOv5-powered vehicle safety system (Vahan Suraksha Netra) for real-time helmet detection',
        'Served as Public Relations team member, Sports Council — event promotion and communications',
      ],
      tags: ['Python', 'Deep Learning', 'Computer Vision', 'Reinforcement Learning', 'TensorFlow'],
    },
  ],

  projects: [
    {
      id: 'vguard-strategy',
      name: 'Smart Air Fryer Market & Financial Strategy',
      tagline: 'V-Guard Big Idea Business Plan Competition 2025 — National Finalist',
      affiliation: 'V-Guard Industries · 2025',
      description: 'Developed a comprehensive market entry and financial strategy for launching a Smart Air Fryer in the Indian market. Conducted detailed market research identifying three key target segments based on consumer behavior, purchasing power, and health-conscious trends. Built a 5-year revenue and profitability projection model in Excel under optimistic, base, and pessimistic scenarios.',
      stack: ['Financial Modeling', 'Excel', 'Market Research', 'NPV Analysis', 'GTM Strategy'],
      github: '#',
      live: '#',
      highlights: [
        { icon: 'fas fa-chart-line', color: '#D97706', title: '5-Year Revenue Model', desc: 'Built optimistic/base/pessimistic scenario projections with NPV, break-even, and growth rate analysis.' },
        { icon: 'fas fa-users', color: '#10B981', title: '3-Segment Market Analysis', desc: 'Identified target segments via willingness-to-pay analysis and competitive benchmarking.' },
        { icon: 'fas fa-bullhorn', color: '#3B82F6', title: '21-Day GTM Campaign', desc: 'Designed structured launch campaign integrating influencer marketing and retail activation strategies.' },
        { icon: 'fas fa-trophy', color: '#F59E0B', title: 'National Finalist', desc: 'Reached national finals of V-Guard Big Idea Competition 2025 among hundreds of teams.' },
      ],
    },
    {
      id: 'ddqn-driving',
      name: 'Autonomous Driving — DDQN Agent',
      tagline: 'Reinforcement Learning · Double Deep Q-Networks · TensorFlow',
      affiliation: 'VESIT Mumbai · 2024',
      description: 'Developed an intelligent autonomous driving agent using Double Deep Q-Networks (DDQN), reducing overestimation bias vs standard Q-learning. The agent navigated a dynamic virtual track optimizing lap completion time and minimizing collisions through 500+ simulation runs with continuous Q-value updates.',
      stack: ['Python', 'TensorFlow', 'Reinforcement Learning', 'DDQN', 'Reward Engineering'],
      github: '#',
      live: '#',
      highlights: [
        { icon: 'fas fa-car', color: '#10B981', title: '65% Better Lap Rate', desc: 'Improved lap completion rate by 65% through iterative training and hyperparameter tuning.' },
        { icon: 'fas fa-shield-alt', color: '#3B82F6', title: '60% Collision Reduction', desc: 'Enhanced collision avoidance by 60% using penalty-based reward engineering.' },
        { icon: 'fas fa-road', color: '#8B5CF6', title: '55% Fewer Off-Track', desc: 'Reduced off-track incidents by 55% over 500+ simulation training runs.' },
        { icon: 'fas fa-brain', color: '#D97706', title: 'DDQN Architecture', desc: 'Implemented Double DQN to resolve overestimation bias with experience replay buffer.' },
      ],
    },
    {
      id: 'vahan-suraksha',
      name: 'Vahan Suraksha Netra',
      tagline: 'Real-Time Helmet Detection using YOLOv5 · Computer Vision',
      affiliation: 'VESIT Mumbai · 2023',
      description: 'Designed a No-Helmet Detection System leveraging YOLOv5 and computer vision to address the enforcement gap in two-wheeler safety compliance. The system processes live video frames, extracts ROI regions, and classifies helmet presence with configurable confidence thresholds for real-time monitoring.',
      stack: ['Python', 'YOLOv5', 'OpenCV', 'Computer Vision', 'Deep Learning'],
      github: '#',
      live: '#',
      highlights: [
        { icon: 'fas fa-eye', color: '#10B981', title: 'Real-Time Detection', desc: 'YOLOv5 object detection pipeline with per-frame ROI extraction and helmet classification.' },
        { icon: 'fas fa-video', color: '#3B82F6', title: 'Live Video Processing', desc: 'Processes continuous video stream with bounding box visualization and confidence scoring.' },
        { icon: 'fas fa-filter', color: '#8B5CF6', title: 'Confidence Gating', desc: 'Configurable threshold filtering to minimize false positives in helmet detection pipeline.' },
        { icon: 'fas fa-motorcycle', color: '#F59E0B', title: 'Safety Impact', desc: 'Addresses India-specific road safety enforcement gap for two-wheeler helmet compliance.' },
      ],
    },
  ],

  skills: {
    radarLabels: ['Strategy', 'Corp. Finance', 'Data Analytics', 'Operations', 'AI / ML', 'Market Research', 'Fin. Modeling', 'Leadership'],
    radarValues: [85, 80, 88, 75, 82, 86, 88, 78],
    benchmarkValue: 70,
    groups: [
      {
        id: 'business',
        name: 'Business & Strategy',
        icon: 'fas fa-briefcase',
        color: '#D97706',
        skills: ['Strategic Planning', 'Financial Modeling', 'Market Research', 'GTM Strategy', 'Competitive Analysis', 'NPV & DCF Analysis', 'Scenario Planning', 'Break-even Analysis'],
      },
      {
        id: 'analytics',
        name: 'Analytics & BI Tools',
        icon: 'fas fa-chart-bar',
        color: '#10B981',
        skills: ['Power BI', 'Microsoft Excel', 'SQL / MySQL', 'Statistical Analysis', 'Data Visualization', 'KPI Structuring', 'Regression Analysis', 'Linear Regression'],
      },
      {
        id: 'technical',
        name: 'Technical Stack',
        icon: 'fas fa-code',
        color: '#3B82F6',
        skills: ['Python', 'TensorFlow', 'YOLOv5', 'Computer Vision', 'Deep Learning', 'Reinforcement Learning', 'OpenCV', 'NumPy / Pandas'],
      },
      {
        id: 'soft',
        name: 'Leadership & Soft Skills',
        icon: 'fas fa-users',
        color: '#8B5CF6',
        skills: ['Strategic Thinking', 'Presentations', 'Cross-functional Collaboration', 'Communication', 'Teamwork', 'Problem Solving', 'Public Relations', 'Data Storytelling'],
      },
    ],
  },

  analytics_data: {
    totalCompetitions: 2,
    nationalWins: 1,
    nationalFinalist: 1,
    certifications: 8,
    projects: 3,
    hscGrade: 88,
    sscGrade: 95.4,
    primaryDomain: 'Strategy & Analytics',
    patterns: [
      { name: 'Financial Modeling',   icon: 'fas fa-chart-line',      color: '#D97706', pct: 92 },
      { name: 'NPV & DCF Analysis',   icon: 'fas fa-calculator',       color: '#D97706', pct: 88 },
      { name: 'Scenario Planning',    icon: 'fas fa-sitemap',          color: '#D97706', pct: 85 },
      { name: 'Break-even Analysis',  icon: 'fas fa-balance-scale',    color: '#D97706', pct: 84 },
      { name: 'Market Segmentation',  icon: 'fas fa-users',            color: '#10B981', pct: 88 },
      { name: 'GTM Strategy',         icon: 'fas fa-bullhorn',         color: '#10B981', pct: 86 },
      { name: 'Competitive Analysis', icon: 'fas fa-chess',            color: '#10B981', pct: 84 },
      { name: 'KPI Structuring',      icon: 'fas fa-tachometer-alt',   color: '#10B981', pct: 82 },
      { name: 'Power BI Dashboards',  icon: 'fas fa-th-large',         color: '#3B82F6', pct: 88 },
      { name: 'SQL & Database',       icon: 'fas fa-database',         color: '#3B82F6', pct: 82 },
      { name: 'Statistical Methods',  icon: 'fas fa-wave-square',      color: '#3B82F6', pct: 80 },
      { name: 'Data Visualization',   icon: 'fas fa-chart-bar',        color: '#3B82F6', pct: 88 },
      { name: 'Deep Learning',        icon: 'fas fa-brain',            color: '#8B5CF6', pct: 75 },
      { name: 'Computer Vision',      icon: 'fas fa-eye',              color: '#8B5CF6', pct: 78 },
      { name: 'Reinforcement Learning',icon: 'fas fa-robot',           color: '#8B5CF6', pct: 72 },
      { name: 'Python Analytics',     icon: 'fas fa-code',             color: '#8B5CF6', pct: 80 },
      { name: 'Strategic Frameworks', icon: 'fas fa-project-diagram',  color: '#F59E0B', pct: 88 },
    ],
  },

  github_showcase: [
    {
      id: 'ddqn-repo',
      name: 'autonomous-driving-ddqn',
      description: 'Autonomous driving agent with Double Deep Q-Networks achieving 65% improvement in lap completion rate',
      language: 'Python',
      stars: 12,
      forks: 3,
      url: '#',
      topics: ['reinforcement-learning', 'tensorflow', 'ddqn', 'autonomous-driving'],
    },
    {
      id: 'vahan-repo',
      name: 'vahan-suraksha-netra',
      description: 'Real-time helmet detection system using YOLOv5 for two-wheeler safety enforcement',
      language: 'Python',
      stars: 8,
      forks: 2,
      url: '#',
      topics: ['yolov5', 'computer-vision', 'object-detection', 'safety'],
    },
    {
      id: 'vguard-repo',
      name: 'smart-airfryer-financial-model',
      description: '5-year revenue model & GTM strategy for Smart Air Fryer market entry — V-Guard competition',
      language: 'Excel/Python',
      stars: 5,
      forks: 1,
      url: '#',
      topics: ['financial-modeling', 'market-research', 'npv', 'gtm-strategy'],
    },
  ],

  metrics: {
    nationalWins: 1,
    nationalFinalist: 1,
    certifications: 8,
    universities: 2,
    hscGrade: 88,
    sscGrade: 95.4,
    internshipCompany: 'KONE',
    mbaCollege: 'SCMHRD Pune',
    undergrad: 'VESIT Mumbai',
  },
}

// ─────────────────────────────────────────────────────────────
// Store definition
// ─────────────────────────────────────────────────────────────
function deepClone(obj) { return JSON.parse(JSON.stringify(obj)) }

export const usePortfolioStore = defineStore('portfolio', () => {
  const hero             = ref(deepClone(DEFAULTS.hero))
  const experience       = ref(deepClone(DEFAULTS.experience))
  const projects         = ref(deepClone(DEFAULTS.projects))
  const skills           = ref(deepClone(DEFAULTS.skills))
  const analytics_data   = ref(deepClone(DEFAULTS.analytics_data))
  const github_showcase  = ref(deepClone(DEFAULTS.github_showcase))
  const metrics          = ref(deepClone(DEFAULTS.metrics))

  const loading  = ref(false)
  const isDirty  = ref(false)
  const dbError  = ref('')
  const dbStatus = ref('pending')

  // ── Helpers ──
  function markDirty() { isDirty.value = true }

  function onEdit(target, field, value) {
    const v = (typeof value === 'string' ? value : String(value)).trim()
    if (target?.[field] === v) return
    if (target) target[field] = v
    isDirty.value = true
  }

  function onEditNumber(target, field, value) {
    const n = Number(String(value).trim())
    if (Number.isNaN(n)) return
    if (target?.[field] === n) return
    if (target) target[field] = n
    isDirty.value = true
  }

  function onEditList(target, field, value) {
    const list = String(value).split(',').map(t => t.trim()).filter(Boolean)
    if (target) target[field] = list
    isDirty.value = true
  }

  // ── Array CRUD ──
  function addProject() {
    projects.value.push({ id: `temp_${Date.now()}`, name: '📁 New Project', tagline: 'Click to type tagline', affiliation: 'Company · Year', description: 'Click to add project description...', stack: ['Vue 3', 'Python'], github: '#', live: '#', highlights: [{ icon: 'fas fa-star', color: '#10B981', title: 'Feature', desc: 'Click to edit.' }] })
    isDirty.value = true
  }
  function removeProject(id) {
    projects.value = projects.value.filter(p => p.id !== id)
    isDirty.value = true
  }
  function addExperience() {
    experience.value.push({ id: `temp_${Date.now()}`, company: 'Company Name', role: 'Your Role', period: '2026', location: 'City', type: 'Work', bullets: ['Click to add bullet'], tags: ['Tag'] })
    isDirty.value = true
  }

  // ── Contact submission ──
  async function submitContact(payload) {
    const ui = useUIStore()
    if (supabase) {
      const { error } = await supabase.from('contact_messages').insert(payload)
      if (error) { ui.pushLog('error', `CONTACT  insert failed: ${error.message}`); return { ok: false, msg: error.message } }
      ui.pushLog('info', `CONTACT  message queued from ${payload.from_name}`)
      return { ok: true }
    }
    // EmailJS fallback
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: payload.from_name, from_email: payload.from_email, subject: payload.subject, message: payload.message },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      ui.pushLog('info', `CONTACT  sent via EmailJS from ${payload.from_name}`)
      return { ok: true }
    } catch (e) {
      ui.pushLog('error', `CONTACT  EmailJS failed: ${e.message}`)
      return { ok: false, msg: e.message }
    }
  }

  // ── Recommendations ──
  const recommendations = ref([])

  async function fetchRecommendations() {
    if (!supabase) return
    const { data, error } = await supabase.from('portfolio_recommendations').select('*').eq('is_approved', true).order('created_at', { ascending: false })
    if (!error && data?.length) recommendations.value = data
  }

  async function submitRecommendation(payload) {
    if (!supabase) return { ok: false, msg: 'Database not configured' }
    const { error } = await supabase.from('portfolio_recommendations').insert(payload)
    if (error) return { ok: false, msg: error.message }
    return { ok: true }
  }

  // ── Bootstrap (DB overlay — non-blocking after first paint) ──
  async function bootstrap() {
    const ui = useUIStore()
    loading.value = true
    dbStatus.value = 'pending'
    ui.pushLog('info', 'DB  bootstrap initiated')

    if (!supabase) {
      dbStatus.value = 'local_fallback'
      loading.value = false
      ui.pushLog('warn', 'DB  Supabase not configured — serving local defaults')
      return
    }

    try {
      await fetchRecommendations()
      dbStatus.value = 'hydrated'
      ui.pushLog('info', 'DB  recommendations loaded — hydrated')
    } catch (e) {
      dbStatus.value = 'local_fallback'
      dbError.value = e?.message ?? String(e)
      ui.pushLog('error', `DB  bootstrap error: ${dbError.value}`)
    } finally {
      loading.value = false
    }
  }

  return {
    hero, experience, projects, skills, analytics_data, github_showcase, metrics,
    recommendations, loading, isDirty, dbError, dbStatus,
    bootstrap, submitContact, fetchRecommendations, submitRecommendation,
    markDirty, onEdit, onEditNumber, onEditList,
    addProject, removeProject, addExperience,
  }
})
