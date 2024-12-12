<template>
  <section class="portfolio relative min-h-screen overflow-hidden py-24" id="portfolio">

    <!-- Main Content -->
    <div class="container relative z-1 mx-auto px-4 z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-down">
        <h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-4">
          {{ t('portfolio.title') }}
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center mb-12 gap-4" data-aos="fade-up">
        <button 
          v-for="filter in filters" 
          :key="filter.name" 
          @click="handleFilterClick(filter)" 
          :class="[
            'px-3 sm:px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 backdrop-blur-sm sm:text-base whitespace-nowrap',
            activeFilter === filter.name
              ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          ]"
        >
          <font-awesome-icon :icon="filter.icon" class="text-xs sm:text-sm" />
          {{ filter.name }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Project3DCard
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project"
          @open-modal="openModal"
          data-aos="fade-up"
        />
      </div>

      <Modal
        :isVisible="isModalOpen"
        :project="selectedProject"
        @close="closeModal"
      >
        <template #header>
          <h3 class="text-2x font-bold text-gray-900">
            {{ selectedProject?.title }}
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
              <h4 class="font-semibold text-gray-900 mb-2">{{ t('portfolio.modal.technologiesUsed') }}</h4>
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
              :href="selectedProject?.url"
              target="_blank"
              class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              <font-awesome-icon icon="eye" />
              {{ t('portfolio.modal.buttons.visit') }}
            </a>
            <a
              :href="selectedProject.repo"
              target="_blank"
              class="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              <font-awesome-icon :icon="['fab', 'github']" />
              {{ t('portfolio.modal.buttons.sourceCode') }}
            </a>
          </div>
        </template>
      </Modal>
    </div>     
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import Modal from './Modal.vue';
import Project3DCard from './Project3DCard.vue';

const { t } = useI18n();

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

defineOptions({
  name: 'PortfolioSection',
})
// Filter configurations
const filters = [
  { name: t('portfolio.filters.all'), value: 'all', icon: ['fas', 'globe'] },
  { name: t('portfolio.filters.react'), value: 'react', icon: ['fab', 'react'] },
  { name: t('portfolio.filters.vue'), value: 'vue', icon: ['fab', 'vuejs'] },
  { name: t('portfolio.filters.typescript'), value: 'typescript', icon: ['fas', 'code'] },
  { name: t('portfolio.filters.javascript'), value: 'javascript', icon: ['fab', 'js'] },
  { name: t('portfolio.filters.next'), value: 'next', icon: ['fas', 'code'] }
];

// Projects data
const projects = computed(() => [
{
    id: 1,
    title: t('portfolio.projects.holidaze.title'),
    description: t('portfolio.projects.holidaze.description'),
    image: holidazeImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/PE-2-holidaze',
    categories: ['typescript', 'react'],
    technologies: ['TypeScript', 'React', 'Vite', 'Cypress', 'Material-UI', 'Leaflet'],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.holidaze.features
  },
  {
    id: 2,
    title: t('portfolio.projects.crimsonCart.title'),
    description: t('portfolio.projects.crimsonCart.description'),
    image: ecomImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/MainStRevivalWebsite/tree/master',
    categories: ['react'],
    technologies: ["React", "JavaScript", "CSS Modules", "REST API"],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.crimsonCart.features
  },
  {
    id: 3,
    title: t('portfolio.projects.gavelGlance.title'),
    description: t('portfolio.projects.gavelGlance.description'),
    image: auctionImage,
    url: 'https://gavelglance.netlify.app',
    repo: 'https://github.com/chralmli/gavel-glance-SP2',
    categories: ['javascript'],
    technologies: ['JavaScript', 'Tailwind CSS'],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.gavelGlance.features
  },
  {
    id: 4,
    title: t('portfolio.projects.ironCrew.title'),
    description: t('portfolio.projects.ironCrew.description'),
    image: socialImage,
    url: 'https://ironcrew.netlify.app/',
    repo: 'https://github.com/chralmli/social-media-client',
    categories: ['javascript'],
    technologies: ['JavaScript', 'CSS'],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.ironCrew.features
  },
  {
    id: 5,
    title: t('portfolio.projects.grooveGrid.title'),
    description: t('portfolio.projects.grooveGrid.description'),
    image: grooveGridImage,
    url: 'https://taupe-medovik-72ed9d.netlify.app/',
    repo: 'https://github.com/chralmli/project-exam-1-chralmli',
    categories: ['javascript'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress REST API'],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.grooveGrid.features
  },
  {
    id: 6,
    title: t('portfolio.projects.mainStreetRevival.title'),
    description: t('portfolio.projects.mainStreetRevival.description'),
    image: bandSiteImage,
    url: 'https://www.msrbandofficial.com/',
    repo: 'https://github.com/chralmli/MainStRevivalWebsite/tree/master',
    categories: ['next'],
    technologies: ["Next.js", "React", "CSS Modules", "HTML"],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.mainStreetRevival.features
  },
  {
    id: 7,
    title: t('portfolio.projects.gameHub.title'),
    description: t('portfolio.projects.gameHub.description'),
    image: gameHubImage,
    url: 'https://polite-concha-5decdc.netlify.app/',
    repo: 'https://github.com/chralmli/social-media-client',
    categories: ['javascript'],
    technologies: ["JavaScript", "HTML", "CSS", "WordPress REST API", "WooCommerce"],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.grooveGrid.features
  },
  {
    id: 8,
    title: t('portfolio.projects.csm.title'),
    description: t('portfolio.projects.csm.description'),
    image: csmImage,
    url: 'https://elaborate-speculoos-c50810.netlify.app/',
    repo: 'https://github.com/chralmli/semester_project-1',
    categories: ['HTML, CSS'],
    technologies: ['HTML', 'CSS'],
    features: useI18n().messages.value[useI18n().locale.value].portfolio.projects.csm.features
  },
]);

// Computed properties
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value;

  return projects.valuefilter(project => {
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

.filter-buttons {
  transition: all 0.3s ease;
}

button {
  height: fit-content;
  min-height: 2.5rem;
}

@media (max-width: 640px) {
  button {
    min-height: 2.75rem;
  }
}
</style>