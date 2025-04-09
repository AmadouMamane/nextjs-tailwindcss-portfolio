// pages/projects/index.jsx

import Container from '../../components/layout/Container';
import PagesMetaHead from '../../components/PagesMetaHead';
import ProjectsGrid from '../../components/projects/ProjectsGrid';
import DefaultLayout from '../../components/layout/DefaultLayout';

function ProjectsIndex() {
  return (
    <Container>
      <PagesMetaHead title="Projects" />
      <ProjectsGrid />
    </Container>
  );
}

ProjectsIndex.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ProjectsIndex;
