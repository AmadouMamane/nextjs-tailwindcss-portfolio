import { projectsData } from "../../data/projectsData";
import NotebookProjectLayout from "../../components/projects/layouts/NotebookProjectLayout";
import DefaultProjectLayout from "../../components/projects/layouts/DefaultProjectLayout";

// Mapping layouts based on project type
const layoutMap = {
  notebook: NotebookProjectLayout,
  default: DefaultProjectLayout,
};

export default function ProjectSingle({ project }) {
  const ProjectLayout = layoutMap[project?.type] || DefaultProjectLayout;

  if (!project) {
    return <div className="max-w-7xl mx-auto py-10">Project not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ProjectLayout project={project} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const project = projectsData.find((p) => p.id === parseInt(id));

  return { props: { project: project || null,  isBlog: false, } };
}
