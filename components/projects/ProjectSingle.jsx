import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiTag } from 'react-icons/fi';

const ProjectSingle = (props) => {
	const isTesseraCard = props.type === 'tessera' || props.id === 1;
	const imageSrc = props.cardImg || props.img;

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
				aria-label={`View project: ${props.title}`}
				passHref
			>
				<div className="group rounded-lg shadow-lg hover:shadow-2xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark overflow-hidden transition-shadow duration-300">
					<div className={`relative w-full h-80 overflow-hidden ${isTesseraCard ? 'bg-[#020611]' : ''}`}>
						<Image
							src={imageSrc}
							alt={props.title}
							fill
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							className={`${isTesseraCard ? 'object-contain p-3 sm:p-4' : 'object-cover'} border-none group-hover:scale-[1.02] transition-transform duration-500`}
						/>
						{props.id === 1 && (
							<div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500 text-white shadow-md">
								Flagship
							</div>
						)}
					</div>

					<div className="text-center px-4 py-6">
						<p className="text-xl md:text-xl text-ternary-dark dark:text-ternary-light mb-2 font-medium">
							{props.title}
						</p>
						{props.tagline && (
							<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
								{props.tagline}
							</p>
						)}
						<div className="flex flex-wrap justify-center items-center gap-2 mt-3">
							<FiTag className="text-ternary-dark dark:text-ternary-light shrink-0" aria-hidden="true" />
							<span className="text-xs px-2 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-ternary-light rounded-full">
								{props.ProjectHeader.tags}
							</span>
							{props.secondaryCategory && (
								<span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-100 dark:border-indigo-900">
									{props.secondaryCategory}
								</span>
							)}
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default ProjectSingle;
