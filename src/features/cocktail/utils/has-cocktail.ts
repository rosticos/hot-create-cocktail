import { Cocktail } from '../model/constants'

// Проверяет, что переданное значение является допустимым кодом коктейля
export function hasCocktail(value: string): value is Cocktail {
  const tmp = value?.toLocaleLowerCase()

  return Object.values(Cocktail).includes(tmp as Cocktail)
}
