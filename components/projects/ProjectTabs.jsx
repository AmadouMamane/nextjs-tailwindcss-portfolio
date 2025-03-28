import { useState } from "react";
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

  const [activeTab, setActiveTab] = useState(tabs[0]); // First tab is default

  return (
    <div className="mt-7">
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
        {/* Handle both list and string values dynamically */}
        {activeTab in project.ProjectInfo && (
          Array.isArray(project.ProjectInfo[activeTab]) ? (
            activeTab === "Tools & Technologies" ? (
              <p>{project.ProjectInfo[activeTab].join(", ")}</p>
            ) : activeTab === "Challenge Highlights" || activeTab === "Key Questions" ? (
              <div className="space-y-3">
                {project.ProjectInfo[activeTab].map((item) => (
                  <p key={item.id || item.title}>
                    <span className="font-bold text-gray-800 dark:text-gray-300">{item.title}</span>: {item.details}
                  </p>
                ))}
              </div>
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
                  ul: ({ children }) => <ul className="list-disc pl-10 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className=" list-decimal pl-10 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="ml-4">{children}</li>,
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
