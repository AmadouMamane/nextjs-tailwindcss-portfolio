import ProjectHeader from "../ProjectHeader";
import ProjectTabs from "../ProjectTabs"; 
import BackButton from "../../reusable/BackButton";
import RelatedProjects from "../RelatedProjects";

export default function NotebookProjectLayout({ project }) {
  return (
    <div className="container mx-auto">
      <BackButton />
      <ProjectHeader project={project} />
      <ProjectTabs project={project} /> 
      <RelatedProjects />
    </div>
  );
}
