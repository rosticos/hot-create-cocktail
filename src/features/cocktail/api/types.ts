export interface APIDrink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string | null
  strInstructions: string | null
  strCategory: string | null
  strAlcoholic: string | null
  strGlass: string | null
  [key: `strIngredient${number}`]: string | null
  [key: `strMeasure${number}`]: string | null
}
