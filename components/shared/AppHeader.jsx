import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
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
	const ThemeIcon = hydratedTheme === 'dark' ? Moon : Sun;

	return (
		<>
			<motion.nav
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				id="nav"
				className="relative border-b border-slate-900/[0.055] bg-white/[0.85] shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-[#020611]/[0.86] dark:shadow-[0_1px_0_rgba(255,255,255,0.035)]"
			>
				<div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-8 lg:px-10">
					<div className="flex items-center justify-between gap-4">
						<Link
							href="/"
							aria-label="Amadou Mamane home"
							className="group relative flex h-10 w-[146px] shrink-0 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 shadow-sm transition duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.045] dark:hover:border-indigo-300/30 dark:hover:bg-white/[0.07]"
						>
							<span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/30" />
							<Image
								src={logoSrc}
								className="h-auto w-[118px] cursor-pointer object-contain transition duration-300 group-hover:opacity-90"
								alt="Amadou Mamane"
								width={1500}
								height={1400}
								priority
							/>
						</Link>

						<div className="font-general-medium hidden h-[50px] w-[600px] items-center justify-center rounded-full border border-slate-200/80 bg-white/[0.68] p-1 shadow-[0_12px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/70 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.045] dark:shadow-[0_14px_42px_rgba(0,0,0,0.36)] dark:ring-white/[0.04] xl:flex">
							{navItems.map((item) => {
								const isActive =
									router.pathname === item.href ||
									router.pathname.startsWith(`${item.href}/`);

								return (
									<Link
										key={item.href}
										href={item.href}
										aria-current={isActive ? 'page' : undefined}
										className={`relative inline-flex h-[42px] flex-1 items-center justify-center rounded-full px-3 text-sm font-medium transition duration-300 ${
											isActive
												? 'bg-slate-950 text-white shadow-[0_10px_28px_rgba(79,70,229,0.22)] dark:bg-white dark:text-slate-950 dark:shadow-[0_10px_30px_rgba(129,140,248,0.18)]'
												: 'text-slate-600 hover:bg-slate-950/[0.045] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.075] dark:hover:text-white'
										}`}
									>
										{isActive ? (
											<span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500" />
										) : null}
										{item.label}
									</Link>
								);
							})}
						</div>

						<div className="flex items-center gap-2 sm:gap-3">
							<button
								onClick={showHireMeModal}
								className="font-general-medium group hidden h-10 items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/[0.72] px-4 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-300/70 hover:bg-white hover:text-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:border-white/[0.10] dark:bg-white/[0.055] dark:text-slate-100 dark:ring-white/[0.04] dark:hover:border-indigo-300/45 dark:hover:bg-white/[0.085] dark:hover:text-indigo-200 dark:focus:ring-offset-[#020611] sm:inline-flex"
								aria-label="Work with me button"
							>
								<span>Work with me</span>
								<ArrowUpRight
									className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									aria-hidden="true"
								/>
							</button>

							<button
								type="button"
								onClick={() => setTheme(activeTheme)}
								aria-label="Theme Switcher"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/[0.78] text-slate-700 shadow-sm ring-1 ring-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:border-white/[0.09] dark:bg-white/[0.055] dark:text-slate-200 dark:ring-white/[0.04] dark:hover:border-indigo-300/40 dark:hover:text-indigo-200 dark:focus:ring-offset-[#020611]"
							>
								<ThemeIcon className="h-[18px] w-[18px]" aria-hidden="true" />
							</button>

							<button
								onClick={toggleMenu}
								type="button"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/[0.78] text-slate-800 shadow-sm ring-1 ring-white/60 transition duration-300 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:border-white/[0.09] dark:bg-white/[0.055] dark:text-slate-100 dark:ring-white/[0.04] dark:hover:border-indigo-300/40 dark:hover:text-indigo-200 dark:focus:ring-offset-[#020611] xl:hidden"
								aria-label="Toggle navigation menu"
								aria-expanded={showMenu}
							>
								{showMenu ? (
									<X className="h-5 w-5" aria-hidden="true" />
								) : (
									<Menu className="h-5 w-5" aria-hidden="true" />
								)}
							</button>
						</div>
					</div>

					<div
						className={
							showMenu
								? 'mt-4 grid gap-1.5 rounded-2xl border border-slate-200/80 bg-white/[0.96] p-2 shadow-[0_22px_60px_rgba(15,23,42,0.16)] ring-1 ring-white/80 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#050b18]/[0.96] dark:ring-white/[0.04] xl:hidden'
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
									className={`flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-medium transition ${
										isActive
											? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
											: 'text-slate-700 hover:bg-slate-950/[0.045] hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/[0.07] dark:hover:text-white'
									}`}
									onClick={() => setShowMenu(false)}
								>
									<span>{item.label}</span>
									{isActive ? (
										<span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
									) : null}
								</Link>
							);
						})}

						<button
							onClick={showHireMeModal}
							className="font-general-medium mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/[0.74] px-4 text-sm font-medium text-slate-800 transition hover:border-indigo-300/70 hover:bg-white hover:text-indigo-700 dark:border-white/[0.10] dark:bg-white/[0.06] dark:text-slate-100 dark:hover:border-indigo-300/45 dark:hover:bg-white/[0.09] dark:hover:text-indigo-200"
							aria-label="Work with me button"
						>
							<span>Work with me</span>
							<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
