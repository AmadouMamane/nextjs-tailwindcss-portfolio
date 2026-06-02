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
    <section className="mt-8 py-5 sm:py-10">
      <div className="border-y border-slate-200/55 py-6 dark:border-white/[0.065]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl text-left">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              Notes and essays
            </p>
            <h1 className="font-general-medium text-2xl text-ternary-dark dark:text-ternary-light sm:text-3xl">
              Blog
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-6 text-secondary-dark dark:text-gray-400 sm:text-base">
              Writing on AI, data systems, engineering practice and the occasional field note
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:min-w-[34rem] lg:justify-end">
          <SearchInput
            value={searchBlog}
            onChange={setSearchBlog}
            placeholder="Search articles"
          />
          <div className="w-full sm:w-60">
            <FilterDropdown
              value={selectCategory}
              onChange={setSelectCategory}
              options={selectOptions}
            />
          </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog, index) => (
          <BlogSingle key={index} {...blog} />
        ))}
      </div>
    </section>
  );
}

export default BlogGrid;
