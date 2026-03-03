import { Suspense } from "react";
import Link from "next/link";
import classes from "./page.module.css";
import Loading from "./loading-out";
import MealsGrid from "@/Components/meals/MealsGrid";
import { getAllMeals } from "@/lib/meals";

export const metadata = {
  title: "All Meals",
  description:
    "Browsere all meals created by our users and find your favorite one.",
};

export async function Meals() {
  const meals = await getAllMeals();
  return <MealsGrid meals={meals} />;
}

export default async function Page() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your Favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<Loading />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
