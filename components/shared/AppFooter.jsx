import {
	FiGithub,
	FiTwitter,
	FiLinkedin,
	FiGlobe,
  } from 'react-icons/fi';
  import AppFooterCopyright from './AppFooterCopyright';

  const socialLinks = [
	{ id: 1, label: 'GitHub', icon: <FiGithub />, url: 'https://github.com/AmadouMamane' },
	{ id: 2, label: 'LinkedIn', icon: <FiLinkedin />, url: 'https://fr.linkedin.com/in/amadoumamane' },
	{ id: 3, label: 'X', icon: <FiTwitter />, url: 'https://x.com/AmadouMamaneX' },
	{ id: 4, label: 'Website', icon: <FiGlobe />, url: 'https://amadoumamane.fr' },
  ];
  
  export default function AppFooter({ isBlog = false }) {
	const maxWidth = isBlog ? 'max-w-[1800px]' : 'max-w-7xl';
  
	return (
		
	  <div className="w-full bg-transparent text-center">
				
		<div className="relative w-full mt-20">
		  <div className={`mx-auto ${maxWidth} border-t border-slate-200/65 dark:border-white/[0.075] pt-16 sm:pt-20 pb-8 `}>
			<div className="font-general-regular flex flex-col justify-center items-center mb-8 sm:mb-16">
			  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
				Open channels
			  </p>
			  <p className="text-3xl sm:text-4xl text-primary-dark dark:text-gray-100 mb-5">
				Follow the work
			  </p>
			  <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
				{socialLinks.map((link) => (
				  <a
					href={link.url}
					target="_blank"
					rel="noreferrer"
					key={link.id}
					aria-label={link.label}
					className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 shadow-sm ring-1 ring-white/60 backdrop-blur-xl duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md dark:border-white/[0.09] dark:bg-white/[0.055] dark:text-slate-300 dark:ring-white/[0.04] dark:hover:border-indigo-300/40 dark:hover:text-indigo-200"
				  >
					<i className="text-xl duration-300 group-hover:scale-105">{link.icon}</i>
				  </a>
				))}
			  </ul>
  
			  <div className="flex flex-col justify-center items-center text-center font-general-regular">
				<p className="mt-7 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
				  AI engineering, data platforms and applied machine learning, shared through practical case studies and shipped systems
				</p>
			  </div>
			</div>
  
			<AppFooterCopyright />
		  </div>
		</div>

	  </div>


	);
  }
  
