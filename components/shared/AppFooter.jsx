// components/AppFooter.jsx

import {
	FiGithub,
	FiTwitter,
	FiLinkedin,
	FiGlobe,
	FiYoutube,
  } from 'react-icons/fi';
  import AppFooterCopyright from './AppFooterCopyright';
  
  export default function AppFooter({ isBlog = false }) {
	return (
	  <div className="w-full bg-transparent text-center ">
		<div
		  className={`mx-auto pt-20 sm:pt-30 pb-8 mt-20 border-t  ${
			isBlog
			  ? 'max-w-[1800px] border-gray-200 dark:border-gray-500'
			  : 'max-w-screen-xl border-t-2 border-gray-200 dark:border-gray-500'
		  } px-6 md:px-10`}
		>
		  <div className="font-general-regular flex flex-col justify-center items-center mb-6 sm:mb-24">

			<p className="text-3xl sm:text-4xl text-primary-dark dark:text-gray-100 mb-5 ">
			  Follow me
			</p>
			<ul className="flex gap-4 sm:gap-8">
			  {[
				{ id: 1, icon: <FiGlobe />, url: '' },
				{ id: 2, icon: <FiGithub />, url: 'https://github.com/AmadouMamane' },
				{ id: 3, icon: <FiTwitter />, url: '' },
				{ id: 4, icon: <FiLinkedin />, url: 'https://fr.linkedin.com/in/amadoumamane' },
				{ id: 5, icon: <FiYoutube />, url: '' },
			  ].map((link) => (
				<a
				  href={link.url}
				  target="__blank"
				  key={link.id}
				  className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300"
				>
				  <i className="text-xl sm:text-2xl md:text-3xl">{link.icon}</i>
				</a>
			  ))}
			</ul>
			<div className="flex flex-col justify-center items-center text-center font-general-regular">


          <p className="mt-7 text-ternary-dark dark:text-ternary-light max-w-xl">
            {"I'm always learning, building, and sharing — come along for the journey"}
          </p>
        </div>
		  </div>

		  
  
		  <AppFooterCopyright />
		</div>
	  </div>
	);
  }
  
  