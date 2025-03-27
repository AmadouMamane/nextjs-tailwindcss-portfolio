import { useState } from "react";
import NotebookViewer from "./NotebookViewer";

export default function ProjectTabs({ project }) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("Overview");

  // Define the list of tabs
  const tabs = [
    "Overview",
    "Key Impact",
    "Challenge Highlights",
    "Goal",
    "Tools & Technologies",
  ];

  // Add "Implementation" tab only if the project is a notebook
  if (project.type === "notebook") {
    tabs.push("Implementation");
  }

  return (
    <div className="mt-7">
      {/* Tab buttons with underline effect and bold text */}
      <div className="flex flex-wrap gap-4 border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-bold transition relative 
              ${
                activeTab === tab
                  ? "text-indigo-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-indigo-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            onClick={() => setActiveTab(tab)} 
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-3 text-lg">
        {activeTab === "Overview" && <p>{project.ProjectInfo.OverviewDetails}</p>}
        {activeTab === "Key Impact" && <p>{project.ProjectInfo.KeyImpactDetails}</p>}
        {activeTab === "Challenge Highlights" && (
          <ul className="list-disc list-inside">
            {project.ProjectInfo.ChallengeHighlightsInfo.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>: {item.details}
              </li>
            ))}
          </ul>
        )}
        {activeTab === "Goal" && <p>{project.ProjectInfo.GoalDetails}</p>}
        {activeTab === "Tools & Technologies" && (
          <p>{project.ProjectInfo.Technologies[0].techs.join(", ")}</p>
        )}

        {/* Show NotebookViewer only for the "Implementation" tab */}
        {activeTab === "Implementation" && project.Notebook?.file && (
          <NotebookViewer notebookFile={project.Notebook.file} />
        )}
      </div>
    </div>
  );
}
