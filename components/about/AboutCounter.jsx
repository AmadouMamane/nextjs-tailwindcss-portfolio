import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';

function AboutCounter() {
  useCountUp({ ref: 'experienceCounter', end: 9, duration: 2 });
  useCountUp({ ref: 'projectsRealizedCounter', end: 50, duration: 2 });
  useCountUp({ ref: 'feedbackCounter', end: 94, duration: 2 });
  useCountUp({ ref: 'projectsCounter', end: 83, duration: 2 });

  return (
    <div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm w-full">
      {/* inner container for centering */}
      <div className="max-w-7xl mx-auto px-16 py-20 flex flex-col sm:flex-row justify-between items-center gap-10 font-general-medium">
        <CounterItem
          title="Years of experience"
          counter={<span id="experienceCounter" />}
          measurement=""
        />
        <CounterItem
          title="Projects realized"
          counter={<span id="projectsRealizedCounter" />}
          measurement="+"
        />
        <CounterItem
          title="Positive feedback"
          counter={<span id="feedbackCounter" />}
          measurement="%"
        />
        <CounterItem
          title="Projects completed"
          counter={<span id="projectsCounter" />}
          measurement="%"
        />
      </div>
    </div>
  );
}

export default AboutCounter;
