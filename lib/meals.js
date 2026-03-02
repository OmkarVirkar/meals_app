import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "fs";

const db = sql("meals.db");

export async function getAllMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 8000));
  const stmt = db.prepare("SELECT * FROM meals");
  return await stmt.all();
}

export async function getMealBySlug(slugName) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return await stmt.get(slugName);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `/images/${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error(`Failed to save image: ${error.message}`);
    }
  });
  const stmt = db.prepare(
    "INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug) VALUES (@creator, @creator_email, @title, @summary, @instructions, @image, @slug)",
  );
  stmt.run({
    ...meal,
    image: fileName,
  });
}
