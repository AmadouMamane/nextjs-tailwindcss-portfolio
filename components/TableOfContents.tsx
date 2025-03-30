'use client'

import { useEffect, useState } from 'react'

export default function TableOfContents() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([])

  useEffect(() => {
    const selector = 'h2, h3'
    const headingElements = Array.from(document.querySelectorAll(selector))

    const newHeadings = headingElements.map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }))

    setHeadings(newHeadings)
  }, [])

  if (!headings.length) return null

  return (
    <aside className="hidden xl:block fixed top-60 right-10 w-64 text-sm text-gray-500 dark:text-gray-400 z-40 max-h-[70vh] overflow-y-auto border-l border-gray-100 dark:border-gray-700 pl-4 mt-15">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500">
        On this Article
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`ml-${(heading.level - 2) * 4}`}>
            <a
              href={`#${heading.id}`}
              className="hover:text-black dark:hover:text-white transition-colors duration-200 block truncate"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
