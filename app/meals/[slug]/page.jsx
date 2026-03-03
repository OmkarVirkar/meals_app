import Image from "next/image";
import { getMealBySlug } from "@/lib/meals";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = await getMealBySlug(params.slug);

  if (!meal) {
    notFound(); //  THis function will navigate the user to the closest 404 page in the file structure if the meal is not found in the database
  } else {
    return {
      title: meal.title,
      description: meal.summary,
    };
  }
}

export default async function Page({ params }) {
  const meal = await getMealBySlug(params.slug);

  if (!meal) {
    notFound(); //  THis function will navigate the user to the closest 404 page in the file structure if the meal is not found in the database
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            By <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
