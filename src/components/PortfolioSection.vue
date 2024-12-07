<template>
  <section class="portfolio relative min-h-screen overflow-hidden py-24" id="portfolio">

    <!-- Main Content -->
    <div class="container relative z-1 mx-auto px-4 z-10">
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
          @click="handleFilterClick(filter)" 
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
          ref="projectCards"
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
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import Modal from './Modal.vue';
import VanillaTilt from 'vanilla-tilt';

// Project Images
import grooveGridImage from '../assets/images/groove-grid_smartmockups.png';
import csmImage from '../assets/images/csm-mockup.png';
import bandSiteImage from '../assets/images/band-website-mockup.png';
import holidazeImage from '../assets/images/holidaze-mockup.png';
import ecomImage from '../assets/images/ecom-mockup.png';
import auctionImage from '../assets/images/auction-mockup.png';
import socialImage from '../assets/images/iron-crew-mockup.png';
import gameHubImage from '../assets/images/gamehub-mockup.png';

// State management
const activeFilter = ref('all');
const isModalOpen = ref(false);
const selectedProject = ref(null);

    // Initialize Vanilla Tilt
    nextTick(() => {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
      max: 10,
      speed: 300,
      scale: 1.05,
      glare: false,
      perspective: 800,
      gyroscope: true,
      gyroscopeSamples: 10,
    });
  });

defineOptions({
  name: 'PortfolioSection',
})
// Filter configurations
const filters = [
  { name: 'Alle', value: 'all', icon: ['fas', 'globe'] },
  { name: 'React', value: 'react', icon: ['fab', 'react'] },
  { name: 'Vue', value: 'vue', icon: ['fab', 'vuejs'] },
  { name: 'TypeScript', value: 'typescript', icon: ['fas', 'code'] },
  { name: 'JavaScript', value: 'javascript', icon: ['fab', 'js'] },
  { name: 'Next.js', value: 'next', icon: ['fas', 'code'] }
];

