<template>
  <section class="home relative min-h-screen min-h-mobile-screen overflow-hidden" id="home">
    <!-- Main Content -->
    <div class="relative z-1 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
      <!-- Profile Section -->
      <div class="text-center space-y-6 max-w-4xl mx-auto">
        <!-- Animated Hello Text -->
        <div class="overflow-hidden">
          <p
            class="text-lg md:text-xl text-indigo-300 font-medium tracking-wide"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <span class="wave-emoji inline-block animate-wave">{{ t('home.greeting.wave') }}</span>
            {{ t('home.greeting.text')}}
          </p>
        </div>

        <!-- Name -->
        <div class="overflow-hidden relative">
          <h1
            class="text-4xl md:text-7xl lg:text-8xl font-bold text-gradient bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            {{ t('home.name') }}
          </h1>
        </div>

        <!-- Role -->
        <div class="space-y-4">
          <p
            class="text-xl md:text-4xl font-bold text-white/90"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {{ t('home.role') }}
          </p>

          <!-- Animated Text Carousel -->
          <div
            class="h-8 md:h-10 overflow-hidden text-indigo-300 relative"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <transition-group
              name="text-slide"
              tag="div"
              class="text-md md:text-xl absolute w-full"
            >
              <p
                :key="currentTextIndex"
                class="text-slide-item"
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
            <span class="relative z-10">{{ t('home.cta.projects') }}</span>
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
            {{ t('home.cta.contact') }}
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
            :aria-label="social.ariaLabel"
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
          class="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <button
            @click="scrollToAbout"
            class="text-white/50 hover:text-white transition-colors duration-300"
            aria-label="t('home.scroll.label')"
          >
            <font-awesome-icon icon="chevron-down" class="text-3xl" />
          </button>
        </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';

  // Initialize i18n composable
  const { t, messages, locale } = useI18n();



  // Rotating texts for animation with translations
  const rotatingTexts = computed(() => {
    return messages.value[locale.value].home.rotatingTexts;
  });

  const currentTextIndex = ref(0);
  let textInterval;

  // Social media links with translated aria-labels
  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/christian-almli-97b94622/', 
      icon: ['fab', 'linkedin-in'],
      ariaLabel: computed(() => t('home.social.linkedin'))
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/chralmli', 
      icon: ['fab', 'github'],
      ariaLabel: computed(() => t('home.social.github'))
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/christian/', 
      icon: ['fab', 'instagram'],
      ariaLabel: computed(() => t('home.social.instagram'))
    }
  ];

  // Start rotating text
  onMounted(() => {
    textInterval = setInterval(() => {
      nextTick(() => {
        currentTextIndex.value = (currentTextIndex.value + 1) % rotatingTexts.value.length;
      });
    }, 3000);
  });

  // Cleanup
  onBeforeUnmount(() => {
    clearInterval(textInterval);
  });

  // Smooth scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');

    if (aboutSection) {
      window.scrollTo({
      top: aboutSection.offsetTop,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
/* Gradient Text Animation */
.text-gradient {
  background-size: 200% auto;
  animation: shine 8s linear infinite;
}

.text-slide-item {
  position: relative;
  display: inline-block;
  width: 100%;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.text-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.text-slide-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

.text-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.text-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.text-slide-move {
  transition: transform 0.8s ease;
}

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
</style>