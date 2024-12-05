// import { onMounted, onBeforeUnmount } from 'vue';
// import VueTilt from 'vue-tilt.js';

// export function useTilt(options = {}) {
//   let elements = [];

//   const defaultOptions = {
//     max: 15,
//     speed: 400,
//     glare: true,
//     'max-glare': 0.2,
//     scale: 1.02,
//     perspective: 1000,
//     transition: true,
//     ...options
//   };

//   const initTilt = (el) => {
//     if (!el) return;
//     VanillaTilt.init(el, defaultOptions);
//     elements.push(el);
//   };

//   onBeforeUnmount(() => {
//     elements.forEach(el => {
//       el._vanilla && el._vanilla.destroy();
//     });
//     elements = [];
//   });

//   return {
//     initTilt
//   };
// }