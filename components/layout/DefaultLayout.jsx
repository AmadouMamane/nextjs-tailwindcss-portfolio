// components/layout/DefaultLayout.jsx

import AppHeader from '../shared/AppHeader';
import AppFooter from '../shared/AppFooter';
import PagesMetaHead from '../PagesMetaHead';
import Container from './Container';


const DefaultLayout = ({ children }) => {
	return (
	
	  <div>
		<PagesMetaHead />
		<AppHeader />
		{children}

		<Container>
			<AppFooter/>
		</Container>
	  </div>

	);
  };
  

export default DefaultLayout;
