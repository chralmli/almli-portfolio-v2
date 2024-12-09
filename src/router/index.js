import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue')
    }
  ],
  // Enhanced scroll behavior with error handling and fallbacks
  scrollBehavior(to, from, savedPosition) {
    try {
      // Handle anchor links with smooth scrolling
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
          // Add top offset if you have a fixed header
          top: 60
        }
      }

      // Handle saved position (like browser back/forward)
      if (savedPosition) {
        return {
          ...savedPosition,
          behavior: 'smooth'
        }
      }

      // Default to top of page
      return {
        top: 0,
        behavior: 'smooth'
      }
    } catch (error) {
      console.warn('Scroll behavior error:', error)
      // Fallback to basic scroll to top
      return { top: 0 }
    }
  }
})

// Add global error handling for navigation
router.onError((error) => {
  console.warn('Navigation error:', error)
  // add additional error handling here if needed
})

export default router