<template>
  <div class="fixed inset-0 overflow-hidden -z-10">
    <!-- Gradient background that appears across all sections -->
    <div class="absolute inset-0 bg-gray-900">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/20 to-pink-500/20"></div>
    </div>

    <!-- Animated blobs that appear across all sections -->
    <div
      v-for="n in 3"
      :key="n"
      class="blob absolute bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
      :style="getBlobStyle(n)"
    ></div>

    <!-- Home section specific animations -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="n in 5"
        :key="`shape-${n}`"
        class="floating-shape absolute bg-white/5 backdrop-blur-3xl rounded-full"
        :style="getRandomShapeStyle(n)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';

gsap.registerPlugin(MotionPathPlugin);

const props = defineProps({
  showHomeAnimation: {
    type: Boolean,
    default: false
  }
});


// Base animated background blobs
const getBlobStyle = (index) => {
  const positions = [
    { top: '10%', left: '10%' },
    { top: '60%', right: '10%' },
    { bottom: '10%', left: '40%' }
  ];
  const sizes = ['600px', '500px', '700px'];

  return {
    width: sizes[index - 1],
    height: sizes[index -1],
    ...positions[index - 1],
    animation: `float-${index} ${15 + index * 2}s infinite linear`,
  };
};

// Home specific shape animations
const getRandomShapeStyle = (index) => {
  const size = Math.random() * (300 - 150) + 150;
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    transform: 'translate(-50%, -50%)'
  };
};

// Initialize GSAP animations
onMounted(() => {
  gsap.utils.toArray('.floating-shape').forEach((shape) => {
    moveShapeAlongPath(shape);
  });


  // Common floating blobs
  gsap.utils.toArray('.blob').forEach((blob) => {
    gsap.to(blob, {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      duration: 10 + Math.random() * 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  });
});

const moveShapeAlongPath = (shape) => {
  gsap.to(shape, {
    duration: 30 + Math.random() * 5,
    repeat: -1,
    ease: 'power1.inOut',
    motionPath: {
      path: generateRandomPath(),
      autoRotate: false,
      alignOrigin: [0.5, 0.5]
    }
  });
};

const generateRandomPath = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const padding = 75;

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  return [
  {
      x: clamp(Math.random() * width, padding, width - padding),
      y: clamp(Math.random() * height, padding, height - padding)
    },
    {
      x: clamp(Math.random() * width, padding, width - padding),
      y: clamp(Math.random() * height, padding, height - padding)
    },
    {
      x: clamp(Math.random() * width, padding, width - padding),
      y: clamp(Math.random() * height, padding, height - padding)
    },
    {
      x: clamp(Math.random() * width, padding, width - padding),
      y: clamp(Math.random() * height, padding, height - padding)
    }
  ];
};

// Cleanup GSAP animations
onBeforeUnmount(() => {
  gsap.killTweensOf('.floating-shape');
  gsap.killTweensOf('.blob');
});
</script>

<style scoped>
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

.blob {
  position: absolute;
  transform-origin: center;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>