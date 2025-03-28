import BlogGrid from '../../components/blog/BlogGrid';
import PagesMetaHead from '../../components/PagesMetaHead';

export default function Blog() {
  return (
    <div className="container mx-auto">
      <PagesMetaHead title="Blog" />
      <BlogGrid />
    </div>
  );
}
