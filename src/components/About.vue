<template>
  <section
    class="about relative min-h-screen overflow-hidden py-12 sm:py-16 lg:py-24"
    id="about"
  >

        <!-- Main Content -->
        <div class="container relative z-1 mx-auto px-4 z-10">
          <div class="max-w-6xl mx-auto">
            <!-- Section Header -->
            <div class="text-center mb-16 section-header" data-aos="fade-down">
              <h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-4">
                Om Meg
              </h2>
              <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 lg:px-8">
              <!-- Profile Image Section -->
              <div
                class="relative order-2 lg:order-1 profile-image-section w-full max-w-md mx-auto lg:max-w-none"
                data-aos="fade-right"
              >
                <div class="relative group aspect-square w-full max-w-sm mx-auto">
                  <!-- Main Image -->
                  <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105 aspect-square main-image">
                    <img
                      src="../assets/images/profile_img.jpg"
                      alt="Christian Almli"
                      class="w-full h-full object-cover"
                    >
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-overlay"></div>
                  </div>

                  <!-- Decorative Elements -->
                  <div class="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-500 decorative-element"></div>

                  <!-- Tech Stack Icons -->
                  <div class="absolute -right-2 lg:-right-4 top-4 flex flex-col gap-3 lg:gap-4 z-20">
                    <div
                      v-for="(tech, index) in techStack"
                      :key="tech.name"
                      class="tech-icon text-center bg-white/10 backdrop-blur-lg p-2 lg:p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white/20 animate-float"
                      :style="{ animationDelay: `${index * 200}ms` }"
                    >
                      <font-awesome-icon :icon="tech.icon" class="text-xl lg:text-2xl text-white"/>
                  </div>
                </div>
            </div>
          </div>

          <!-- Bio content -->
          <div
            class="order-1 lg:order-2 space-y-4 lg:space-y-6 px-4 lg:px-0"
            data-aos="fade-left"
          >
            <!-- Bio Paragraphs -->
            <div class="bio-content space-y-4 lg:space-y-6 text-base lg:text-lg text-gray-300">
              <p class="leading-relaxed">
                Hei! Jeg heter Christian, og jeg er en nyutdannet front-end utvikler fra Steinkjer i Trøndelag. Jeg elsker å lage brukervennlige og flotte nettsider.
              </p>
              <p class="leading-relaxed">
                Jeg er lidenskapelig opptatt av både design og funksjonalitet, og jeg liker å lage nettsider som er både pene og enkle å bruke. Min tekniske verktøykasse inkluderer:
              </p>
            </div>

            <!-- Skills Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mt-6 lg:mt-8">
              <div
                v-for="skill in skills"
                :key="skill.name"
                class="skill-card group bg-white/5 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 hover:bg-white/10"
              >
                <div class="flex items-center gap-3">
                  <font-awesome-icon
                    :icon="skill.icon"
                    class="text-xl text-indigo-400 group-hover:text-indigo-300"
                  />
                  <span class="font-medium text-gray-300 group-hover:text-white">
                    {{ skill.name }}
                  </span>
                </div>
                <div class="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    class="skill-progress h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                    :style="{ width: '0%' }"
                    :data-level="skill.level"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 lg:mt-8 call-to-action">
              <a
                href="#portfolio"
                class="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300"
              >
                Se Mine Prosjekter
                <font-awesome-icon icon="arrow-right" />
              </a>
              <a
                href="#contact"
                class="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 border border-indigo-500/30 text-indigo-300 rounded-full font-medium hover:border-indigo-500 hover:text-white transition-colors duration-300"
              >
                Kontakt Meg
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';

const skillsAnimated = ref(false);

// Tech stack icons that float around the profile image
const techStack = [
  { name: 'HTML5', icon: ['fab', 'html5'] },
  { name: 'CSS3', icon: ['fab', 'css3-alt'] },
  { name: 'JavaScript', icon: ['fab', 'js'] },
  { name: 'Vue.js', icon: ['fab', 'vuejs'] },
  { name: 'React', icon: ['fab', 'react'] },
  { name: 'TypeScript', icon: ['fas', 'code'] }
];

// Skills with progress bars
const skills = [
  { name: 'HTML5/CSS', icon: ['fab', 'html5'], level: 90 },
  { name: 'JavaScript', icon: ['fab', 'js'], level: 85 },
  { name: 'Vue.js', icon: ['fab', 'vuejs'], level: 75 },
  { name: 'React', icon: ['fab', 'react'], level: 80 },
  { name: 'Tailwind CSS', icon: ['fas', 'paint-brush'], level: 80 },
  { name: 'TypeScript', icon: ['fas', 'code'], level: 80 }
];

// Initialize skill bar animations
const initSkillBars = () => {
    if (skillsAnimated.value) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          progressBar.style.width = `${progressBar.getAttribute('data-level')}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-card').forEach((card) => {
      observer.observe(card);
    });

    skillsAnimated.value = true;
  };

  // Initialize animations on component mount
  onMounted(() => {
    // Fade in animations for section header and content
    const contentElements = {
      '.bio-content': { x: 50 },
      '.call-to-action a': { y: 20, stagger: 0.2 }
    };

    // Apply animations with consistent timing
    Object.entries(contentElements).forEach(([selector, props]) => {
      gsap.from(selector, {
        ...props,
        duration: 1.5,
        ease: 'power2.out',
        delay: selector === '.section-header' ? 0 : 0.5
      });
    });
  initSkillBars();
});
</script>

<style scoped>
  /* Tech icons animations */
  .tech-icon {
    opacity: 0;
    transform: translateX(20px);
    animation: slideInAndFloat 0.5s forwards, float 3s ease-in-out infinite;
  }

  @keyframes slideInAndFloat {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* Skill card animations */
  .skill-progress {
    width: 0;
    transition: width 1s ease-in-out;
  }

  .skill-card {
    opacity: 0;
    animation: fadeInUp 0.5s forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>