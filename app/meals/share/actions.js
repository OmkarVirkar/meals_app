"use server";

import { redirect } from "next/navigation";

const { saveMeal } = require("@/lib/meals");

const isInvalidText = (text) => {
  return !text || text.trim().length === 0;
};

export async function submitMealAction(formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  if (
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Data",
    };
  }

  await saveMeal(meal);
  redirect("/meals");
}
