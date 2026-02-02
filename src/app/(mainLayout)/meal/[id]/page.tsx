import MealDetailsClient from "@/components/modules/home/MealDetails";
import { mealService } from "@/service/meal.service";

export default async function MealDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await mealService.getMealById(id);

  return <MealDetailsClient data={data} />;
}
