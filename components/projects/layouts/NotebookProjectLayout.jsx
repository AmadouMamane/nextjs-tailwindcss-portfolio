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
        <PagesMetaHead />
                
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





