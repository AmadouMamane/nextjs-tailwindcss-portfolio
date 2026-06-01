import { motion } from 'framer-motion';
import { FiArrowDownCircle } from 'react-icons/fi';

function HeroAtmosphere() {
	return (
		<div className="pointer-events-none absolute inset-x-[-2rem] -top-14 bottom-[-4rem] -z-10 overflow-hidden">
			<div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(79,70,229,0.08),transparent_28%,rgba(14,165,233,0.06)_56%,transparent_78%),linear-gradient(180deg,transparent,rgba(248,250,252,0.78)_72%,transparent)] dark:bg-[linear-gradient(110deg,rgba(129,140,248,0.13),transparent_30%,rgba(45,212,191,0.08)_58%,transparent_80%),linear-gradient(180deg,transparent,rgba(2,6,23,0.54)_74%,transparent)]" />
			<div className="absolute left-[4%] right-[3%] top-8 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/12" />
			<div className="absolute bottom-12 left-[12%] right-[8%] h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent dark:via-white/10" />
			<svg
				aria-hidden="true"
				className="absolute left-1/2 top-1/2 h-[112%] w-[118%] -translate-x-1/2 -translate-y-1/2 text-slate-500/40 dark:text-slate-300/20"
				viewBox="0 0 1200 560"
				fill="none"
			>
				<defs>
					<linearGradient id="heroFlow" x1="160" y1="138" x2="1070" y2="410" gradientUnits="userSpaceOnUse">
						<stop stopColor="#6366F1" stopOpacity="0" />
						<stop offset="0.24" stopColor="#6366F1" stopOpacity="0.36" />
						<stop offset="0.55" stopColor="#06B6D4" stopOpacity="0.34" />
						<stop offset="0.84" stopColor="#10B981" stopOpacity="0.24" />
						<stop offset="1" stopColor="#10B981" stopOpacity="0" />
					</linearGradient>
					<linearGradient id="heroWarm" x1="765" y1="90" x2="1040" y2="468" gradientUnits="userSpaceOnUse">
						<stop stopColor="#38BDF8" stopOpacity="0.22" />
						<stop offset="1" stopColor="#F59E0B" stopOpacity="0.18" />
					</linearGradient>
					<filter id="softLine" x="80" y="44" width="1040" height="466" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feGaussianBlur stdDeviation="7" />
					</filter>
				</defs>
				<path d="M102 384C236 284 352 327 486 240C626 150 777 116 1102 184" stroke="url(#heroFlow)" strokeWidth="24" strokeLinecap="round" filter="url(#softLine)" opacity="0.46" />
				<path d="M104 384C240 285 355 326 488 241C624 154 780 118 1104 184" stroke="url(#heroFlow)" strokeWidth="2" strokeLinecap="round" />
				<path d="M154 452C322 355 466 399 602 305C736 213 860 238 1052 98" stroke="url(#heroWarm)" strokeWidth="1.4" strokeLinecap="round" opacity="0.76" />
				<path d="M170 138H356C420 138 448 172 504 206L604 267C658 300 710 308 772 286L1012 202" stroke="currentColor" strokeWidth="1" strokeDasharray="7 12" />
				<path d="M264 92H506C560 92 604 116 638 158L792 350C831 399 889 428 952 428H1088" stroke="currentColor" strokeWidth="1" strokeDasharray="5 15" opacity="0.58" />
			</svg>
		</div>
	);
}

