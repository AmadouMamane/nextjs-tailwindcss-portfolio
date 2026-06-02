import { FiTag } from 'react-icons/fi';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function BlogSingle({ title, img, publishDate, slug, tags = [] }) {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <div className="group mb-10 flex h-[440px] cursor-pointer flex-col overflow-hidden rounded-lg border border-indigo-400/20 bg-secondary-light shadow-lg transition duration-300 hover:border-indigo-300/45 hover:shadow-2xl dark:border-indigo-300/10 dark:bg-ternary-dark dark:hover:border-indigo-300/35 sm:mb-0">
        <div className="relative h-64 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-950">
          <Image
            src={img || "/default-thumbnail.jpg"}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="border-none object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col px-4 py-4 text-center">
          <p className="line-clamp-2 min-h-[3.5rem] text-xl leading-snug text-ternary-dark dark:text-ternary-light">
            {title}
          </p>
          <span className="mx-auto mt-2 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-100/80 px-2.5 py-1 text-xs text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-slate-300">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {publishDate}
          </span>

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/80 text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-slate-300">
                <FiTag className="h-3 w-3" aria-hidden="true" />
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200/80 bg-primary-light px-2 py-1 text-xs text-primary-dark dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-ternary-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default BlogSingle;
      
