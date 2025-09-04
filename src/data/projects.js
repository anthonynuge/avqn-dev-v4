// Utility function to create URL-friendly slugs
const createSlug = (name) => {
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
    name: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    type: 'Full Stack',
    date: '2024-01-15',
    status: 'Completed',
    cover: '/projects/project1.jpg',
    description:
      'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management, payment processing, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    techStack: {
      frontend: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router'],
      backend: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      tools: ['Git', 'Docker', 'AWS', 'Stripe API'],
    },
    features: [
      'Real-time inventory tracking',
      'Secure payment processing',
      'Admin dashboard with analytics',
      'Responsive mobile design',
      'User authentication & authorization',
    ],
    liveUrl: 'https://ecommerce-demo.com',
    githubUrl: 'https://github.com/username/ecommerce-platform',
  },
  {
    id: 'P-02',
    name: 'Task Management App',
    slug: 'task-management-app',
    type: 'Frontend',
    date: '2024-02-20',
    status: 'Completed',
    cover: '/projects/project2.jpg',
    description:
      'A collaborative task management application with drag-and-drop functionality, team collaboration features, and real-time updates.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
    techStack: {
      frontend: ['React', 'TypeScript', 'Material-UI', 'React DnD'],
      backend: ['Firebase', 'Firestore'],
      tools: ['Git', 'Vite', 'ESLint', 'Prettier'],
    },
    features: [
      'Drag-and-drop task organization',
      'Real-time collaboration',
      'Team member management',
      'Progress tracking',
      'Deadline notifications',
    ],
    liveUrl: 'https://taskmanager-demo.com',
    githubUrl: 'https://github.com/username/task-manager',
  },
  {
    id: 'P-03',
    name: 'API Gateway Service',
    slug: 'api-gateway-service',
    type: 'Backend',
    date: '2024-03-10',
    status: 'In Progress',
    cover: '/projects/project1.jpg',
    description:
      'A microservices API gateway built with Express.js, featuring rate limiting, authentication, and request routing.',
    technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
    techStack: {
      frontend: [],
      backend: ['Node.js', 'Express', 'Redis', 'JWT', 'Helmet'],
      tools: ['Docker', 'Kubernetes', 'Git', 'Jest', 'Swagger'],
    },
    features: [
      'Request routing and load balancing',
      'Rate limiting and throttling',
      'JWT-based authentication',
      'Request/response logging',
      'Health check endpoints',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/username/api-gateway',
  },
  {
    id: 'P-04',
    name: 'Portfolio Website',
    slug: 'portfolio-website',
    type: 'Frontend',
    date: '2024-03-25',
    status: 'Completed',
    cover: '/projects/project1.jpg',
    description:
      'A modern, responsive portfolio website showcasing projects and skills with smooth animations and dark theme.',
    technologies: ['React', 'GSAP', 'Tailwind CSS', 'Vite'],
    techStack: {
      frontend: ['React', 'GSAP', 'Tailwind CSS', 'React Router'],
      backend: [],
      tools: ['Vite', 'Git', 'Netlify', 'Figma'],
    },
    features: [
      'Smooth scroll animations',
      'Dark/light theme toggle',
      'Project showcase gallery',
      'Contact form integration',
      'Mobile-responsive design',
    ],
    liveUrl: 'https://portfolio-demo.com',
    githubUrl: 'https://github.com/username/portfolio',
  },
  {
    id: 'P-05',
    name: 'Data Visualization Dashboard',
    slug: 'data-visualization-dashboard',
    type: 'Full Stack',
    date: '2024-04-05',
    status: 'Completed',
    cover: '/projects/project1.jpg',
    description:
      'An interactive dashboard for visualizing business metrics with real-time data updates and customizable charts.',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    techStack: {
      frontend: ['React', 'D3.js', 'Chart.js', 'Tailwind CSS'],
      backend: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy'],
      tools: ['Docker', 'Git', 'AWS', 'Prometheus'],
    },
    features: [
      'Interactive data visualizations',
      'Real-time data updates',
      'Customizable dashboard layouts',
      'Export functionality',
      'User role management',
    ],
    liveUrl: 'https://dashboard-demo.com',
    githubUrl: 'https://github.com/username/data-dashboard',
  },
  {
    id: 'P-06',
    name: 'Mobile Weather App',
    slug: 'mobile-weather-app',
    type: 'Frontend',
    date: '2024-04-18',
    status: 'Completed',
    cover: '/projects/project2.jpg',
    description:
      'A responsive weather application with location-based forecasts, weather maps, and push notifications.',
    technologies: ['React Native', 'Expo', 'OpenWeather API', 'AsyncStorage'],
    techStack: {
      frontend: ['React Native', 'Expo', 'NativeBase'],
      backend: ['OpenWeather API'],
      tools: ['Git', 'Expo CLI', 'Figma', 'App Store Connect'],
    },
    features: [
      'Location-based weather data',
      '7-day weather forecasts',
      'Weather maps integration',
      'Push notifications',
      'Offline data caching',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/username/weather-app',
  },
]

export const initialFilters = {
  frontend: {
    React: false,
    'Vue.js': false,
    Angular: false,
    TypeScript: false,
    JavaScript: false,
    'Tailwind CSS': false,
    'Material-UI': false,
    GSAP: false,
    'React Native': false,
    Expo: false,
  },
  backend: {
    'Node.js': false,
    Express: false,
    Python: false,
    FastAPI: false,
    MongoDB: false,
    PostgreSQL: false,
    Redis: false,
    JWT: false,
    Firebase: false,
    Docker: false,
  },
  tools: {
    Git: false,
    Docker: false,
    AWS: false,
    Vite: false,
    Webpack: false,
    Jest: false,
    ESLint: false,
    Figma: false,
    Kubernetes: false,
    Swagger: false,
  },
}
