<template>
  <footer class="relative bg-gray-900 overflow-hidden">
    <!-- Top Wave Edge -->
    <div class="wave-top z-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1a202c" fill-opacity="1" d="M0,224L80,202.7C160,181,320,139,480,154.7C640,171,800,245,960,250.7C1120,256,1280,192,1360,160L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
    </div>

    <div class="container mx-auto px-4 pt-24 pb-12 z-20">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        <!-- Brand Section -->
        <div class="md:col-span-4 space-y-4">
          <div class="flex items-center text-white/90">
            <h2 class="text-2xl font-bold ml-2">Almli Solutions</h2>
          </div>
          <p class="text-gray-400 max-w-sm">
            Skaper moderne webopplevelser med fokus på brukervennlighet og innovativt design.
          </p>
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative p-2 bg-gray-800/50 rounded-lg hover:bg-indigo-500/10 transition-all duraiton-300"
              :aria-label="social.name"
            >
              <font-awesome-icon
                :icon="social.icon"
                class="text-xl text-gray-400 group-hover:text-indigo-400 transition-colors"
              />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-2">
          <h3 class="text-white font-semibold mb-4">Utforsk</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.text">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Technologies -->
        <div class="md:col-span-3">
          <h3 class="text-white font-semibold mb-4">Teknologier</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in technologies"
              :key="tech"
              class="px-3 py-1 bg-gray-800/50 text-gray-400 text-sm rounded-full"
            >
              {{ tech }}
              </span>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="md:col-span-3">
          <h3 class="text-white font-semibold mb-4">Kontakt</h3>
          <ul class="space-y-3">
            <li class="flex items-center space-x-3">
              <font-awesome-icon icon="envelope" class="text-indigo-400" />
              <a
                href="mailto:chrisalm97@gmail.com"
                class="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
              >
                chrisalm97@gmail.com
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <font-awesome-icon icon="map-marker-alt" class="text-indigo-400" />
              <span class="text-gray-400">Steinkjer, Trøndelag</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:-flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Christian Almli. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

const socialLinks = [
  { name: 'Github', icon: ['fab', 'github'], url: 'https://github.com/chralmli' },
  { name: 'LinkedIn', icon: ['fab', 'linkedin'], url: 'https://www.linkedin.com/in/chrisalm97/' },
];

const quickLinks = [
  { text: 'Hjem', href: '#home' },
  { text: 'Om Meg', href: '#about' },
  { text: 'Prosjekter', href: '#portfolio' },
  { text: 'Kontakt', href: '#contact' },
];

const technologies = [
  'React',
  'Vue.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
];
</script>

<style scoped>
.wave-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12px;
  transform: translateY(-100%);
  z-index: 0;
}

.wave-svg-top {
  width: 100%;
  height: 100%;
  fill: #1a202c;
}

.wave-container {
  position: relative;
  overflow: hidden;
  height: 120px;
}

.wave-svg {
  position: absolute;
  bottom: 0;
  width: 200%;
  height: 100%
}

.wave-1 {
  animation: waveAnimation1 25s cubic-bezier(0.42, 0 0.58, 1) infinite;
}

.wave-2 {
  animation: waveAnimation2 20s cubic-bezier(0.42, 0 0.58, 1) infinite;
}

.wave-3 {
  animation: waveAnimation3 15s cubic-bezier(0.42, 0 0.58, 1) infinite;
}

@keyframes waveAnimation1 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes waveAnimation2 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-30%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes waveAnimation3 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-20%);
  }
  100% {
    transform: translateX(0);
  }
}

.container {
  position: relative;
  z-index: 10;
}

.fill-gray-900 {
  fill: currentColor;
}

/* Ensure smooth transitions */
a {
  @apply transition-all duration-300 ease-in-out;
}

/* Enhance focus states for accessibility */
a:focus {
  @apply outline-none ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-900;
}
</style>