// components/shared/FilterDropdown.js
function FilterDropdown({ options, value, onChange, className = '' }) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full h-full px-3 py-2
          border border-gray-400 dark:border-secondary-dark
          rounded-lg
          text-sm bg-secondary-light dark:bg-ternary-dark
          text-primary-dark dark:text-ternary-light
          ${className}
        `}
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  
  export default FilterDropdown;
  