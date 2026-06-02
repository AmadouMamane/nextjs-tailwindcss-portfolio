import ProjectHeader from "../ProjectHeader";
import ProjectTabs from "../ProjectTabs"; 
import BackButton from "../../reusable/BackButton";
import RelatedProjects from "../RelatedProjects";
import Container from '../../layout/Container';
import AppFooter from '../../shared/AppFooter';
import PagesMetaHead from '../../PagesMetaHead';
import AppHeader from '../../shared/AppHeader';


export default function NotebookProjectLayout({ project, isBlog=false}) {
  return (
    <>
        <PagesMetaHead
          title={project.ProjectHeader?.title || project.cardTitle || project.title}
          description={project.tagline || project.cardSummary}
          image={project.img}
          url={`/projects/${project.url || project.id}`}
          type="article"
          keywords={[
            project.category,
            project.secondaryCategory,
            project.ProjectHeader?.tags,
            ...(project.cardHighlights || []),
          ].filter(Boolean).join(', ')}
        />
                
        <AppHeader />
        <BackButton />
       <Container isBlog={isBlog}>


        <ProjectHeader project={project} />
        <ProjectTabs project={project} /> 
        <RelatedProjects currentProject={project}/>

        <AppFooter isBlog />

    </Container>
    </>

  );
}




