import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import HireMeModal from '../HireMeModal';
import logoLight from '../../public/images/logo-light.png';
import logoDark from '../../public/images/logo-dark.png';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';

const navItems = [
	{ href: '/projects', label: 'Projects' },
	{ href: '/about', label: 'About Me' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' },
];

function AppHeader() {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [hasMounted, setHasMounted] = useState(false);
	const [activeTheme, setTheme] = useThemeSwitcher();
	const router = useRouter();

	useEffect(() => {
		setHasMounted(true);
	}, []);

	function toggleMenu() {
		setShowMenu((current) => !current);
	}

	function showHireMeModal() {
		if (!showModal) {
			document
				.getElementsByTagName('html')[0]
				.classList.add('overflow-y-hidden');
			setShowModal(true);
		} else {
			document
				.getElementsByTagName('html')[0]
				.classList.remove('overflow-y-hidden');
			setShowModal(false);
		}
	}

	const hydratedTheme = hasMounted ? activeTheme : 'dark';
	const logoSrc = hydratedTheme === 'dark' ? logoDark : logoLight;
	const canRenderModal = hasMounted && showModal;

	return (
		<>
			<motion.nav
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				id="nav"
				className="relative border-b border-slate-900/[0.06] bg-white/90 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#020611]/90"
			>
				<div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 lg:px-10">
					<div className="flex items-center justify-between gap-4">
						<Link
							href="/"
							aria-label="Amadou Mamane home"
							className="group flex h-12 shrink-0 items-center"
						>
							<Image
								src={logoSrc}
								className="h-auto w-[132px] cursor-pointer object-contain transition duration-300 group-hover:opacity-90 sm:w-[142px]"
								alt="Amadou Mamane"
								width={1500}
								height={1400}
								priority
							/>
						</Link>

					<div className="font-general-medium hidden items-center justify-center rounded-full border border-slate-200/80 bg-slate-50/80 px-1.5 py-1.5 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] lg:flex">
						{navItems.map((item) => {
							const isActive =
								router.pathname === item.href ||
								router.pathname.startsWith(`${item.href}/`);

							return (
								<Link
									key={item.href}
									href={item.href}
									aria-current={isActive ? 'page' : undefined}
									className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
										isActive
											? 'bg-white text-slate-950 shadow-sm dark:bg-white/[0.10] dark:text-white'
											: 'text-slate-600 hover:bg-white/75 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.07] dark:hover:text-white'
									}`}
								>
									{item.label}
								</Link>
							);
						})}
					</div>

					<div className="flex items-center gap-2 sm:gap-3">
						<button
							onClick={showHireMeModal}
							className="font-general-medium hidden min-h-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-100 dark:focus:ring-offset-[#020611] sm:inline-flex"
							aria-label="Work with me button"
						>
							Work with me
						</button>

						<button
							type="button"
							onClick={() => setTheme(activeTheme)}
							aria-label="Theme Switcher"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:border-white/[0.09] dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-indigo-300/40 dark:hover:text-indigo-200 dark:focus:ring-offset-[#020611]"
						>
							{hydratedTheme === 'dark' ? (
								<FiMoon className="text-lg" aria-hidden="true" />
							) : (
								<FiSun className="text-lg" aria-hidden="true" />
							)}
						</button>

						<button
							onClick={toggleMenu}
							type="button"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition duration-300 hover:border-indigo-200 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:border-white/[0.09] dark:bg-white/[0.06] dark:text-slate-100 dark:hover:border-indigo-300/40 dark:hover:text-indigo-200 dark:focus:ring-offset-[#020611] lg:hidden"
							aria-label="Toggle navigation menu"
							aria-expanded={showMenu}
						>
							{showMenu ? (
								<FiX className="text-xl" aria-hidden="true" />
							) : (
								<FiMenu className="text-xl" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>

				<div
					className={
						showMenu
							? 'mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl shadow-slate-900/10 dark:border-white/[0.08] dark:bg-[#050b18]/95 lg:hidden'
							: 'hidden'
					}
				>
					{navItems.map((item) => {
						const isActive =
							router.pathname === item.href ||
							router.pathname.startsWith(`${item.href}/`);

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? 'page' : undefined}
								className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
									isActive
										? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200'
										: 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/[0.06] dark:hover:text-white'
								}`}
								onClick={() => setShowMenu(false)}
							>
								{item.label}
							</Link>
						);
					})}

					<button
						onClick={showHireMeModal}
						className="font-general-medium mt-1 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-100"
						aria-label="Work with me button"
					>
						Work with me
					</button>
				</div>
				</div>
			</motion.nav>

			{canRenderModal
				? createPortal(
						<HireMeModal
							onClose={showHireMeModal}
							onRequest={showHireMeModal}
						/>,
						document.body
				  )
				: null}
		</>
	);
}

export default AppHeader;
