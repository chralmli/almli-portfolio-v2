<template>
  <section class="contact relative min-h-screen bg-gray-900 py-24 overflow-hidden" id="contact">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/20 to-pink-500/20"></div>
      <!-- Animated Shapes -->
      <div
        v-for="n in 3"
        :key="n"
        class="absolute bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
        :style="getBlobStyle(n)"
      ></div>
    </div>

    <div class="container relative mx-auto px-4 z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-down">
        <h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-4">
          La Oss Samarbeide
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
          Som nyutdannet front-end utvikler er jeg alltid på utkikk etter spennende prosjekter og nye utfordringer.
          Har du en idé eller et prosjekt du vil å diskutere? Ta gjerne kontakt!
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- Contact Information -->
        <div class="space-y-8" data-aos="fade-right">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                <font-awesome-icon icon="envelope" class="text-2xl text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Email</h3>
              <a
                href="mailto:chrisalm97@gmail.com" 
                class="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
              >
                chrisalm97@gmail.com
              </a>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                <font-awesome-icon icon="map-marker-alt" class="text-2xl text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Adresse</h3>
              <p class="text-gray-300">
                Steinkjer, Trøndelag, Norge
              </p>
            </div>
          </div>

          <!-- Social Links -->
          <div class="pt-8">
            <h3 class="text-xl font-semibold text-white mb-4">Følg Meg</h3>
            <div class="flex space-x-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="group relative p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <font-awesome-icon
                  :icon="social.icon"
                  class="text-2xl text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                />
                <span class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-sm py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                  {{ social.name }}
                </span>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
         <form
          @submit.prevent="submitForm"
          class="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10"
          data-aos="fade-left"
        >
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Navn</label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="form-input"
              placeholder="Ditt Navn"
              required
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="form-input"
              placeholder="Din Email"
              required
            >
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Melding</label>
            <textarea
              v-model="formData.message"
              id="message"
              class="form-textarea bg-white/5 border-gray-700 text-white"
              placeholder="Fortell meg om ditt prosjekt elle idé..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full group relative px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-indigo-500/25 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div class="relative z-10">Send Melding</div>
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import patternImage from '../assets/images/pattern-2-img.png'

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

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const socialLinks = [
  { name: 'GitHub', icon: ['fab', 'github'], url: 'https://github.com/chralmli'},
  { name: 'LinkedIn', icon: ['fab', 'linkedin'], url: 'https://www.linkedin.com/in/chrisalm97/' },
];

const submitForm = async () => {
  // Simulate form submission
  console.log('Submitting form:', formData.value);

  // Reset form after submission
  formData.value = {
    name: '',
    email: '',
    message: ''
  };
};
</script>

<style>
/* Blob Animations */
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

/* Form Styles */
.form-input,
.form-textarea {
  @apply w-full px-4 py-3 rounded-xl bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300;
}

.form-input::placeholder,
.form-textarea::placeholder {
  @apply text-gray-400;
}

/* .form-input:focus,
.form-textarea:focus {
  @apply ring-indigo-500;
} */

 .form-textarea {
  @apply resize-none;
 }
</style>