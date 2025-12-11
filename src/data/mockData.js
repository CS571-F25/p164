/* src/data/mockData.js */
export const initialProjects = [
  {
    id: 1,
    title: "AI TCG Simulator",
    description: "Monte Carlo simulation engine for competitive trading card games.",
    fullDescription: "Built a custom heuristic engine using Node.js to simulate 10,000+ matches per second. Utilized OpenAI API to generate dynamic card flavor text and art. This project solved the problem of balancing game mechanics before physical printing.",
    technologies: ["React", "OpenAI API", "Node.js", "Redis"],
    takeaways: ["Algorithm Optimization", "Third-party API Integration"],
    img: "https://placehold.co/600x400/667eea/ffffff?text=AI+TCG",
    demoLink: "https://example.com",
    repoLink: "https://github.com/CS571-F25/p164",
    category: "AI / Data",
    date: "2024-03-15",
    featured: true
  },
  {
    id: 2,
    title: "DevFolio Enterprise",
    description: "A glassmorphism-based CMS for developer portfolios.",
    fullDescription: "A fully responsive React application featuring secure admin authentication, dynamic content management, and an Apple-inspired UI design system. Features include a real-time project editor, auth context, and persistent storage.",
    technologies: ["React", "Vite", "Framer Motion", "Bootstrap"],
    takeaways: ["UI/UX Design", "State Management", "Routing"],
    img: "https://placehold.co/600x400/764ba2/ffffff?text=DevFolio",
    demoLink: "https://cs571-f25.github.io/p164/",
    repoLink: "https://github.com/CS571-F25/p164",
    category: "Frontend",
    date: "2024-10-20",
    featured: true
  },
  {
    id: 3,
    title: "E-Commerce Microservices",
    description: "Scalable backend architecture for high-volume retail.",
    fullDescription: "Designed a microservices architecture using Docker and Kubernetes to handle inventory, authentication, and payments as separate scalable units. Implemented a reliable message queue for order processing.",
    technologies: ["Node", "Express", "MongoDB", "Docker"],
    takeaways: ["System Architecture", "Containerization"],
    img: "https://placehold.co/600x400/ff758c/ffffff?text=Backend",
    demoLink: "",
    repoLink: "https://github.com",
    category: "Backend",
    date: "2023-11-05",
    featured: false
  }
];

// ... (keep profileData as is) ...

export const profileData = {
  name: "Morgan Hardjadinata",
  title: "Full Stack Engineer & UI Designer",
  bio: "I craft digital experiences that live at the intersection of robust engineering and pixel-perfect design. Specialized in React ecosystems and scalable backend infrastructure.",
  email: "morgan@example.com",
  github: "https://github.com/CS571-F25/p164",
  skills: [
    { name: "React / Native", level: 90 },
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "Node.js", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Python", level: 75 }
  ],
  experience: [
    {
      role: "Senior Student Developer",
      company: "UW-Madison",
      date: "2023 - Present",
      desc: "Leading frontend architecture for research data visualization tools."
    },
    {
      role: "Software Intern",
      company: "Tech Giant Corp",
      date: "Summer 2024",
      desc: "Optimized database queries reducing load times by 40%."
    }
  ]
};