import { useState, useEffect, useMemo } from 'react';
import NotebookViewer from './NotebookViewer';
import ProjectMarkdown from './ProjectMarkdown';

const DEFAULT_NOTEBOOK_TABS = [
  'Overview',
  'Key Impact',
  'Challenge Highlights',
  'Goal',
  'Tools & Technologies',
  'Implementation',
];

export default function ProjectTabs({ project }) {
  const info = project.ProjectInfo || {};
  const tabs = useMemo(() => (
    project.ProjectTabs?.length > 0
      ? project.ProjectTabs
      : project.type === 'notebook'
        ? DEFAULT_NOTEBOOK_TABS
        : []
  ), [project]);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [tabs]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="sticky top-0 z-10 border-y border-slate-200/70 bg-secondary-light/88 py-2 backdrop-blur-2xl dark:border-white/[0.07] dark:bg-primary-dark/88">
        <div className="flex gap-2 overflow-x-auto py-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`relative shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition sm:text-[15px]
                ${
                  activeTab === tab
                    ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950'
                    : 'text-slate-700 hover:bg-slate-950/[0.045] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.075] dark:hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-12 pt-7 text-base leading-relaxed text-gray-900 dark:text-gray-200 sm:pt-9 sm:text-lg">
        {activeTab && activeTab in info &&
          (Array.isArray(info[activeTab]) ? (
            activeTab === 'Tools & Technologies' ? (
              <div className="flex flex-wrap gap-2.5">
                {info[activeTab].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-300/[0.14] dark:bg-indigo-400/[0.10] dark:text-indigo-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {info[activeTab].map((item) => (
                  <li
                    key={item.id || item.title}
                    className="rounded-lg border border-slate-200/75 bg-white/60 p-4 text-sm leading-6 text-slate-600 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.045] dark:text-slate-300 sm:text-base"
                  >
                    <span className="mb-1 block font-semibold text-gray-800 dark:text-gray-100">
                      {item.title}
                    </span>
                    {item.details}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="prose prose-neutral max-w-none dark:prose-invert prose-p:leading-7 prose-li:leading-7">
              <ProjectMarkdown>{info[activeTab]}</ProjectMarkdown>
            </div>
          ))}

        {activeTab === 'Implementation' && project.Notebook?.file && (
          <NotebookViewer notebookFile={project.Notebook.file} />
        )}
      </div>
    </div>
  );
}
