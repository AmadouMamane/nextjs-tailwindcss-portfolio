// pages/projects/[id].jsx

import { projectsData } from "../../data/projectsData";
import NotebookProjectLayout from "../../components/projects/layouts/NotebookProjectLayout";
import DefaultProjectLayout from "../../components/projects/layouts/DefaultProjectLayout";

// Mapping layouts based on project type
const layoutMap = {
  notebook: NotebookProjectLayout,
  default: DefaultProjectLayout,
};

function ProjectSingle({ project }) {
  if (!project) {
    return <div className="max-w-7xl mx-auto py-10">Project not found.</div>;
  }

  return <div className="py-10">Content inside the project layout</div>;
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const project = projectsData.find((p) => p.id === parseInt(id));

  return { props: { project: project || null, isBlog: false } };
}

// 🧠 Assign the layout dynamically based on the project type
ProjectSingle.getLayout = function getLayout(page) {
  const project = page.props?.project;
  const Layout = layoutMap[project?.type] || DefaultProjectLayout;

  return <Layout project={project}>{page}</Layout>;
};

export default ProjectSingle;
