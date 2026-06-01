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
		title: '🏛️ Tessera — EU Banking Support Agent',
		url: 'tessera',
		category: 'AI Engineering',
		secondaryCategory: 'Agent Safety',
		relatedTags: ['Machine Learning', 'Deep Learning'],
		img: '/images/projects/tessera/cover.svg',
		cardImg: '/images/projects/tessera/card.svg?v=5',
		heroImg: '/images/projects/tessera/cover.svg',
		type: 'tessera',
		cardTitle: 'Tessera',
		cardIcon: 'shield',
		cardAccent: 'indigo',
		cardSummary: 'A guarded agentic AI system for regulated banking support',
		cardHighlights: ['AI Engineering', 'LangGraph', 'Guardrails', 'Audit'],
		tagline: 'Guarded EU banking support agent with policy checks, evals, audit trail and FR / DE / EN grounding',
		links: {
			github: 'https://github.com/AmadouMamane/tessera',
			design: 'https://github.com/AmadouMamane/tessera/blob/main/docs/design.md',
			safety: 'https://github.com/AmadouMamane/tessera/blob/main/docs/safety.md',
			demo: 'https://shared-ide-named-flower.trycloudflare.com',
			systemUi: 'https://shared-ide-named-flower.trycloudflare.com',
			video: '',
		},
		ProjectHeader: {
			title: '🏛️ Tessera — Multilingual EU Banking Support Agent',
			publishDate: 'May 2026',
			tags: 'Work in Progress · LangGraph · Agent Safety',
		},
		ProjectImages: [
			{
				id: uuidv4(),
				title: 'System architecture — LangGraph orchestration, guard layer, dual LLM paths',
				img: '/images/projects/tessera/architecture.svg',
			},
			{
				id: uuidv4(),
				title: 'Non-regression eval flow — 40 failure cases gating CI',
				img: '/images/projects/tessera/eval-flow.svg',
			},
		],

	},
	{
		id: 2,
		title: '🧬 AI Skin Cancer Detection Challenge',
		url: 'isic-skin-cancer-detection',
		category: 'Data Science',
		img: '/images/kaggle-isic-2024.png',
		type: 'notebook',
		cardTitle: 'AI Skin Cancer Detection Challenge',
		cardLogo: '🧬',
		cardAccent: 'rose',
		cardSummary: 'Detects skin cancer from 3D total-body images with a high-sensitivity model',
		cardHighlights: ['TensorFlow', 'CNN', 'pAUC', 'Medical AI'],
		Notebook: {
			file: '/notebooks/isic-2024_kaggle.html',
		},
		ProjectHeader: {
			title: '🧬 AI Skin Cancer Detection Challenge - ISIC 2024',
			publishDate: 'March 24, 2025',
			tags: 'Deep Learning',
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
				img: '/images/kaggle-isic-2024.png',
			},
			{
				id: uuidv4(),
				title: 'Skin Cancer Detection',
				img: '/images/mobile-project-2.jpg',
			},
		],
		ProjectInfo: {
			Overview:
				'In this competition, I developed a deep learning model to detect histologically confirmed skin cancer from smartphone-quality lesion images captured from 3D total body photography. The goal was to create a binary classification system capable of identifying malignant vs. benign lesions, even in low-resource or non-clinical settings where specialized dermatologic care is unavailable.',
			'Challenge Highlights': [
				{
					id: uuidv4(),
					title: '📅 Duration',
					details: 'Jun 27 – Sep 7, 2024',
				},
				{
					id: uuidv4(),
					title: '🌍 Dataset',
					details:
						'3D total body photos from thousands of patients across 3 continents',
				},
				{
					id: uuidv4(),
					title: '🧠 Task',
					details: 'Binary classification of malignant vs. benign skin lesions',
				},
				{
					id: uuidv4(),
					title: '🛠️ Images',
					details:
						'Resemble close-up smartphone photos, simulating telehealth scenarios',
				},
				{
					id: uuidv4(),
					title: '📈 Metric',
					details:
						'Partial AUC (pAUC) above 80% TPR, prioritizing high-sensitivity performance for early diagnosis',
				},
			],
			'Key Impact':
				'The model supports early detection and triage for skin cancer, with potential real-world use in primary care and underserved communities. By working with realistic, lower-resolution images, the system is designed to extend AI-driven diagnostic support beyond traditional clinical environments.',
			Goal: 'Improve early detection of skin cancers like melanoma, basal cell carcinoma, and squamous cell carcinoma through AI—especially in settings lacking access to dermatologists or dermatoscopic equipment.',

			'Tools & Technologies': [
				'TensorFlow',
				'Pandas',
				'Python',
				'Matplotlib',
				'GPU',
				'TPU',
			],
			ProjectDetails: [
				{
					id: uuidv4(),
					details: 'Lorem ipsum dolor, sit amet conse.',
				},
			],
			SocialSharingHeading: 'Share This',
		},
	},
	{
		id: 3,
		title: '🎵 Music Recommendation System',
		url: 'music-recommendation',
		category: 'Data Science',
		img: '/images/music-recommendation.webp',
		type: 'notebook',
		cardTitle: 'Music Recommendation System',
		cardIcon: 'music',
		cardAccent: 'blue',
		cardSummary: 'Ranks songs from listening behavior to generate personalized recommendations',
		cardHighlights: ['Surprise', 'Scikit-learn', 'LightFM', 'Ranking'],
		ProjectHeader: {
			title: '🎵 AI-Powered Music Recommendation System',
			publishDate: 'June 30, 2024',
			tags: 'Machine Learning',
		},
		ProjectImages: [
			{
				id: uuidv4(),
				title: 'Music Recommendation System',
				img: '/images/music-recommendation.webp',
			},
			{
				id: uuidv4(),
				title: 'Algorithm Training',
				img: '/images/music-recommendation.jpg',
			},
		],
		Notebook: {
			file: '/notebooks/music-recommendation.html',
		},
		ProjectTabs: [
			'Context',
			'Goal',
			'Key Questions',
			'Data Dictionary',
			'Problem Formulation',
			'Tools & Technologies',
			'Implementation',
		],
		ProjectInfo: {
			Context: `Nowadays, we are overwhelmed by information, making it increasingly challenging to select high-quality content from vast amounts of available data. 
Companies recognize this issue and have developed sophisticated techniques to assist users in finding the most relevant content, thereby enhancing user experience on their platforms.


Spotify is an excellent example; it has become a leader in the music streaming industry, largely thanks to its advanced recommendation systems, enabling users to discover content tailored to their preferences. Therefore, recommendation systems are critical not only for enhancing user satisfaction but also for increasing user engagement and driving business success.

This AI-powered music recommendation system leverages collaborative filtering and machine learning to suggest personalized playlists based on user behavior.`,

			Goal: `The objective of this project is to develop a recommendation system capable of suggesting the top 10 songs most likely to be enjoyed by each user. 
				    This system will dynamically learn and adapt to user preferences, continuously refining its recommendations. 
					Ultimately, this approach aims to enhance user engagement on music platforms by providing personalized, high-quality, and AI-powered song recommendations.`,

			'Key Questions': `Throughout this project, we will explore and resolve the following essential questions:  
- What specific methodologies and modeling techniques are most effective for building this recommendation system?  
- Do we possess adequate data to develop a robust recommendation solution?  
- Is the dataset sufficiently comprehensive to yield accurate and meaningful recommendations?  
- What metrics should guide the evaluation of our recommendation system? Metrics such as precision, recall, F1-score, interpretability, responsiveness, and ethical considerations are particularly important.  
- How reliable and stable will our recommendation models be when deployed in real-world, production environments?  
- What additional refinements or future strategies should be implemented to further enhance the recommendation system?`,

			'Data Dictionary': `Our primary dataset is the Taste Profile Subset, released by Echo Nest as part of the Million Song Dataset. It consists of two files:
- Songs data:
	- song_id: Unique identifier for each song
	- title: Song title
	- release: Name of the album
	- artist_name: Artist’s name
	- year: Year of the song's release
- Play counts data
	- user _id: A unique id given to the user
	- song_id: A unique id given to the song
	- play_cont: Number of times the song was played
- Data source
	- http://millionsongdataset.com/ 
	`,

			'Problem Formulation': `Given the available song and play-count data, our task is to predict each user's likelihood of enjoying specific songs. To measure user preference, we will use predicted ratings. Songs with ratings above a defined threshold will be recommended. Ultimately, we aim to generate a ranked list of the top K songs for each user.
We plan to experiment with various recommendation approaches, including:
- Knowledge/Rank-Based Recommendations
- Similarity-Based Recommendations:
	- Clustering-based recommendations
	- User-user collaborative filtering
	- Item-item collaborative filtering
- Matrix Factorization-Based Collaborative Filtering
- Content-Based Recommendations"`,
			'Tools & Technologies': [
				'Python',
				'Pandas',
				'Surprise',
				'Scikit-learn',
				'LightFM',
			],
		},
	},
];
