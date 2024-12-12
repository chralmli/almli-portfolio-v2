<template>
  <section class="contact relative min-h-screen py-24 overflow-hidden" id="contact">

    <div class="container relative mx-auto px-4 z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-down">
        <h2 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-4">
          {{ t('contact.title')}}
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        <p class="mt-6 text-gray-300 max-w-2xl mx-auto">
          {{ t('contact.subtitle')}}
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
                {{ t('contact.info.location.value') }}
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
              :placeholder="t('contact.form.name.placeholder')"
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
              :placeholder="t('contact.form.email.placeholder')"
              required
            >
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Melding</label>
            <textarea
              v-model="formData.message"
              id="message"
              class="form-textarea bg-white/5 border-gray-700 text-white"
              :placeholder="t('contact.form.message.placeholder')"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full group relative px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-indigo-500/25 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div class="relative z-10">{{ t('contact.form.submit') }}</div>
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const { t } = useI18n();

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
/* Form Styles */
.form-input,
.form-textarea {
  @apply w-full px-4 py-3 rounded-xl bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300;
}

.form-input::placeholder,
.form-textarea::placeholder {
  @apply text-gray-400;
}

 .form-textarea {
  @apply resize-none;
 }
</style>