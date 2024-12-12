<template>
  <div class="card-container" ref="cardContainer">
    <div class="project-card group">
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
            <div class="flex items-center gap-2 sm:gap-4">
              <a 
                :href="project.url" 
                target="_blank"
                class="inline-flex items-center gap-1 sm:gap-2 bg-indigo-600/90 hover:bg-indigo-600 text-white p-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-300"
              >
              <font-awesome-icon icon="eye" class="text-base sm:text-sm" />
              {{ t('portfolio.modal.buttons.visit') }}
              </a>
              <a 
                :href="project.repo" 
                target="_blank"
                class="inline-flex items-center gap-1 sm:gap-2 bg-white/10 hover:bg-white/20 text-white p-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-300"
              >
                <font-awesome-icon :icon="['fab', 'github']" class="text-base sm:text-sm" />
                {{ t('portfolio.modal.buttons.sourceCode') }}
              </a>
              <button 
                @click="$emit('openModal', project)"
                class="ml-auto inline-flex items-center gap-1 sm:gap-2 text-white/70 hover:text-white p-2 sm:px-4 sm:py-2 transition-colors duration-300"
              >
              <font-awesome-icon icon="info-circle" class="text-base sm:text-sm" />
              {{ t('portfolio.modal.buttons.moreInfo') }}
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import VanillaTilt from 'vanilla-tilt';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();

defineEmits(['openModal']);

const cardContainer = ref(null);
let tiltInstance = null;

onMounted(() => {
  if (cardContainer.value) {
    tiltInstance = VanillaTilt.init(cardContainer.value, {
      max: 15,         
      speed: 400,       
      scale: 1.02,      
      glare: true,      
      "max-glare": 0.2,
      perspective: 1000,
      gyroscope: true   // Enable gyroscope on mobile
    });
  }
});

onUnmounted(() => {
  if (tiltInstance) {
    tiltInstance.destroy();
  }
});
</script>

<style scoped>
.card-container {
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.project-card {
  @apply bg-white/5 rounded-xl backdrop-blur-sm overflow-hidden transition-all duration-300;
  transform-style: preserve-3d;
  will-change: transform;
}

/* Keep other styles from your original component */
</style>