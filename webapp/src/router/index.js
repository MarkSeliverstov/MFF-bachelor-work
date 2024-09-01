import { createRouter, createWebHistory } from 'vue-router'

import entitiesSchema from '../schemes/entities.schema.json'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About' }
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
    },
    {
      path: '/annotations/schema',
      name: 'annotations-schema',
      meta: { title: 'Annotations Schema' },
      component: () => import('../views/AnnotationsSchema.vue')
    },
    {
      path: '/entities/schema',
      name: 'entities-schema',
      meta: { title: 'Entities Schema' },
      component: () => import('../views/EntitiesSchema.vue')
    }
  ]
})
router.beforeEach((to, _, next) => {
  const defaultTitle = "EI Vizualization"
  document.title = to.meta.title ? `${to.meta.title} | ${defaultTitle}` : defaultTitle
  next()
})

export default router
