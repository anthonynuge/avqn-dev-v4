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
    id: 'E-05',
    name: 'Midnite Agency',
    slug: 'midnite-agency-v2',
    type: 'Frontend',
    capabilities: ['Animation'],
    origin: 'work',
    status: 'live',
    featured: true,

    role: 'Frontend Developer & Designer',

    featuredCanvas: '/projects/midnite-v2-hero.webp',

    summary: 'Full rebrand and redesign of Midnite Agency with heavy GSAP-driven animations.',
    description:
      'Rebuilt the Midnite Agency website as part of a full rebrand for the creative marketing firm. The new site uses GSAP for scroll-driven sequences and transitions, Lenis for smooth scrolling, and Matter.js for physics-based interactions, creating a more motion-focused presentation of the agency and its work.',

    dates: { started: '2026-04-27', ended: '2026-05-01' },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'Matter.js'],
      backend: [],
      platform: ['Vercel', 'Resend'],
      tools: ['GitHub', 'Cursor'],
    },

    features: [
      'Scroll-Driven GSAP Animations',
      'Matter.js Physics Interactions',
      'Interactive UI Mockups',
      'Responsive Frontend',
      'Custom Visual System',
    ],

    links: {
      live: 'https://www.midnite-agency.com/',
      repo: null,
    },

    backdrop: {
      url: '/projects/bd-2.webp',
      type: 'image',
      alt: 'Building Backdrop 2',
    },

    demos: [
      {
        url: '/projects/midnite-v2-home.webm',
        type: 'video',
        alt: 'Screen recording of Midnite Marketing Agency homepage',
        overlay: true,
        poster: '/projects/midnite-v2-hero.webp',
      },
      {
        url: '/projects/midnite-v2-works.webm',
        type: 'video',
        alt: 'Screen recording of Midnite Marketing Agency works section',
        overlay: true,
        poster: '/projects/midnite-v2-hero.webp',
      },
      {
        url: '/projects/midnite-v2-components.webm',
        type: 'video',
        alt: 'Screen recording of animated components on Midnite Marketing Agency site',
        overlay: true,
        poster: '/projects/midnite-v2-hero.webp',
      },
    ],

    tags: ['Work', 'Rebrand', 'Frontend', 'Next.js', 'GSAP', 'Animation'],
  },

  {
    id: 'P-01',
    name: 'Tryal',
    slug: 'tryal',
    type: 'Full-Stack',
    capabilities: ['System Design', 'APIs', 'Payments', 'Security', 'Animation'],
    origin: 'personal',
    status: 'wip',
    featured: true,

    featuredCanvas: '/projects/tryal-feat-cropped.webp',

    summary: 'Subscription platform for discovering local experiences through monthly credits.',
    description:
      "Cofounder of Tryal, a startup I'm building with a small team of developers. The platform gives members monthly credits they can redeem for local experiences, from food tastings to fitness classes. I worked across the product on the booking flow, recurring Stripe subscriptions, role-based accounts, business management tools, and location-based discovery through Google Maps, supporting both customers and business partners.",

    dates: { started: '2025-02-01', ended: '2026-01-31' },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      backend: [
        'Java',
        'Spring Boot',
        'Node.js',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'NextAuth',
        'Zod',
      ],
      platform: ['Vercel', 'Docker', 'Stripe', 'Google Maps API'],
      tools: ['GitHub', 'IntelliJ IDEA'],
    },

    features: [
      'Credit-Based Booking',
      'Stripe Subscriptions',
      'Business Partner CMS',
      'Role-Based Accounts',
      'Google Maps Integration',
    ],

    links: {
      live: 'https://www.tryal.us/', // no public URL yet
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
    ],

    tags: ['Startup', 'Subscriptions', 'Stripe', 'Next.js', 'Google Maps API'],
  },

  {
    id: 'P-07',
    name: 'Susan AI',
    slug: 'susan-ai',
    type: 'AI / ML',
    capabilities: ['APIs', 'Security'],
    origin: 'personal',
    status: 'live',
    featured: false,
    featuredCanvas: '/projects/susan-feat-cropped.webp',

    summary: 'LLM chat app with auth and markdown/code rendering.',
    description:
      'Chat application built around Gemini while I was learning LLM APIs and conversational interfaces. Users can create accounts, maintain conversations, and receive streaming responses with Markdown and syntax-highlighted code. I built the authentication, chat interface, response rendering, and API integration to understand the pieces behind a production-style AI chat experience.',

    dates: { started: '2025-02-01', ended: '2025-02-21' },

    tech: {
      frontend: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Appwrite Auth'],
      platform: ['Vercel', 'Appwrite', 'Gemini API'],
      tools: ['GitHub', 'VS Code'],
    },

    features: [
      'Streaming AI Responses',
      'User Authentication',
      'Markdown Rendering',
      'Syntax Highlighting',
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
    type: 'Frontend',
    capabilities: ['Animation'],
    origin: 'personal',
    status: 'archived',

    summary: 'Personal portfolio with animated UI, responsive design, and fast loads.',
    description:
      'The previous version of my developer portfolio, built with React, Vite, Tailwind CSS, and Framer Motion. I used the project to showcase my work while experimenting with responsive layouts, animated interfaces, and project presentation. It also served as a place to improve my frontend skills before building the current portfolio.',

    dates: { started: '2025-02-01', ended: '2025-02-14' },

    tech: {
      frontend: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
      backend: [],
      platform: ['Vercel'],
      tools: ['GitHub', 'VS Code'],
    },

    features: [
      'Project Showcase',
      'Framer Motion Animations',
      'Responsive Layouts',
      'Interactive Navigation',
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
    type: 'AI / ML',
    capabilities: [],
    origin: 'personal',
    status: 'repo',
    featured: false,

    summary: 'Python ML app that classifies fruit images with confidence scoring.',
    description:
      'Commissioned machine learning project for classifying fruit images and returning a confidence score for each prediction. I built the workflow in Python and TensorFlow, covering image preprocessing, data augmentation, CNN training, and model evaluation, then added a desktop interface for running individual or batch predictions against the trained model.',

    dates: { started: '2024-04-01', ended: '2024-06-01' },

    tech: {
      frontend: ['Tkinter', 'Matplotlib'],
      backend: ['Python', 'TensorFlow', 'Scikit-Learn', 'NumPy'],
      platform: [],
      tools: ['GitHub', 'VS Code', 'Jupyter Notebook'],
    },

    features: [
      'CNN Image Classification',
      'Image Preprocessing',
      'Data Augmentation',
      'Batch Classification',
      'Model Evaluation',
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
    type: 'Tools',
    capabilities: [],
    origin: 'personal', // built during winter break
    status: 'repo',
    featured: false,

    summary: 'Interactive Java app that visualizes pathfinding algorithms on auto-generated mazes.',
    description:
      'Java desktop application for visualizing how pathfinding algorithms traverse a grid. I built a maze generator to create new layouts without manual setup, then connected it to an interactive interface that shows each algorithm exploring cells and finding a valid route. The project was built to strengthen my understanding of search algorithms and data structures.',

    dates: { started: '2023-12-01', ended: '2024-01-15' }, // ✅ approximate "winter break"

    tech: {
      frontend: ['Java Swing', 'JavaFX', 'Java AWT'],
      backend: ['Java'],
      platform: [],
      tools: ['GitHub', 'IntelliJ IDEA', 'Maven'],
    },

    features: [
      'Procedural Maze Generation',
      'Pathfinding Visualization',
      'Interactive Grid Controls',
      'Multiple Search Algorithms',
    ],

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
    type: 'AI / ML',
    capabilities: ['Data'],
    origin: 'personal', // capstone project
    status: 'repo',
    featured: false,

    summary: 'Capstone project using NLP and machine learning to classify fake vs real news.',
    description:
      'Machine learning capstone project for classifying news articles as real or fake from their text. I built the pipeline from data cleaning and NLP preprocessing through TF-IDF feature extraction, model training, and evaluation. I also created visualizations to inspect patterns in the dataset and compare how different classification approaches performed.',

    dates: { started: '2024-03-01', ended: '2024-05-01' },

    tech: {
      frontend: ['Tkinter', 'Matplotlib', 'Seaborn'],
      backend: ['Python', 'Scikit-Learn', 'NumPy'],
      platform: [],
      tools: ['GitHub', 'VS Code', 'Jupyter Notebook'],
    },

    features: [
      'Text Classification',
      'NLP Preprocessing',
      'TF-IDF Feature Extraction',
      'Model Evaluation',
      'Data Visualization',
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
    type: 'Full-Stack',
    capabilities: ['Data', 'Payments', 'Security'],
    origin: 'personal', // proof of concept project
    status: 'repo',
    featured: false,

    summary:
      'Full-stack e-commerce dashboard with payments, analytics, and store management tools.',
    description:
      'Full-stack proof of concept for managing an online store from a single interface. Built with Next.js, Node.js, and PostgreSQL, it brings together product management, inventory tracking, user authentication, and analytics dashboards to explore how frontend administration tools connect to a relational backend and application API.',

    dates: { started: '2024-01-01', ended: '2024-02-15' }, // placeholder range

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Recharts'],
      backend: ['Node.js', 'Express', 'PostgreSQL'],
      platform: [],
      tools: ['GitHub', 'VS Code', 'Postman'],
    },

    features: [
      'Product Management',
      'Inventory Tracking',
      'User Authentication',
      'Analytics Dashboard',
      'PostgreSQL Data Layer',
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
    name: 'Midnite Agency V1',
    slug: 'midnite-agency-v1',
    type: 'Frontend',
    capabilities: ['Automation', 'Animation'],
    origin: 'work',
    status: 'archived',
    featured: false,

    role: 'Frontend Developer & Site Maintainer',

    summary:
      'Original Midnite Agency site — Next.js, Tailwind, and 3D visuals, since superseded by the V2 rebrand.',
    description:
      "The first version of the Midnite Agency website, built before the agency's later rebrand. I designed and developed the site with Next.js, Framer Motion, and Three.js, combining responsive layouts with animated interfaces, 3D visuals, lead forms, and automated email handling for the agency's original online presence.",

    dates: { started: '2025-06-01', ended: '2025-07-01' },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      backend: [],
      platform: ['Vercel'],
      tools: ['GitHub', 'Cursor'],
    },

    features: [
      'Three.js Visuals',
      'Framer Motion Animations',
      'Automated Lead Emails',
      'Responsive Frontend',
      'SEO & Performance',
    ],

    links: {
      live: 'https://midnite-site.vercel.app/',
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
    type: 'Frontend',
    capabilities: ['Animation'],
    origin: 'work',
    status: 'live',
    featured: true,

    role: 'Frontend Developer & Site Maintainer',

    summary: 'Commercial energy brokerage website built and maintained with Next.js and Supabase.',
    description:
      'Commercial energy brokerage where I work as a Full Stack Developer across its web products and internal systems. I built and maintain the company website and contribute to customer-facing platforms, operational tools, and data services used by the business. My work spans frontend development, backend systems, integrations, deployment, and ongoing product development.',

    dates: { started: '2025-03-01', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Lenis', 'Recharts'],
      backend: ['Node.js', 'PostgreSQL'],
      platform: ['Vercel', 'Supabase'],
      tools: ['GitHub', 'VS Code'],
    },

    features: [
      'Company Website',
      'Customer Platforms',
      'Internal Tools',
      'Data Services',
      'Production Deployment',
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
    type: 'Full-Stack',
    capabilities: ['Data', 'APIs', 'Payments', 'Security'],
    origin: 'work',
    status: 'live',
    featured: false,

    role: 'Software Developer Intern',

    summary:
      'Social marketing platform work: analytics features, real-time insights, payments, and campaign tracking.',
    description:
      'Worked as a software developer intern on Aesyn, a platform connecting businesses with creators for social marketing campaigns. I contributed across the stack, building analytics and data visualizations with Recharts, supporting campaign tracking and payment flows, and handling bug fixes and performance improvements within the existing Next.js and Node.js application.',

    dates: { started: '2024-07-01', ended: '2025-01-31' },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      backend: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Zod'],
      platform: [],
      tools: ['GitHub', 'VS Code', 'Postman', 'Jira'],
    },

    features: [
      'Creator Analytics',
      'Recharts Dashboards',
      'Campaign Tracking',
      'Payment Flows',
      'Full-Stack Bug Fixes',
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

  // {
  //   id: 'P-08',
  //   name: 'NGX Token',
  //   slug: 'ngx-token',
  //   type: 'Blockchain/Web3', // ✅ standardized (Blockchain/Web3 context in tags)
  //   origin: 'work',
  //   status: 'wip', // still experimental, no live/repo links provided
  //   featured: false,

  //   summary: 'ERC-20 utility token with a Next.js dApp for minting, transfers, and admin actions.',
  //   description:
  //     'NGX Token is a cryptocurrency project from NGX Consulting, launched on the Polygon network with a market cap of $2.6M. Built to innovate the energy sector, it powers crypto-based payments, user rewards, and business partnerships across Texas, with a public unlock phase planned for Winter 2025. I am contributing  to the launch by developing the public marketing site and dApp interface, ensuring a secure and polished user experience that supported the tokens entry into the market.',

  //   dates: { started: '2025-06-01', ended: '2025-12-31' },

  //   tech: {
  //     frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  //     backend: [],
  //     tools: ['Polygon', 'Vercel', 'GitHub'],
  //   },

  //   features: [
  //     'Public launch marketing site',
  //     'Polygon network integration',
  //     'Crypto-powered payments & rewards',
  //     'Business partnerships in Texas',
  //     'WalletConnect & MetaMask support',
  //   ],

  //   links: {
  //     live: 'https://dexscreener.com/polygon/0x8c78b2e5da5edb9aaa8cb016c9d05dac98b62c81', // no demo URL provided
  //     repo: null, // no repo URL provided
  //   },

  //   // cover → backdrop
  //   backdrop: {
  //     url: '/projects/bd-4.webp',
  //     type: 'image',
  //     alt: 'Bulding Backdrop 4',
  //   },

  //   demos: [
  //     {
  //       url: '/projects/ngx-token-mock.webp',
  //       type: 'image',
  //       alt: 'Mockup of NGX Token page',
  //     },
  //     {
  //       url: '/projects/ngx-token-demo.webm',
  //       type: 'video',
  //       alt: 'Screen recording of NGX Token page',
  //       overlay: true,
  //       poster: '/projects/ngx-token-poster.webp',
  //     },
  //     {
  //       url: '/projects/ngx-token-2.webp',
  //       type: 'image',
  //       alt: 'Screenshot of NGX Token page',
  //     },
  //   ],

  //   tags: ['Blockchain', 'Web3', 'Polygon', 'Energy'],
  // },

  {
    id: 'P-10',
    name: 'Utility Buddies',
    slug: 'utility-buddies',
    type: 'Frontend',
    capabilities: ['APIs', 'Automation'],
    origin: 'work', // sounds client-facing; adjust to 'personal' if it’s just a demo
    status: 'live',
    featured: false,

    summary:
      'Utility concierge platform that sets up electricity, cable, and insurance for people moving in.',
    description:
      'Utility concierge platform I built at National Grid X for customers moving into a new home. Customers submit one request for electricity, internet, and other services instead of contacting each provider separately. I built the lead capture flow, automated follow-up emails, and Sanity-managed content system so the team could update services and content without code changes.',

    dates: { started: '2025-04-01', ended: '2026-09-01' },

    tech: {
      frontend: ['Next.js', 'React', 'Tailwind CSS'],
      backend: ['Node.js'],
      platform: ['Vercel', 'Sanity', 'Resend'],
      tools: ['GitHub', 'VS Code'],
    },

    features: ['Multi-Service Lead Form', 'Automated Lead Emails', 'Sanity CMS', 'SEO & Analytics'],

    links: {
      live: 'https://utilitybuddies.com/',
      repo: null, // no public repo
    },

    // cover → backdrop
    backdrop: {
      url: '/projects/bd-2.webp',
      type: 'image',
      alt: 'Building Backdrop 2',
    },

    demos: [
      {
        url: '/projects/utility-buddies.webp',
        type: 'image',
        alt: 'Utility Buddies marketing site home page',
        overlay: true,
      },
    ],

    tags: ['Utilities', 'Concierge', 'Next.js', 'Lead Capture', 'Sanity'],
  },

  {
    id: 'P-11',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    type: 'Tools',
    capabilities: [],
    origin: 'personal',
    status: 'live',
    featured: false,

    summary: 'Custom QR code generator that blends uploaded images into branded, scannable codes.',
    description:
      "Built after a Midnite Agency client needed a QR code that incorporated their brand logo. The generator accepts a logo and QR content, extracts the image's color palette, protects cells required for reliable scanning, and applies contrast-aware colors to the remaining pattern to create a branded code that stays scannable.",

    dates: { started: '2026-03-13', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Color Thief'],
      backend: [],
      platform: ['Vercel'],
      tools: ['GitHub', 'Cursor'],
    },

    features: [
      'Image Palette Extraction',
      'Protected QR Cells',
      'Contrast-Aware Mapping',
      'URL, vCard & Text Codes',
      'Branded QR Generation',
    ],

    links: {
      live: 'https://branded-qr-generator.vercel.app/',
      repo: 'https://github.com/anthonynuge/branded-qr-generator',
    },

    backdrop: {
      url: '/projects/bd-5.webp',
      type: 'image',
      alt: 'Building Backdrop 5',
    },

    demos: [
      {
        url: '/projects/qr-demo.webm',
        type: 'video',
        alt: 'Screen recording of QR Code Generator',
        overlay: true,
      },
      {
        url: '/projects/qr-dev-card.webp',
        type: 'image',
        alt: 'Mockup of QR Code Generator',
        overlay: true,
      },

      {
        url: '/projects/qr-site.webp',
        type: 'image',
        alt: 'Mockup of QR Code Generator',
        overlay: true,
      },
    ],

    tags: ['Tool', 'QR Code', 'Next.js', 'Image Processing', 'Midnite Agency'],
  },

  {
    id: 'P-13',
    name: 'Blah2Text',
    slug: 'blah2text',
    type: 'AI / ML',
    capabilities: ['Automation'],
    origin: 'personal',
    status: 'repo',
    featured: false,

    summary:
      'Local, offline push-to-talk dictation for Windows that transcribes speech and types it at the cursor.',
    description:
      'Offline push-to-talk dictation tool for Windows that transcribes speech and types it directly at the active cursor. I built the pipeline around faster-whisper, rule-based cleanup, and a local Ollama model, with GPU-to-CPU fallback and safeguards that keep transcription working when the LLM stalls or is unavailable.',

    dates: { started: '2026-07-03', ended: null },

    tech: {
      frontend: ['Tkinter'],
      backend: [
        'Python',
        'faster-whisper',
        'CTranslate2',
        'Silero VAD',
        'Ollama',
        'Win32 SendInput',
      ],
      platform: [],
      tools: ['GitHub', 'Cursor'],
    },

    features: [
      'Push-to-Talk Dictation',
      'Local Whisper Transcription',
      'LLM Text Cleanup',
      'Automatic CPU Fallback',
      'Cursor-Level Text Injection',
      'Live Waveform Overlay',
    ],

    links: {
      live: null,
      repo: 'https://github.com/anthonynuge/blah2text',
    },

    backdrop: {
      url: '/projects/bd-4.webp',
      type: 'image',
      alt: 'Building Backdrop 4',
    },

    demos: [
      {
        url: '/projects/blah2Text-demo.webm',
        type: 'video',
        alt: 'Screen recording of Blah2Text dictation',
        overlay: true,
        poster: '/projects/blah2Text-poster.webp',
      },
    ],

    featuredCanvas: null,

    tags: ['AI', 'Dictation', 'Whisper', 'Offline', 'Python'],
  },

  {
    id: 'P-12',
    name: 'Energy Panda',
    slug: 'energy-panda',
    type: 'Full-Stack',
    capabilities: ['System Design', 'APIs', 'Payments', 'Security', 'Animation'],
    origin: 'work',
    status: 'live',
    featured: false,

    summary: 'Subscription platform that finds and manages the best energy plan for you.',
    description:
      'Subscription energy management platform I helped build at National Grid X for handling electricity plan shopping, enrollment, and ongoing account management. I worked across the customer experience and backend systems, including Stripe subscriptions, onboarding flows, internal operations, transactional email, and protected customer data handling across the signup and fulfillment process.',

    dates: { started: '2025-09-27', ended: '2026-07-26' },

    tech: {
      frontend: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'Recharts',
        'Framer Motion',
      ],
      backend: ['PostgreSQL', 'Redis', 'Supabase Auth', 'Zod'],
      platform: ['Vercel', 'Supabase', 'Cloudflare', 'Docker', 'AWS KMS', 'Stripe', 'Resend'],
      tools: ['GitHub', 'Cursor', 'Jest'],
    },

    features: [
      'Subscription Billing',
      'Customer Onboarding',
      'Admin Operations',
      'Transactional Email',
      'Secure Data Handling',
      'Plan Enrollment Workflow',
    ],

    links: {
      live: 'https://energypanda.com/',
      repo: null,
    },

    backdrop: {
      url: '/projects/bd-3.webp',
      type: 'image',
      alt: 'Building Backdrop 3',
    },

    demos: [
      {
        url: '/projects/energy-panda-demo.webm',
        type: 'video',
        alt: 'Screen recording of the Energy Panda site',
        overlay: true,
        poster: '/projects/energy-panda-home.webp',
      },
      {
        url: '/projects/energy-panda-home.webp',
        type: 'image',
        alt: 'Energy Panda home page',
        overlay: true,
      },
    ],

    tags: ['SaaS', 'Subscriptions', 'Energy', 'Next.js', 'Stripe', 'Supabase'],
  },

  {
    id: 'E-04',
    name: 'Tiffany Glam',
    slug: 'tiffany-glam',
    type: 'Frontend',
    capabilities: ['Automation', 'Animation'],
    origin: 'work',
    status: 'live',
    featured: false,

    role: 'Web Designer & Developer',

    summary: 'Wix Studio site for a Houston makeup artist with bookings, courses, and CMS.',
    description:
      'Designed and built a Wix Studio site for Tiffany Glam, a Houston makeup artist offering bridal, event, and online course services. I took the project from Figma through development, connecting HoneyBook for booking and client pipeline automation, setting up a CMS for editable content, and building responsive layouts and frontend animations.',

    dates: { started: '2025-11-01', ended: '2026-02-01' },
    tech: {
      frontend: ['Wix Studio', 'CSS'],
      backend: ['Wix CMS'],
      platform: ['HoneyBook'],
      tools: ['Figma'],
    },

    features: [
      'Figma-to-Wix Build',
      'HoneyBook Automation',
      'Client-Managed CMS',
      'Responsive Layouts',
      'Custom Animations',
    ],

    links: {
      live: 'https://www.tiffanyglam.com/',
      repo: null,
    },

    backdrop: {
      url: '/projects/bd-1.webp',
      type: 'image',
      alt: 'Building Backdrop 1',
    },

    demos: [
      {
        url: '/projects/tg-home.webm',
        type: 'video',
        alt: 'Screen recording of Tiffany Glam homepage',
        overlay: true,
        poster: '/projects/tg-home-poster.webp',
      },
      {
        url: '/projects/tg-about.webm',
        type: 'video',
        alt: 'Screen recording of Tiffany Glam about section',
        overlay: true,
        poster: '/projects/tg-about-poster.webp',
      },
      {
        url: '/projects/tg-nav.webp',
        type: 'image',
        alt: 'Navigation and header design for Tiffany Glam',
        overlay: true,
      },
      {
        url: '/projects/tg-figma.webp',
        type: 'image',
        alt: 'Figma design file for Tiffany Glam',
        overlay: true,
      },
    ],

    tags: ['Work', 'Web Design', 'Wix Studio', 'HoneyBook', 'Houston'],
  },

  {
    id: 'E-06',
    name: 'Electric Decisions',
    slug: 'electric-decisions',
    type: 'Full-Stack',
    capabilities: ['System Design', 'Data', 'APIs', 'Animation'],
    origin: 'work',
    status: 'live',
    featured: false,

    role: 'Full Stack Developer',

    summary: 'Texas electricity comparison site that folds hidden fees into a real per-kWh rate.',
    description:
      'Texas electricity comparison platform I built at National Grid X for evaluating plans beyond the advertised rate. The pricing engine processes 500+ offers and folds delivery charges, usage tiers, and bill credits into an effective cost based on usage. The platform also includes ZIP-based plan search, bill analysis from uploaded PDFs and photos, ESID lookup, savings estimates, and programmatic pages for Texas electricity markets.',

    dates: { started: '2026-06-24', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      backend: ['PostgreSQL', 'Prisma', 'Redis', 'Papa Parse'],
      platform: ['Vercel', 'Neon', 'Upstash', 'Sanity', 'Docker', 'Gemini API'],
      tools: ['GitHub', 'Cursor', 'Jest'],
    },

    features: [
      'ZIP-Based Plan Search',
      'Effective Rate Engine',
      'Bill Analyzer (PDF & Photo)',
      'ESID Address Lookup',
      'Savings Calculator',
      'Programmatic SEO Pages',
    ],

    links: {
      live: 'https://www.electricdecisions.com/',
      repo: null,
    },

    backdrop: {
      url: '/projects/bd-3.webp',
      type: 'image',
      alt: 'Building Backdrop 3',
    },

    demos: [
      {
        url: '/projects/electric-decisions-home-page.webm',
        type: 'video',
        alt: 'Screen recording of the Electric Decisions homepage',
        overlay: true,
      },
      {
        url: '/projects/electric-decisions-feat.webp',
        type: 'image',
        alt: 'Bill Analyzer feature section on Electric Decisions',
        overlay: true,
      },
      {
        url: '/projects/electric-decisions-hero.webp',
        type: 'image',
        alt: 'Electric Decisions homepage hero with ZIP code search',
        overlay: true,
      },
      {
        url: '/projects/electric-decisions-form.webp',
        type: 'image',
        alt: 'Plan comparison form on Electric Decisions',
        overlay: true,
      },
    ],

    featuredCanvas: null,

    tags: ['Work', 'Energy', 'Next.js', 'Comparison Tool', 'Texas'],
  },

  {
    id: 'E-07',
    name: 'Energy CRM',
    slug: 'energy-crm',
    type: 'Full-Stack',
    capabilities: ['System Design', 'Data', 'APIs', 'Security', 'Automation'],
    origin: 'work',
    status: 'live',
    featured: false,

    role: 'Full Stack Developer',

    summary: 'Broker CRM that runs energy deals from lead intake through signed contract.',
    description:
      'Internal CRM I built at National Grid X for managing commercial and residential energy deals from lead intake through enrollment. Commercial deals move through a matrix pipeline with supplier quote snapshots, ESID verification, interval data collection, RFP workflows, and proposal modeling. The residential side centralizes customer data and generates structured enrollment packets brokers can use to complete provider signups without jumping between separate systems.',

    dates: { started: '2026-07-01', ended: null },

    tech: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
      backend: ['PostgreSQL', 'Prisma', 'Redis', 'Better Auth', 'Ollama'],
      platform: ['Vercel', 'Neon', 'Docker', 'AWS', 'Cloudflare R2', 'Resend', 'Gemini API'],
      tools: ['GitHub', 'Cursor', 'Jest'],
    },

    features: [
      'Matrix Deal Pipeline',
      'Supplier Quote Snapshots',
      'RFP Workflow',
      'ESID & Interval Data',
      'Enrollment Packets',
      'Pricing Ingestion Pipeline',
    ],

    links: {
      live: null,
      repo: null,
    },

    backdrop: {
      url: '/projects/bd-5.webp',
      type: 'image',
      alt: 'Building Backdrop 5',
    },

    demos: [
      {
        url: '/projects/crm-commercial.webp',
        type: 'image',
        alt: 'Custom RFP deal workflow with ESID verification steps',
        overlay: true,
      },
      {
        url: '/projects/crm-commercial-2.webp',
        type: 'image',
        alt: 'Commercial deal detail view in Energy CRM',
        overlay: true,
      },
      {
        url: '/projects/crm-matrix-demo.webp',
        type: 'image',
        alt: 'Matrix pipeline board with a quote snapshot panel open',
        overlay: true,
      },
      {
        url: '/projects/crm-resi-demo.webp',
        type: 'image',
        alt: 'Residential customer record with enrollment packet panel',
        overlay: true,
      },
    ],

    featuredCanvas: null,

    tags: ['Work', 'CRM', 'Energy', 'Next.js', 'Internal Tool'],
  },

  {
    id: 'P-14',
    name: 'ESID Lookup',
    slug: 'esid-lookup',
    type: 'Full-Stack',
    capabilities: ['System Design', 'Data', 'APIs', 'Automation'],
    origin: 'work',
    status: 'live',
    featured: false,

    summary:
      'Address search across 13M+ ERCOT records that returns a Texas meter ID in under 100ms.',
    description:
      'Address search service I built at National Grid X over more than 13 million ERCOT meter records. A daily ingestion pipeline downloads raw utility extracts, normalizes the records, and batch-upserts them into PostgreSQL. Search layers exact B-tree lookups, trigram fuzzy matching for misspelled addresses, and prefix autocomplete, with Redis caching and graceful fallback keeping results under 100ms.',

    dates: { started: '2026-03-07', ended: null },

    tech: {
      frontend: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
      backend: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'csv-parse'],
      platform: ['Vercel', 'Docker', 'AWS EC2', 'AWS RDS', 'Linux'],
      tools: ['GitHub', 'VS Code', 'Jest', 'Bash'],
    },

    features: [
      '13M+ Record Pipeline',
      'Daily ERCOT Sync',
      'Exact & Fuzzy Search',
      'Trigram Indexing',
      'Redis Caching',
      'Address Autocomplete',
    ],

    links: {
      live: 'https://esid-lookup-frontend.vercel.app/',
      repo: null,
    },

    backdrop: {
      url: '/projects/bd-1.webp',
      type: 'image',
      alt: 'Building Backdrop 1',
    },

    demos: [
      {
        url: '/projects/esiid-lookup.webp',
        type: 'image',
        alt: 'ESID Lookup search result showing utility provider and load zone',
        overlay: true,
      },
    ],

    featuredCanvas: null,

    tags: ['Energy', 'ERCOT', 'Data Pipeline', 'PostgreSQL', 'Full Stack'],
  },
  {
    id: 'P-15',
    name: 'Grounded RAG',
    slug: 'grounded-rag',
    type: 'AI / ML',
    capabilities: ['System Design', 'Data'],
    stackHighlight: ['Python', 'FastAPI', 'Ollama'],
    origin: 'personal',
    status: 'repo',
    featured: false,

    summary:
      'Local-first RAG chat that answers from your documents with citations, inside 6K tokens.',
    description:
      'Local document Q&A app built around a strict 6,144-token context window. I combined BM25 and vector retrieval with deterministic token-budget packing to choose what reaches the model, then added source citations and refusals when evidence is missing. A custom evaluation harness with an LLM judge helped improve citation accuracy from 69% to 94%.',

    dates: { started: '2026-07-17', ended: '2026-07-20' },

    tech: {
      frontend: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
      backend: ['Python', 'FastAPI', 'Ollama', 'NumPy', 'tiktoken'],
      platform: [],
      tools: ['GitHub', 'Cursor', 'uv', 'pytest'],
    },

    features: [
      'Token-Budget Packing',
      'Hybrid BM25 + Vector Search',
      'Heading-Aware Chunking',
      'Cited Answers & Refusals',
      'Streaming Responses',
      'LLM Evaluation Harness',
    ],

    links: {
      live: null,
      repo: 'https://github.com/anthonynuge/Local-Rag-Chat-Bot',
    },

    backdrop: {
      url: '/projects/bd-3.webp',
      type: 'image',
      alt: 'Building Backdrop 3',
    },

    demos: [
      {
        url: '/projects/grounded-rag.webm',
        type: 'video',
        alt: 'Grounded RAG answering questions with cited sources while the debug REPL shows token budgets',
        overlay: true,
        poster: '/projects/grounded-rag.webp',
      },
      {
        url: '/projects/grounded-rag.webp',
        type: 'image',
        alt: 'Grounded RAG chat citing its source file beside a terminal showing the token budget and latency',
        overlay: true,
      },
    ],

    featuredCanvas: null,

    tags: ['AI', 'RAG', 'LLM', 'Local-First', 'Python', 'Evals'],
  },
  {
    id: 'P-16',
    name: 'Atlas',
    slug: 'atlas',
    type: 'Tools',
    capabilities: ['System Design', 'Data', 'Automation'],
    stackHighlight: ['Rust', 'SQLite', 'Ollama'],
    origin: 'personal',
    status: 'wip',
    featured: true,

    summary: 'Offline Rust CLI and daemon for undoable file management with local AI search.',
    description:
      'Built for my own workflow at Midnite Agency, where I regularly handle hundreds of images and creative assets. Atlas is a Rust CLI and Yazi plugin for repetitive file tasks, with a background daemon that watches folders and processes new files automatically. Ollama runs renaming, classification, OCR, and semantic search locally, keeping client files private and API-free, while SQLite journals every operation for one-step undo and the core keeps working without the AI.',

    dates: { started: '2026-07-03', ended: null },

    tech: {
      frontend: ['CLI (clap)', 'Yazi Plugin (Lua)'],
      backend: ['Rust', 'Tokio', 'SQLite', 'sqlite-vec', 'Ollama', 'BLAKE3'],
      platform: [],
      tools: ['GitHub', 'VS Code', 'Cargo'],
    },

    features: [
      'Undoable File Operations',
      'Duplicate Detection',
      'AI Renaming & Classification',
      'Semantic File Search',
      'Background Watch Daemon',
      'Screenshot OCR',
    ],

    links: {
      live: null,
      repo: 'https://github.com/anthonynuge/atlas',
    },

    backdrop: {
      url: '/projects/bd-2.webp',
      type: 'image',
      alt: 'Building Backdrop 2',
    },

    demos: [
      {
        url: '/projects/atlas-rename.webm',
        type: 'video',
        alt: 'Atlas renaming files with local AI suggestions',
        overlay: true,
        poster: '/projects/atlas-rename.webp',
      },
      {
        url: '/projects/atlas-organize.webm',
        type: 'video',
        alt: 'Atlas organizing a folder by prompt',
        overlay: true,
        poster: '/projects/atlas-rename.webp',
      },
      {
        url: '/projects/atlas-rename.webp',
        type: 'image',
        alt: 'Atlas AI rename preview in Yazi turning 11 generic filenames into descriptive ones',
        overlay: true,
      },
      {
        url: '/projects/atlas-search.webp',
        type: 'image',
        alt: 'Atlas semantic search in Yazi answering a question with a cited source document',
        overlay: true,
      },
    ],

    featuredCanvas: '/projects/atlas-rename.webp',

    tags: ['CLI', 'Rust', 'Local-First', 'AI', 'Semantic Search', 'Daemon'],
  },
]
