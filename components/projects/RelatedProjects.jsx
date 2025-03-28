import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../../data/projectsData';

function RelatedProjects({ currentProject }) {
	if (!currentProject) return null;

	const relatedProjects = projectsData.filter(
		(project) =>
			project.category === currentProject.category &&
			project.id !== currentProject.id
	);

	if (relatedProjects.length === 0) return null;

	return (
		<div className="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark max-w-7xl mx-auto w-full px-4">
			<p className="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left">
				Related Projects
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
				{relatedProjects.map((project) => (
					<Link href={`/projects/${project.id}`} key={project.id} passHref>
						<div className="rounded-xl cursor-pointer overflow-hidden w-full">
							<Image
								src={project.img}
								className="object-cover w-full h-auto rounded-xl"
								width={400}
								height={300}
								alt={project.title}
							/>
							<p className="mt-2 text-center text-lg font-medium tracking-medium text-primary-dark dark:text-primary-light">


								{project.title}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default RelatedProjects;
