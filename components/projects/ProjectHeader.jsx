import { FiClock, FiTag } from "react-icons/fi";

export default function ProjectHeader({ project }) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-[1.25rem] sm:text-[2rem] lg:text-[3rem] leading-tight font-semibold tracking-normal text-center mt-20 sm:mt-24 mb-6  text-secondary-dark dark:text-gray-100">
        {project.ProjectHeader.title}
      </h1>
      <div className="flex justify-center mt-4 space-x-10">
        <div className="flex items-center">
          <FiClock className="text-xl text-primary-dark dark:text-gray-100" />
          <span className="ml-2 text-primary-dark  dark:text-gray-100">
            {project.ProjectHeader.publishDate}
          </span>
        </div>
        <div className="flex items-center">
          <FiTag className="w-4 h-4 text-primary-dark dark:text-gray-100" />
          <span className="ml-2 text-primary-dark  dark:text-gray-100">
            {project.ProjectHeader.tags}
          </span>
        </div>
      </div>
    </div>
  );
}




