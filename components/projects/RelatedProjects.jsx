import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../../data/projectsData';
import { FiTag } from 'react-icons/fi';

function RelatedProjects({ currentProject, isBlog = false  }) {
  if (!currentProject) return null;

  const relatedProjects = projectsData.filter(
    (project) =>
      project.category === currentProject.category &&
      project.id !== currentProject.id
  );

  if (relatedProjects.length === 0) return null;

  return (
    <div className="mt-20 sm:mt-32 w-full">
        <div className="border-t border-gray-200 dark:border-gray-600 pt-10 sm:pt-14">
          <p className="text-gray-800 dark:text-gray-200 text-2xl sm:text-3xl md:text-4xl font-medium mb-10 sm:mb-14 text-center">
            Related Projects
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} passHref>
                <div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer bg-secondary-light dark:bg-ternary-dark transition-transform duration-300 hover:scale-[1.015]">
                  <div className="relative w-full h-72">
                    <Image
                      src={project.img}
                      alt={project.title}
                      layout="fill"
                      className="object-cover rounded-t-xl"
                    />
                  </div>

                  <div className="text-center px-4 py-6">
                    <p className="text-xl text-ternary-dark dark:text-ternary-light mb-2">
                      {project.title}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-1 mt-3">
                      <FiTag className="text-ternary-dark dark:text-ternary-light" />
                      <span className="text-xs px-2 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-ternary-light rounded-full">
                        {project.ProjectHeader.tags}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
   
    </div>
  );
}

export default RelatedProjects;
