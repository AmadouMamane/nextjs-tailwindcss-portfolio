import AppHeader from '../shared/AppHeader';
import AppFooter from '../shared/AppFooter';
import PagesMetaHead from '../PagesMetaHead';

const DefaultLayout = ({ children , isBlog }) => {
	return (
		<>
			<PagesMetaHead />
			<AppHeader />
			<div>{children}</div>
			<AppFooter isBlog={isBlog} />
		</>
	);
};

export default DefaultLayout;
