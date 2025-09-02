import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation-store', () => {
  const visible = ref(false)

  function toggle(value: boolean) {
    visible.value = value
  }

  return {
    visible,
    toggle,
  }
})
