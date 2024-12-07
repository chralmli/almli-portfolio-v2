<template>
  <div class="perspective w-full" ref="perspective">
    <div 
      class="card w-full bg-white/5 backdrop-blur-sm rounded-xl transform-gpu transition-transform duration-50 ease-linear"
      ref="card"
      :style="cardStyle"
    >
      <!-- Project Image -->
      <div class="relative overflow-hidden rounded-xl aspect-video p-2">
        <img
          :src="project.image"
          :alt="project.title"
          class="object-contain w-full h-full rounded-lg"
        />
        <div class="absolute inset-0 shadow-effect"></div>
      </div>

      <!-- Project Content with 3D transform -->
      <div class="content p-6 transform-gpu" :style="contentStyle">
        <h3 class="text-lg font-semibold text-white mb-2">
          {{ project.title }}
        </h3>
        <p class="text-gray-30 text-sm line-clam-2 mb-4">
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
        </div>
      </div>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 p-4 transform-gpu" :style="techStyle">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-3 py-1 text-xs font-medium bg-white/5 text-indigo-300 rounded-full backdrop-blur-sm"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const card = ref(null);
const perspective = ref(null);
const rotation = ref({ x: 0, y: 0 });

const cardStyle = computed(() => ({
  transform: `rotateY(${rotation.value.y}deg) rotateX(${rotation.value.x}deg)`,
}));

const contentStyle = computed(() => ({
  transform: `translateZ(60px)`,
}));

const techStyle = computed(() => ({
  transform: `translateZ(30px)`,
}));

const handleMouseMove = (e) => {
  if (!perspective.value) return;

  const rect = perspective.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const rotateY = -((e.clientX - centerX) / 30);
  const rotateX = (e.clientY - centerY) / 30;

  rotation.value = { x: rotateX, y: rotateY };
};

const handleMouseLeave = () => {
  rotation.valuer = { x: 0, y: 0 };
};

onMounted(() => {
  perspective.value?.addEventListener('mousemove', handleMouseMove);
  perspective.value?.addEventListener('mouseleave', handleMouseLeave);
});

onUnmounted(() => {
  perspective.value?.removeEventListener('mousemove', handleMouseMove);
  perspective.value?.removeEventListener('mouseleave', handleMouseLeave);
});
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.card {
  transform-style: preserve-3d;
  box-shadow: 0 70px 63px -60px rgba(0, 0, 0, 0.3);
}

.shadow-effect {
  @apply absolute inset-0 blur-[55px] -z-10 opacity-50;
  background: inherit;
}
</style>