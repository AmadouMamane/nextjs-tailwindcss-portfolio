// components/layout/DefaultLayout.jsx

import { useRouter } from 'next/router';
import AppHeader from '../shared/AppHeader';
import AppFooter from '../shared/AppFooter';
import PagesMetaHead from '../PagesMetaHead';
import Container from './Container';
import BackButton from '../reusable/BackButton';

const DefaultLayout = ({ children, isBlog = false }) => {
	const router = useRouter();
	const isBlogSection = router.pathname.startsWith('/blog');
	const isBlogArticle = isBlogSection && router.pathname !== '/blog';
	const applyBlogLayout = isBlog || isBlogArticle;

	return (
	  <div>
		{!isBlogSection ? (
			<PagesMetaHead />
		) : (
			<PagesMetaHead 
				title="Blog"
				description="Writing by Amadou Mamane on AI, data systems, engineering, travel and learning."
				url="/blog"
			/>
		)}
		
		<AppHeader />
		
		{isBlogArticle ? <BackButton /> : null}

		{isBlogSection ? (
			<Container isBlog={isBlogArticle}>
				<div className="mt-0">{children}</div>
				<AppFooter isBlog={isBlogArticle} />
			</Container>
		) : (
			<>
				{children}
				<Container>
					<AppFooter/>
				</Container>
			</>
		)}
	  </div>
	);
};

export default DefaultLayout;
