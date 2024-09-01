import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' }
    },
    {
      path: '/entities',
      name: 'entities',
      meta: { title: 'Entities' },
      component: () => import('../views/EntityVisualizationView.vue')
    },
    {
      path: '/annotations',
      name: 'annotations',
      meta: { title: 'Annotations' },
      component: () => import('../views/AnnotationsVizualization.vue')
    }
  ]
})
router.beforeEach((to, _, next) => {
  const defaultTitle = "EI Vizualization"
  document.title = to.meta.title ? `${to.meta.title} | ${defaultTitle}` : defaultTitle
  next()
})

export default router
