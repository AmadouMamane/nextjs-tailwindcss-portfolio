import { useState, useEffect } from "react";
import NotebookViewer from "./NotebookViewer";
import ReactMarkdown from "react-markdown";

// Default tabs for notebook projects
const DEFAULT_NOTEBOOK_TABS = [
  "Overview",
  "Key Impact",
  "Challenge Highlights",
  "Goal",
  "Tools & Technologies",
  "Implementation"
];

export default function ProjectTabs({ project }) {
  // Use custom tabs if defined, otherwise use defaults for notebooks
  const tabs = project.ProjectTabs?.length > 0 
    ? project.ProjectTabs  
    : project.type === "notebook" 
    ? DEFAULT_NOTEBOOK_TABS  
    : [];

  // Keep track of the active tab
  const [activeTab, setActiveTab] = useState(tabs[0]); 

  // Reset the active tab to the first one whenever the project changes
  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [project]); // <-- Resets the tab when a related project is clicked

  return (
     <div className="mt-7 max-w-45xl mx-auto w-full ">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-4 border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-bold transition relative 
              ${
                activeTab === tab
                  ? "text-indigo-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-indigo-500"
                  : "text-gray-900 dark:text-gray-200"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-3 text-lg text-justify text-gray-900 dark:text-gray-200">
        {activeTab in project.ProjectInfo && (
          Array.isArray(project.ProjectInfo[activeTab]) ? (
            activeTab === "Tools & Technologies" ? (
              <p>{project.ProjectInfo[activeTab].join(", ")}</p>
            ) : (
              <ul className="list-disc pl-5 space-y-3">
                {project.ProjectInfo[activeTab].map((item) => (
                  <li key={item.id || item.title}>
                    <span className="font-bold text-gray-800 dark:text-gray-300">{item.title}</span>: {item.details}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="leading-relaxed space-y-1">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold my-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold my-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-medium my-2">{children}</h3>,
                  ul: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="ml-4">{children}</li>,
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

        {/* Show NotebookViewer only if it's a notebook project and on the Implementation tab */}
        {activeTab === "Implementation" && project.Notebook?.file && (
          <NotebookViewer notebookFile={project.Notebook.file} />
        )}
      </div>
    </div>
  );
}
