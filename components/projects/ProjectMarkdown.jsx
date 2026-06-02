import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = {
  p: ({ children }) => <p className="mb-4 leading-7 text-slate-700 dark:text-slate-300">{children}</p>,
  h1: ({ children }) => (
    <h1 className="text-xl sm:text-2xl font-bold my-4 text-secondary-dark dark:text-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg sm:text-xl font-semibold my-3 text-secondary-dark dark:text-gray-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base sm:text-lg font-medium my-2 text-secondary-dark dark:text-gray-100">
      {children}
    </h3>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ml-0 space-y-3 text-base sm:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-8 sm:pl-12 space-y-2 mb-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="relative pl-5 leading-7 text-gray-800 before:absolute before:left-0 before:top-[0.75em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-indigo-500 dark:text-gray-200">{children}</li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-600 dark:text-gray-400">{children}</em>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-indigo-700 dark:bg-white/[0.075] dark:text-indigo-300">
        {children}
      </code>
    ) : (
      <code className="my-4 block overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-100 dark:bg-black/40">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-hidden rounded-lg border border-gray-200 dark:border-white/[0.08]">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-ternary-dark/50 py-3 pr-4 rounded-r-lg">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-ternary-dark">
      <table className="min-w-full text-sm sm:text-base">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-100 dark:bg-ternary-dark">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-gray-200 dark:divide-ternary-dark">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-gray-50 dark:hover:bg-primary-dark/50">{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-secondary-dark dark:text-gray-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{children}</td>
  ),
  img: ({ src, alt }) => (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-ternary-dark shadow-lg bg-white dark:bg-secondary-dark p-3 sm:p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-auto rounded-lg"
          loading="lazy"
        />
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};

export default function ProjectMarkdown({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {children}
    </ReactMarkdown>
  );
}
