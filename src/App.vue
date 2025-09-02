<template>
  <div class="app">
    <header class="header">
      <div @click="toggle(true)" class="header__toggle">☰</div>
      <div>🍸 How to create cocktail (Menu)</div>
    </header>

    <NavigationMenu />

    <main class="main container">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { NavigationMenu, useNavigationStore } from '@/widgets'

const { toggle } = useNavigationStore()
</script>

<style>
.header {
  align-items: center;
  display: flex;
  gap: 12px;
  height: var(--header-height);
  padding: 0 16px;
  border-bottom: 1px solid var(--color-primary);
}

.header__toggle {
  cursor: pointer;
  padding: 4px 8px;
  background: var(--color-gray);
  border-radius: 4px;
  transition: background 0.3s ease;
}

.header__toggle:hover,
.header__toggle:active {
  background: var(--color-dark-gray);
}

.container {
  width: min(100%, var(--container-max));
  margin-inline: auto;
  padding: 16px;
}

.main {
  padding: 16px 32px;
}
</style>
