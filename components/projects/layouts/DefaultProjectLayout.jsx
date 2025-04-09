// components/projects/layouts/DefaultProjectLayout.jsx

import ProjectHeader from "../ProjectHeader";
import ProjectTabs from "../ProjectTabs";
import BackButton from "../../reusable/BackButton";
import RelatedProjects from "../RelatedProjects";
import Container from "../../layout/Container";

export default function DefaultProjectLayout({ project }) {
  return (
    <Container>
      <BackButton />
      <ProjectHeader project={project} />
      <ProjectTabs project={project} />
      <RelatedProjects currentProject={project} />
    </Container>
  );
}
