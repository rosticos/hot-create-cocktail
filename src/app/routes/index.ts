import { createRouter, createWebHistory } from 'vue-router'
import { CocktailPage, NothingFoundPage } from '@/pages'

import { DEFAULT_COCKTAIL } from '@/features/cocktail'

const routes = [
  {
    path: '/',
    redirect: { name: 'cocktail', params: { id: DEFAULT_COCKTAIL } },
  },
  {
    path: '/:id?',
    name: 'cocktail',
    component: CocktailPage,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NothingFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
