import { blogData } from '../../data/blogData';
import { useRouter } from 'next/router';
import PagesMetaHead from '../../components/PagesMetaHead';

export default function BlogSingle() {
  const router = useRouter();
  const { id } = router.query;
  const article = blogData.find((b) => b.url === id);

  if (!article) {
    return <div className="container mx-auto px-4 py-10">Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <PagesMetaHead title={article.title} />
      <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light mt-10 sm:mt-20 mb-4">
        {article.title}
      </h1>
      <p className="text-lg text-ternary-dark dark:text-ternary-light mb-4">
        {article.publishDate}
      </p>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

// Ajout du blog au menu de navigation dans AppHeader.js
{/* Ajouter ce bloc dans AppHeader.js dans la section des liens */}
<div className="block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 mb-2 sm:py-2">
  <Link href="/blog">Blog</Link>
</div>
