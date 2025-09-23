// Utility function to create URL-friendly slugs
export const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export const getFeaturedProjects = () => {
  return sampleProjects.filter((project) => project.featured)
}

export const sampleProjects = [
  {
    id: 'P-01',
    featured: true,
    featuredCanvas: '/projects/susan-feat.webp',
    name: 'Susan-AI',
    slug: 'susan-ai',
    type: 'Web Development',
    date: '2025-02-01', // from "Feb 2025 - aprox 3 weeks"
    description:
      'ChatGPT-inspired assistant powered by Gemini Flash 2.0. I built it as an AI alternative for times when I ran out of free ChatGPT calls—and because I wanted to create something AI-driven myself. Users can sign up, create an account, and chat, ask questions, or even generate code. Responses are rendered in markdown with built-in syntax highlighting for a clean, readable experience.',
    techStack: {
      frontend: ['React', 'Vite', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Framer Motion'],
      backend: ['Appwrite (Auth, Database)', 'Node.js', 'Gemini API'],
      tools: ['Vercel', 'GitHub', 'VS Code'],
    },
    features: [
      'AI-Powered Chat',
      'User Authentication',
      'Code Generation',
      'Syntax Higlighting',
      'Gemini Integration',
      'Responsive Design',
    ],
    liveUrl: 'https://susan-ai-one.vercel.app/',
    githubUrl: 'https://github.com/anthonynuge/susan-ai',
    cover: '/projects/bd-1.webp', // image empty, using gif as cover
    demos: [
      { url: '/projects/susan-mock.webp' },
      { url: '/projects/susan-demo.webm', overlay: true, video: true },
      { url: '/projects/susan-3.webp', overlay: true },
      { url: '/projects/susan-closeup.webp' },
    ],
  },

  {
    id: 'P-02',
    // featured: true,
    name: 'Portfolio Website',
    slug: 'portfolio-website',
    type: 'Web Development',
    date: '2025-02-01', // from "Feb 2025 - aprox 2 weeks"
    description:
      "You're looking at it right now! This site is a collection of my projects and accomplishments so far in my coding journey. I'm not a UI/UX expert or a designer, but I’ve built this with things I find cool, in a way that I think looks cool. As I grow as a developer, this site will keep evolving with me.",
    techStack: {
      frontend: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Framer Motion'],
      backend: ['Node.js', 'Express'],
      tools: ['Vercel', 'GitHub', 'VS Code'],
    },
    features: [
      'Personal Branding',
      'Interactive UI/UX',
      'Performance Optimization',
      'Responsive Design',
    ],

    liveUrl: 'https://www.avqn.dev/',
    githubUrl: 'https://github.com/anthonynuge/avqn-dev-v2',
    content:
      "You're looking at it right now! This site is a collection of my projects and accomplishments so far in my coding journey. I'm not a UI/UX expert or a designer, but I’ve built this with things I find cool, in a way that I think looks cool. As I grow as a developer, this site will keep evolving with me.",
    cover: '/projects/bd-2.webp', // image empty, using gif as cover
    demos: [
      { url: '/projects/portfolio-demo.webm', overlay: true, video: true },
      { url: '/projects/portfolio-1.webp' },
    ],
  },

  {
    id: 'P-03',
    name: 'Fruit Vision',
    slug: 'fruit-vision',
    type: 'Machine Learning',
    date: '2024-11-01', // from "Nov 2024 - Dec 2024"
    cover: '/projects/bd-3.webp',
    description:
      'Commissioned project using python and machine learning. The client wanted a standalone app where they could input images of fruits and have the model classify what type it is with confidence reports. Each image is vectorized into numerical data and a convulational neural net was then applied to learn patterns and make predictions. Although Fruit Vision was made to classify fruit the model can be trained to classify any image if loaded with enough training data.',
    // 'Is that a kiwi or apple? Neural net trained to identify different fruits from images.',
    techStack: {
      frontend: ['Tkinter', 'Matplotlib'],
      backend: ['Python', 'TensorFlow', 'Scikit-Learn', 'Numpy'],
      tools: ['Jupyter Notebook', 'VS Code', 'GitHub'],
    },
    features: [
      'Image Classification',
      'Data Augmentation & Processing',
      'GUI w/ Batch Processing',
      'Model Training & Evaluation',
    ],
    demos: [
      { url: '/projects/fruit-1.webp', overlay: true },
      { url: '/projects/fruit-demo.webm', overlay: true, video: true },
      { url: '/projects/fruit-2.webp', overlay: true },
      { url: '/projects/fruit-3.webp', overlay: true },
      { url: '/projects/bd-1.webp' },
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/anthonynuge/Fruit-Identification-CNN',
    content:
      'Commissioned project using python and machine learning. The client wanted a standalone app where they could input images of fruits and have the model classify what type it is with confidence reports. Each image is vectorized into numerical data and a convulational neural net was then applied to learn patterns and make predictions. Although Fruit Vision was made to classify fruit the model can be trained to classify any image if loaded with enough training data.',
  },
  {
    id: 'P-04',
    name: 'Maze Solver',
    slug: 'maze-solver',
    type: 'Desktop Application',
    date: '2024-12-01', // approx. from "winter break" (adjust if needed)
    cover: '/projects/bd-4.webp',
    description:
      'I built Maze Solver during winter break after studying DSA to better visualize how different pathfinding algorithms traverse a grid. Got tired of constantly drawing mazes so I implemented a maze generator. Built entirely in Java, with Swing for the frontend, this project deepened my understanding of algorithmic problem-solving while creating an interactive learning tool.',
    // 'Built in Java, this maze solver app was created to help vizualize different pathfining algorithms',
    techStack: {
      frontend: ['Java Swing', 'JavaFX', 'Java AWT'],
      backend: ['Java'],
      tools: ['IntelliJ IDEA', 'Maven', 'GitHub'],
    },
    features: ['GUI Application', 'Algorithm Visualization', 'Interactive UI'],
    demos: [{ url: '/projects/maze-demo.webm', overlay: true, video: true }],
    liveUrl: '',
    githubUrl: 'https://github.com/anthonynuge/pathfinding_visualization',
    content:
      'I built Maze Solver during winter break after studying DSA to better visualize how different pathfinding algorithms traverse a grid. Got tired of constantly drawing mazes so I implemented a maze generator. Built entirely in Java, with Swing for the frontend, this project deepened my understanding of algorithmic problem-solving while creating an interactive learning tool.',
  },

  {
    id: 'P-05',
    name: 'Fake News Or Nah',
    slug: 'fake-news-or-nah',
    type: 'Machine Learning',
    date: '2024-03-01', // from "Mar 2024 - May 2024"
    cover: '/projects/bd-5.webp',
    description: 'LLM trained to analyze text and determine whether it is fake or real news.',
    techStack: {
      frontend: ['Tkinter', 'Matplotlib', 'Seaborn'],
      backend: ['Python', 'Scikit-Learn', 'Numpy'],
      tools: ['Jupyter Notebook', 'VS Code', 'GitHub'],
    },
    features: [
      'Proposal & Budgeting',
      'Data processing & NLP',
      'Trend Analyis & Visulaization',
      'Model Training & Evaluation',
    ],
    demos: [
      { url: '/projects/fake-news-demo.webm', overlay: true, video: true },
      { url: '/projects/fake-news-1.webp', overlay: true },
      { url: '/projects/fake-news-2.webp', overlay: true },
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/anthonynuge/fake-news-detection-app',
    content:
      "A concerning issue in today's digital society is the rampant spread of misinformation online. I decided to tackle this issue for my capstone. Using machine learning and natural language processing I trained a model to analyze different news articles for fake news.",
  },

  {
    id: 'P-06',
    name: 'E-commerce Dashboard',
    slug: 'e-commerce-dashboard',
    type: 'Full Stack',
    date: '2024-01-01', // date not specified; set a placeholder if you prefer
    description:
      'A modern e-commerce platform with secure payment integration. Proof of concept project.',
    techStack: {
      frontend: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Redux', 'HTML, CSS', 'Recharts'],
      backend: ['Node.js', 'Express', 'PostgreSQL'],
      tools: ['VS Code', 'GitHub', 'Postman'],
    },
    features: [
      'Product Management',
      'User Authentication',
      'Payment Integration',
      'Analytics & Reporting',
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/anthonynuge/inventory-management',
    content:
      'I built this e-commerce dashboard to make managing an online store smoother and more intuitive. Instead of juggling spreadsheets and scattered data, this dashboard brings sales, inventory, and customer insights into one place. It features real-time analytics, order tracking, and dynamic visualizations to help store owners make better decisions.',
    cover: '/projects/bd-1.webp',
    demos: [
      { url: '/projects/ecommerce-1.webp', overlay: true },
      { url: '/projects/ecommerce-demo.webm', overlay: true, video: true },
      { url: '/projects/ecommerce-2.webp', overlay: true },
    ],
  },

  {
    id: 'EXP-10-25',
    featured: true,
    featuredCanvas: '/projects/midnite.webp',
    name: 'Midnite Agency', // company
    slug: 'midnite-agency',
    type: 'Work Experience',
    role: 'Frontend Developer & Site Maintainer',
    date: '2025-07-01', // start (ISO)
    endDate: null, // Present
    description:
      'Midnite Agency, a Houston-based creative marketing firm, hired me to design and develop a custom site that communicates their service offerings with visual flair and technical polish. I delivered a scalable, performant website with integrated 3D visuals, animated UI, and automated email handling — all built with modern frontend tooling.',
    techStack: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      backend: [],
      tools: ['Vercel'],
    },
    features: [
      'Responsive Next.js + Tailwind Frontend',
      'Framer Motion & Three.js Interactions',
      'Automated Lead & Form Emails',
      'SEO, Performance & Accessibility',
      'Vercel Deploy (Domain & DNS)',
    ],
    liveUrl: 'https://www.midnite-agency.com',
    githubUrl: '',
    cover: '/projects/bd-1.webp',
    demos: [
      { url: '/projects/midnite.webp', overlay: true },
      { url: '/projects/midnite-mock.webp' },
    ],
  },
  {
    id: 'E-02',
    featured: true,
    featuredCanvas: '/projects/ngx-feat.webp',
    name: 'National Grid X',
    slug: 'national-grid-x',
    type: 'Work Experience',
    role: 'Frontend Developer & Site Maintainer',
    date: '2025-03-01', // from "March 2025"
    endDate: null, // Present
    description:
      'National Grid X is a commercial energy brokerage firm that helps businesses procure energy plans tailored to their usage. I built and deployed their website from scratch and continue to provide maintenance and feature updates. The site serves as the company’s digital presence, streamlining lead generation and building client trust.',
    techStack: {
      frontend: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      backend: ['PostgreSQL', 'Supabase', 'Node.js'],
      tools: ['Vercel', 'DNS'],
    },
    features: [
      'Responsive Next.js Frontend',
      'Post-Launch Maintenance & Optimization',
      'End-to-End Deployment (Domain, DNS, Vercel)',
      'Stakeholder Collaboration & Rapid Iteration',
    ],
    liveUrl: 'https://www.nationalgridx.com/',
    githubUrl: '',
    cover: '/projects/bd-2.webp',
    demos: [
      { url: '/projects/ngx-mock.webp' },
      { url: '/projects/ngx-mobile.webp' },
      { url: '/projects/ngx-3.webp' },
    ],
  },
  // Add to experiences.js
  {
    id: 'E-03',
    name: 'Aesyn',
    slug: 'aesyn',
    type: 'Work Experience',
    role: 'Software Developer Intern',
    date: '2024-07-01', // from "July 2024"
    endDate: '2025-01-31', // from "Jan 2025" (end of month)
    description:
      'Aesyn is an Austin-based platform that simplifies social media marketing for businesses. Influencers can offer services while businesses are matched to the right partners. I built analytics features and contributed across the stack, supporting real-time insights, payments, and campaign tracking.',
    techStack: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      backend: ['Node.js', 'MongoDB', 'Express'],
      tools: ['Git', 'Jira', 'VS Code', 'Recharts', 'Postman'],
    },
    features: [
      'Centralized Influencer Metrics',
      'Recharts Visual Insights',
      'Git & Jira Collaboration',
      'Responsive, Accessible UI',
      'Bug Fixes & Performance',
    ],
    liveUrl: 'https://www.aesyn.us/',
    githubUrl: '',
    cover: '/projects/bd-3.webp',
    demos: [
      { url: '/projects/aesyn-1.webp' },
      { url: '/projects/aesyn-2.webp' },
      { url: '/projects/aesyn-3.webp', overlay: true },
    ],
  },
  {
    id: 'P-02',
    name: 'NGX Token',
    slug: 'ngx-token',
    type: 'Blockchain / Web3',
    date: '2025-01-01', // update if you have a specific launch date
    description:
      'ERC-20 utility token built with OpenZeppelin and Hardhat, paired with a Next.js dApp for minting, transfers, and role-gated admin actions. Focused on clean UX, security best practices, and gas-efficient contracts.',
    techStack: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      backend: ['Solidity', 'OpenZeppelin', 'Hardhat', 'Node.js'],
      tools: ['Ethers.js', 'WalletConnect', 'MetaMask', 'Vercel', 'GitHub'],
    },
    features: [
      'ERC-20 Token (OpenZeppelin)',
      'Access-Controlled Mint/Burn',
      'Gas-Optimized Solidity + Tests',
      'Next.js dApp (Ethers.js)',
      'WalletConnect & MetaMask Support',
    ],
    liveUrl: '', // optional: dApp/demo URL
    githubUrl: '', // optional: repo URL
    cover: '/projects/bd-4.webp', // update path/asset name
    demos: [
      { url: '/projects/ngx-token-mock.webp' },
      { url: '/projects/ngx-token-demo.webm', video: true, overlay: true },
      { url: '/projects/ngx-token-2.webp' },
    ],
  },
  {
    id: 'P-03',
    name: 'Tryal',
    slug: 'tryal',
    type: 'Web App / SaaS',
    date: '2025-06-01', // update to your launch/start date
    description:
      'Self-serve trials platform that lets SaaS teams spin up one-click trial links, track activation and conversion, and collect feedback in a clean, responsive dashboard.',
    techStack: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      backend: ['Node.js', 'PostgreSQL', 'Prisma', 'NextAuth'],
      tools: ['Vercel', 'Stripe', 'GitHub'],
    },
    features: [
      'One-Click Trial Links',
      'Activation & Conversion Analytics',
      'Stripe Billing & Upgrades',
      'Auth, Roles & Teams',
      'Responsive Dashboard UX',
    ],
    cover: '/projects/bd-5.webp',
    demos: [{ url: '/projects/tryal-mock.webp' }],
    liveUrl: '', // e.g. 'https://tryal.app'
    githubUrl: '', // e.g. 'https://github.com/you/tryal'
  },
  {
    id: 'P-10',
    name: 'Utility Buddys',
    slug: 'utility-buddys',
    type: 'Web App',
    date: '2025-07-01', // update to your start/launch date
    description:
      'Customer-facing site and dashboard for a utilities services brand. Visitors can discover plans, request quotes, and book service; admins manage leads, content, and updates in a simple backend.',
    techStack: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'MongoDB', 'NextAuth'],
      tools: ['Vercel', 'SendGrid', 'GitHub'],
    },
    features: [
      'Responsive Next.js + Tailwind UI',
      'Service Finder & Quote Flow',
      'Lead Capture & Email Automation',
      'Admin Dashboard (CRUD)',
      'SEO, Analytics & Performance',
    ],
    liveUrl: '', // e.g. 'https://utilitybuddys.com'
    githubUrl: '', // e.g. 'https://github.com/you/utility-buddys'
    cover: '/projects/bd-2.webp',
    demos: [{ url: '/projects/utility-buddy.webp', overlay: true }],
  },
]

export const initialFilters = {
  frontend: {
    React: false,
    Vite: false,
    TypeScript: false,
    JavaScript: false,
    'HTML, CSS': false,
    Tailwind: false,
    TailwindCSS: false,
    'Framer Motion': false,
    Tkinter: false,
    Matplotlib: false,
    Seaborn: false,
    'Java Swing': false,
    JavaFX: false,
    'Java AWT': false,
    'Next.js': false,
    Redux: false,
    Recharts: false,
  },
  backend: {
    'Node.js': false,
    Express: false,
    Python: false,
    'Apprwrite (Auth, Database)': false,
    'Gemini API': false,
    TensorFlow: false,
    'Scikit-Learn': false,
    Numpy: false,
    Java: false,
    PostgreSQL: false,
  },
  tools: {
    Vercel: false,
    GitHub: false,
    'VS Code': false,
    'Jupyter Notebook': false,
    'IntelliJ IDEA': false,
    Maven: false,
    Postman: false,
  },
}
