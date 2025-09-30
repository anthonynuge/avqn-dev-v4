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
  return projects.filter((project) => project.featured)
}

export const projects = [
  {
    id: 'P-01',
    name: 'Susan AI',
    slug: 'susan-ai',
    type: 'Machine Learning App',
    origin: 'personal',
    status: 'live',
    featured: true,
    featuredCanvas: '/projects/susan-feat-cropped.webp',

    summary: 'LLM chat app with auth and markdown/code rendering.',
    description:
      'ChatGPT-inspired assistant powered by Gemini Flash 2.0. Built as an AI alternative for times when I ran out of free ChatGPT calls—and because I wanted to create something AI-driven myself. Users can sign up, create an account, and chat, ask questions, or even generate code. Responses are rendered in markdown with built-in syntax highlighting for a clean, readable experience.',

    dates: { started: '2025-02-01', ended: '2025-02-21' },

    tech: {
      frontend: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Appwrite'],
      tools: ['Vercel', 'GitHub', 'VS Code', 'Gemini API'],
    },

    features: [
      'AI chat with streaming',
      'User authentication',
      'Markdown + syntax highlighting',
      'Code generation',
    ],

    links: {
      live: 'https://susan-ai-one.vercel.app/',
      repo: 'https://github.com/anthonynuge/susan-ai',
    },

    cover: {
      url: '/projects/susan-cover.webp',
      type: 'image',
      alt: 'Susan AI chat interface with code block response',
    },

    backdrop: {
      url: '/projects/bd-1.webp',
      type: 'image',
      alt: 'Bulding Backdrop 1',
    },

    demos: [
      {
        url: '/projects/susan-mock.webp',
        type: 'image',
        alt: 'Susan AI mockup on laptop screen',
      },
      {
        url: '/projects/susan-demo.webm',
        type: 'video',
        alt: 'Screen recording of a Susan AI conversation',
        overlay: true,
        poster: '/projects/susan-poster.webp',
      },
      {
        url: '/projects/susan-3.webp',
        type: 'image',
        alt: 'Close-up of markdown and code output',
        overlay: true,
      },
      {
        url: '/projects/susan-closeup.webp',
        type: 'image',
        alt: 'Auth and session UI for Susan AI',
      },
    ],

    tags: ['AI', 'LLM', 'Auth'],
  },

  {
    id: 'P-02',
    name: 'Portfolio Website V2',
    slug: 'portfolio-website-v2',
    type: 'Web Development', // ✅ standardized
    origin: 'personal',
    status: 'live',

    summary: 'Personal portfolio with animated UI, responsive design, and fast loads.',
    description:
      'My old personal portfolio built to showcase my projects, skills, and growth as a developer. Designed with performance, motion, and responsiveness in mind, the site serves as both a learning playground and a polished presentation of my work.',

    dates: { started: '2025-02-01', ended: '2025-02-14' },

    tech: {
      frontend: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express'],
      tools: ['Vercel', 'GitHub', 'VS Code'],
    },

    features: [
      'Project Showcase',
      'Interactive UI/UX',
      'Animation and Motion',
      'Responsive Design',
    ],

    links: {
      live: 'https://avqn-dev-v2.vercel.app/',
      repo: 'https://github.com/anthonynuge/avqn-dev-v2',
    },

    backdrop: {
      url: '/projects/bd-2.webp',
      type: 'image',
      alt: 'Homepage of the developer portfolio with animated hero section',
    },

    demos: [
      {
        url: '/projects/portfolio-demo.webm',
        type: 'video',
        alt: 'Screen recording of navigating the portfolio site',
        overlay: true,
        poster: '/projects/portfolio-poster.webp',
      },
      {
        url: '/projects/portfolio-1.webp',
        type: 'image',
        alt: 'Portfolio projects grid layout',
      },
    ],

    tags: ['Portfolio', 'UI', 'Animation', 'Motion'],
  },

  {
    id: 'P-03',
    name: 'Fruit Vision',
    slug: 'fruit-vision',
    type: 'Desktop Application', // ✅ standardized (instead of "Machine Learning")
    origin: 'work', // commissioned project → work
    status: 'archived', // project completed; not live
    featured: false,

    summary: 'Python ML app that classifies fruit images with confidence scoring.',
    description:
      'Fruit Vision is a commissioned machine learning project that classifies images of fruits with confidence scoring. Built with Python, TensorFlow, and Scikit-learn, the model uses convolutional neural networks to recognize patterns in vectorized image data. Though trained on fruit, the pipeline can be adapted for any image classification task with sufficient training data.',

    dates: { started: '2024-11-01', ended: '2024-12-01' },

    tech: {
      frontend: ['Tkinter', 'Matplotlib'],
      backend: ['Python', 'TensorFlow', 'Scikit-Learn', 'NumPy'],
      tools: ['Jupyter Notebook', 'VS Code', 'GitHub'],
    },

    features: [
      'Image Classification',
      'Data Augmentation & Processing',
      'GUI with Batch Processing',
      'Model Training & Evaluation',
    ],

    links: {
      live: null,
      repo: 'https://github.com/anthonynuge/Fruit-Identification-CNN',
    },

    // 👇 mapped cover → backdrop
    backdrop: {
      url: '/projects/bd-3.webp',
      type: 'image',
      alt: 'Fruit Vision desktop interface for image classification',
    },

    demos: [
      {
        url: '/projects/fruit-1.webp',
        type: 'image',
        alt: 'Fruit classification screenshot',
        overlay: true,
      },
      {
        url: '/projects/fruit-demo.webm',
        type: 'video',
        alt: 'Screen recording of Fruit Vision classifying fruit images',
        overlay: true,
        poster: '/projects/fruit-poster.webp',
      },
      {
        url: '/projects/fruit-2.webp',
        type: 'image',
        alt: 'Screen shot of model training',
        overlay: true,
      },
      {
        url: '/projects/fruit-3.webp',
        type: 'image',
        alt: 'Image of training visualization',
        overlay: true,
      },
    ],

    tags: ['Machine Learning', 'CNN', 'Python', 'Image Classification'],
  },

  {
    id: 'P-04',
    name: 'Maze Solver',
    slug: 'maze-solver',
    type: 'Desktop Application', // ✅ standardized type
    origin: 'personal', // built during winter break
    status: 'archived', // finished project, not live
    featured: false,

    summary: 'Interactive Java app that visualizes pathfinding algorithms on auto-generated mazes.',
    description:
      'Maze Solver is a Java desktop application that visualizes how different pathfinding algorithms traverse a grid. To make exploration easier, the app includes a built-in maze generator, allowing endless scenarios without manual setup. Built with Java Swing and AWT, the project deepened my understanding of data structures and algorithms while creating an engaging, interactive learning tool.',

    dates: { started: '2024-12-01', ended: '2025-01-15' }, // ✅ approximate "winter break"

    tech: {
      frontend: ['Java Swing', 'JavaFX', 'Java AWT'],
      backend: ['Java'],
      tools: ['IntelliJ IDEA', 'Maven', 'GitHub'],
    },

    features: ['Maze generation', 'Algorithm visualization', 'Interactive GUI'],

    links: {
      live: null, // no live deployment
      repo: 'https://github.com/anthonynuge/pathfinding_visualization',
    },

    backdrop: {
      url: '/projects/bd-4.webp',
      type: 'image',
      alt: 'Bulding Backdrop 4',
    },

    demos: [
      {
        url: '/projects/maze-demo.webm',
        type: 'video',
        alt: 'Screen recording of Maze Solver showing algorithm traversal on a generated maze',
        overlay: true,
        poster: '/projects/maze-poster.webp',
      },
    ],

    tags: ['Algorithms', 'Java', 'Pathfinding', 'Visualization'],
  },

  {
    id: 'P-05',
    name: 'Fake News Detection',
    slug: 'fake-news-detection',
    type: 'Machine Learning App', // ✅ standardized (ML noted in tags)
    origin: 'personal', // capstone project
    status: 'archived', // completed, not live
    featured: false,

    summary: 'Capstone project using NLP and machine learning to classify fake vs real news.',
    description:
      'Fake News Detection is a machine learning capstone project that tackles misinformation by analyzing text to classify articles as fake or real news. Built with Python, Scikit-learn, and NLP techniques, the project includes data preprocessing, feature extraction, model training, and visualization of results. While designed for news articles, the same pipeline can be applied to other text classification problems.',

    dates: { started: '2024-03-01', ended: '2024-05-01' },

    tech: {
      frontend: ['Tkinter', 'Matplotlib', 'Seaborn'],
      backend: ['Python', 'Scikit-Learn', 'NumPy'],
      tools: ['Jupyter Notebook', 'VS Code', 'GitHub'],
    },

    features: [
      'Proposal & Budgeting',
      'Data Processing & NLP',
      'Trend Analysis & Visualization',
      'Model Training & Evaluation',
    ],

    links: {
      live: null,
      repo: 'https://github.com/anthonynuge/fake-news-detection-app',
    },

    backdrop: {
      url: '/projects/bd-5.webp',
      type: 'image',
      alt: 'Bulding Backdrop 5',
    },

    demos: [
      {
        url: '/projects/fake-news-demo.webm',
        type: 'video',
        alt: 'Screen recording of Fake News Detection classifying an article',
        overlay: true,
        poster: '/projects/fake-news-poster.webp',
      },
      {
        url: '/projects/fake-news-1.webp',
        type: 'image',
        alt: 'Notebook visualiztion of pca',
        overlay: true,
      },
      {
        url: '/projects/fake-news-2.webp',
        type: 'image',
        alt: 'Tfid visualization of word trend',
        overlay: true,
      },
    ],

    tags: ['Machine Learning', 'NLP', 'Text Classification', 'Capstone'],
  },

  {
    id: 'P-06',
    name: 'E-commerce Dashboard',
    slug: 'e-commerce-dashboard',
    type: 'web-app', // ✅ standardized (covers full-stack apps)
    origin: 'personal', // proof of concept project
    status: 'archived', // completed, not live
    featured: false,

    summary:
      'Full-stack e-commerce dashboard with payments, analytics, and store management tools.',
    description:
      'E-commerce Dashboard is a proof-of-concept full-stack platform designed to streamline online store management. It brings together product management, order tracking, and real-time analytics in a single interface. Built with React, Next.js, and PostgreSQL, the project demonstrates secure payment integration and dynamic data visualizations for business insights.',

    dates: { started: '2024-01-01', ended: '2024-02-15' }, // placeholder range

    tech: {
      frontend: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Redux',
        'HTML',
        'CSS',
        'Recharts',
      ],
      backend: ['Node.js', 'Express', 'PostgreSQL'],
      tools: ['VS Code', 'GitHub', 'Postman'],
    },

    features: [
      'Product management dashboard',
      'User Authentication',
      'Inventory Management',
      'Analytics & Reporting',
    ],

    links: {
      live: null,
      repo: 'https://github.com/anthonynuge/inventory-management',
    },

    backdrop: {
      url: '/projects/bd-1.webp',
      type: 'image',
      alt: 'Bulding Backdrop 1',
    },

    demos: [
      {
        url: '/projects/ecommerce-1.webp',
        type: 'image',
        alt: 'Dashboard view of products and inventory management',
        overlay: true,
      },
      {
        url: '/projects/ecommerce-demo.webm',
        type: 'video',
        alt: 'Screen recording of user navigating the E-commerce Dashboard',
        overlay: true,
        poster: '/projects/ecommerce-poster.webp',
      },
      {
        url: '/projects/ecommerce-2.webp',
        type: 'image',
        alt: 'Light mode of dashboard view',
        overlay: true,
      },
    ],

    tags: ['Full-Stack', 'E-commerce', 'Payments', 'Analytics'],
  },

  {
    id: 'E-01',
    name: 'Midnite Agency',
    slug: 'midnite-agency',
    type: 'Web Development', // ✅ standardized (was "Work Experience")
    origin: 'work', // E-* → work experience
    status: 'live',
    featured: false,

    role: 'Frontend Developer & Site Maintainer',

    summary: 'Houston-based creative agency website built with Next.js, Tailwind, and 3D visuals.',
    description:
      'Midnite Agency, a Houston-based creative marketing firm, hired me to design and develop a custom site that communicates their service offerings with visual flair and technical polish. I delivered a scalable, performant website with integrated 3D visuals, animated UI, and automated email handling — all built with modern frontend tooling.',

    dates: { started: '2025-07-01', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      backend: [],
      tools: ['Vercel'],
    },

    features: [
      'Responsive Next.js + Tailwind Frontend',
      'Framer Motion & Three.js Interactions',
      'Automated Lead & Form Emails',
      'SEO, Performance & Accessibility Improvements',
      'Vercel Deploy with Domain & DNS Setup',
    ],

    links: {
      live: 'https://www.midnite-agency.com',
      repo: null,
    },

    // 👇 cover → backdrop
    backdrop: {
      url: '/projects/bd-1.webp',
      type: 'image',
      alt: 'Bulding Backdrop 1',
    },

    featuredCanvas: '/projects/midnite.webp',

    demos: [
      {
        url: '/projects/midnite.webp',
        type: 'image',
        alt: 'Hero section of Midnite Agency website',
        overlay: true,
      },
      {
        url: '/projects/midnite-mock.webp',
        type: 'image',
        alt: 'Device mockup of Midnite Agency website',
      },
    ],

    tags: ['Work', 'Frontend', 'Next.js', 'Three.js', 'Agency'],
  },

  {
    id: 'E-02',
    name: 'National Grid X',
    slug: 'national-grid-x',
    type: 'Web Development', // ✅ standardized (was "Work Experience")
    origin: 'work',
    status: 'live',
    featured: true,

    role: 'Frontend Developer & Site Maintainer',

    summary: 'Commercial energy brokerage website built and maintained with Next.js and Supabase.',
    description:
      'National Grid X is a commercial energy brokerage firm that helps businesses procure energy plans tailored to their usage. I built and deployed their website from scratch and continue to provide maintenance and feature updates. The site serves as the company’s digital presence, streamlining lead generation and building client trust.',

    dates: { started: '2025-03-01', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      backend: ['PostgreSQL', 'Supabase', 'Node.js'],
      tools: ['Vercel', 'DNS'],
    },

    features: [
      'Responsive Next.js Frontend',
      'Post-launch Maintenance & Optimization',
      'End-to-end Deployment (Domain, DNS, Vercel)',
      'Stakeholder Collaboration & Rapid Iteration',
    ],

    links: {
      live: 'https://www.nationalgridx.com/',
      repo: null,
    },

    // 👇 cover → backdrop
    backdrop: {
      url: '/projects/bd-2.webp',
      type: 'image',
      alt: 'Bulding Backdrop 2',
    },

    featuredCanvas: '/projects/ngx-feat-cropped.webp',

    demos: [
      {
        url: '/projects/ngx-mock.webp',
        type: 'image',
        alt: 'Mockup of National Grid X website on desktop screen',
      },
      {
        url: '/projects/ngx-mobile.webp',
        type: 'image',
        alt: 'Mobile view of National Grid X homepage',
      },
      {
        url: '/projects/ngx-3.webp',
        type: 'image',
        alt: 'Services section of the National Grid X website',
      },
    ],

    tags: ['Work', 'Frontend', 'Next.js', 'Supabase', 'Energy'],
  },

  {
    id: 'E-03',
    name: 'Aesyn',
    slug: 'aesyn',
    type: 'Web Application', // standardized category
    origin: 'work',
    status: 'live',
    featured: false,

    role: 'Software Developer Intern',

    summary:
      'Social marketing platform work: analytics features, real-time insights, payments, and campaign tracking.',
    description:
      'Aesyn is an Austin-based platform that matches businesses with creators and streamlines social marketing. I contributed across the stack—building analytics features with Recharts, supporting real-time insights, integrating payments, and improving campaign tracking—while collaborating through Git and Jira.',

    dates: { started: '2024-07-01', ended: '2025-01-31' },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      backend: ['Node.js', 'MongoDB', 'Express'],
      tools: ['Git', 'Jira', 'VS Code', 'Postman'],
    },

    features: [
      'Centralized influencer metrics',
      'Visual insights with Recharts',
      'Responsive, accessible UI',
      'Payments and campaign tracking',
      'Bug fixes and performance improvements',
    ],

    links: {
      live: 'https://www.aesyn.us/',
      repo: null,
    },

    // cover → backdrop
    backdrop: {
      url: '/projects/bd-3.webp',
      type: 'image',
      alt: 'Bulding Backdrop 3',
    },

    demos: [
      { url: '/projects/aesyn-1.webp', type: 'image', alt: 'Screenshot of Aesyn hero seciton' },
      { url: '/projects/aesyn-2.webp', type: 'image', alt: 'Mockup of Aesyn on laptop' },
      {
        url: '/projects/aesyn-3.webp',
        type: 'image',
        overlay: true,
        alt: 'Screenshot of Aesyn components',
      },
    ],

    tags: ['Work', 'Analytics', 'Creator Economy'],
  },

  {
    id: 'P-07',
    name: 'NGX Token',
    slug: 'ngx-token',
    type: 'Blockchain/Web3', // ✅ standardized (Blockchain/Web3 context in tags)
    origin: 'work',
    status: 'wip', // still experimental, no live/repo links provided
    featured: false,

    summary: 'ERC-20 utility token with a Next.js dApp for minting, transfers, and admin actions.',
    description:
      'NGX Token is a cryptocurrency project from NGX Consulting, launched on the Polygon network with a market cap of $2.6M. Built to innovate the energy sector, it powers crypto-based payments, user rewards, and business partnerships across Texas, with a public unlock phase planned for Winter 2025. I am contributing  to the launch by developing the public marketing site and dApp interface, ensuring a secure and polished user experience that supported the tokens entry into the market.',

    dates: { started: '2025-01-01', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      backend: [],
      tools: ['Polygon', 'Vercel', 'GitHub'],
    },

    features: [
      'Public launch marketing site',
      'Polygon network integration',
      'Crypto-powered payments & rewards',
      'Business partnerships in Texas',
      'WalletConnect & MetaMask support',
    ],

    links: {
      live: null, // no demo URL provided
      repo: null, // no repo URL provided
    },

    // cover → backdrop
    backdrop: {
      url: '/projects/bd-4.webp',
      type: 'image',
      alt: 'Bulding Backdrop 4',
    },

    demos: [
      {
        url: '/projects/ngx-token-mock.webp',
        type: 'image',
        alt: 'Mockup of NGX Token page',
      },
      {
        url: '/projects/ngx-token-demo.webm',
        type: 'video',
        alt: 'Screen recording of NGX Token page',
        overlay: true,
        poster: '/projects/ngx-token-poster.webp',
      },
      {
        url: '/projects/ngx-token-2.webp',
        type: 'image',
        alt: 'Screenshot of NGX Token page',
      },
    ],

    tags: ['Blockchain', 'Web3', 'Polygon', 'Energy'],
  },

  {
    id: 'P-08',
    name: 'Tryal',
    slug: 'tryal',
    type: 'Startup',
    origin: 'personal',
    status: 'wip',
    featured: true,

    featuredCanvas: '/projects/tryal-feat-cropped.webp',

    summary: 'Subscription platform for discovering local experiences through monthly credits.',
    description:
      "Cofounder of Tryal, a startup project I'm building with few other developers: a subscription platform where users redeem monthly credits to explore local experiences—from food tastings to fitness classes—while supporting community businesses. The platform features secure billing, team-based accounts, and a responsive booking flow for both users and business partners.",

    dates: { started: '2025-06-01', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      backend: ['Node.js', 'PostgreSQL', 'Prisma', 'NextAuth'],
      tools: ['Vercel', 'Stripe', 'GitHub', 'Google Maps API'],
    },

    features: [
      'Dynamic booking flow',
      'Google Maps API integration',
      'Stripe billing & upgrades',
      'Authentication, roles & team management',
      'CMS for business partners',
    ],

    links: {
      live: null, // no public URL yet
      repo: null, // private repo
    },

    // cover → backdrop
    backdrop: {
      url: '/projects/bd-5.webp',
      type: 'image',
      alt: 'Bulding Backdrop 5',
    },

    demos: [
      {
        url: '/projects/tryal-demo.webm',
        type: 'video',
        alt: 'Screen recording of Tryal marketing site',
        overlay: true,
        poster: '/projects/tryal-poster.webp',
      },
      {
        url: '/projects/tryal-mock.webp',
        type: 'image',
        alt: 'Mockup of Tryal on laptop',
      },
      {
        url: '/projects/tryal-cover.webp',
        type: 'image',
        alt: 'Screenshot of Tryal landing page',
      },
    ],

    tags: ['Startup', 'Subscriptions', 'Stripe', 'Next.js', 'Google Maps API'],
  },

  {
    id: 'P-10',
    name: 'Utility Buddys',
    slug: 'utility-buddys',
    type: 'SaaS', // ✅ standardized
    origin: 'work', // sounds client-facing; adjust to 'personal' if it’s just a demo
    status: 'wip', // no live link yet
    featured: false,

    summary:
      'Customer-facing site and admin dashboard for utilities services with lead capture and automation.',
    description:
      'Utility Buddys is a subscription platform from NGX Consulting that helps households save money by dynamically managing home utility plans. Users can sign up and pay through a secure portal, while the service handles sensitive data responsibly and automatically optimizes plan selections for cost efficiency. The platform combines a customer-facing site with an admin dashboard for lead capture, content management, and service updates.',

    dates: { started: '2025-07-01', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'PostgreSQL', 'NextAuth'],
      tools: ['Vercel', 'SendGrid', 'GitHub', 'Stripe', 'Supabase'],
    },

    features: [
      'Responsive Next.js + Tailwind UI',
      'Service finder & quote flow',
      'Lead capture & email automation',
      'Admin dashboard with CRUD',
      'SEO, analytics & performance',
    ],

    links: {
      live: null, // no URL yet
      repo: null, // no public repo
    },

    // cover → backdrop
    backdrop: {
      url: '/projects/bd-2.webp',
      type: 'image',
      alt: 'Bulding Backdrop 2',
    },

    demos: [
      {
        url: '/projects/utility-buddy.webp',
        type: 'image',
        alt: 'Utility Buddys dashboard mockup',
        overlay: true,
      },
    ],

    tags: ['Utilities', 'Dashboard', 'Next.js', 'Lead Capture', 'Stripe', 'Supabase'],
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
    'Appwrite (Auth, Database)': false,
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
