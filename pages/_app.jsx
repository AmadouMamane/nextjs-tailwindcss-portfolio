import Script from 'next/script';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import DefaultLayout from '../components/layout/DefaultLayout';
import UseScrollToTop from '../hooks/useScrollToTop';
import { ThemeProvider } from 'next-themes';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => (
    <DefaultLayout isBlog={pageProps?.isBlog}>{page}</DefaultLayout>
  ));

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <AnimatePresence>
        <div className={`${playfair.variable} bg-secondary-light dark:bg-primary-dark transition duration-300 font-sans`}>
          {getLayout(<Component {...pageProps} />)}
          <UseScrollToTop />
        </div>
      </AnimatePresence>

      {/* Google Analytics */}
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script strategy="afterInteractive" id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}
    </ThemeProvider>
  );
}


export default MyApp;
