import Image from 'next/image';
import { useState } from 'react';
import { aboutMeData } from '../../data/aboutMeData';
import { motion } from 'framer-motion';

function AboutMeBio() {
	const [aboutMe] = useState(aboutMeData);

	return (
		<div className="flex flex-col mt-16">
			{/* Intro block (not animated) */}
			{aboutMe[0] && (
				<div className="mb-5 text-center px-4">
					<p className="text-xl font-semibold text-ternary-dark dark:text-ternary-light">
						{aboutMe[0].bio}
					</p>
				</div>
			)}

			{/* Profile image + timeline */}
			<div className="flex flex-col sm:flex-row sm:gap-6 items-start">
				{/* Profile image on the left */}
				<div className="w-full sm:w-[260px] flex justify-center sm:justify-start">
					<div className="relative w-[260px] h-[260px]">
						<Image
							src="/images/profile.jpeg"
							fill
							style={{ objectFit: 'cover' }}
							className="rounded-lg"
							alt="Profile Image"
						/>
					</div>
				</div>

				{/* Timeline on the right */}
                <div className="relative w-full sm:flex-1 mt-10 sm:mt-0">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600 rounded-full z-0" />

                    <div className="flex flex-col gap-3">
                        {aboutMe.slice(1).map((bio, index) => (
                            <motion.div
                                key={bio.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="relative pl-12"
                            >
                                <span className="absolute left-4 top-[1.05rem] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white dark:border-gray-800 shadow-sm z-10" />

                                <p className="text-ternary-dark dark:text-ternary-light text-base md:text-lg bg-white/10 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-sm leading-relaxed">
                                    {bio.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
			</div>
		</div>
	);
}

export default AboutMeBio;
