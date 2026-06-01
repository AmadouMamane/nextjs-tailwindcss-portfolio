// components/shared/SearchInput.js
import { FiSearch } from 'react-icons/fi';

function SearchInput({ value, onChange, placeholder = "Search", className = '' }) {
  return (
    <div className="flex items-center w-full max-w-md">
      <span className="hidden sm:flex h-11 items-center bg-white/70 dark:bg-white/[0.045] px-3 shadow-sm rounded-l-lg border border-r-0 border-slate-200 dark:border-white/[0.08]">
        <FiSearch className="text-slate-500 dark:text-slate-300 w-5 h-5" />
      </span>
      <input
        type="search"
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 w-full rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-sm text-primary-dark outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200/70 dark:border-white/[0.08] dark:bg-white/[0.045] dark:text-ternary-light dark:placeholder:text-slate-500 dark:focus:border-indigo-400/60 dark:focus:ring-indigo-400/15 sm:rounded-l-none ${className}`}
      />
    </div>
  );
}

export default SearchInput;
