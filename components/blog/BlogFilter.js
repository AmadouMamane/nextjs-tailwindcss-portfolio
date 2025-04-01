const selectOptions = ['Machine Learning', 'Data Science', 'AI Engineering', 'Deep Learning', 'Sports'];

function BlogFilter({ setSelectCategory }) {
    return (
        <select
            onChange={(e) => setSelectCategory(e.target.value)}
            className="
                w-48
                px-4
                sm:px-6
                h-10
                border
                dark:border-secondary-dark
                rounded-lg
                text-sm
                sm:text-md
                dark:font-medium
                bg-secondary-light
                dark:bg-ternary-dark
                text-primary-dark
                dark:text-ternary-light
            "
        >
            <option value="all" className="text-sm sm:text-md">
                All Categories
            </option>

            {selectOptions.map((option) => (
                <option className="text-normal sm:text-md" key={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default BlogFilter;

