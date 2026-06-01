import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDownCircle } from 'react-icons/fi';

function PremiumSystemVisual() {
	return (
		<div className="relative mx-auto w-full max-w-[560px] lg:max-w-[590px]">
			<div className="absolute -inset-3 rounded-[2.25rem] bg-[radial-gradient(circle_at_35%_24%,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(14,165,233,0.12),transparent_34%)] blur-2xl dark:bg-[radial-gradient(circle_at_35%_24%,rgba(129,140,248,0.18),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(34,211,238,0.11),transparent_34%)]" />
			<div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/[0.70] p-2.5 shadow-[0_28px_78px_rgba(15,23,42,0.12)] ring-1 ring-white/80 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-white/[0.045] dark:shadow-[0_30px_92px_rgba(0,0,0,0.42)] dark:ring-white/[0.04]">
				<Image
					src="/images/home-ai-engineering.svg?v=4"
					alt="Premium AI and data engineering system illustration"
					width={900}
					height={720}
					priority
					unoptimized
					className="h-auto w-full rounded-[1.5rem]"
				/>
			</div>
		</div>
	);
}

function AppBanner() {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="mt-8 grid items-center gap-10 md:grid-cols-[0.92fr_1.08fr] lg:gap-14"
		>
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
						className="font-general-medium mt-12 mb-6 flex w-36 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 py-2.5 text-lg text-gray-500 shadow-lg duration-500 hover:bg-indigo-500 hover:text-white focus:ring-1 focus:ring-indigo-900 dark:border-ternary-dark sm:mb-0 sm:w-48 sm:py-3"
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