// Projects data
const projects = [
  {
    id: 1,
    title: 'Groove Grid',
    description: 'The Groove Grid er et innovativt og brukervennlig trommeblogg-nettsted, utviklet med HTML, CSS, JavaScript og WordPress REST API. Nettstedet har sider for Hjem, Om, Blogg, Spesifikk Bloggpost og Kontakt. Hovedfunksjonene inkluderer en "Siste innlegg" seksjon på Hjem-siden, en Bloggside som viser de første 10 bloggene med flere lastealternativer, dynamisk innhold på den spesifikke bloggsiden, og en Kontaktside med egendefinert JavaScript-validering. Dette prosjektet demonstrerer avanserte webutviklingsferdigheter, og kombinerer funksjonalitet med en lidenskap for trommer.',
    image: grooveGridImage,
    url: 'https://taupe-medovik-72ed9d.netlify.app/',
    repo: 'https://github.com/chralmli/project-exam-1-chralmli',
    categories: ['javascript'],
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
    categories: ['typescript', 'react'],
    technologies: ['TypeScript', 'React', 'Vite', 'Cypress'],
    features: [
      'Brukerautentisering',
      'Administatorpanel',
      'Dynamisk innhold',
      'Funksjonell booking av overnattingssteder',
      'Funksjonell søkefunksjon',
      'Funksjonell filtrering',
    ]
  },
  {
    id: 3,
    title: 'Ecom Store',
    description: 'Dette er det offisielle nettstedet for bandet mitt, bygget med Next.js. Jeg har utviklet en tilpasset musikkspiller fra bunnen av, slik at brukere kan lytte til våre nyeste låter sømløst. Nettstedet har et moderne design med interaktive elementer, som gir en flott brukeropplevelse.',
    image: ecomImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/MainStRevivalWebsite/tree/master',
    categories: ['javascript'],
    technologies: ['JavaScript'],
    features: [
      'Custom Music Player',
      'Responsivt design'
    ]
  },
  {
    id: 4,
    title: 'Main Street Revival',
    description: 'Dette er det offisielle nettstedet for bandet mitt, bygget med Next.js. Jeg har utviklet en tilpasset musikkspiller fra bunnen av, slik at brukere kan lytte til våre nyeste låter sømløst. Nettstedet har et moderne design med interaktive elementer, som gir en flott brukeropplevelse.',
    image: bandSiteImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/MainStRevivalWebsite/tree/master',
    categories: ['next'],
    technologies: ['Next.js'],
    features: [
      'Custom Music Player',
      'Responsivt design'
    ]
  },
  {
    id: 5,
    title: 'Community Science Museum',
    description: 'Nettstedet for Community Science Museum er en livlig digital portal designet for å engasjere ungdomsskoleelever og deres foreldre med spennende utdanningsinnhold. Nettstedet viser museets utstillinger og arrangementer gjennom et interaktivt og tilgjengelig grensesnitt, og følger WCAG-standarder for inkludering. Med et responsivt design for sømløs nettlesing på alle enheter, er nettstedet bygget med semantisk HTML for strukturert innhold og optimalisert CSS for best mulig ytelse.',
    image: csmImage,
    url: 'https://elaborate-speculoos-c50810.netlify.app/',
    repo: 'https://github.com/chralmli/semester_project-1',
    categories: ['HTML, CSS'],
    technologies: ['HTML', 'CSS'],
    features: [
      'Responsivt design',
      'Fokus på målgruppe'
    ]
  },
  {
    id: 6,
    title: 'Gavel Glance (Auction Website)',
    description: 'Nettstedet for Community Science Museum er en livlig digital portal designet for å engasjere ungdomsskoleelever og deres foreldre med spennende utdanningsinnhold. Nettstedet viser museets utstillinger og arrangementer gjennom et interaktivt og tilgjengelig grensesnitt, og følger WCAG-standarder for inkludering. Med et responsivt design for sømløs nettlesing på alle enheter, er nettstedet bygget med semantisk HTML for strukturert innhold og optimalisert CSS for best mulig ytelse.',
    image: auctionImage,
    url: 'https://gavelglance.netlify.app',
    repo: 'https://github.com/chralmli/gavel-glance-SP2',
    categories: ['HTML, CSS'],
    technologies: ['HTML', 'CSS'],
    features: [
      'Responsivt design',
      'Fokus på målgruppe'
    ]
  },
  {
    id: 7,
    title: 'Iron Crew (Social Media Client)',
    description: 'Nettstedet for Community Science Museum er en livlig digital portal designet for å engasjere ungdomsskoleelever og deres foreldre med spennende utdanningsinnhold. Nettstedet viser museets utstillinger og arrangementer gjennom et interaktivt og tilgjengelig grensesnitt, og følger WCAG-standarder for inkludering. Med et responsivt design for sømløs nettlesing på alle enheter, er nettstedet bygget med semantisk HTML for strukturert innhold og optimalisert CSS for best mulig ytelse.',
    image: socialImage,
    url: 'https://ironcrew.netlify.app/',
    repo: 'https://github.com/chralmli/social-media-client',
    categories: ['HTML, CSS'],
    technologies: ['HTML', 'CSS'],
    features: [
      'Responsivt design',
      'Fokus på målgruppe'
    ]
  },
  {
    id: 8,
    title: 'Gamehub',
    description: 'Nettstedet for Community Science Museum er en livlig digital portal designet for å engasjere ungdomsskoleelever og deres foreldre med spennende utdanningsinnhold. Nettstedet viser museets utstillinger og arrangementer gjennom et interaktivt og tilgjengelig grensesnitt, og følger WCAG-standarder for inkludering. Med et responsivt design for sømløs nettlesing på alle enheter, er nettstedet bygget med semantisk HTML for strukturert innhold og optimalisert CSS for best mulig ytelse.',
    image: gameHubImage,
    url: 'https://ironcrew.netlify.app/',
    repo: 'https://github.com/chralmli/social-media-client',
    categories: ['HTML, CSS'],
    technologies: ['HTML', 'CSS'],
    features: [
      'Responsivt design',
      'Fokus på målgruppe'
    ]
  },


];

// Computed properties
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects;

  return projects.filter(project => {
    const projectCategories = project.categories || [];
    return projectCategories.includes(activeFilter.value);
  });
});

const handleFilterClick = (filter) => {
  activeFilter.value = filter.value;
};

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

.portfolio {
  position: relative;
  isolation: isolate;
}

.project-card {
  @apply bg-white/5 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300;
  transform-style: preserve-3d;
}

.project-card img {
  transform: translateZ(0);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
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