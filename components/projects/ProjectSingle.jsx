import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Cpu, Dna, Music, ShieldCheck } from 'lucide-react';

const cardIcons = {
	dna: Dna,
	music: Music,
	shield: ShieldCheck,
};

const iconStyles = {
	blue: {
		shell: 'border-cyan-200/45 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.88),rgba(56,189,248,0.26)_25%,rgba(8,47,73,0.94)_72%)] text-cyan-50 dark:border-cyan-300/25',
		inner: 'bg-cyan-300/10 ring-cyan-100/20',
		line: 'via-cyan-100/80',
	},
	indigo: {
		shell: 'border-indigo-200/45 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.9),rgba(129,140,248,0.28)_24%,rgba(24,24,66,0.95)_72%)] text-indigo-50 dark:border-indigo-300/25',
		inner: 'bg-indigo-300/10 ring-indigo-100/20',
		line: 'via-indigo-100/80',
	},
	rose: {
		shell: 'border-rose-200/50 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.92),rgba(251,113,133,0.28)_25%,rgba(76,5,25,0.94)_74%)] text-rose-50 dark:border-rose-300/25',
		inner: 'bg-rose-300/10 ring-rose-100/20',
		line: 'via-rose-100/80',
	},
};

const cardFocusClassName = 'border-indigo-400/25 hover:border-indigo-300/45 dark:border-indigo-300/12 dark:hover:border-indigo-300/40';
const metaChipClassName = 'bg-slate-100/90 text-slate-600 ring-slate-200/80 dark:bg-white/[0.055] dark:text-slate-300 dark:ring-white/[0.08]';
const techChipClassName = 'bg-white text-slate-800 ring-slate-200 dark:bg-white/[0.07] dark:text-slate-100 dark:ring-white/[0.09]';

const ProjectSingle = (props) => {
	const isTesseraCard = props.type === 'tessera' || props.id === 1;
	const imageSrc = props.cardImg || props.img;
	const cardTitle = props.cardTitle || props.title;
	const cardSummary = props.cardSummary || props.tagline;
	const cardDate = props.cardDate || props.ProjectHeader?.publishDate;
	const secondaryMeta = props.secondaryCategory || props.ProjectHeader?.tags;
	const CardIcon = cardIcons[props.cardIcon] || (isTesseraCard ? ShieldCheck : null);
	const iconTheme = iconStyles[props.cardAccent] || iconStyles.indigo;

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
				<div className={`group mb-10 flex h-[488px] cursor-pointer flex-col overflow-hidden rounded-lg border bg-secondary-light shadow-lg transition duration-300 hover:shadow-2xl dark:bg-ternary-dark sm:mb-0 ${cardFocusClassName}`}>
					<div className={`relative h-80 w-full shrink-0 overflow-hidden ${isTesseraCard ? 'bg-[#020611]' : ''}`}>
						<Image
							src={imageSrc}
							alt={props.title}
							fill
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							className={`${isTesseraCard ? 'object-contain p-3 sm:p-4' : 'object-cover'} border-none`}
						/>
					</div>

					<div className="flex flex-1 flex-col px-4 py-2.5 text-center">
						<div className="flex h-[3.25rem] items-start justify-center gap-2">
							{(CardIcon || props.cardLogo) && (
								<span className={`relative mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${iconTheme.shell}`}>
									<span className={`pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent ${iconTheme.line} to-transparent`} />
									<span className={`relative inline-flex h-7 w-7 items-center justify-center rounded-xl ring-1 backdrop-blur ${iconTheme.inner}`}>
										{props.cardLogo ? (
											<span className="text-base leading-none" aria-hidden="true">{props.cardLogo}</span>
										) : (
											<CardIcon className="h-[17px] w-[17px]" strokeWidth={1.9} aria-hidden="true" />
										)}
									</span>
								</span>
							)}
							<p className="line-clamp-2 max-w-[15rem] text-left text-[19px] font-medium leading-snug text-slate-900 dark:text-slate-100 md:text-[19px]">
								{cardTitle}
							</p>
						</div>
						{cardSummary && (
							<p className="mx-auto mt-1.5 min-h-[2.25rem] w-full max-w-[18rem] text-left text-[13px] leading-[18px] text-slate-500 dark:text-slate-400">
								<span className="line-clamp-2">{cardSummary}</span>
							</p>
						)}
						<div className="mt-1.5 flex flex-nowrap items-center justify-center gap-1 overflow-hidden">
							{cardDate && (
								<span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] leading-4 ring-1 ${metaChipClassName}`}>
									<CalendarDays className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
									<span>{cardDate}</span>
								</span>
							)}
							{props.category && (
								<span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] leading-4 ring-1 ${metaChipClassName}`}>
									{props.category}
								</span>
							)}
							{secondaryMeta && (
								<span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] leading-4 ring-1 ${metaChipClassName}`}>
									{secondaryMeta}
								</span>
							)}
						</div>
						<div className={`${props.cardHighlights ? 'mt-1 flex flex-nowrap items-center justify-center gap-1 overflow-hidden' : 'mt-1 flex flex-wrap items-center justify-center gap-2'}`}>
							{props.cardHighlights && (
								<span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ${techChipClassName}`}>
									<Cpu className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
								</span>
							)}
							{props.cardHighlights ? (
								props.cardHighlights.map((highlight) => (
									<span
										key={highlight}
										className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] leading-4 ring-1 ${techChipClassName}`}
									>
										{highlight}
									</span>
								))
							) : (
								<span className={`rounded-full px-2 py-0.5 text-[11px] leading-4 ring-1 ${techChipClassName}`}>
									{props.ProjectHeader.tags}
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
