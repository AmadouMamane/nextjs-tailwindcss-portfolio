import { projectsData } from "../../data/projectsData";
import NotebookProjectLayout from "../../components/projects/layouts/NotebookProjectLayout";
import DefaultProjectLayout from "../../components/projects/layouts/DefaultProjectLayout";
import RelatedProjects from "../../components/projects/RelatedProjects";

// Mapping layouts based on project type
const layoutMap = {
  notebook: NotebookProjectLayout,
  default: DefaultProjectLayout,
};

export default function ProjectSingle({ project }) {
  const ProjectLayout = layoutMap[project?.type] || DefaultProjectLayout;

  if (!project) {
    return <div className="container mx-auto px-4 py-10">Project not found.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <ProjectLayout project={project} />

      {/* Ensure RelatedProjects is within the same container */}
      <RelatedProjects currentProject={project} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const project = projectsData.find((p) => p.id === parseInt(id));

  return { props: { project: project || null } };
}
