// components/shared/FilterDropdown.js
function FilterDropdown({ options, value, onChange, className = '' }) {
    return (
	      <select
	        value={value}
	        onChange={(e) => onChange(e.target.value)}
          aria-label="Filter projects by category"
	        className={`
	          h-11 w-full px-3 py-2
	          border border-slate-200/85 dark:border-white/[0.09]
	          rounded-lg
	          text-sm bg-white/75 dark:bg-white/[0.055]
	          text-primary-dark dark:text-ternary-light
            shadow-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-200/70 dark:focus:border-indigo-400/60 dark:focus:bg-white/[0.075] dark:focus:ring-indigo-400/15
	          ${className}
	        `}
	      >
	        <option value="all">All categories</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  
  export default FilterDropdown;
  
