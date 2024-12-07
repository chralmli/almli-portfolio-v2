<template>
  <BackgroundBlobs />
  <main class="relative">
    <Navbar />
    <Home />
    <About />
    <PortfolioSection />
    <Contact />
    <Footer />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BackgroundBlobs from './components/BackgroundBlobs.vue'
import Navbar from './components/Navbar.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

// // Track if we're in the home section to show/hide specific animations
// const isHomeSection = ref(true);

// // Function to check if we're in the home section based on scroll position
// const checkSection = () => {
//   const homeSection = document.getElementById('home');
//   if (homeSection) {
//     const rect = homeSection.getBoundingClientRect();
//     isHomeSection.value = rect.top >= -rect.height / 2 && rect.bottom >= rect.height / 2;
//   }
// };

// // Set up scroll listener
// onMounted(() => {
//   window.addEventListener('scroll', checkSection);
//   checkSection();
// });

// Cleanup
onUnmounted(() => {
  window.removeEventListener('scroll', checkSection);
});
</script>

<style scoped>
body {
  background-color: #111827;
  overflow-x: hidden;
}

main {
  position: relative;
  z-index: 1;
}
</style>
