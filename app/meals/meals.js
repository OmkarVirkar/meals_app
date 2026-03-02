import MealsGrid from "@/Components/meals/MealsGrid";
import { getAllMeals } from "@/lib/meals";

export default async function Meals() {
  const meals = await getAllMeals();
  return <MealsGrid meals={meals} />;
}
