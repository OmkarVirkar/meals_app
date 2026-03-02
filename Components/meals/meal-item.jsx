import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <ErrorBoundary
            fallback={
              <div className={classes.imageFallback}>Image not found</div>
            }
          >
            <Image src={image} alt={title} fill />
          </ErrorBoundary>
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
