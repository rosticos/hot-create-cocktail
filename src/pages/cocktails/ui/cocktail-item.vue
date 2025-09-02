<template>
  <article class="cocktail-item">
    <img
      v-if="item.strDrinkThumb"
      class="cocktail-item__image"
      :src="item.strDrinkThumb"
      :alt="item.strDrink"
      loading="lazy"
      decoding="async"
    />

    <div class="cocktail-item__content">
      <h3>{{ item.strDrink }}</h3>

      <p class="cocktail-item__content-badges">
        <span>{{ item.strAlcoholic }}</span>
        <span>{{ item.strCategory }}</span>
        <span>{{ item.strGlass }}</span>
      </p>
    </div>

    <div class="divider" />

    <div class="cocktail-item__content">
      <strong>Instructions:</strong>
      <p>{{ item.strInstructions }}</p>
    </div>

    <div class="divider" />

    <div class="cocktail-item__content">
      <strong>Ingredients:</strong>

      <ul class="ingredients">
        <li v-for="({ name, measure }, index) in ingredients" :key="index">
          {{ name }}: {{ measure ?? 'By taste' }}
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { APIDrink } from '@/features/cocktail'
import { computed, type PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<APIDrink>,
    default: () => ({}),
  },
})

const ingredients = computed(() => {
  const result = []

  for (let i = 1; i < 16; i++) {
    result.push({
      name: props.item?.[`strIngredient${i}`] ?? null,
      measure: props.item?.[`strMeasure${i}`] ?? null,
    })
  }

  return result.filter(({ name, measure }) => name || measure)
})
</script>

<style scoped>
h3 {
  margin: 0;
  padding: 0;
}
.cocktail-item {
  background: var(--color-alt);
  border: 1px solid var(--color-primary);
  overflow: hidden;
}

.cocktail-item__image {
  aspect-ratio: 4/3;
  background: #f3f3f3;
  display: block;
  width: 100%;
  object-fit: cover;
  border-bottom: 1px solid var(--color-primary);
}

.cocktail-item__content {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cocktail-item__content-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.cocktail-item__content-badges span {
  display: inline-block;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 4px;
  background: #eef;
}

.ingredients {
  margin: 8px 0;
  padding-left: 16px;
}

.instructions {
  font-size: 14px;
}

.divider {
  height: 1px;
  width: 100%;
  background: var(--color-primary);
}
</style>
