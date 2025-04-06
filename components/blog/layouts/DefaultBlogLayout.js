import PagesMetaHead from '../../PagesMetaHead';
import BackButton from '../../reusable/BackButton';

export default function DefaultBlogLayout({ children }) {
  return (
    <div className="container mx-auto">
      <PagesMetaHead title="Blog" />
      <BackButton />
      <div>  
        {children}
      </div>
    </div>
  );
}