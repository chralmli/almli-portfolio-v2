<template>
  <div class="relative">
    <button
      @click="toggleLanguage"
      class="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
      aria-label="currentLocale === 'no' ? 'Switch to English' : 'Bytt til norsk'"
    >
      <span class="text-sm font-medium text-gray-700">
        {{ currentLocale === 'no' ? 'NO' : 'EN' }}
      </span>
      <font-awesome-icon
        icon="globe"
        class="text-sm text-gray-700"
      />
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  scrolled: {
    type: Boolean,
    default: false
  }
});

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const toggleLanguage = () => {
  // Toggle between Norwegian and English
  locale.value = locale.value === 'no' ? 'en' : 'no'

  // Save preference to localStorage for persistence
  localStorage.setItem('preferred-locale', locale.value)
}

// initialize with saved preference if available
onMounted(() => {
  const savedLocale = localStorage.getItem('preferred-locale')
  if (savedLocale) {
    locale.value = savedLocale
  }
})
</script>   