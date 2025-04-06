import { useState, useEffect } from "react";
import NotebookViewer from "./NotebookViewer";
import ReactMarkdown from "react-markdown";

const DEFAULT_NOTEBOOK_TABS = [
  "Overview",
  "Key Impact",
  "Challenge Highlights",
  "Goal",
  "Tools & Technologies",
  "Implementation"
];

export default function ProjectTabs({ project }) {
  const tabs = project.ProjectTabs?.length > 0
    ? project.ProjectTabs
    : project.type === "notebook"
    ? DEFAULT_NOTEBOOK_TABS
    : [];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [project]);

  return (
<div className="w-full mt-10">
  {/* Tab bar */}
  <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-primary-dark">
    {/* This div aligns tabs with page content */}
    <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-start">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-2 text-lg sm:text-xl font-medium relative transition

            ${
              activeTab === tab
                ? "text-indigo-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-indigo-500"
                : "text-gray-800 dark:text-gray-200 hover:text-indigo-600"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>

    {/* Tab Content — same max-w container */}
    <div className="max-w-7xl mx-auto mt-6 text-base sm:text-lg leading-relaxed text-gray-900 dark:text-gray-200">
    {activeTab in project.ProjectInfo && (
        Array.isArray(project.ProjectInfo[activeTab]) ? (
          activeTab === "Tools & Technologies" ? (
            <p>{project.ProjectInfo[activeTab].join(", ")}</p>
          ) : (
            <ul className="list-disc pl-6 sm:pl-10 space-y-2">
              {project.ProjectInfo[activeTab].map((item) => (
                <li key={item.id || item.title}>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">
                    {item.title}
                  </span>: {item.details}
                </li>
              ))}
            </ul>
          )
        ) : (
          <div className="space-y-4">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-4">{children}</p>,
                h1: ({ children }) => <h1 className="text-xl sm:text-2xl font-bold my-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg sm:text-xl font-semibold my-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base sm:text-lg font-medium my-2">{children}</h3>,
                ul: ({ children }) => (
                  <ul className="list-disc ml-4 sm:ml-6 lg:ml-8 space-y-3 text-base sm:text-lg">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed text-gray-800 dark:text-gray-200">
                    {children}
                  </li>
                ),
                
                ol: ({ children }) => <ol className="list-decimal pl-12 sm:pl-16 space-y-2">{children}</ol>,
            
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                strong: ({ children }) => <strong className="font-bold text-gray-800 dark:text-gray-300">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-600 dark:text-gray-400">{children}</em>,
              }}
            >
              {project.ProjectInfo[activeTab]}
            </ReactMarkdown>
          </div>
        )
      )}
  
      {activeTab === "Implementation" && project.Notebook?.file && (
        <NotebookViewer notebookFile={project.Notebook.file} />
      )}
    </div>
  </div>
  
  );
}
