function AppFooterCopyright() {
	return (
		<div className="font-general-regular flex flex-col justify-center items-center text-center">
			<div className="text-sm text-ternary-dark dark:text-ternary-light sm:text-base">
				&copy; {new Date().getFullYear()}
				<a
					href="https://github.com/AmadouMamane"
					target="_blank"
					rel="noreferrer"
					className="ml-1 font-medium hover:text-indigo-600 dark:hover:text-indigo-300 duration-500"
				>
					Amadou Mamane
				</a>
				. Built with Next.js and Tailwind CSS.
			</div>
		
			<p className="mt-3 max-w-xl text-xs leading-5 text-gray-500 dark:text-gray-400 sm:text-sm">
				Privacy-friendly analytics may be used to understand aggregate visits and improve the site experience.
			</p>

		</div>
	);
}

export default AppFooterCopyright;
