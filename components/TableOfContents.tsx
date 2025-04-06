'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function TableOfContents() {
  const router = useRouter()
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([])

  useEffect(() => {
    const generateHeadings = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3'))

      const newHeadings = headingElements.map((el) => ({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      }))

      setHeadings(newHeadings)
    }

    generateHeadings()

    const handleRouteChange = () => {
      setTimeout(() => {
        generateHeadings()
      }, 100)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  if (!headings.length) return null

  return (
    <aside className="hidden 2xl:block fixed top-60 right-10 w-64 text-sm z-40 max-h-[70vh] overflow-y-auto border-l border-gray-200 dark:border-gray-500 pl-4 mt-15 transition-colors duration-300 text-gray-500 dark:text-gray-400">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
        On this Article
      </p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-4' : 'ml-0'}>
            <a
              href={`#${heading.id}`}
              className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200 block truncate"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>

  )
}
