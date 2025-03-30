module.exports = {
  reactStrictMode: true,
}


const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-gfm'), // Enables tables, strikethrough, and GitHub-style markdown
      require('remark-mdx-frontmatter') // Ensures frontmatter parsing
    ],
    rehypePlugins: [require('rehype-slug')], // Generates IDs for headings
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
});
