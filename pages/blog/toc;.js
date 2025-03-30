import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import Image from "next/image";
import { useEffect, useState } from "react";
import DefaultBlogLayout from "../../components/blog/layouts/DefaultBlogLayout";
import PagesMetaHead from "../../components/PagesMetaHead";
import TableOfContents from "../../components/TableOfContents";
import { motion } from "framer-motion";

const blogDirectory = path.join(process.cwd(), "content/blog");

export async function getStaticPaths() {
  const files = fs.readdirSync(blogDirectory);
  const paths = files.map((filename) => ({
    params: { id: filename.replace(/\.(mdx|qmd)$/, "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePathMdx = path.join(blogDirectory, `${params.id}.mdx`);
  const filePathQmd = path.join(blogDirectory, `${params.id}.qmd`);
  const filePath = fs.existsSync(filePathMdx) ? filePathMdx : filePathQmd;

  if (!fs.existsSync(filePath)) return { notFound: true };

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [
        rehypeSlug,
        rehypeHighlight,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
  });

  return { props: { frontMatter: data, mdxSource } };
}

export default function BlogSingle({ frontMatter, mdxSource }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLightbox = (src) => {
    import("basiclightbox").then((lightbox) => {
      lightbox.create(`<img src="${src}" style="max-width:100%" />`).show();
    });
  };

  return (
    <DefaultBlogLayout>
      <PagesMetaHead {...frontMatter} />

      <div
        className="fixed top-6 right-6 w-12 h-12 rounded-full z-[9999] flex items-center justify-center text-white text-sm font-bold shadow-lg"
        style={{
          background: `conic-gradient(from 0deg, #6366f1 ${scrollProgress}%, #f3f4f6 ${scrollProgress}%)`,
        }}
      >
        {Math.round(scrollProgress)}%
      </div>

      {/* Main content and ToC container */}
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 relative">
        {/* Main content section takes up more width */}
        <div className="w-full xl:w-9/12">
          <motion.article
            className="prose lg:prose-xl mx-auto dark:prose-invert mt-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1>{frontMatter.title}</h1>
            <p className="text-gray-500">{frontMatter.date}</p>

            {frontMatter.image && (
              <div onClick={() => handleLightbox(frontMatter.image)}>
                <Image
                  src={frontMatter.image}
                  alt={frontMatter.title}
                  width={800}
                  height={500}
                  className="rounded-xl my-10 cursor-pointer"
                />
              </div>
            )}

            <MDXRemote
              {...mdxSource}
              components={{
                h1: (props) => (
                  <h1 className="text-4xl font-bold mt-8 scroll-mt-24" {...props} />
                ),
                h2: (props) => (
                  <h2 className="text-3xl font-semibold mt-6 scroll-mt-24" {...props} />
                ),
                h3: (props) => (
                  <h3 className="text-2xl font-medium mt-5 scroll-mt-24" {...props} />
                ),
                p: (props) => (
                  <p className="mt-3 leading-relaxed text-gray-800 dark:text-gray-300" {...props} />
                ),
                a: (props) => (
                  <a className="text-indigo-600 hover:underline" {...props} />
                ),
                blockquote: (props) => (
                  <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-gray-400" {...props} />
                ),
                img: (props) => (
                  <img
                    {...props}
                    className="rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => handleLightbox(props.src)}
                  />
                ),
                Image,
                motion,
              }}
            />
          </motion.article>
        </div>

        {/* Table of Contents Section */}
        <div className="fixed top-32 right-10 w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-sm text-gray-700 dark:text-gray-300 max-h-[80vh] overflow-auto z-[9998]">
          <TableOfContents />
        </div>
      </div>
    </DefaultBlogLayout>
  );
}
