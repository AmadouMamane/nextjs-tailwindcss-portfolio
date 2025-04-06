import Image from 'next/image';

function AboutClientSingle({ title, image }) {
	return (
		<div className="py-5 px-10 border bg-secondary-light border-gray-200 dark:border-ternary-dark  shadow-sm rounded-lg mb-5 cursor-pointer">
			<Image
			src={image}
			alt={title}
			
			className="object-contain w-full h-auto"
			/>

		</div>
	);
}

export default AboutClientSingle;
