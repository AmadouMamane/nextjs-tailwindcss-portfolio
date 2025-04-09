// components/projects/ProjectsGrid.js
import { useState } from 'react';
import ProjectSingle from './ProjectSingle';
import { projectsData } from '../../data/projectsData';
import FilterDropdown from '../shared/FilterDropdown';
import SearchInput from '../shared/SearchInput';

const selectOptions = [
  'Data Science',
  'Generative AI',
  'Data Engineering',
  'Software Engineering',
  'Web Application',
];

function ProjectsGrid() {
  const [searchProject, setSearchProject] = useState('');
  const [selectProject, setSelectProject] = useState('all');

  const filteredProjects = projectsData.filter((item) => {
    const matchesCategory =
      selectProject === 'all' || item.category.toLowerCase() === selectProject.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchProject.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mt-16">
      <div className="text-center">
        <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
          Projects Portfolio
        </p>
      </div>

      <div className="mt-12">
        <h3 className="font-general-regular text-center text-secondary-dark dark:text-ternary-light text-md sm:text-xl mb-6">
          Search projects by title or filter by category
        </h3>

        <div className="border-b border-gray-100 dark:border-secondary-dark pb-4 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <SearchInput
              value={searchProject}
              onChange={setSearchProject}
              placeholder="Search Projects"
            />
            <div className="w-60">
              <FilterDropdown
                value={selectProject}
                onChange={setSelectProject}
                options={selectOptions}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project, index) => (
          <ProjectSingle key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsGrid;
