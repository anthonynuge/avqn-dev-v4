// Utility function to create URL-friendly slugs
export const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export const sampleProjects = [
  {
    id: 'P-01',
    name: 'Susan-AI',
    slug: 'susan-ai',
    date: '2025-02-01', // from "Feb 2025 - aprox 3 weeks"
    cover: '/projects/project1.jpg', // image empty, using gif as cover
    description:
      'ChatGPT-inspired assistant powered by Gemini Flash 2.0. I built it as an AI alternative for times when I ran out of free ChatGPT calls—and because I wanted to create something AI-driven myself. Users can sign up, create an account, and chat, ask questions, or even generate code. Responses are rendered in markdown with built-in syntax highlighting for a clean, readable experience.',
    // 'Your new AI companion utilizing gemini. Sign up to make calls.',
    techStack: {
      frontend: ['React', 'Vite', 'TypeScript', 'HTML, CSS', 'Tailwind', 'Framer Motion'],
      backend: ['Apprwrite (Auth, Database)', 'Node.js', 'Gemini API'],
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
    content:
      'ChatGPT-inspired assistant powered by Gemini Flash 2.0. I built it as an AI alternative for times when I ran out of free ChatGPT calls—and because I wanted to create something AI-driven myself. Users can sign up, create an account, and chat, ask questions, or even generate code. Responses are rendered in markdown with built-in syntax highlighting for a clean, readable experience.',
  },

  {
    id: 'P-02',
    name: 'Portfolio Website',
    slug: 'portfolio-website',
    date: '2025-02-01', // from "Feb 2025 - aprox 2 weeks"
    cover: '/projects/project2.jpg', // image empty, using gif as cover
    description:
      "You're looking at it right now! This site is a collection of my projects and accomplishments so far in my coding journey. I'm not a UI/UX expert or a designer, but I’ve built this with things I find cool, in a way that I think looks cool. As I grow as a developer, this site will keep evolving with me.",
    techStack: {
      frontend: ['React', 'Vite', 'JavaScript', 'HTML, CSS', 'Tailwind', 'Framer Motion'],
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
  },

  {
    id: 'P-03',
    name: 'Fruit Vision',
    slug: 'fruit-vision',
    date: '2024-11-01', // from "Nov 2024 - Dec 2024"
    cover: '/projects/project1.jpg',
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
    liveUrl: '',
    githubUrl: 'https://github.com/anthonynuge/Fruit-Identification-CNN',
    content:
      'Commissioned project using python and machine learning. The client wanted a standalone app where they could input images of fruits and have the model classify what type it is with confidence reports. Each image is vectorized into numerical data and a convulational neural net was then applied to learn patterns and make predictions. Although Fruit Vision was made to classify fruit the model can be trained to classify any image if loaded with enough training data.',
  },
  {
    id: 'P-04',
    name: 'Maze Solver',
    slug: 'maze-solver',
    date: '2024-12-01', // approx. from “winter break” (adjust if needed)
    cover: '/projects/project2.jpg',
    description:
      'I built Maze Solver during winter break after studying DSA to better visualize how different pathfinding algorithms traverse a grid. Got tired of constantly drawing mazes so I implemented a maze generator. Built entirely in Java, with Swing for the frontend, this project deepened my understanding of algorithmic problem-solving while creating an interactive learning tool.',
    // 'Built in Java, this maze solver app was created to help vizualize different pathfining algorithms',
    techStack: {
      frontend: ['Java Swing', 'JavaFX', 'Java AWT'],
      backend: ['Java'],
      tools: ['IntelliJ IDEA', 'Maven', 'GitHub'],
    },
    features: ['GUI Application', 'Algorithm Visualization', 'Interactive UI'],
    liveUrl: '',
    githubUrl: 'https://github.com/anthonynuge/pathfinding_visualization',
    content:
      'I built Maze Solver during winter break after studying DSA to better visualize how different pathfinding algorithms traverse a grid. Got tired of constantly drawing mazes so I implemented a maze generator. Built entirely in Java, with Swing for the frontend, this project deepened my understanding of algorithmic problem-solving while creating an interactive learning tool.',
  },

  {
    id: 'P-05',
    name: 'Fake News Or Nah',
    slug: 'fake-news-or-nah',
    date: '2024-03-01', // from "Mar 2024 - May 2024"
    cover: '/images/portfolio.png',
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
    liveUrl: '',
    githubUrl: 'https://github.com/anthonynuge/fake-news-detection-app',
    content:
      "A concerning issue in today's digital society is the rampant spread of misinformation online. I decided to tackle this issue for my capstone. Using machine learning and natural language processing I trained a model to analyze different news articles for fake news.",
  },

  {
    id: 'P-06',
    name: 'E-commerce Dashboard',
    slug: 'e-commerce-dashboard',
    date: '2024-01-01', // date not specified; set a placeholder if you prefer
    cover: '/images/ecommerce.png',
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
