import { projectsData } from "../../data/projectsData";
import NotebookProjectLayout from "../../components/projects/layouts/NotebookProjectLayout";
import DefaultProjectLayout from "../../components/projects/layouts/DefaultProjectLayout";

// ✅ Mapping layouts based on project type
const layoutMap = {
  notebook: NotebookProjectLayout,
  default: DefaultProjectLayout,
};

export default function ProjectSingle({ project }) {
  // ✅ Select the correct layout, fallback to DefaultProjectLayout if unknown
  const ProjectLayout = layoutMap[project.type] || DefaultProjectLayout;
  
  return <ProjectLayout project={project} />;
}

// ✅ Fetch project data based on ID
export async function getServerSideProps({ query }) {
  const { id } = query;
  const project = projectsData.find((p) => p.id === parseInt(id));

  return { props: { project } };
}
