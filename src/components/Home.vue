<template>
  <section
    class="home relative min-h-screen bg-gray-900 overflow-hidden"
    id="home"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <div class="relative h-full w-full">
        <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/20 to-pink-500/20"></div>

          <!-- Animated Shapes -->
          <div
            v-for="n in 5"
            :key="n"
            class="floating-shape absolute bg-white/5 backdrop-blur-3xl rounded-full"
            :style="getRandomShapeStyle(n)"
          ></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
      <!-- Profile Section -->
      <div class="text-center space-y-6 max-w-4xl mx-auto">
        <!-- Animated Hello Text -->
        <div class="overflow-hidden">
          <p
            class="text-lg md:text-xl text-indigo-300 font-medium tracking-wide"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <span class="wave-emoji inline-block animate-wave">👋</span>Hei, jeg heter
          </p>
        </div>

        <!-- Name -->
        <div class="overflow-hidden relative">
          <h1
            class="text-4xl md:text-7xl lg:text-8xl font-bold text-gradient bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Christian
          </h1>
        </div>

        <!-- Title -->
        <div class="space-y-4">
          <p
            class="text-xl md:text-4xl font-bold text-white/90"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Front-End Utvikler
          </p>

          <!-- Animated Text Carousel -->
          <div
            class="h-8 md:h-10 overflow-hidden text-indigo-300"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <transition-group
              name="slide-fade"
              tag="div"
              class="text-md md:text-xl"
            >
              <p
                :key="currentTextIndex"
                class="animate-slide-up"
              >
                {{ rotatingTexts[currentTextIndex] }}
              </p>
            </transition-group>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <a
            href="#portfolio"
            class="group relative inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-full overflow-hidden transition-all duration-300 hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span class="relative z-10">Se Mine Prosjekter</span>
            <font-awesome-icon
              icon="arrow-right"
              class="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            <!-- Gradient Overlay -->
             <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a
            href="#contact"
            class="group px-6 py-3 text-lg font-medium text-indigo-300 border-2 border-indigo-500/30 rounded-full transition-all duration-300 hover:border-indigo-500 hover:text-white hover:scale-105"
          >
            Kontakt Meg
          </a>
        </div>

        <!-- Social Links -->
        <div 
          class="flex justify-center items-center gap-6 mt-12"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <a 
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative p-3 bg-white/5 rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-110"
            :aria-label="social.name"
          >
            <font-awesome-icon 
              :icon="social.icon" 
              class="text-xl text-white/70 group-hover:text-white transition-colors duration-300"
            />
          </a>
        </div>
      </div>

        <!-- Scroll Indicator -->
        <div
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <a
            href="#about"
            class="text-white/50 hover:text-white transition-colors duration-300"
            aria-label="Scroll down"
          >
            <font-awesome-icon icon="chevron-down" class="text-3xl" />
          </a>
        </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  // Rotating texts for animation
  const rotatingTexts = [
    "Skaper moderne webopplevelser",
    "Spesialisert i Vue.js og React",
    "Fokusert på brukeropplevelse",
    "Lidenskapelig om koding"
  ];

  const currentTextIndex = ref(0);
  let textInterval;

  // Social media links
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/christian-almli-97b94622/', icon: ['fab', 'linkedin-in'] },
    { name: 'GitHub', url: 'https://github.com/chralmli', icon: ['fab', 'github'] },
    { name: 'Instagram', url: 'https://www.instagram.com/christian/', icon: ['fab', 'instagram'] },
  ];

  // Random shape generator for background
  const getRandomShapeStyle = (index) => {
    const size = Math.random() * (400 - 200) + 200;
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      transform: `translate(-50%, -50%)`,
      animation: `float-${index} ${Math.random() * (20 - 10) + 10}s infinite`
    };
  };

  // Start rotating text
  onMounted(() => {
    textInterval = setInterval(() => {
      currentTextIndex.value = (currentTextIndex.value + 1) % rotatingTexts.length;
    }, 3000);
  });

  // Cleanup
  onBeforeUnmount(() => {
    clearInterval(textInterval);
  });
</script>

<style scoped>
/* Gradient Text Animation */
.text-gradient {
  background-size: 200% auto;
  animation: shine 8s linear infinite;
}

/* FLoating Shapes Animation */
@keyframes float-1 { 0%, 100% { transform: translate(-50%, -50%) rotate(0deg); } 50% { transform: translate(-50%, -50%) rotate(180deg); } }
@keyframes float-2 { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.2); } }
@keyframes float-3 { 0%, 100% { transform: translate(-50%, -50%) translateY(0); } 50% { transform: translate(-50%, -50%) translateY(-50px); } }
@keyframes float-4 { 0%, 100% { transform: translate(-50%, -50%) translateX(0); } 50% { transform: translate(-50%, -50%) translateX(50px); } }
@keyframes float-5 { 0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); } 50% { transform: translate(-50%, -50%) rotate(90deg) scale(1.1); } }

@keyframes shine {
  to { background-position: 200% center; }
}

/* Wave Animation */
.wave-emoji {
  animation: wave 2.5s infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  20%, 60% { transform: rotate(-25deg); }
  40%, 80% { transform: rotate(25deg); }
}

/* Text Carousel Animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

/* Smooth background animation */
.floating-shape {
  will-change: transform;
}
</style>