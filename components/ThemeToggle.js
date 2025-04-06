// components/ThemeToggle.js
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoids hydration error

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-500 text-sm"
    >
      Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}
