import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/entities',
      name: 'entities',
      component: () => import('../views/EntityVisualizationView.vue')
    },
    {
      path: '/annotations',
      name: 'annotations',
      component: () => import('../views/AnnotationsVizualization.vue')
    }
  ]
})

export default router
