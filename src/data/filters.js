// Filter config for the Projects page. Lives outside projects.js so vault publishes don't touch it.

// Matches project.type
export const categories = ['Full-Stack', 'Frontend', 'AI / ML', 'Tools']

// Matches project.capabilities
export const capabilities = [
  'System Design',
  'Data',
  'APIs',
  'Payments',
  'Security',
  'Automation',
  'Animation',
]

export const origins = { Professional: 'work', Personal: 'personal' }

// Recruiter-facing skills, grouped like a job posting's requirements
export const skillGroups = {
  Languages: ['TypeScript', 'Python', 'Java', 'Rust'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js'],
  Backend: ['Node.js', 'Express', 'FastAPI', 'Spring Boot'],
  Databases: ['PostgreSQL', 'Redis', 'MongoDB', 'Supabase'],
  'Cloud & DevOps': ['Vercel', 'AWS', 'Docker'],
  'AI / ML': ['LLM APIs', 'TensorFlow', 'Scikit-Learn', 'Ollama'],
  Integrations: ['Stripe', 'Auth'],
}

// Skills that roll up several tech names; everything else matches its own name exactly
const aliases = {
  AWS: ['AWS', 'AWS EC2', 'AWS RDS', 'AWS KMS'],
  'LLM APIs': ['Gemini API'],
  Auth: ['NextAuth', 'Better Auth', 'Supabase Auth', 'Appwrite Auth', 'JWT'],
}

export const hasSkill = (project, skill) => {
  const tech = Object.values(project.tech).flat()
  return (aliases[skill] ?? [skill]).some((t) => tech.includes(t))
}

export const initialFilters = {
  category: null,
  origin: null,
  live: false,
  capabilities: [],
  skills: [],
}

// Stack column: a project's stackHighlight wins; otherwise its top 3 tech by this order.
// Frameworks and data stores say more than languages or hosting, so they rank first.
const stackPriority = [
  'Next.js',
  'React',
  'Spring Boot',
  'Express',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'MongoDB',
  'Supabase',
  'Neon',
  'Stripe',
  'Gemini API',
  'Ollama',
  'faster-whisper',
  'TensorFlow',
  'Scikit-Learn',
  'Three.js',
  'GSAP',
  'Framer Motion',
  'Docker',
  'AWS',
  'TypeScript',
  'Python',
  'Java',
]

// Skip tech the column already implies (Next.js → React, Express → Node.js)
const impliedBy = { React: 'Next.js', 'Node.js': 'Express' }

export const topStack = (project) => {
  if (project.stackHighlight) return project.stackHighlight
  const all = Object.values(project.tech).flat()
  const tech = all.filter((t) => !all.includes(impliedBy[t]))
  const ranked = stackPriority.filter((t) => tech.includes(t))
  // ponytail: projects with little ranked tech fall back to their listed order
  return [...new Set([...ranked, ...tech])].slice(0, 3)
}
