// pages/blog/[id].jsx

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
import remarkSlug from "remark-slug";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FiClock, FiTag } from "react-icons/fi";
import { motion } from "framer-motion";
import readingTime from "reading-time";

import PagesMetaHead from "../../components/PagesMetaHead";
import DefaultBlogLayout from "../../components/blog/layouts/DefaultBlogLayout";
import Container from "../../components/layout/Container";

import TableOfContents from "../../components/TableOfContents";
import GalleryLightbox from "../../components/ui/GalleryLightbox";
import NextPrev from "../../components/ui/NextPrev";


import {
  Section,
  ImageGallery,
  Callout,
  FadeInSection,
  AuthorBox,
  ShareButtons,
  AnimatedSection,
  ExplodedBookGallery,
  SectionDivider,
} from "../../components/ui";

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
  const readStats = readingTime(content);

  const files = fs.readdirSync(blogDirectory).filter((file) =>
    file.endsWith(".mdx") || file.endsWith(".qmd")
  );
  const slugs = files.map((file) => file.replace(/\.(mdx|qmd)$/, ""));
  const currentIndex = slugs.indexOf(params.id);

  const getPostMeta = (slug) => {
    if (!slug) return null;
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContent);
    return { slug, title: data.title || slug };
  };

  const prevPost = getPostMeta(slugs[currentIndex - 1]);
  const nextPost = getPostMeta(slugs[currentIndex + 1]);

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkSlug],
      rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeAutolinkHeadings],
    },
  });

  return {
    props: {
      frontMatter: {
        ...data,
        readingTime: readStats.text,
        wordCount: readStats.words,
      },
      mdxSource,
      prevPost,
      nextPost,
      isBlog: true,
    },
  };
}

function BlogSingle({ frontMatter, mdxSource, prevPost, nextPost }) {



  const nextPrevRef = useRef(null);
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
    import("basiclightbox").then((basicLightbox) => {
      basicLightbox
        .create(`<img src="${src}" style="max-width:100%;border-radius:1rem"/>`)
        .show();
    });
  };

  return (
    <>
      <Container isBlog={false}>
      <PagesMetaHead
        title={frontMatter.title}
        description={frontMatter.description}
        image={frontMatter.image}
        keywords={frontMatter.tags?.join(", ")}
      />

      <TableOfContents />

      <div
        className="fixed top-10 right-10 w-12 h-12 rounded-full z-[9999] flex items-center justify-center text-white text-sm font-bold shadow-lg"
        style={{
          background: `conic-gradient(from 0deg, #6366f1 ${scrollProgress}%, #f3f4f6 ${scrollProgress}%)`,
        }}
      >
        {Math.round(scrollProgress)}%
      </div>


      {/* Scroll Indicator */}
      <div
        className="fixed top-10 right-10 w-12 h-12 rounded-full z-[9999] flex items-center justify-center text-white text-sm font-bold shadow-lg"
        style={{
          background: `conic-gradient(from 0deg, #6366f1 ${scrollProgress}%, #f3f4f6 ${scrollProgress}%)`,
        }}
      >
        {Math.round(scrollProgress)}%
      </div>

      <div className="max-w-9xl mx-auto mt-28">
        <div className="prose lg:prose-xl mx-auto dark:prose-invert">

        <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] leading-tight font-extrabold tracking-normal text-center 
    bg-gradient-to-r from-gray-900 via-black to-gray-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 
    bg-clip-text text-transparent mt-1 mb-5 transition-all duration-700 ease-out">
  {frontMatter.title}
</h1>



          {/* Meta Info */}
          <div className="flex flex-wrap justify-center gap-10 text-sm sm:text-base text-primary-dark dark:text-primary-light">
            <div className="flex items-center"><FiClock className="mr-2" />{frontMatter.date}</div>
            {frontMatter.readingTime && (
              <div className="flex items-center gap-1">🕒 <span>{frontMatter.readingTime}</span></div>
            )}
            {frontMatter.wordCount && (
              <div className="flex items-center gap-1">✍️ <span>{frontMatter.wordCount} words</span></div>
            )}
            {frontMatter.tags?.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <FiTag />
                {frontMatter.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-ternary-light rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Actual content */}
        <motion.article
          className="prose sm:prose-base md:prose-lg lg:prose-xl dark:prose-invert"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MDXRemote
            {...mdxSource}
            components={{
              h1: (props) => <h1 className="scroll-mt-24" {...props} />,
              h2: (props) => <h2 className="scroll-mt-24" {...props} />,
              h3: (props) => <h3 className="scroll-mt-24" {...props} />,
              p: (props) => <div className="mt-3 leading-relaxed text-gray-800 dark:text-gray-300" {...props} />,
              a: (props) => <a className="text-indigo-600 hover:underline" {...props} />,
              blockquote: (props) => (
                <blockquote
                  className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-gray-400"
                  {...props}
                />
              ),
              img: (props) => (
                <img
                  {...props}
                  className="rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleLightbox(props.src)}
                />
              ),
              Image,
              motion,
              AnimatedSection,
              Callout,
              FadeInSection,
              AuthorBox,
              ShareButtons,
              TableOfContents,
              GalleryLightbox,
              NextPrev,
              ImageGallery,
              Section,
              ExplodedBookGallery,
              SectionDivider,
            }}
          />
        </motion.article>
        </Container>

    
        <div ref={nextPrevRef}>
          <NextPrev prev={prevPost} next={nextPost} />
        </div>


    </>
  );
}


BlogSingle.getLayout = (page) => (
  <DefaultBlogLayout>{page}</DefaultBlogLayout>
  
);

export default BlogSingle;