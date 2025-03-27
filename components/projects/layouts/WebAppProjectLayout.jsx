import ProjectHeader from "../ProjectHeader";
import ProjectTabs from "../ProjectTabs";
import BackButton from "../../reusable/BackButton";
import RelatedProjects from "../RelatedProjects";

export default function WebAppProjectLayout({ project }) {
  return (
    <div className="container mx-auto">
      <BackButton />
      <ProjectHeader project={project} />
      
      {/* Web Apps : just a demo */}
      <div className="my-8">
        <iframe 
          src={project.demoUrl} 
          width="100%" 
          height="500px" 
          className="rounded-lg shadow"
        />
      </div>

      <ProjectTabs project={project} />
      <RelatedProjects />
    </div>
  );
}
