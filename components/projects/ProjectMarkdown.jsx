import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = {
  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
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
    <ul className="list-disc ml-4 sm:ml-6 lg:ml-8 space-y-3 text-base sm:text-lg mb-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-8 sm:pl-12 space-y-2 mb-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-gray-800 dark:text-gray-200">{children}</li>
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
      <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-ternary-dark text-sm font-mono text-indigo-700 dark:text-indigo-300">
        {children}
      </code>
    ) : (
      <code className="block p-4 rounded-lg bg-gray-900 dark:bg-primary-dark text-sm font-mono text-gray-100 overflow-x-auto my-4">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="rounded-lg overflow-hidden my-4 border border-gray-200 dark:border-ternary-dark">
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
