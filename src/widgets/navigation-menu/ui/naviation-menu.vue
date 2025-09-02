<template>
  <transition name="slide">
    <nav v-if="visible" class="navigation">
      <div class="navigation__header">
        <div class="navigation__close" @click="toggle(false)">&#x2715;</div>
      </div>

      <ul>
        <li v-for="item in items" :key="item">
          <RouterLink
            :to="{ name: 'cocktail', params: { id: item } }"
            @click="toggle(false)"
            active-class="active"
          >
            {{ item }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script setup lang="ts">
import { Cocktail } from '@/features/cocktail'
import { computed } from 'vue'
import { useNavigationStore } from '../model/use-navigation-store'
import { storeToRefs } from 'pinia'

const items = computed(() => Object.values(Cocktail))
const { toggle } = useNavigationStore()
const { visible } = storeToRefs(useNavigationStore())
</script>

<style scoped>
.slide-enter-active {
  animation: slide-in 0.5s;
}
.slide-leave-active {
  animation: slide-in 0.5s reverse;
}

@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.navigation {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 400px;
  background: white;
  z-index: 1;
  border-right: 1px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.navigation__header {
  display: flex;
  align-items: center;
  height: var(--header-height);
  border-bottom: 1px solid var(--color-primary);
}

@media screen and (max-width: 600px) {
  .navigation {
    width: 100vw;
  }
}

.navigation__close {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  background: var(--color-gray);
  border-radius: 4px;
  transition: background 0.3s ease;
  margin-left: 16px;
}
.navigation__close:hover,
.navigation__close:focus {
  background: var(--color-dark-gray);
}

ul {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
  margin: 0;
  cursor: pointer;
  border-bottom: 1px solid var(--color-primary);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  display: flex;
  width: 100%;
  padding: 8px 40px;
}

a:hover {
  background: var(--color-gray);
}

a.active,
a:active,
a:focus {
  background: var(--color-dark-gray);
}
</style>
