import Image from 'next/image';
import { FiClock, FiTag } from 'react-icons/fi';
import PagesMetaHead from '../../components/PagesMetaHead';
import { projectsData } from '../../data/projectsData';
import RelatedProjects from '../../components/projects/RelatedProjects';
import { useState } from 'react';

function ProjectSingle(props) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="container mx-auto">
      <PagesMetaHead title={props.project.title} />

      {/* Header */}
      <div>
        <p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
          {props.project.ProjectHeader.title}
        </p>
        <div className="flex">
          <div className="flex items-center mr-10">
            <FiClock className="text-xl text-ternary-dark dark:text-ternary-light" />
            <span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
              {props.project.ProjectHeader.publishDate}
            </span>
          </div>
          <div className="flex items-center">
            <FiTag className="w-4 h-4 text-ternary-dark dark:text-ternary-light" />
            <span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
              {props.project.ProjectHeader.tags}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-10 border-b border-gray-300 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {['Overview', 'Key Impact', 'Challenge Highlights', 'Goal', 'Tools & Technologies', 'Implementation'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 font-medium rounded-t-lg transition ${
                activeTab === tab
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="mt-6">
        {activeTab === 'Overview' && (
          <div>
            <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-4">
              {props.project.ProjectInfo.OverviewHeading}
            </p>
            <p className="text-ternary-dark dark:text-ternary-light">
              {props.project.ProjectInfo.OverviewDetails}
            </p>
          </div>
        )}

        {activeTab === 'Key Impact' && (
          <div>
            <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-4">
              {props.project.ProjectInfo.KeyImpactHeading}
            </p>
            <p className="text-ternary-dark dark:text-ternary-light">
              {props.project.ProjectInfo.KeyImpactDetails}
            </p>
          </div>
        )}

        {activeTab === 'Challenge Highlights' && (
          <div>
            <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-4">
              {props.project.ProjectInfo.ChallengeHighlightsHeading}
            </p>
            <ul className="list-disc list-inside space-y-2 text-ternary-dark dark:text-ternary-light">
              {props.project.ProjectInfo.ChallengeHighlightsInfo.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>: {item.details}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'Goal' && (
          <div>
            <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-4">
              {props.project.ProjectInfo.GoalHeading}
            </p>
            <p className="text-ternary-dark dark:text-ternary-light">
              {props.project.ProjectInfo.GoalDetails}
            </p>
          </div>
        )}

        {activeTab === 'Tools & Technologies' && (
          <div>
            <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-4">
              {props.project.ProjectInfo.Technologies[0].title}
            </p>
            <p className="text-ternary-dark dark:text-ternary-light">
              {props.project.ProjectInfo.Technologies[0].techs.join(', ')}
            </p>
          </div>
        )}

        {activeTab === 'Implementation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-4">
                📓 Notebook: Skin Cancer Detection
              </p>
              <iframe
                src="https://nbviewer.org/url/raw.githubusercontent.com/AmadouMamane/skin_cancer_detection/main/notebooks/isic-2024_kaggle.ipynb"
                title="ISIC 2024 Notebook"
                width="100%"
                height="1200"
                frameBorder="0"
                className="rounded-xl shadow-lg"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              ></iframe>
            </div>
            <div className="lg:col-span-1">
              <p className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-4">
                Table of Contents
              </p>
              <ul className="space-y-2 text-base text-ternary-dark dark:text-ternary-light">
                <li>1. Introduction</li>
                <li>2. Data Preparation</li>
                <li>3. Model Architecture</li>
                <li>4. Training Loop</li>
                <li>5. Evaluation</li>
                <li>6. Results</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <RelatedProjects />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: {
      project: projectsData.filter((project) => project.id === parseInt(id))[0],
    },
  };
}

export default ProjectSingle;
