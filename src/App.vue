<template>
  <Navbar />
  <Home />
  <About />
  <PortfolioSection />
  <Contact />
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Home,
    About,
    PortfolioSection,
    Contact,
    Footer,
  },
};
</script>
