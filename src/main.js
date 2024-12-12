import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { i18n } from './i18n'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faInfoCircle, faChevronDown, faArrowRight, faTimes, faPaintBrush, faVial, faExternalLinkAlt, faCode, faBars, faTimes as faTimes2, faEnvelope, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons'

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
app.use(router)
app.use(i18n)
app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app')