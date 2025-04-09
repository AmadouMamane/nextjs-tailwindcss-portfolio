// components/blog/BlogGrid.js
import { useState } from 'react';
import BlogSingle from './BlogSingle';
import FilterDropdown from '../shared/FilterDropdown';
import SearchInput from '../shared/SearchInput';

const selectOptions = [
  'Machine Learning',
  'Data Science',
  'AI Engineering',
  'Deep Learning',
  'Sport',
  'Reading',
  'Travel',
];

function BlogGrid({ blogs, isBlog = true }) {
  const [searchBlog, setSearchBlog] = useState('');
  const [selectCategory, setSelectCategory] = useState('all');

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchBlog.toLowerCase());
    const matchesCategory = selectCategory === 'all' || blog.category === selectCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-5 sm:py-10 mt-5 sm:mt-10">
      <div className="text-center">
        <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
          Blog Articles
        </p>
      </div>

      <div className="mt-16">
        <h3 className="font-general-regular text-center text-secondary-dark dark:text-ternary-light text-md sm:text-xl mb-3 mt-10">
          Search articles by title or filter by category
        </h3>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-primary-light dark:border-secondary-dark pb-4">
          <SearchInput
            value={searchBlog}
            onChange={setSearchBlog}
            placeholder="Search Articles"
          />
          <div className="w-60">
            <FilterDropdown
              value={selectCategory}
              onChange={setSelectCategory}
              options={selectOptions}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-5">
        {filteredBlogs.map((blog, index) => (
          <BlogSingle key={index} {...blog} />
        ))}
      </div>
    </section>
  );
}

export default BlogGrid;
