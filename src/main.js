import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import AOS from 'aos/dist/aos.js'
import 'aos/dist/aos.css'
import VueTilt from 'vue-tilt.js'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faInfoCircle, faChevronDown, faArrowRight, faTimes, faGlobe, faPaintBrush, faVial, faExternalLinkAlt, faCode, faBars, faTimes as faTimes2, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

// Brand Icons
import { faGithub, faLinkedin, faLinkedinIn, faTwitter, faInstagram, faReact, faVuejs, faJs, faHtml5, faCss3Alt, faWordpress, faGitAlt } from '@fortawesome/free-brands-svg-icons'

library.add(
  faEye,
  faGithub,
  faInfoCircle,
  faTimes,
  faGlobe,
  faPaintBrush,
  faVial,
  faExternalLinkAlt,
  faCode,
  faArrowRight,
  faBars,
  faChevronDown,
  faEnvelope,
  faMapMarkerAlt,
  faLinkedin,
  faLinkedinIn,
  faTwitter,
  faInstagram,
  faVuejs,
  faJs,
  faHtml5,
  faCss3Alt,
  faWordpress,
  faGitAlt,
  faReact
)

const app = createApp(App)

// Initialize AOS
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueTilt)

// Initialize AOS after app mount
AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    easing: 'ease-out-cubic',
    delay: 50,
    disable: 'mobile'
})

app.mount('#app')