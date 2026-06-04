import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-secondary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
