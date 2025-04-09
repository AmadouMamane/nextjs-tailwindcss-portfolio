import PagesMetaHead from '../../PagesMetaHead';
import BackButton from '../../reusable/BackButton';
import Container from '../../layout/Container';
import AppHeader from '../../shared/AppHeader';
import AppFooter from '../../shared/AppFooter';

export default function DefaultBlogLayout({ children,  isBlog = true}) {
  return (

    <>
            <PagesMetaHead />
            <AppHeader />
    

        <PagesMetaHead title="Blog" />
        <BackButton />

        <Container isBlog={isBlog}>
          <div className="mt-0">{children}</div>
          <AppFooter isBlog />
        </Container>
    </>

  

  );
}



