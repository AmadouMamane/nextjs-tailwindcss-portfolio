import { useEffect, useState } from 'react';

const DEFAULT_THEME = 'dark';

const useThemeSwitcher = () => {
	const [theme, setTheme] = useState('');
	const activeTheme = theme === 'dark' ? 'light' : 'dark';

	useEffect(() => {
		const storedTheme = localStorage.theme || DEFAULT_THEME;
		setTheme(storedTheme);
	}, []);

	useEffect(() => {
		if (!theme) {
			return;
		}

		const root = window.document.documentElement;

		root.classList.remove(activeTheme);
		root.classList.add(theme);
		localStorage.setItem('theme', theme);
	}, [theme, activeTheme]);

	return [activeTheme, setTheme];
};

export default useThemeSwitcher;
