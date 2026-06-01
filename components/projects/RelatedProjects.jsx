import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../../data/projectsData';
import { FiTag } from 'react-icons/fi';

function RelatedProjects({ currentProject, isBlog = false, edgeToEdgeRule = false }) {
  if (!currentProject) return null;

  const relatedProjects = projectsData.filter(
    (project) =>
      project.category === currentProject.category &&
      project.id !== currentProject.id
  );

  if (relatedProjects.length === 0) return null;

  const titleClassName = edgeToEdgeRule
    ? 'mb-10 text-center text-2xl font-semibold text-white sm:mb-14 sm:text-3xl md:text-4xl'
    : 'text-gray-800 dark:text-gray-200 text-2xl sm:text-3xl md:text-4xl font-medium mb-10 sm:mb-14 text-center';

  const cardClassName = edgeToEdgeRule
    ? 'group overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:border-[#818cf8]/35 hover:bg-white/[0.055]'
    : 'overflow-hidden rounded-lg shadow-lg hover:shadow-xl cursor-pointer bg-secondary-light dark:bg-ternary-dark transition-transform duration-300 hover:scale-[1.015]';

  const titleTextClassName = edgeToEdgeRule
    ? 'mb-2 text-xl text-white'
    : 'text-xl text-ternary-dark dark:text-ternary-light mb-2';

  const tagClassName = edgeToEdgeRule
    ? 'rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300'
    : 'text-xs px-2 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-ternary-light rounded-full';

  return (
    <div className="mt-20 sm:mt-32 w-full">
      <div className="border-t border-gray-200 pt-10 dark:border-gray-600 sm:pt-14">
        <div className={edgeToEdgeRule ? 'px-6 sm:px-10 lg:px-14' : ''}>
          <p className={titleClassName}>
            Related Projects
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} passHref>
                <div className={cardClassName}>
                  <div className="relative w-full h-72 overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover ${edgeToEdgeRule ? 'transition duration-500 group-hover:scale-105' : ''}`}
                    />
                  </div>

                  <div className="text-center px-4 py-6">
                    <p className={titleTextClassName}>
                      {project.title}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-1 mt-3">
                      <FiTag className={edgeToEdgeRule ? 'text-slate-400' : 'text-ternary-dark dark:text-ternary-light'} />
                      <span className={tagClassName}>
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
    </div>
  );
}

export default RelatedProjects;
