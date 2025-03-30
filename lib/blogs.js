import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export function getAllBlogs() {
	if (!fs.existsSync(blogDirectory)) {
		console.error('Blog directory does not exist:', blogDirectory);
		return [];
	}

	const files = fs.readdirSync(blogDirectory);

	const blogs = files
		.filter((filename) => filename.endsWith('.mdx')) // Only process MDX files
		.map((filename) => {
			const filePath = path.join(blogDirectory, filename);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const { data } = matter(fileContent);

			return {
				slug: filename.replace('.mdx', ''), // Extract slug from filename
				...data,
			};
		});

	// Sort blogs by date (newest first)
	return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}
