import { v4 as uuidv4 } from 'uuid';
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
	FiYoutube,
} from 'react-icons/fi';

export const projectsData = [
	{
		id: 1,
		title: '🧬 AI Skin Cancer Detection',
		url: 'google-health-platform',
		category: 'Data Science',
		img: '/images/web-project-2.jpg',
		ProjectHeader: {
			title: '🧬 AI Skin Cancer Detection Challenge (ISIC 2024)',
			publishDate: 'March 24, 2025',
			tags: 'Data Science',
		},
		ProjectImages: [
			{
				id: uuidv4(),
				title: 'Skin Cancer Detection',
				img: '/images/ui-project-1.jpg',
			},
			{
				id: uuidv4(),
				title: 'Skin Cancer Detection',
				img: '/images/web-project-2.jpg',
			},
			{
				id: uuidv4(),
				title: 'Skin Cancer Detection',
				img: '/images/mobile-project-2.jpg',
			},
		],
		ProjectInfo: {
			OverviewHeading: 'Overview',
			OverviewDetails : "In this competition, I developed a deep learning model to detect histologically confirmed skin cancer from smartphone-quality lesion images captured from 3D total body photography. The goal was to create a binary classification system capable of identifying malignant vs. benign lesions, even in low-resource or non-clinical settings where specialized dermatologic care is unavailable.",
			ChallengeHighlightsHeading: 'Challenge Highlights',
			ChallengeHighlightsInfo: [
				{
					id: uuidv4(),
					title: '📅 Duration',
					details: 'Jun 27 – Sep 7, 2024',
				},
				{
					id: uuidv4(),
					title: '🌍 Dataset',
					details: '3D total body photos from thousands of patients across 3 continents',
				},
				{
					id: uuidv4(),
					title: '🧠 Task',
					details: 'Binary classification of malignant vs. benign skin lesions',
				},
				{
					id: uuidv4(),
					title: '🛠️ Images',
					details: 'Resemble close-up smartphone photos, simulating telehealth scenarios',
				},
				{
					id: uuidv4(),
					title: '📈 Metric',
					details: 'Partial AUC (pAUC) above 80% TPR, prioritizing high-sensitivity performance for early diagnosis',
				},
			],
			KeyImpactHeading: 'Key Impact',
			KeyImpactDetails:
				'The model supports early detection and triage for skin cancer, with potential real-world use in primary care and underserved communities. By working with realistic, lower-resolution images, the system is designed to extend AI-driven diagnostic support beyond traditional clinical environments.',
			GoalHeading: 'Goal',
			GoalDetails:
				'Improve early detection of skin cancers like melanoma, basal cell carcinoma, and squamous cell carcinoma through AI—especially in settings lacking access to dermatologists or dermatoscopic equipment.',
			
			Technologies: [
				{
					title: 'Tools & Technologies',
					techs: [
						'TensorFlow',
						'Pandas',
						'Python',
						'Matplotlib',
						'GPU',
						'TPU',
					],
				},
			],
			ProjectDetailsHeading: 'Implementation',
			ProjectDetails: [
				{
					id: uuidv4(),
					details:
						'Lorem ipsum dolor, sit amet conse.',
				},
			],
			SocialSharingHeading: 'Share This',
			// SocialSharing: [
			// 	{
			// 		id: uuidv4(),
			// 		name: 'Twitter',
			// 		icon: <FiTwitter />,
			// 		url: 'https://twitter.com/realstoman',
			// 	},
			// 	{
			// 		id: uuidv4(),
			// 		name: 'Instagram',
			// 		icon: <FiInstagram />,
			// 		url: 'https://instagram.com/realstoman',
			// 	},
			// 	{
			// 		id: uuidv4(),
			// 		name: 'Facebook',
			// 		icon: <FiFacebook />,
			// 		url: 'https://facebook.com/',
			// 	},
			// 	{
			// 		id: uuidv4(),
			// 		name: 'LinkedIn',
			// 		icon: <FiLinkedin />,
			// 		url: 'https://linkedin.com/',
			// 	},
			// 	{
			// 		id: uuidv4(),
			// 		name: 'Youtube',
			// 		icon: <FiYoutube />,
			// 		url: 'https://www.youtube.com/c/StomanStudio',
			// 	},
			// ],
		},
	}
];
