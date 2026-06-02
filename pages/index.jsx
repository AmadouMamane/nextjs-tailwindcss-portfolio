import Link from 'next/link';
import PagesMetaHead from '../components/PagesMetaHead';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import Button from '../components/reusable/Button';
import AppBanner from '../components/shared/AppBanner';
import Container from '../components/layout/Container';

export default function Home() {
  return (
    <Container isBlog={false}>
      <PagesMetaHead
        title="AI & Data Engineering Portfolio"
        description="Applied AI, data engineering and machine learning portfolio by Amadou Mamane, featuring shipped systems, notebooks and open-source case studies."
        url="/"
      />

      <AppBanner />

      <ProjectsGrid />

      <div className="mt-10 sm:mt-15 flex justify-center">
        <div className="font-general-medium flex items-center rounded-full border border-slate-950/10 bg-slate-950 px-6 py-3 text-sm font-medium text-white shadow-none duration-300 hover:bg-slate-800 focus:ring-1 focus:ring-indigo-900 dark:border-white/[0.12] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:text-base">
          <Link href="/projects" aria-label="View all work" passHref>
            <Button title="View all work" />
          </Link>
        </div>
      </div>
    </Container>
  );
}
