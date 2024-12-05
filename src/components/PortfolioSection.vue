<template>
  <section class="portfolio relative min-h-screen bg-gray-900 overflow-hidden py-24" id="portfolio">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/20 to-pink-500/20"></div>
      <!-- Animated Shapes -->
      <div
        v-for="n in 3"
        :key="n"
        class="absolute bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
        :style="getBlobStyle(n)"
      ></div>
    </div>

    <div class="container relative mx-auto px-4 z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-down">
        <h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-4">
          Mine Prosjekter
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex justify-center mb-12 gap-4" data-aos="fade-up">
        <button 
          v-for="filter in filters" 
          :key="filter.name" 
          @click="activeFilter = filter.name" 
          :class="[
            'px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 backdrop-blur-sm',
            activeFilter === filter.name
              ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          ]"
        >
          <font-awesome-icon :icon="filter.icon" />
          {{ filter.name }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-tilt
          v-for="project in filteredProjects" 
          :key="project.id" 
          class="project-card group"
          :data-tilt-max="15"
          :data-tilt-speed="400"
          :data-tilt-scale="1.02"
          :data-tilt-glare="true"
          :data-tilt-max-glare="0.2"
          :data-tilt-perspective="1000"
          data-aos="fade-up"
        >
          <!-- Project Image Container -->
          <div class="relative overflow-hidden rounded-xl aspect-video bg-white/5 backdrop-blur-sm p-2">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-contain rounded-lg transform transition-all duration-500 group-hover:scale-105"
            >

            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
              <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-lg font-semibold text-white mb-2">
                  {{ project.title }}
                </h3>
                <p class="text-gray-300 text-sm line-clamp-2 mb-4">
                  {{ project.description }}
                </p>

                <!-- Action Buttons -->
                <div class="flex items-center gap-4">
                  <a 
                    :href="project.url" 
                    target="_blank"
                    class="inline-flex items-center gap-2 bg-indigo-600/90 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <font-awesome-icon icon="eye" class="text-sm" />
                    Besøk
                  </a>
                  <a 
                    :href="project.repo" 
                    target="_blank"
                    class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <font-awesome-icon :icon="['fab', 'github']" class="text-sm" />
                    Kildekode
                  </a>
                  <button 
                    @click="openModal(project)"
                    class="ml-auto inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <font-awesome-icon icon="info-circle" />
                    Mer Info
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Technologies Used -->
           <div class="flex flex-wrap gap-2 mt-4 px-2">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="px-3 py-1 mb-2 text-xs font-medium bg-white/5 text-indigo-300 rounded-full backdrop-blur-sm"
            >
              {{ tech }}
            </span>
           </div>
          </div>
      </div>

      <Modal
        :isVisible="isModalOpen"
        :project="selectedProject"
        @close="closeModal"
      >
        <template #header>
          <h3 class="text-2x font-bold text-gray-900">
            {{ selectedProject.title }}
          </h3>
        </template>

        <template #body>
          <div class="space-y-6">
            <img
              :src="selectedProject.image"
              :alt="selectedProject.title"
              class="w-full rounded-lg"
            >
            <p class="text-gray-600">
              {{ selectedProject.description }}
            </p>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Technologies Used:</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in selectedProject.technologies"
                  :key="tech"
                  class="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Key Features</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li v-for="feature in selectedProject.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-end gap-4">
            <a
              :href="selectedProject.url"
              target="_blank"
              class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              <font-awesome-icon icon="eye" />
              Besøk
            </a>
            <a
              :href="selectedProject.repo"
              target="_blank"
              class="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              <font-awesome-icon :icon="['fab', 'github']" />
              Kildekode
            </a>
          </div>
        </template>
      </Modal>
    </div>     
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import Modal from './Modal.vue';

// Project Images
import grooveGridImage from '../assets/images/groove-grid_smartmockups.png';
import csmImage from '../assets/images/csm-mockup.png';
import bandSiteImage from '../assets/images/band-website-mockup.png';
import holidazeImage from '../assets/images/holidaze-mockup.png'

defineOptions({
  name: 'PortfolioSection',
})
// Filter configurations
const filters = [
  { name: 'Alle', icon: ['fas', 'globe'] },
  { name: 'React', icon: ['fab', 'react'] },
  { name: 'Vue', icon: ['fab', 'vuejs'] },
  { name: 'TypeScript', icon: ['fas', 'code'] },
];

const activeFilter = ref('Alle');
const isModalOpen = ref(false);
const selectedProject = ref(null);

// Animated background blobs
const getBlobStyle = (index) => {
  const positions = [
    { top: '10%', left: '10%' },
    { top: '60%', right: '10%' },
    { bottom: '10%', left: '40%' }
  ];
  const sizes = ['600px', '500px', '700px'];

  return {
    width: sizes[index - 1],
    height: sizes[index - 1],
    ...positions[index - 1],
    animation: `float-${index} ${15 + index * 2}s infinite linear`,
  };
};

// Projects data
const projects = [
  {
    id: 1,
    title: 'Groove Grid',
    description: 'The Groove Grid er et innovativt og brukervennlig trommeblogg-nettsted, utviklet med HTML, CSS, JavaScript og WordPress REST API. Nettstedet har sider for Hjem, Om, Blogg, Spesifikk Bloggpost og Kontakt. Hovedfunksjonene inkluderer en "Siste innlegg" seksjon på Hjem-siden, en Bloggside som viser de første 10 bloggene med flere lastealternativer, dynamisk innhold på den spesifikke bloggsiden, og en Kontaktside med egendefinert JavaScript-validering. Dette prosjektet demonstrerer avanserte webutviklingsferdigheter, og kombinerer funksjonalitet med en lidenskap for trommer.',
    image: grooveGridImage,
    url: 'https://taupe-medovik-72ed9d.netlify.app/',
    repo: 'https://github.com/chralmli/project-exam-2-chralmli',
    category: 'JavaScript',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress REST API'],
    features: [
      'Dynamisk blogginnhold med WordPress REST API',
      'Responsivt design for alle enheter',
      'Tilpasset JavaScript-validering',
      'Avansert innlastingsfunkjsonalitet'
    ]
  },
  {
    id: 2,
    title: 'Holidaze',
    description: 'Holidaze tilbyr en interaktiv shoppingopplevelse for gamere, med et utvalg av nye og brukte spill.',
    image: holidazeImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/PE-2-holidaze',
    category: 'TypeScript, React',
    technologies: ['TypeScript', 'React'],
    features: [
      'Brukerautentisering',
      'Responsivt design'
    ]
  },
  {
    id: 3,
    title: 'Main Street Revival',
    description: 'Dette er det offisielle nettstedet for bandet mitt, bygget med Next.js. Jeg har utviklet en tilpasset musikkspiller fra bunnen av, slik at brukere kan lytte til våre nyeste låter sømløst. Nettstedet har et moderne design med interaktive elementer, som gir en flott brukeropplevelse.',
    image: bandSiteImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/PE-2-holidaze',
    category: 'TypeScript, React',
    technologies: ['Next.js'],
    features: [
      'Custom Music Player',
      'Responsivt design'
    ]
  },
  {
    id: 4,
    title: 'Community Science Museum',
    description: 'Nettstedet for Community Science Museum er en livlig digital portal designet for å engasjere ungdomsskoleelever og deres foreldre med spennende utdanningsinnhold. Nettstedet viser museets utstillinger og arrangementer gjennom et interaktivt og tilgjengelig grensesnitt, og følger WCAG-standarder for inkludering. Med et responsivt design for sømløs nettlesing på alle enheter, er nettstedet bygget med semantisk HTML for strukturert innhold og optimalisert CSS for best mulig ytelse.',
    image: csmImage,
    url: 'https://elaborate-speculoos-c50810.netlify.app/',
    repo: 'https://github.com/chralmli/PE-2-holidaze',
    category: 'TypeScript, React',
    technologies: ['HTML', 'CSS'],
    features: [
      'Responsivt design'
    ]
  },
];

// Computed properties
const filteredProjects = computed(() => {
  if (activeFilter.value === 'Alle') return projects;
  return projects.filter(project => project.category === activeFilter.value);
});

// Methods
const openModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeModal = () => {
  selectedProject.value = null;
  isModalOpen.value = false;
};
</script>

<style>
@keyframes float-1 {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
    50% { transform: translate(50px, 20px) rotate(180deg) scale(1.1); }
    100% { transform: translate(0, 0) rotate(360deg) scale(1); }
  }

  @keyframes float-2 {
    0% { transform: translate(0, 0) rotate(0deg) scale(1.1); }
    50% { transform: translate(-30px, -50px) rotate(-180deg) scale(1); }
    100% { transform: translate(0, 0) rotate(-360deg) scale(1.1); }
  }

  @keyframes float-3 {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
    50% { transform: translate(20px, 30px) rotate(90deg) scale(1.2); }
    100% { transform: translate(0, 0) rotate(180deg) scale(1); }
  }

.project-card {
  @apply bg-white/5 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300;
  transform-style: preserve-3d;
}

.project-card img {
  transform: translateZ(20px);
}

.project-card .content {
  transform: translateZ(50px);
}

.project-card:hover {
  @apply bg-white/10;
}

/* Add smooth transitions for all hover effects */
.project-card img {
  @apply transition-all duration-300 ease-in-out;
}

/* Enhanced hover effect for images */
.project-card:hover img {
  @apply scale-110 brightness-90;
}

/* Gradient overlay */
.project-card .overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Smooth button transitions */
.action-button {
  @apply transform transition-all duration-300;
}

.action-button:hover {
  @apply -translate-y-0.5;
}

/* Technology tags styling */
.tech-tag {
  @apply bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  @apply bg-indigo-200;
}
</style>