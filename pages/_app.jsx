import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import DefaultLayout from '../components/layout/DefaultLayout';
import UseScrollToTop from '../hooks/useScrollToTop';

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
	const isBlog = pageProps?.isBlog || false;
  
	return (
	  <AnimatePresence>
		<div
		  className={`${playfair.variable} bg-secondary-light dark:bg-primary-dark transition duration-300 font-sans`}
		>
		  <DefaultLayout isBlog={isBlog}>
			<Component {...pageProps} />
		  </DefaultLayout>
		  <UseScrollToTop />
		</div>
	  </AnimatePresence>
	);
  }
  

export default MyApp;
