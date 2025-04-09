// pages/about.js

import { motion } from 'framer-motion';
import AboutClients from '../components/about/AboutClients';
import AboutCounter from '../components/about/AboutCounter';
import AboutMeBio from '../components/about/AboutMeBio';
import PagesMetaHead from '../components/PagesMetaHead';
import Container from '../components/layout/Container';

function About() {
  return (
    <div>
      <PagesMetaHead title="About Me" />

      {/* Bio section in container */}
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, delay: 1 }}
          exit={{ opacity: 0 }}
        >
          <AboutMeBio />
        </motion.div>
      </Container>

      {/* Full-width counter (not wrapped in Container) */}
	  <Container fullWidth>
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			exit={{ opacity: 0 }}
		>
			<AboutCounter />
		</motion.div>

	  </Container>


      {/* Clients section in container */}
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, delay: 1 }}
          exit={{ opacity: 0 }}
        >
          <AboutClients />
        </motion.div>
      </Container>
    </div>
  );
}

export default About;
