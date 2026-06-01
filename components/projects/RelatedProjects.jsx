import { projectsData } from '../../data/projectsData';
import ProjectSingle from './ProjectSingle';

function RelatedProjects({ currentProject, edgeToEdgeRule = false }) {
  if (!currentProject) return null;

  const projectSearchText = (project) =>
    [
      project.category,
      project.secondaryCategory,
      project.ProjectHeader?.tags,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

  const currentSearchText = projectSearchText(currentProject);
  const currentRelatedTags = currentProject.relatedTags || [];
  const currentRelatedCategories = currentProject.relatedCategories || [];

  const relatedProjects = projectsData.filter((project) => {
    if (project.id === currentProject.id) return false;

    const projectRelatedTags = project.relatedTags || [];
    const projectRelatedCategories = project.relatedCategories || [];
    const targetSearchText = projectSearchText(project);
    const sameCategory = project.category === currentProject.category;
    const categoryMatch =
      currentRelatedCategories.includes(project.category) ||
      projectRelatedCategories.includes(currentProject.category);
    const tagMatch =
      currentRelatedTags.some((tag) => targetSearchText.includes(tag.toLowerCase())) ||
      projectRelatedTags.some((tag) => currentSearchText.includes(tag.toLowerCase()));

    return sameCategory || categoryMatch || tagMatch;
  });

  if (relatedProjects.length === 0) return null;

  const titleClassName = edgeToEdgeRule
    ? 'mb-10 text-center text-2xl font-semibold text-white sm:mb-14 sm:text-3xl md:text-4xl'
    : 'text-gray-800 dark:text-gray-200 text-2xl sm:text-3xl md:text-4xl font-medium mb-10 sm:mb-14 text-center';

  return (
    <div className="mt-20 sm:mt-32 w-full">
      <div className="border-t border-gray-200 pt-10 dark:border-gray-600 sm:pt-14">
        <div className={edgeToEdgeRule ? 'px-6 sm:px-10 lg:px-14' : ''}>
          <p className={titleClassName}>
            Related Projects
          </p>

          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project) => (
              <ProjectSingle key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatedProjects;
