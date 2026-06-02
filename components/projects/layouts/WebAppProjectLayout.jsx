import ProjectHeader from "../ProjectHeader";
import ProjectTabs from "../ProjectTabs";
import BackButton from "../../reusable/BackButton";
import RelatedProjects from "../RelatedProjects";
import PagesMetaHead from '../../PagesMetaHead';

export default function WebAppProjectLayout({ project }) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <PagesMetaHead
        title={project.ProjectHeader?.title || project.cardTitle || project.title}
        description={project.tagline || project.cardSummary}
        image={project.img}
        url={`/projects/${project.url || project.id}`}
        type="article"
      />
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
      <RelatedProjects currentProject={project} />
    </div>
  );
}
