import Image from 'next/image';
import Link from 'next/link';

function BlogSingle({ id, title, img, publishDate, url }) {
    return (
        <Link href={`/blog/${url}`} passHref>
            <div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
                <div>
                    <Image
                        src={img}
                        className="rounded-t-xl w-full h-auto border-none"
                        alt={title}
                        width={800}
                        height={0}
                    />
                </div>
                <div className="text-center px-4 py-6">
                    <p className="text-xl md:text-2xl text-ternary-dark dark:text-ternary-light mb-2">
                        {title}
                    </p>
                    <span className="text-lg text-ternary-dark dark:text-ternary-light">
                        {publishDate}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default BlogSingle;