function PremiumSystemVisual() {
	return (
		<div className="relative mx-auto h-[310px] w-full max-w-[590px] sm:h-[360px] lg:h-[420px]">
			<div className="absolute inset-x-[6%] top-[18%] h-[38%] -skew-y-6 rounded-[45%] bg-[linear-gradient(105deg,rgba(99,102,241,0.10),rgba(14,165,233,0.08),rgba(16,185,129,0.07))] blur-3xl dark:bg-[linear-gradient(105deg,rgba(129,140,248,0.18),rgba(34,211,238,0.11),rgba(16,185,129,0.08))]" />
			<svg
				aria-hidden="true"
				className="absolute inset-0 h-full w-full opacity-95"
				viewBox="0 0 620 440"
				fill="none"
			>
				<defs>
					<linearGradient id="visualLine" x1="76" y1="231" x2="558" y2="210" gradientUnits="userSpaceOnUse">
						<stop stopColor="#6366F1" stopOpacity="0.62" />
						<stop offset="0.52" stopColor="#06B6D4" stopOpacity="0.74" />
						<stop offset="1" stopColor="#10B981" stopOpacity="0.58" />
					</linearGradient>
					<linearGradient id="visualStroke" x1="98" y1="74" x2="498" y2="370" gradientUnits="userSpaceOnUse">
						<stop stopColor="#818CF8" stopOpacity="0.52" />
						<stop offset="1" stopColor="#2DD4BF" stopOpacity="0.34" />
					</linearGradient>
				</defs>
				<path d="M16 260C92 170 181 216 267 178C328 143 364 84 448 111C516 133 526 206 604 238" stroke="url(#visualLine)" strokeWidth="2.2" strokeLinecap="round" />
				<path d="M42 326C126 248 225 292 302 247C363 209 415 218 588 126" stroke="url(#visualLine)" strokeWidth="1.4" strokeLinecap="round" opacity="0.78" />
				<path d="M109 125H218C250 125 272 143 286 172L318 239C333 270 361 290 396 290H516" stroke="url(#visualStroke)" strokeWidth="1.2" strokeDasharray="6 10" />
				<path d="M160 347H250C286 347 304 321 324 294L369 233C389 206 416 190 449 190H557" stroke="url(#visualStroke)" strokeWidth="1.2" strokeDasharray="6 10" opacity="0.82" />
				<g opacity="0.9">
					<rect x="76" y="104" width="174" height="96" rx="24" fill="white" fillOpacity="0.16" stroke="#64748B" strokeOpacity="0.16" />
					<rect x="108" y="132" width="72" height="8" rx="4" fill="#6366F1" fillOpacity="0.66" />
					<rect x="108" y="154" width="110" height="7" rx="3.5" fill="#64748B" fillOpacity="0.30" />
					<rect x="108" y="175" width="82" height="7" rx="3.5" fill="#64748B" fillOpacity="0.22" />
				</g>
				<g opacity="0.92">
					<rect x="407" y="80" width="154" height="116" rx="28" fill="white" fillOpacity="0.13" stroke="#64748B" strokeOpacity="0.16" />
					<path d="M438 157L466 129L493 148L531 111" stroke="#06B6D4" strokeOpacity="0.82" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
				</g>
				<g opacity="0.92">
					<rect x="312" y="278" width="204" height="98" rx="28" fill="white" fillOpacity="0.14" stroke="#64748B" strokeOpacity="0.16" />
					<rect x="348" y="322" width="32" height="34" rx="10" fill="#6366F1" fillOpacity="0.34" />
					<rect x="398" y="304" width="32" height="52" rx="10" fill="#06B6D4" fillOpacity="0.30" />
					<rect x="448" y="292" width="32" height="64" rx="10" fill="#10B981" fillOpacity="0.28" />
				</g>
				<rect x="276" y="196" width="70" height="70" rx="20" fill="white" fillOpacity="0.12" stroke="#64748B" strokeOpacity="0.16" />
				<path d="M297 221H325M297 239H325" stroke="#06B6D4" strokeOpacity="0.78" strokeWidth="5" strokeLinecap="round" />
			</svg>
		</div>
	);
}

function AppBanner() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="relative mt-10 grid items-center gap-8 md:grid-cols-[0.92fr_1.08fr] lg:gap-12"
		>
			<HeroAtmosphere />
			<div className="w-full max-w-[430px] justify-self-center pl-0 text-left md:justify-self-start md:pl-4">
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.1,
					}}
					className="font-general-semibold text-center text-2xl uppercase text-ternary-dark dark:text-primary-light sm:text-left lg:text-3xl xl:text-4xl"
				>
					{"Hi, I'm Amadou"}
				</motion.h1>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.2,
					}}
					className="font-general-medium mt-4 text-center text-lg leading-normal text-gray-500 dark:text-gray-200 sm:text-left md:text-xl lg:text-2xl xl:text-3xl"
				>
					A Data Scientist, AI Engineer, Data Engineer & Open Source Enthusiast
				</motion.p>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.3,
					}}
					className="flex justify-center sm:block"
				>
					<a
						download="CV_Amadou_MAMANE.pdf"
						href="/files/CV_Amadou_MAMANE.pdf"
						className="font-general-medium mt-10 mb-6 flex w-36 items-center justify-center rounded-lg border border-slate-200/90 bg-white/70 py-2.5 text-lg text-gray-600 shadow-[0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl duration-500 hover:border-indigo-300 hover:bg-indigo-500 hover:text-white focus:ring-1 focus:ring-indigo-900 dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-gray-200 dark:shadow-[0_18px_44px_rgba(0,0,0,0.22)] sm:mb-0 sm:w-48 sm:py-3"
						aria-label="Download Resume"
					>
						<FiArrowDownCircle className="ml-0 mr-2 h-5 w-5 duration-100 sm:ml-1 sm:mr-3 sm:h-6 sm:w-6" />
						<span className="text-sm duration-100 sm:text-lg">Download CV</span>
					</a>
				</motion.div>
			</div>
			<motion.div
				initial={{ opacity: 0, y: -60 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
				className="w-full justify-self-center md:justify-self-end"
			>
				<PremiumSystemVisual />
			</motion.div>
		</motion.section>
	);
}

export default AppBanner;
