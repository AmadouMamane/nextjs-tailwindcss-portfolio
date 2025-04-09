import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogGrid from "../../components/blog/BlogGrid";
import DefaultBlogLayout from "../../components/blog/layouts/DefaultBlogLayout";
import Container from "../../components/layout/Container";

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(blogDir);

  const blogs = filenames.map((filename) => {
    const slug = filename.replace(/\.(mdx|qmd)$/, "");
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title,
      publishDate: data.date,
      img: data.image || "/default-thumbnail.jpg", // Ensures fallback image
      tags: data.tags || [],
      category: data.category || "General", // optional fallback
    };
  }).filter(blog => blog.title && blog.publishDate); // Ensures valid data

  return {
    props: {
      blogs,
    },
  };
}



function BlogPage({ blogs }) {
  return <BlogGrid blogs={blogs} />
}

BlogPage.getLayout = (page) => (
  <DefaultBlogLayout  isBlog={false}>
    {page}
    </DefaultBlogLayout>
);

export default BlogPage;