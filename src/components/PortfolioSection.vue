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
    title: 'Holidaze',
    description: 'Holidaze var min avsluttende eksamensoppgave i front-end utvikling ved Noroff, kjent som Project Exam 2. Oppgaven krevde å planlegge, designe og utvikle en komplett front-end for en ny bookingplattform for overnattingssteder. Prosjektet reflekterer mine ferdigheter innen moderne webutvikling, inkludert API-integrasjoner, dynamisk innhold og responsivt design.',
    image: holidazeImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/PE-2-holidaze',
    categories: ['typescript', 'react'],
    technologies: ['TypeScript', 'React', 'Vite', 'Cypress', 'Material-UI', 'Leaflet'],
    features: [
      "Brukerautentisering: Registrering og innlogging for både kunder og verter",
      "Søk og filtrering: Brukervennlig søk og filtrering av overnattingssteder",
      "Kartfunksjonalitet: Dynamisk oppdatering av steder basert på kartinteraksjoner",
      "Booking-system: Opprettelse og administrering av bestillinger",
      "Adminpanel: Opprettelse, oppdatering og sletting av steder og bestillinger",
      "Responsivt design: Optimalisert for alle skjermstørrelser"
    ]
  },
  {
    id: 2,
    title: 'Crimson Cart (Ecom Store)',
    description: 'Crimson Cart er en eCommerce-plattform utviklet som en del av et skoleprosjekt for å demonstrere ferdigheter innen React. Oppgaven innebar å bygge en komplett nettbutikk med funksjonalitet for produktvisning, handlekurv og bestillinger, basert på et gitt API. Nettstedet har et responsivt design og gir en sømløs handleopplevelse.',
    image: ecomImage,
    url: 'https://holidaze-stays.netlify.app/',
    repo: 'https://github.com/chralmli/MainStRevivalWebsite/tree/master',
    categories: ['react'],
    technologies: ["React", "JavaScript", "CSS Modules", "REST API"],
    features: [
      "Dynamisk produktoversikt basert på API-data",
      "Detaljside for individuelle produkter med pris, rabatter og vurderinger",
      "Look-ahead søkefunksjon som filtrerer produkter basert på navn",
      "Handlekurv med mulighet for å legge til/fjerne produkter",
      "Checkout-side som tømmer handlekurven etter kjøp",
      "Kontaktskjema med validering for navn, e-post, emne og melding",
      "Responsivt design for mobil, nettbrett og desktop"
    ]
  },
  {
    id: 3,
    title: 'Gavel Glance (Auksjonsside)',
    description: "Gavel Glance er en moderne og dynamisk auksjonsplattform utviklet som en del av Noroff's semesterprosjekt 2. Nettstedet er designet for å la brukere legge til auksjonsobjekter, by på andres objekter og administrere sine egne auksjoner. Plattformen tilbyr sømløs navigasjon, responsivt design og funksjonalitet som skaper en engasjerende brukeropplevelse. Gavel Glance integrerer direkte med Noroff Auction API for å håndtere alle backend-funksjoner, som registrering, innlogging og kredittsystem.",
    image: auctionImage,
    url: 'https://gavelglance.netlify.app',
    repo: 'https://github.com/chralmli/gavel-glance-SP2',
    categories: ['javascript'],
    technologies: ['JavaScript', 'Tailwind CSS'],
    features: [
      "Brukerautentisering (registrering, innlogging, avataroppdatering)",
      "Dynamisk visning og søk av auksjonsobjekter",
      "Mulighet til å opprette og administrere egne auksjoner",
      "Budgiving-funksjonalitet på andres auksjoner",
      "Oversikt over brukerkreditt og budhistorikk",
      "Responsivt design optimalisert for flere enheter"
    ]
  },
  {
    id: 4,
    title: 'Iron Crew (Social Media Client)',
    description: "Iron Crew er et sosialt medieklient-prosjekt utviklet som en del av Noroff's JavaScript 2-eksamen. Nettstedet lar brukere opprette kontoer, poste innhold, og samhandle med andre gjennom et responsivt og brukervennlig grensesnitt. Prosjektet benytter Noroff Social API for å levere dynamisk innhold og implementere funksjoner som visning, opprettelse, redigering og sletting av innlegg. JWT-tokens og lokal lagring håndteres for sømløs brukerautentisering og sikkerhet.",
    image: socialImage,
    url: 'https://ironcrew.netlify.app/',
    repo: 'https://github.com/chralmli/social-media-client',
    categories: ['javascript'],
    technologies: ['JavaScript', 'CSS'],
    features: [
      "Brukerregistrering med Noroff-epost",
      "Brukerinnlogging og -autentisering",
      "Visning av innhold i en feed",
      "Søke- og filtreringsfunksjonalitet for innlegg",
      "Oppretting, redigering og sletting av innlegg",
      "Responsivt design for flere enheter"
    ]
  },
  {
    id: 5,
    title: 'Groove Grid',
    description: 'Groove Grid er en trommeblogg utviklet som eksamensoppgaven på første året hos Noroff. Nettstedet viser evnen til å bygge dynamiske, responsive og brukervennlige nettsider ved å bruke HTML, CSS, JavaScript og WordPress REST API. Det inkluderer flere sider som Hjem, Om, Blogg, Spesifikk Bloggpost og Kontakt, med fokus på funksjonalitet og avanserte webutviklingsprinsipper.',
    image: grooveGridImage,
    url: 'https://taupe-medovik-72ed9d.netlify.app/',
    repo: 'https://github.com/chralmli/project-exam-1-chralmli',
    categories: ['javascript'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress REST API'],
    features: [
      "Dynamisk blogginnhold med WordPress REST API",
      "Siste innlegg-seksjon med karusell-layout på Hjem-siden",
      "Bloggside som viser de første 10 innleggene med mulighet for å laste inn flere",
      "Spesifikk bloggpostside med dynamisk innhold og modal bildevisning",
      "Tilpasset JavaScript-validering for kontaktskjema",
      "Responsivt design for sømløs opplevelse på alle enheter"
    ]
  },
  {
    id: 6,
    title: 'Main Street Revival',
    description: 'Dette er det offisielle nettstedet for bandet mitt, Main Street Revival, utviklet med Next.js. Nettstedet inkluderer en unik, fra scratch utviklet musikkspiller med en animert vinylplate som roterer når musikken spilles av. Designet er moderne og interaktivt, med fokus på både estetikk og funksjonalitet. Nettsiden tilbyr informasjon om bandet, kommende konserter og utgivelser, og gir en engasjerende opplevelse for våre fans.',
    image: bandSiteImage,
    url: 'https://www.msrbandofficial.com/',
    repo: 'https://github.com/chralmli/MainStRevivalWebsite/tree/master',
    categories: ['next'],
    technologies: ["Next.js", "React", "CSS Modules", "HTML"],
    features: [
      "Custom musikkspiller med animert vinylplate",
      "Detaljert informasjon om bandet og kommende konserter",
      "Responsivt design for optimal brukeropplevelse på alle enheter",
      "SEO-optimalisering for bedre synlighet på nettet",
      "Interaktive elementer som fremhever bandets identitet"
    ]
  },
  {
    id: 7,
    title: 'Gamehub',
    description: 'Gamehub er en moderne e-handelsplattform bygget som en del av et cross-course prosjekt. Plattformen er utviklet med JavaScript og integrerer WordPress REST API for dynamisk å hente produkter fra WooCommerce. Brukere kan utforske en oversikt over produkter og få detaljert informasjon om hvert produkt via en individuell produktside. Designet er responsivt og fokuserer på brukervennlighet og moderne funksjonalitet.',
    image: gameHubImage,
    url: 'https://polite-concha-5decdc.netlify.app/',
    repo: 'https://github.com/chralmli/social-media-client',
    categories: ['javascript'],
    technologies: ["JavaScript", "HTML", "CSS", "WordPress REST API", "WooCommerce"],
    features: [
      "Dynamisk produktinnhold fra WordPress REST API",
      "Produktdetaljsider med spesifikke data",
      "Responsivt design for alle enheter",
      "Kategorisering og visning av produkter",
      "Grunnleggende sorterings- og filtreringsfunksjoner"
    ]
  },
  {
    id: 8,
    title: 'Community Science Museum',
    description: 'Community Science Museum er et interaktivt og informativt nettsted designet for å engasjere målgruppen som består av barn i grunnskolealder (7-15 år) og familier. Nettstedet er laget for å være inspirerende, brukervennlig og inkluderende, med fokus på WCAG-prinsipper og responsivt design. Det oppfordrer besøkende til å utforske museet og oppleve utstillinger og arrangementer gjennom en visuell og intuitiv opplevelse.',
    image: csmImage,
    url: 'https://elaborate-speculoos-c50810.netlify.app/',
    repo: 'https://github.com/chralmli/semester_project-1',
    categories: ['HTML, CSS'],
    technologies: ['HTML', 'CSS'],
    features: [
      "Responsivt design som fungerer på alle enheter",
      "WCAG-tilpasset for tilgjengelighet",
      "Attraktiv og målrettet design for barn og familier",
      "Rask nedlasting med optimaliserte bilder",
      "Strukturerte og semantiske HTML-elementer"
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