import PagesMetaHead from '../../PagesMetaHead';
import BackButton from '../../reusable/BackButton';
import Container from '../../layout/Container';
import AppHeader from '../../shared/AppHeader';
import AppFooter from '../../shared/AppFooter';

export default function DefaultBlogLayout({ children,  isBlog = true}) {
  return (

    <>
            <AppHeader />
    

        {!isBlog ? (
          <PagesMetaHead
            title="Blog"
            description="Writing by Amadou Mamane on AI, data systems, engineering, travel and learning."
            url="/blog"
          />
        ) : null}
        {isBlog ? <BackButton /> : null}

        <Container isBlog={isBlog}>
          <div className="mt-0">{children}</div>
          <AppFooter isBlog />
        </Container>
    </>

  

  );
}

