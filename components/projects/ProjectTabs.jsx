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
    <div className="max-w-7xl mx-auto">
      <div className="border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-primary-dark sticky top-0 z-10">
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-start py-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`px-3 py-2 text-sm sm:text-lg font-medium relative transition whitespace-nowrap
                ${
                  activeTab === tab
                    ? "text-indigo-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-indigo-500"
                    : 'text-gray-800 dark:text-gray-200 hover:text-indigo-600'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed text-gray-900 dark:text-gray-200 pb-12">
        {activeTab in project.ProjectInfo &&
          (Array.isArray(project.ProjectInfo[activeTab]) ? (
            activeTab === 'Tools & Technologies' ? (
              <div className="flex flex-wrap gap-2">
                {project.ProjectInfo[activeTab].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <ul className="list-disc pl-6 sm:pl-10 space-y-2">
                {project.ProjectInfo[activeTab].map((item) => (
                  <li key={item.id || item.title}>
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      {item.title}
                    </span>
                    : {item.details}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="space-y-4 prose prose-neutral dark:prose-invert max-w-none">
              <ProjectMarkdown>{project.ProjectInfo[activeTab]}</ProjectMarkdown>
            </div>
          ))}

        {activeTab === 'Implementation' && project.Notebook?.file && (
          <NotebookViewer notebookFile={project.Notebook.file} />
        )}
      </div>
    </div>
  );
}
