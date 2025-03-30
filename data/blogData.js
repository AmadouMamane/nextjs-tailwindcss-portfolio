import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export function getAllBlogPosts() {
  const files = fs.readdirSync(blogDirectory);
  return files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDirectory, filename), "utf-8");
    const { data } = matter(fileContent);
    return {
      slug: filename.replace(".mdx", ""),
      title: data.title,
      category: data.tags[0],
      date: data.date,
      image: data.image,
    };
  });
}
