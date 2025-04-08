'use client'

import { useEffect, useState, useRef } from 'react'

export default function TableOfContents({ className = '' }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState(null)
  const itemRefs = useRef({})

  useEffect(() => {
    const timeout = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('h2[id], h3[id]'))
      const newHeadings = elements.map((el) => ({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      }))
      setHeadings(newHeadings)
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.target.offsetTop - b.target.offsetTop)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-40% 0% -40% 0%',
        threshold: 0.1,
      }
    )

    const elements = document.querySelectorAll('h2[id], h3[id]')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [headings])

  if (!headings.length) return null

  return (
    <aside
      className={`hidden [@media(min-width:2000px)]:block fixed top-60 right-10 bottom-32 w-64 z-40 overflow-y-auto text-sm text-gray-500 dark:text-gray-300 transition-all duration-300 ${className} mt-5`}
    >
     <div className="pl-2">
  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-200">
    On This Article
  </p>

  <div className="relative">
    {/* vertical bar limited to list height */}
    <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-600" />
    
    <ul className="space-y-1 pl-4">
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={`relative ${
            heading.level === 3 ? 'pl-[21px]' : 'pl-0'
          }`}
        >
          <a
            ref={(el) => (itemRefs.current[heading.id] = el)}
            href={`#${heading.id}`}
            className={`block truncate transition-colors duration-200 ml-1 ${
              activeId === heading.id
                ? 'text-indigo-600 font-semibold dark:text-indigo-400'
                : 'hover:text-primary-dark dark:hover:text-primary-light'
            }`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
</div>

    </aside>
  )
}
