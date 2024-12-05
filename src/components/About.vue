<template>
  <section
    class="about relative min-h-screen bg-gray-900 overflow-hidden py-24"
    id="about"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="n in 3"
        :key="n"
        class="absolute bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
        :style="getBlobStyle(n)"

      ></div>
    </div>

        <!-- Main Content -->
        <div class="container relative mx-auto px-4 z-10">
          <div class="max-w-6xl mx-auto">
            <!-- Section Header -->
            <div class="text-center mb-16" data-aos="fade-down">
              <h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-4">
                Om Meg
              </h2>
              <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <!-- Profile Image Section -->
              <div
                class="relative order-2 lg:order-1"
                data-aos="fade-right"
              >
                <div class="relative group">
                  <!-- Main Image -->
                  <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105 aspect-square">
                    <img
                      src="../assets/images/profile_img.jpg"
                      alt="Christian Almli"
                      class="w-full h-full object-cover"
                    >
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <!-- Decorative Elements -->
                  <div class="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-500"></div>

                  <!-- Tech Stack Icons -->
                  <div class="absolute -right-4 top-4 flex flex-col gap-4 z-20">
                    <div
                      v-for="(tech, index) in techStack"
                      :key="tech.name"
                      class="tech-icon text-center bg-white/10 backdrop-blur-lg p-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white/20 animate-float"
                      :style="{ transitionDelay: `${index * 100}ms`, animationDelay: `${index * 200}ms` }"
                    >
                      <font-awesome-icon :icon="tech.icon" class="text-2xl text-white"/>
                  </div>
                </div>
            </div>
          </div>

          <!-- Bio content -->
          <div
            class="order-1 lg:order-2 space-y-6"
            data-aos="fade-left"
          >
            <!-- Bio Paragraphs -->
            <div class="space-y-6 text-lg text-gray-300">
              <p class="leading-relaxed">
                Hei! Jeg heter Christian, og jeg er en nyutdannet front-end utvikler fra Steinkjer i Trøndelag. Jeg elsker å lage brukervennlige og flotte nettsider.
              </p>
              <p class="leading-relaxed">
                Jeg er lidenskapelig opptatt av både design og funksjonalitet, og jeg liker å lage nettsider som er både pene og enkle å bruke. Min tekniske verktøykasse inkluderer:
              </p>
            </div>

            <!-- Skills Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
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
            <div class="flex gap-4 mt-8">
              <a
                href="#portfolio"
                class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300"
              >
                Se Mine Prosjekter
                <font-awesome-icon icon="arrow-right" />
              </a>
              <a
                href="#contact"
                class="inline-flex items-center gap-2 px-6 py-3 border border-indigo-500/30 text-indigo-300 rounded-full font-medium hover:border-indigo-500 hover:text-white transition-colors duration-300"
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
import { ref, onMounted, onUnmounted } from 'vue';

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

// Animated background blobs
const getBlobStyle = (index) => {
  const positions = [
    { top: '10%', left: '10%' },
    { top: '60%', right: '10%' },
    { bottom: '10%', left: '40%' }
  ];
  const sizes = ['600px', '500px', '700px'];

  return {
    width: sizes[index - 1],
    height: sizes[index - 1],
    ...positions[index - 1],
    animation: `float-${index} ${15 + index * 2}s infinite linear`,
  };
};

// Initialize skill bar animations
const initSkillBars = () => {
  if (skillsAnimated.value) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const progressBar = card.querySelector('.skill-progress');

        progressBar.style.width = '0%';
        void progressBar.offsetHeight;

        requestAnimationFrame(() => {
          progressBar.style.width = `${progressBar.getAttribute('data-level')}%`;
        })

        observer.unobserve(card);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
  });
};

onMounted(() => {
  initSkillBars();
});
</script>

<style>
  /* Floating animation for skill icons */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .blue-3xl {
    will-change: transform;
    transform-origin: center;
  }

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

  .tech-icon {
    opacity: 0;
    transform: translateX(20px);
    animation: slide-in 0.5s forwards, float 3s ease-in-out infinite;
  }

  @keyframes slide-in {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .from-indigo-500\/10 {
    --tw-to-opacity: 0.2;
  }

  .to-purple-500\/10 {
    --tw-to-opacity: 0.2;
  }

  /* {Ensure smooth transitions} */
  .skill-progress {
    width: 0;
    transition: width 1s ease-in-out;
    will-change: width;
  }

  .skill-card * {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s forwards;
    animation-delay: var(--delay);
    @apply transition-all duration-300;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>