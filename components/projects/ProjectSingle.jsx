import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiShield, FiTag } from 'react-icons/fi';

const ProjectSingle = (props) => {
	const isTesseraCard = props.type === 'tessera' || props.id === 1;
	const imageSrc = props.cardImg || props.img;
	const cardTitle = props.cardTitle || props.title;
	const cardSummary = props.cardSummary || props.tagline;

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
				<div className={`group mb-10 flex h-[520px] cursor-pointer flex-col overflow-hidden rounded-lg bg-secondary-light shadow-lg transition duration-300 hover:shadow-2xl dark:bg-ternary-dark sm:mb-0 ${isTesseraCard ? 'border border-indigo-400/25 hover:-translate-y-1 hover:border-indigo-300/45' : ''}`}>
					<div className={`relative h-80 w-full shrink-0 overflow-hidden ${isTesseraCard ? 'bg-[#020611]' : ''}`}>
						<Image
							src={imageSrc}
							alt={props.title}
							fill
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							className={`${isTesseraCard ? 'object-contain p-3 sm:p-4' : 'object-cover'} border-none group-hover:scale-[1.02] transition-transform duration-500`}
						/>
					</div>

					<div className="flex flex-1 flex-col px-4 py-4 text-center">
						<div className="flex items-center justify-center gap-2">
							{isTesseraCard && (
								<span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white shadow-sm shadow-indigo-500/30">
									<FiShield className="h-4 w-4" aria-hidden="true" />
								</span>
							)}
							<p className="line-clamp-2 text-xl font-medium leading-snug text-ternary-dark dark:text-ternary-light md:text-xl">
								{cardTitle}
							</p>
						</div>
						{cardSummary && (
							<p className="mt-2 inline-flex items-center justify-center gap-2 text-sm leading-5 text-gray-600 dark:text-gray-400">
								<span className={`h-1.5 w-1.5 rounded-full ${isTesseraCard ? 'bg-indigo-500' : 'bg-gray-400 dark:bg-gray-500'}`} aria-hidden="true" />
								<span className="line-clamp-1">{cardSummary}</span>
							</p>
						)}
						<div className={`${isTesseraCard ? 'mt-3 flex flex-nowrap items-center justify-center gap-1.5 overflow-hidden' : 'mt-3 flex flex-wrap items-center justify-center gap-2'}`}>
							{!isTesseraCard && (
								<FiTag className="shrink-0 text-ternary-dark dark:text-ternary-light" aria-hidden="true" />
							)}
							{isTesseraCard && props.cardHighlights ? (
								props.cardHighlights.map((highlight) => (
									<span
										key={highlight}
										className="shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-2 py-1 text-[10px] font-semibold leading-none text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300"
									>
										{highlight}
									</span>
								))
							) : (
								<span className="text-xs px-2 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-ternary-light rounded-full">
									{props.ProjectHeader.tags}
								</span>
							)}
							{props.secondaryCategory && !isTesseraCard && (
								<span className={`${isTesseraCard ? 'rounded-full border border-indigo-300/20 bg-indigo-400/10 px-2.5 py-1 text-xs font-medium text-indigo-100' : 'text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-100 dark:border-indigo-900'}`}>
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
