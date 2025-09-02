<template>
  <div class="cocktail-page">
    <div v-if="isLoading" class="spinner" role="status" aria-label="Загрузка" />

    <div v-else-if="error" class="cocktail-page__alert">
      Произошла ошибка при загрузке {{ error ? `(${error})` : '' }}
    </div>

    <div v-else-if="items.length" class="grid">
      <CocktailItem v-for="item in items" :key="item?.idDrink" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { hasCocktail, useCocktailsStore, type APIDrink } from '@/features/cocktail'
import CocktailItem from './cocktail-item.vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()

const error = ref<string | null>(null)
const items = ref<APIDrink[]>([])

const { getItem } = useCocktailsStore()
const { isLoading } = storeToRefs(useCocktailsStore())

const id = computed(() => {
  const value = String(route.params.id)

  return hasCocktail(value) ? value : null
})

async function loadCocktail(id: string | null) {
  error.value = null
  items.value = []

  if (!id) {
    router.push({
      name: 'not-found',
    })

    return
  }

  const item = await getItem(id!)
  if (item?.error) {
    error.value = item.error
  } else {
    items.value = item.body
  }
}

watch(
  id,
  (value) => {
    loadCocktail(value)
  },
  { immediate: true },
)
</script>

<style>
.cocktail-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cocktail-page__alert {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #f5c2c7;
  background: #f8d7da;
  color: #842029;
  border-radius: 16px;
  gap: 12px;
}

.cocktail-page__alert-btn:hover,
.cocktail-page__alert-btn:active .cocktail-page__alert-btn:focus {
  background: var(--color-gray);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #eee;
  border-top-color: #111;
  border-radius: 50%;
  margin: 32px auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
