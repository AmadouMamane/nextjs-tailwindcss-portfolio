import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiMusic, FiShield, FiTag } from 'react-icons/fi';

const cardIcons = {
	music: FiMusic,
	shield: FiShield,
};

const iconStyles = {
	blue: 'bg-gradient-to-br from-sky-400 via-cyan-500 to-emerald-400 text-white shadow-md shadow-cyan-500/25 ring-1 ring-white/25',
	indigo: 'bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 text-white shadow-md shadow-indigo-500/30 ring-1 ring-white/25',
	rose: 'bg-gradient-to-br from-rose-500 via-fuchsia-500 to-amber-300 text-white shadow-md shadow-rose-500/25 ring-1 ring-white/25',
};

const ProjectSingle = (props) => {
	const isTesseraCard = props.type === 'tessera' || props.id === 1;
	const imageSrc = props.cardImg || props.img;
	const cardTitle = props.cardTitle || props.title;
	const cardSummary = props.cardSummary || props.tagline;
	const CardIcon = cardIcons[props.cardIcon] || (isTesseraCard ? FiShield : null);
	const iconClassName = iconStyles[props.cardAccent] || iconStyles.indigo;

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
				<div className={`group mb-10 flex h-[488px] cursor-pointer flex-col overflow-hidden rounded-lg border bg-secondary-light shadow-lg transition duration-300 hover:shadow-2xl dark:bg-ternary-dark sm:mb-0 ${isTesseraCard ? 'border-indigo-400/25 hover:-translate-y-1 hover:border-indigo-300/45' : 'border-transparent'}`}>
					<div className={`relative h-80 w-full shrink-0 overflow-hidden ${isTesseraCard ? 'bg-[#020611]' : ''}`}>
						<Image
							src={imageSrc}
							alt={props.title}
							fill
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							className={`${isTesseraCard ? 'object-contain p-3 sm:p-4' : 'object-cover'} border-none group-hover:scale-[1.02] transition-transform duration-500`}
						/>
					</div>

					<div className="flex flex-1 flex-col px-4 py-3 text-center">
						<div className="flex h-14 items-start justify-center gap-2">
							{(CardIcon || props.cardLogo) && (
								<span className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
									{props.cardLogo ? (
										<span className="text-base leading-none" aria-hidden="true">{props.cardLogo}</span>
									) : (
										<CardIcon className="h-4 w-4" aria-hidden="true" />
									)}
								</span>
							)}
							<p className="line-clamp-2 max-w-[15rem] text-left text-xl font-medium leading-snug text-ternary-dark dark:text-ternary-light md:text-xl">
								{cardTitle}
							</p>
						</div>
						{cardSummary && (
							<p className="mx-auto mt-2 flex min-h-[2.5rem] w-full max-w-[18rem] items-start justify-start gap-2 text-left text-sm leading-5 text-gray-600 dark:text-gray-400">
								<span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" aria-hidden="true" />
								<span className="line-clamp-2">{cardSummary}</span>
							</p>
						)}
						<div className={`${props.cardHighlights ? 'mt-3 flex flex-nowrap items-center justify-center gap-1 overflow-hidden' : 'mt-3 flex flex-wrap items-center justify-center gap-2'}`}>
							<FiTag className="shrink-0 text-ternary-dark dark:text-ternary-light" aria-hidden="true" />
							{props.cardHighlights ? (
								props.cardHighlights.map((highlight) => (
									<span
										key={highlight}
										className="shrink-0 rounded-full bg-primary-light px-1.5 py-1 text-[11px] text-primary-dark dark:bg-primary-dark dark:text-ternary-light"
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
