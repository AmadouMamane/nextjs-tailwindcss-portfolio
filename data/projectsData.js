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
		category: 'Generative AI',
		secondaryCategory: 'Software Engineering',
		img: '/images/projects/tessera/cover.svg',
		heroImg: '/images/projects/tessera/cover.svg',
		type: 'tessera',
		tagline:
			'A production-shaped LLM agent for European retail banking — guarded, audited, and validated across 40 documented failure modes in French, German, and English.',
		links: {
			github: 'https://github.com/AmadouMamane/tessera',
			design: 'https://github.com/AmadouMamane/tessera/blob/main/docs/design.md',
			safety: 'https://github.com/AmadouMamane/tessera/blob/main/docs/safety.md',
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
		ProjectTabs: [
			'Overview',
			'Problem',
			'Architecture',
			'Safety & Evaluation',
			'Stack',
			'Roadmap',
		],
		ProjectInfo: {
			Overview: `**Tessera** is my flagship open-source project: a reference implementation of a **production-shaped LLM agent** for European retail banking customer support in **French, German, and English**.

> Tessera is neither a new firewall, nor a new test framework, nor a new safety methodology. It is a complete assembly of four quality layers — runtime guard, offline regression harness, structured audit trail, and human-in-the-loop escalation — wired end to end for one regulated use case.

The agent serves a fictional retail bank (**Crédit Aurore**) and grounds answers in public EU regulatory corpora: **DORA, CNIL, BaFin, and GDPR**. The contribution is the **assembly and EU business semantics**, not reinventing infrastructure.

**What makes it different from a chatbot demo:** every sensitive tool call is guarded, every guard decision is audited, and ~40 real-world failure modes are machine-checked in CI — with passing *and* failing tests documented openly in the README.`,

			Problem: `Banking and regulated industries need more than a conversational UI. They need systems that can be **operated, audited, and regression-tested** like any other production service.

Most agent demos fail on at least one of these:

| Gap | What Tessera does |
| --- | --- |
| Unguarded tool calls | \`mcp-firewall\` + YAML policy on every invocation |
| No replay evidence | Structured audit trail (JSON) with rule, rationale, redactions |
| "We tested it manually" | 40 JSON failure cases, three languages, CI-gated |
| English-only compliance | Cross-lingual RAG over FR / DE / EN regulatory corpora |
| Cloud-only or local-only | Same agent on Vertex AI + Cloud Run *and* Ollama 70B on Apple Silicon |

Tessera is the answer I would show a hiring manager, a compliance reviewer, or a technical lead who asks: *"How would you actually ship this?"*`,

			Architecture: `The agent graph is orchestrated with **LangGraph**:

\`\`\`
router → planner → parallel workers → reviewer → reporter / escalation
\`\`\`

**Workers** (orchestration nodes): \`product_lookup\`, \`regulation_lookup\`, \`account_lookup\`, \`simulator\`, \`escalation\`.

**Tools** (LLM-callable): \`account_balance\`, \`card_block\`, \`transaction_search\`, \`loan_simulate\`, \`ticket_escalate\` — each passes through the guard adapter before execution.

**Retrieval layer:** PostgreSQL + **pgvector** hybrid search. Cross-lingual regulation search lets a French question match a German BaFin chunk.

**HTTP API:** FastAPI with streaming \`/chat\` (SSE) and read-only \`/audit\`.

**Dashboard:** Next.js app — chat, audit trail viewer, eval scorecard, health dashboard.

![System architecture — LangGraph orchestration, guard layer, dual LLM paths](/images/projects/tessera/architecture.svg)`,

			'Safety & Evaluation': `Safety is **layered**, not bolted on after the fact.

**Runtime guard** — [\`mcp-firewall\`](https://github.com/ressl/mcp-firewall) as a pinned dependency. Pre-flight allow/deny/transform, per-argument validation, PII redaction, post-flight audit emission via \`policy.yaml\`.

**Reviewer node** — deterministic confidence from grounding score, plan coverage, and guard signals. Low confidence → escalation, not silent guessing.

**Audit trail** — versioned JSON envelope (\`tessera.guard.audit\`) with target, outcome, redacted arguments, and per-decision rationale. Sinks: stdout, file, Cloud Logging.

**Non-regression harness** — failure catalogue under \`eval/failures/\`:

- Prompt injection (direct, obfuscated, multilingual)
- PII exfiltration and correlation attacks
- Hallucination (products, rates, laws)
- Overconfidence on high-stakes actions
- Citation fabrication (CJUE, CNIL, DORA)
- Tool misuse (block without auth, third-party balance)
- Policy violations, regulatory misstatements, language mixing, escalation failure

![Non-regression eval flow — 40 failure cases gating CI](/images/projects/tessera/eval-flow.svg)

The README lists **tests that pass and tests that fail**, with root causes. No zombie green checks.`,

			Stack: `**Core:** Python 3.12 · \`uv\` · LangGraph · FastAPI · PostgreSQL + pgvector

**Quality:** \`ruff\` · \`mypy --strict\` · \`pytest\` · pre-commit hooks

**LLM paths:** Vertex AI (frontier, Cloud Run) · Llama 3.3 70B via Ollama (on-prem Apple Silicon)

**Guard & ops:** mcp-firewall · structured audit · Cloud Logging · Terraform

**Frontend & CI:** Next.js dashboard · GitHub Actions (ci, eval, deploy, security)`,

			Roadmap: `**Shipped**

- LangGraph agent with FR / DE / EN prompts in YAML
- Guard adapter + audit trail + policy YAML
- ~40-case eval harness with JSON schema validation
- Next.js dashboard (chat, audit, eval, health)
- Terraform scaffold for Cloud Run + Cloud SQL
- Dual LLM path (frontier + on-prem)

**In progress (documented honestly)**

- Public Cloud Run demo URL
- Upstream PR on \`mcp-firewall\` (positioning commitment)
- German escalation calibration (reviewer confidence prior tuned on FR)
- BaFin corpus depth vs FR/CNIL for fact-grounding eval cases

**Links**

- [GitHub repository](https://github.com/AmadouMamane/tessera)
- [Differentiation doc](https://github.com/AmadouMamane/tessera/blob/main/docs/differentiation.md) — honest positioning vs inspirations
- [Threat model](https://github.com/AmadouMamane/tessera/blob/main/docs/threat-model.md)`,
		},
	},
	{
		id: 2,
		title: '🧬 AI Skin Cancer Detection Challenge',
		url: 'isic-skin-cancer-detection',
		category: 'Data Science',
		img: '/images/kaggle-isic-2024.png',
		type: 'notebook',
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
	{
		id: 4,
		title: '💡 Building Autonomous Agentic AI',
		url: 'building-agentic-ai',
		category: 'Generative AI',
		img: '/images/projects/ai-agents/agentic-ai.jpg',
		type: 'notebook',
		Notebook: {
			file: '',
		},
		ProjectHeader: {
			title: '💡 Building Agentic AI - Towards Autonomous and Goal-Directed Systems',
			publishDate: 'April 06, 2025',
			tags: '❗🛠️ Work in Progress,  Deep Learning',
		},
		ProjectImages: [
			{
				id: uuidv4(),
				title: 'Building Agentic AI Systems',
				img: '/images/projects/ai-agents/agentic-ai.jpg',
			},
		],
		ProjectInfo: {
			Overview: `❗🛠️ 📝  Work in Progress

I'm currently writing up something I think you’ll love. Thanks for your patience — it’ll be live shortly!`,
			Goal: '',

			'Tools & Technologies': [],
			ProjectDetails: [
				{
					id: uuidv4(),
					details: 'Lorem ipsum dolor, sit amet conse.',
				},
			],
			SocialSharingHeading: 'Share This',
		},
	},
];
