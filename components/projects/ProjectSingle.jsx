import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FiTag } from 'react-icons/fi';

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
					<div className="relative w-full h-80">
						<Image
							src={props.img}
		
							alt={props.title}
					            layout="fill"
            				className="object-fill rounded-t-xl border-none"
						/>
					</div>

					<div className="text-center px-4 py-6">
						<p className="text-xl md:text-xl text-ternary-dark dark:text-ternary-light mb-2">{props.title}</p>
						<div className="flex flex-wrap justify-center items-center gap-1 mt-3">

			
						<FiTag className="text-ternary-dark dark:text-ternary-light" />
						<span className="text-xs px-2 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-ternary-light rounded-full">

							{props.ProjectHeader.tags}
						</span>
					</div>
		
				</div>

	
				</div>
			</Link>
		</motion.div>
	);
};



export default ProjectSingle;
