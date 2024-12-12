<template>
  <nav
    class="navbar bg-white/90 sticky top-0 z-50 transition-all duration-300"
    :class="[
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent',
      {'nav-hidden': scrollingDown && scrolled && !isNavigating}
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
         <div class="logo relative group">
          <a href="#" class="text-4xl font-bold relative">
            <AlmliLogo class="h-14 transition-transform duration-300 group-hover:scale-105" />
            <div class="absolute -inset-2 bg-indigo-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>
         </div>

         <!-- Desktop Navigation -->
          <div class="nav-links hidden md:flex items-center space-x-1">
            <template v-for="(item, index) in navItems" :key="index">
              <a 
                :href="item.href"
                class="nav-link relative px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"
                :class="{ 'active': activeSection === item.href.substring(1) }"
                @click.prevent="scrollToSection(item.href)"
              >
                {{ t(item.label) }}
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"></span>
              </a>
            </template>

            <!-- Contact Button -->
            <a
              href="#contact"
              @click.prevent="scrollToSection('#contact')"
              class="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {{ t('nav.contact')}}
            </a>
          </div>

          <!-- Language Switcher -->
          <LanguageSwitcher :scrolled="scrolled" class="ml-2" />

          <!-- Mobile Menu Button -->
          <button
            class="mobile-menu-btn md:hidden relative w-10 h-10 focus:outline-none"
            @click="toggleMenu"
            aria-label="Toggle Menu"
          >
            <div class="hamburger">
              <span
                v-for="i in 3"
                :key="i"
                class="hamburger-line"
                :class="{
                  'translate-y-0 rotate-45': i === 1 && isMenuOpen,
                  'opacity-0': i === 2 && isMenuOpen,
                  'translate-y-0 -rotate-45': i === 3 && isMenuOpen
                }"
              ></span>
            </div>
          </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition
      enter-active-class="transition-all duration-300 ease-in-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-300 ease-in-out"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-show="isMenuOpen"
        class="mobile-menu fixed top-20 right-0 w-full h-screen bg-white/95 backdrop-blur-lg md:hidden overflow-y-auto"
      >
        <div class="container mx-auto px-4-py-8">
          <div class="flex flex-col space-y-4">
            <a
              v-for="(item, index) in navItems"
              :key="index"
              :href="item.href"
              class="mobile-nav-link text-xl font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-300 ml-4"
              :class="{ 'text-indigo-600': activeSection === item.href.substring(1) }"
              @click="handleMobileNavClick(item.href)"
            >
              {{ t(item.label) }}
            </a>
          </div>

          <!-- Language Switcher in mobile menu -->
          <div class="flex justify-center-mt-6">
            <LanguageSwitcher :scrolled="true" />
          </div>

          <!-- Mobile Social Links -->
          <div class="mt-8 flex justify-center space-x-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-800 hover:text-indigo-600 transition-colors duration-300"
            >
              <font-awesome-icon :icon="social.icon" class="text-2xl"/>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import AlmliLogo from '@/assets/images/almli-solutions-logo.svg';
import LanguageSwitcher from './LanguageSwitcher.vue';

const { t } = useI18n();

const isMenuOpen = ref(false);
const scrolled = ref(false);
const scrollingDown = ref(false);
const activeSection = ref('home');
let lastScrollY = 0;

const navItems = [
  { href: '#home', label: 'nav.home' },
  { href: '#about', label: 'nav.about' },
  { href: '#portfolio', label: 'nav.portfolio' },
  { href: '#contact', label: 'nav.contact' }
];

const socialLinks = [
  { name: 'Github', icon: ['fab', 'github'], url: 'https://github.com/chralmli' },
  { name: 'LinkedIn', icon: ['fab', 'linkedin'], url: 'https://www.linkedin.com/in/christian-almli/' },
  { name: 'Twitter', icon: ['fab', 'twitter'], url: 'https://twitter.com/chralmli' }
];

const isNavigating = ref(false);

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  scrolled.value = currentScrollY > 20;
  scrollingDown.value = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;

  // Update active section
  const sections = navItems.map((item => item.href.substring(1)));
  for (const section of sections.reverse()) {
    const element = document.getElementById(section);
    if (element && window.scrollY >= element.offsetTop - 100) {
      activeSection.value = section;
      break;
    }
  }
};

const scrollToSection = (href) => {
  const element = document.querySelector(href);
  if (element) {
    isNavigating.value = true;
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
  
    window.scrollTo({
      top: offsetPosition,
      behavior:'smooth'
    });

    isNavigating.value = false;

  }
  isMenuOpen.value = false;
};

const handleMobileNavClick = (href) => {
  scrollToSection(href);
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const toggleMenu = () => {
  isMenuOpen.value =!isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.nav-hidden {
  transform: translateY(-100%);
}

.nav-link.active span {
  transform: scaleX(1);
}

.mobile-nav-link {
  position: relative;
  width: fit-content;
}

.mobile-nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: theme('colors.indigo.600');
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: right;
}

.mobile-nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.hamburger {
  width: 24px;
  height: 24px;
  position: relative;
}

.hamburger-line {
  position: absolute;
  left: 0;
  width: 24px;
  height: 2px;
  background-color: #1f2934;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
}

/* Animation classes */
.hamburger-line:nth-child(1) {
  top: 0;
}

.hamburger-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-line:nth-child(3) {
  bottom: 0;
}

/* Menu open state */
.hamburger-line.translate-y-0.rotate-45 {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.hamburger-line.opacity-0 {
  opacity: 0;
}

.hamburger-line.translate-y-0.-rotate-45 {
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
}

/* Add a subtle gradient background when navbar is scrolled */
.navbar.scrolled {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
}
</style>