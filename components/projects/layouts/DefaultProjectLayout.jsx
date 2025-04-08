import ProjectHeader from "../ProjectHeader";
import ProjectTabs from "../ProjectTabs";
import BackButton from "../../reusable/BackButton";
import RelatedProjects from "../RelatedProjects";

export default function DefaultProjectLayout({ project }) {
  return (
    <div className="max-w-7xl mx-auto">
      <BackButton />
      <ProjectHeader project={project} />
      <ProjectTabs project={project} />
      <RelatedProjects currentProject={project}/>
    </div>
  );
}
