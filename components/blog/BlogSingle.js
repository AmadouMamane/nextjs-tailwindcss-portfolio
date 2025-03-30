import { FiTag } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

function BlogSingle({ title, img, publishDate, slug, tags = [] }) {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
        <div className="relative w-full h-80">
          <Image
            src={img || "/default-thumbnail.jpg"}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl border-none"
            priority
          />
        </div>
        <div className="text-center px-4 py-6">
          <p className="text-xl md:text-2xl text-ternary-dark dark:text-ternary-light mb-2">
            {title}
          </p>
          <span className="text-lg text-ternary-dark dark:text-ternary-light block mb-2">
            {publishDate}
          </span>

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
              <FiTag className="text-ternary-dark dark:text-ternary-light" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-ternary-light rounded-full"
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
      