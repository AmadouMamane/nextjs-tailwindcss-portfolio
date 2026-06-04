// pages/projects/[id].jsx

import { projectsData } from "../../data/projectsData";
import NotebookProjectLayout from "../../components/projects/layouts/NotebookProjectLayout";
import DefaultProjectLayout from "../../components/projects/layouts/DefaultProjectLayout";
import TesseraProjectLayout from "../../components/projects/layouts/TesseraProjectLayout";

const layoutMap = {
  notebook: NotebookProjectLayout,
  default: DefaultProjectLayout,
  tessera: TesseraProjectLayout,
};

function ProjectSingle({ project }) {
  if (!project) {
    return <div className="max-w-7xl mx-auto py-10">Project not found.</div>;
  }

  return null;
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const requestedId = Array.isArray(id) ? id[0] : id;
  const numericId = Number.parseInt(String(requestedId), 10);
  const project = projectsData.find((p) => p.url === requestedId || p.id === numericId);

  return { props: { project: project || null, isBlog: false } };
}

ProjectSingle.getLayout = function getLayout(page, pageProps) {
  const project = pageProps?.project || page.props?.project;

  if (!project) {
    return <div className="max-w-7xl mx-auto py-10">Project not found.</div>;
  }

  const Layout = layoutMap[project.type] || DefaultProjectLayout;

  return <Layout project={project} isBlog={page.props?.isBlog}>{page}</Layout>;
};

export default ProjectSingle;
