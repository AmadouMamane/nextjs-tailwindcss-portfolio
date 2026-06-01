// components/projects/ProjectsGrid.js
import { useState } from 'react';
import ProjectSingle from './ProjectSingle';
import { projectsData } from '../../data/projectsData';
import FilterDropdown from '../shared/FilterDropdown';
import SearchInput from '../shared/SearchInput';

const selectOptions = [
  'AI Engineering',
  'Data Science',
  'Data Engineering',
  'Software Engineering',
  'Web Application',
];

const normalize = (value) => value.toLowerCase().trim();

const projectSearchText = (project) => [
  project.title,
  project.cardTitle,
  project.cardSummary,
  project.tagline,
  project.category,
  project.secondaryCategory,
  project.ProjectHeader?.tags,
  ...(project.cardHighlights || []),
].filter(Boolean).join(' ');

function ProjectsGrid() {
  const [searchProject, setSearchProject] = useState('');
  const [selectProject, setSelectProject] = useState('all');
  const query = normalize(searchProject);

  const filteredProjects = projectsData.filter((item) => {
    const matchesCategory =
      selectProject === 'all' || item.category.toLowerCase() === selectProject.toLowerCase();
    const matchesSearch = query === '' || normalize(projectSearchText(item)).includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative mt-14">
      <div className="mb-10 border-y border-slate-200/60 py-5 dark:border-white/[0.07]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl text-left">
            <h2 className="font-general-medium text-2xl text-ternary-dark dark:text-ternary-light sm:text-3xl">
              Selected work
            </h2>
            <p className="mt-2 text-sm leading-6 text-secondary-dark dark:text-gray-400 sm:text-base">
              Focused AI, data and ML projects, presented through the constraints that shaped them
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:min-w-[34rem] lg:justify-end">
            <SearchInput
              value={searchProject}
              onChange={setSearchProject}
              placeholder="Search work, stack or domain"
            />
            <div className="w-full sm:w-60">
              <FilterDropdown
                value={selectProject}
                onChange={setSelectProject}
                options={selectOptions}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectSingle key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsGrid;
