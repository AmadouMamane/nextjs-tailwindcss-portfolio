// components/projects/layouts/DefaultProjectLayout.jsx

import ProjectHeader from "../ProjectHeader";
import ProjectTabs from "../ProjectTabs";
import BackButton from "../../reusable/BackButton";
import RelatedProjects from "../RelatedProjects";
import Container from "../../layout/Container";
import PagesMetaHead from '../../PagesMetaHead';

export default function DefaultProjectLayout({ project }) {
  return (
    <Container>
      <PagesMetaHead
        title={project.ProjectHeader?.title || project.cardTitle || project.title}
        description={project.tagline || project.cardSummary}
        image={project.img}
        url={`/projects/${project.url || project.id}`}
        type="article"
      />
      <BackButton />
      <ProjectHeader project={project} />
      <ProjectTabs project={project} />
      <RelatedProjects currentProject={project} />
    </Container>
  );
}
