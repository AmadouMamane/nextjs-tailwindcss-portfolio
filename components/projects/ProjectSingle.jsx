import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Cpu, Dna, Music, ShieldCheck, Tag } from 'lucide-react';

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
const iconChipStyles = {
	tech: 'bg-gradient-to-b from-violet-50/80 to-slate-50/80 text-violet-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] ring-violet-200/60 dark:from-violet-400/[0.09] dark:to-slate-400/[0.045] dark:text-violet-200/85 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] dark:ring-violet-300/[0.18]',
	date: 'bg-gradient-to-b from-amber-50/80 to-slate-50/80 text-amber-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] ring-amber-200/60 dark:from-amber-400/[0.085] dark:to-slate-400/[0.045] dark:text-amber-200/85 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] dark:ring-amber-300/[0.18]',
	domain: 'bg-gradient-to-b from-emerald-50/80 to-slate-50/80 text-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] ring-emerald-200/60 dark:from-emerald-400/[0.085] dark:to-slate-400/[0.045] dark:text-emerald-200/85 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] dark:ring-emerald-300/[0.18]',
};
const iconChipLineStyles = {
	tech: 'via-violet-300/55 dark:via-violet-200/38',
	date: 'via-amber-300/55 dark:via-amber-200/38',
	domain: 'via-emerald-300/55 dark:via-emerald-200/38',
};
const tagChipClassName = 'bg-slate-100/65 text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.68)] ring-slate-200/80 dark:bg-white/[0.052] dark:text-slate-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:ring-white/[0.10]';

function IconChip({ tone, className = '', children }) {
	return (
		<span className={`relative inline-flex h-[21px] w-[21px] shrink-0 items-center justify-center overflow-hidden rounded-md ring-1 ${iconChipStyles[tone]} ${className}`}>
			<span className={`pointer-events-none absolute inset-x-1 top-0 h-px bg-gradient-to-r from-transparent ${iconChipLineStyles[tone]} to-transparent`} />
			<span className={`pointer-events-none absolute inset-y-1 left-0 w-px bg-gradient-to-b from-transparent ${iconChipLineStyles[tone]} to-transparent`} />
			{children}
		</span>
	);
}

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

					<div className="flex flex-1 flex-col px-4 pb-3 pt-1.5 text-center">
						<div className="flex h-[3.125rem] items-start justify-center gap-2">
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
							<p className="line-clamp-2 max-w-[15rem] text-left text-[19px] font-normal leading-snug text-slate-900 dark:text-slate-100 md:text-[19px]">
								{cardTitle}
							</p>
						</div>
						{cardSummary && (
							<p className="mx-auto mt-1.5 min-h-[2.25rem] w-full max-w-[18rem] text-center text-[13.5px] font-normal leading-[18px] text-slate-700 dark:text-slate-300">
								<span className="line-clamp-2">{cardSummary}</span>
							</p>
						)}
						<div className={`${props.cardHighlights ? 'mt-2.5 flex flex-nowrap items-center justify-center gap-2.5 overflow-hidden' : 'mt-2.5 flex flex-wrap items-center justify-center gap-2'}`}>
							{props.cardHighlights && (
								<IconChip tone="tech">
									<Cpu className="h-3.5 w-3.5" strokeWidth={2.1} aria-hidden="true" />
								</IconChip>
							)}
							{props.cardHighlights ? (
								<div className="flex min-w-0 flex-nowrap items-center justify-center gap-1 overflow-hidden">
									{props.cardHighlights.map((highlight) => (
										<span
											key={highlight}
											className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-medium leading-4 tracking-[0.01em] ring-1 ${tagChipClassName}`}
										>
											{highlight}
										</span>
									))}
								</div>
							) : (
								<span className={`rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 tracking-[0.01em] ring-1 ${tagChipClassName}`}>
									{props.ProjectHeader.tags}
								</span>
							)}
						</div>
						<div className="mt-1 flex flex-nowrap items-center justify-center gap-3 overflow-hidden">
							{cardDate && (
								<div className="flex min-w-0 shrink-0 items-center gap-2">
									<IconChip tone="date">
										<CalendarDays className="h-3.5 w-3.5" strokeWidth={2.1} aria-hidden="true" />
									</IconChip>
									<span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-medium leading-4 tracking-[0.01em] ring-1 ${tagChipClassName}`}>
										<span>{cardDate}</span>
									</span>
								</div>
							)}
							{props.category && (
								<div className="flex min-w-0 items-center gap-2 overflow-hidden">
									<IconChip tone="domain">
										<Tag className="h-3.5 w-3.5" strokeWidth={2.1} aria-hidden="true" />
									</IconChip>
									<div className="flex min-w-0 flex-nowrap items-center gap-1 overflow-hidden">
										<span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-medium leading-4 tracking-[0.01em] ring-1 ${tagChipClassName}`}>
											{props.category}
										</span>
										{secondaryMeta && (
											<span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-medium leading-4 tracking-[0.01em] ring-1 ${tagChipClassName}`}>
												{secondaryMeta}
											</span>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default ProjectSingle;
