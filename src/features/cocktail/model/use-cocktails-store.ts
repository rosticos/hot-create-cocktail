import { defineStore } from 'pinia'
import { ref } from 'vue'

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php'

export const useCocktailsStore = defineStore('cocktails-store', () => {
  const items = ref(new Map())
  const isLoading = ref(false)

  async function getItems(payload: string) {
    isLoading.value = true

    try {
      const params = new URLSearchParams()
      params.set('s', payload)

      const response = await fetch(`${URL}?${params.toString()}`, {
        method: 'GET',
      })

      items.value.set(payload, {
        error: null,
        body: (await response.json())?.drinks ?? [],
      })
    } catch (e) {
      items.value.set(payload, {
        error: e?.toString() ?? '',
        body: [],
      })
    } finally {
      isLoading.value = false
    }
  }

  async function getItem(payload: string) {
    if (items.value.has(payload)) {
      console.log(items.value.get(payload))
      return items.value.get(payload)
    }

    await getItems(payload)

    return getItem(payload)
  }

  return {
    items,
    isLoading,
    getItem,
    getItems,
  }
})
