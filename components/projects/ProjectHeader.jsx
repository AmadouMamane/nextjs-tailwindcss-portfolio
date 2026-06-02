import { CalendarDays, Tag } from 'lucide-react';

const metaItemClassName =
  'inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-sm text-slate-600 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.055] dark:text-slate-300';

export default function ProjectHeader({ project, compact = false }) {
  if (compact) {
    return (
      <div className="mb-10 flex flex-wrap justify-center gap-2 text-sm sm:text-base">
        <div className={metaItemClassName}>
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <span>{project.ProjectHeader.publishDate}</span>
        </div>
        <div className={metaItemClassName}>
          <Tag className="h-4 w-4" aria-hidden="true" />
          <span>{project.ProjectHeader.tags}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-14 mt-20 max-w-4xl text-center sm:mb-16 sm:mt-24">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
        Project case study
      </p>
      <h1 className="mx-auto max-w-3xl text-[1.75rem] font-semibold leading-tight tracking-normal text-secondary-dark dark:text-gray-100 sm:text-[2.35rem] lg:text-[2.85rem]">
        {project.ProjectHeader.title}
      </h1>
      {(project.tagline || project.cardSummary) && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          {project.tagline || project.cardSummary}
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <div className={metaItemClassName}>
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <span>{project.ProjectHeader.publishDate}</span>
        </div>
        <div className={metaItemClassName}>
          <Tag className="h-4 w-4" aria-hidden="true" />
          <span>{project.ProjectHeader.tags}</span>
        </div>
      </div>
    </div>
  );
}
