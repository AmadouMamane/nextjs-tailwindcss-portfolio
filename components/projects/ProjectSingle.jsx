import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

const imageStyle = { maxWidth: '100%', height: 'auto' };

const ProjectSingle = (props) => {
	const iframeRef = useRef(null);
	const [isFullscreen, setIsFullscreen] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.7,
				delay: 0.15,
			}}
		>
			<Link
				href="/projects/[id]"
				as={'/projects/' + props.id}
				aria-label="Single Project"
				passHref
			>
				<div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
					<div>
						<Image
							src={props.img}
							className="rounded-t-xl w-full h-auto border-none"
							alt="Single Project"
							width={800}
							height={0}
						/>
					</div>
					<div className="text-center px-4 py-6">
						<p className="font-general-medium text-xl md:text-2xl text-ternary-dark dark:text-ternary-light mb-2">
							{props.title}
						</p>
						<span className="text-lg text-ternary-dark dark:text-ternary-light">
							{props.category}
						</span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};



export default ProjectSingle;
