// components/shared/SearchInput.js
import { FiSearch } from 'react-icons/fi';

function SearchInput({ value, onChange, placeholder = "Search", className = '' }) {
  return (
    <div className="flex items-center w-full max-w-md">
      <span className="hidden sm:block bg-primary-light dark:bg-ternary-dark p-2.5 shadow-sm rounded-l-lg border border-r-0 border-gray-400 dark:border-gray-600">
        <FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5" />
      </span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border border-gray-400 dark:border-gray-600 rounded-lg sm:rounded-l-none px-3 py-2 text-sm bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light ${className}`}
      />
    </div>
  );
}

export default SearchInput;
