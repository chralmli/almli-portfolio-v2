<template>
  <Transition name="modal-fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal" :class="size">
        <!-- Header -->
         <div class="modal-header">
          <slot name="header">
            <h3 class="text-xl font-semibold text-gray-900">{{ project?.title || title }}</h3>
          </slot>
          <button
            @click="closeModal"
            class="modal-close-btn"
            aria-label="Close modal"
          >
            <font-awesome-icon
              icon="times"
              class="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors"
            />
          </button>
         </div>

         <!-- Body -->
          <div class="modal-body">
            <slot name="body">
              {{  content }}
            </slot>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <slot name="footer">
              <button
                @click="closeModal"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Lukk
              </button>
            </slot>
          </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  project: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50;
  backdrop-filter: blur(4px);
}

.modal {
  @apply bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden relative;
  min-width: min(90vw, 600px);
}

/* Modal sizes */
.modal.small {
  @apply w-full max-w-md;
}

.modal.medium {
  @apply w-full max-w-2xl;
}

.modal.large {
  @apply w-full max-w-4xl;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.modal-body {
  @apply p-6 overflow-y-auto;
  max-height: calc(90vh - 160px);
}

.modal-footer {
  @apply flex justify-end gap-4 p-6 border-t border-gray-200;
}

.modal-close-btn {
  @apply p-2 rounded-full hover:bg-gray-100 transition-colors;
}

/* Transitions animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  @apply transition-all duration-300 ease-out;
}

.modal-fade-enter-from,
 .modal-fade-leave-to {
  @apply opacity-0 scale-95;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  @apply opacity-100 scale-100;
}
</style>