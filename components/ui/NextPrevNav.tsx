import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function NextPrevNav({
  prev,
  next,
}: {
  prev: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}) {
  if (!prev && !next) return null

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-24 px-6">
      <div className="flex flex-col sm:flex-row justify-between gap-10 items-stretch">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex-1  bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous Article
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {prev.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex-1 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-right"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex justify-end items-center gap-2">
              Next Article
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {next.title}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
