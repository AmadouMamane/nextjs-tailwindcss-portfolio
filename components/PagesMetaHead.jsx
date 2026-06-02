import Head from 'next/head';

const siteName = 'Amadou Mamane';
const siteUrl = 'https://amadoumamane.fr';
const defaultTitle = 'Amadou Mamane - AI & Data Engineering Portfolio';
const defaultDescription =
	'Portfolio of Amadou Mamane: AI engineering, data platforms, machine learning systems and open-source case studies.';
const defaultImage = '/images/projects/tessera/card.svg?v=5';

function absoluteUrl(value) {
	if (!value) return undefined;
	if (value.startsWith('http')) return value;
	return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
}

function PagesMetaHead({
	title = defaultTitle,
	keywords = 'AI engineering, data science, data engineering, machine learning, LLM agents',
	description = defaultDescription,
	image = defaultImage,
	url = siteUrl,
	type = 'website',
}) {
	const pageTitle = title === defaultTitle ? title : `${title} - ${siteName}`;
	const imageUrl = absoluteUrl(image);
	const canonicalUrl = absoluteUrl(url);

	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.png" />
			{canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
			<meta property="og:site_name" content={siteName} />
			<meta property="og:type" content={type} />
			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={description} />
			{canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
			{imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={pageTitle} />
			<meta name="twitter:description" content={description} />
			{imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
			<title>{pageTitle}</title>
		</Head>
	);
}

export default PagesMetaHead;
