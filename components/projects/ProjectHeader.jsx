import { FiClock, FiTag } from 'react-icons/fi';

export default function ProjectHeader({ project, compact = false }) {
  if (compact) {
    return (
      <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm sm:text-base">
        <div className="flex items-center text-primary-dark dark:text-gray-200">
          <FiClock className="text-lg mr-2" aria-hidden="true" />
          <span>{project.ProjectHeader.publishDate}</span>
        </div>
        <div className="flex items-center text-primary-dark dark:text-gray-200">
          <FiTag className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>{project.ProjectHeader.tags}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-16">
      <h1 className="text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-semibold tracking-normal text-center mt-20 sm:mt-24 mb-6 text-secondary-dark dark:text-gray-100">
        {project.ProjectHeader.title}
      </h1>
      <div className="flex flex-wrap justify-center mt-4 gap-x-10 gap-y-3">
        <div className="flex items-center">
          <FiClock className="text-xl text-primary-dark dark:text-gray-100" aria-hidden="true" />
          <span className="ml-2 text-primary-dark dark:text-gray-100">
            {project.ProjectHeader.publishDate}
          </span>
        </div>
        <div className="flex items-center">
          <FiTag className="w-4 h-4 text-primary-dark dark:text-gray-100" aria-hidden="true" />
          <span className="ml-2 text-primary-dark dark:text-gray-100">
            {project.ProjectHeader.tags}
          </span>
        </div>
      </div>
    </div>
  );
}
