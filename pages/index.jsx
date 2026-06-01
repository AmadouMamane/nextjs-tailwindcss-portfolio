import Link from 'next/link';
import PagesMetaHead from '../components/PagesMetaHead';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import Button from '../components/reusable/Button';
import AppBanner from '../components/shared/AppBanner';
import Container from '../components/layout/Container';

export default function Home() {
  return (
    <Container isBlog={false}>
      <PagesMetaHead title="Home" />

      <AppBanner />

      <ProjectsGrid />

      <div className="mt-10 sm:mt-15 flex justify-center">
        <div className="font-general-medium flex items-center rounded-lg border border-indigo-400/20 bg-indigo-500 px-6 py-3 text-lg text-white shadow-[0_16px_34px_rgba(99,102,241,0.25)] duration-300 hover:bg-indigo-600 hover:shadow-[0_20px_44px_rgba(99,102,241,0.32)] focus:ring-1 focus:ring-indigo-900 sm:text-xl">
          <Link href="/projects" aria-label="View all work" passHref>
            <Button title="View all work" />
          </Link>
        </div>
      </div>
    </Container>
  );
}
