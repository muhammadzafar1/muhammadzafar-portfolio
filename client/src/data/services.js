import { FiLayers, FiServer, FiDatabase, FiLayout, FiPhone, FiShield } from 'react-icons/fi'

const services = [
  {
    title: 'Frontend Development',
    description: 'Modern user interfaces with React and Tailwind UI.',
    subtitle: 'Fast, accessible and beautiful interfaces',
    lead: 'I turn designs into clean, responsive and high-performance interfaces. Every page is built with reusable React components and consistent Tailwind styling, so your site looks sharp on every device and is easy to grow later.',
    features: ['Pixel-perfect, responsive layouts', 'Reusable React components', 'Smooth animations and hover effects', 'Accessible, SEO-friendly markup'],
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'Vite'],
    steps: [
      { title: 'Understand', text: 'Review your design, goals and audience.' },
      { title: 'Build', text: 'Develop components and pages mobile-first.' },
      { title: 'Polish', text: 'Test on real devices and refine details.' },
      { title: 'Deliver', text: 'Hand over clean, documented code.' }
    ],
    icon: FiLayout
  },
  {
    title: 'Backend Development',
    description: 'Scalable APIs and application services with Node.js.',
    subtitle: 'Reliable servers that scale with you',
    lead: 'I build secure and well-structured server-side applications using Node.js and Express. From authentication to business logic, the backend is organized so it stays fast, maintainable and ready for more users.',
    features: ['Clean Node.js and Express architecture', 'Authentication and authorization', 'Error handling and logging', 'Ready for deployment'],
    tech: ['Node.js', 'Express', 'JWT', 'Postman'],
    steps: [
      { title: 'Plan', text: 'Define data flow and features.' },
      { title: 'Develop', text: 'Create routes, services and middleware.' },
      { title: 'Test', text: 'Check every endpoint and edge case.' },
      { title: 'Deploy', text: 'Launch and monitor in production.' }
    ],
    icon: FiServer
  },
  {
    title: 'MERN Stack Development',
    description: 'Full stack applications with React, Express, and MongoDB.',
    subtitle: 'One developer, the whole product',
    lead: 'Complete web applications from database to user interface using MongoDB, Express, React and Node.js. You get one consistent codebase and one person responsible for the full result.',
    features: ['End-to-end feature development', 'Frontend and API fully connected', 'Secure user accounts and data', 'Admin panel when needed'],
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    steps: [
      { title: 'Scope', text: 'Turn your idea into a clear feature list.' },
      { title: 'Design data', text: 'Model the database and API.' },
      { title: 'Build', text: 'Develop frontend and backend together.' },
      { title: 'Launch', text: 'Deploy, test and support.' }
    ],
    icon: FiLayers
  },
  {
    title: 'REST API Development',
    description: 'Clean endpoints, validation, and integration-ready services.',
    subtitle: 'Safe, documented and easy to connect',
    lead: 'Well-designed REST APIs that other apps, websites and mobile apps can connect to with confidence. Requests are validated, responses are consistent, and everything is documented.',
    features: ['Consistent, RESTful endpoints', 'Input validation and security', 'Clear API documentation', 'Third-party integrations'],
    tech: ['Express', 'Mongoose', 'Joi or Zod', 'Swagger'],
    steps: [
      { title: 'Design', text: 'Map resources and endpoints.' },
      { title: 'Implement', text: 'Write validated, secured routes.' },
      { title: 'Document', text: 'Provide examples and docs.' },
      { title: 'Integrate', text: 'Connect with your apps and services.' }
    ],
    icon: FiShield
  },
  {
    title: 'Database Design',
    description: 'Efficient MongoDB schemas and query optimization.',
    subtitle: 'Data organized for speed and growth',
    lead: 'Smart MongoDB schema design and query tuning so your app stays fast as data grows. I model relationships carefully and add the indexes that really matter.',
    features: ['Well-structured MongoDB schemas', 'Indexing and query optimization', 'Data validation rules', 'Backup-friendly structure'],
    tech: ['MongoDB Atlas', 'Mongoose', 'Indexes', 'Aggregation'],
    steps: [
      { title: 'Analyze', text: 'Study your data and access patterns.' },
      { title: 'Model', text: 'Design schemas and relations.' },
      { title: 'Optimize', text: 'Add indexes and tune queries.' },
      { title: 'Maintain', text: 'Review performance over time.' }
    ],
    icon: FiDatabase
  },
  {
    title: 'Responsive Web Design',
    description: 'Pixel-perfect layouts for desktop, tablet, and mobile.',
    subtitle: 'One site that fits every screen',
    lead: 'Layouts that adapt smoothly from small phones to large monitors. I build mobile-first, test on real breakpoints and make sure nothing overlaps, overflows or looks cramped.',
    features: ['Mobile-first, fluid layouts', 'Tested on all common screen sizes', 'Touch-friendly controls', 'Fast loading and smooth scrolling'],
    tech: ['Tailwind CSS', 'Flexbox', 'CSS Grid', 'Media queries'],
    steps: [
      { title: 'Audit', text: 'Check the current screens and issues.' },
      { title: 'Rebuild', text: 'Apply fluid, mobile-first layouts.' },
      { title: 'Test', text: 'Verify from 320px to 1920px.' },
      { title: 'Finish', text: 'Final fixes and handover.' }
    ],
    icon: FiPhone
  }
]

export default services
