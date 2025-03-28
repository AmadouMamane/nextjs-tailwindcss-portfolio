import { useState } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import BlogSingle from './BlogSingle';
import { blogData } from '../../data/blogData';
import BlogFilter from './BlogFilter';

function BlogGrid() {
	const [searchBlog, setSearchBlog] = useState('');
	const [selectCategory, setSelectCategory] = useState('all');

	const filteredBlogs = blogData.filter((blog) => {
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

			<div className="mt-10 sm:mt-16">
				<h3 className="text-center text-secondary-dark dark:text-ternary-light text-md sm:text-xl mb-3">
					Search articles by title or filter by category
				</h3>
				<div className="flex justify-between border-b border-primary-light dark:border-secondary-dark pb-3 gap-3">
					<div className="flex justify-between gap-2">
						<span className="hidden sm:block bg-primary-light dark:bg-ternary-dark p-2.5 shadow-sm rounded-xl cursor-pointer">
							<FiSearch className="text-ternary-dark dark:text-ternary-light w-5 h-5" />
						</span>
						<input
							onChange={(e) => setSearchBlog(e.target.value)}
							className="font-general-medium pl-3 pr-1 sm:px-4 py-2 border border-gray-200 dark:border-secondary-dark rounded-lg text-sm sm:text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
							type="search"
							placeholder="Search Blog Articles"
							aria-label="Search Blog Articles"
						/>
					</div>

					<BlogFilter setSelectCategory={setSelectCategory} />
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
