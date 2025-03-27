import { FiClock, FiTag } from "react-icons/fi";

export default function ProjectHeader({ project }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light mt-10 sm:mt-20 mb-4">
        {project.ProjectHeader.title}
      </h1>
      <div className="flex">
        <div className="flex items-center mr-10">
          <FiClock className="text-xl text-ternary-dark dark:text-ternary-light" />
          <span className="ml-2 text-primary-dark dark:text-primary-light">
            {project.ProjectHeader.publishDate}
          </span>
        </div>
        <div className="flex items-center">
          <FiTag className="w-4 h-4 text-ternary-dark dark:text-ternary-light" />
          <span className="ml-2 text-primary-dark dark:text-primary-light">
            {project.ProjectHeader.tags}
          </span>
        </div>
      </div>
    </div>
  );
}
