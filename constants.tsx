import { Perspective, CaseStudy, EngineeringDecision } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ai-mektep',
    title: 'AiMektep - AI-Powered Math Learning Platform',
    context: 'Game-based math education platform using AI to generate adaptive questions and real-time physics simulations. Prototype and demo version developed to validate interactive learning approach.',
    problem: 'Traditional digital learning platforms struggle with engagement. Students need interactive, visual feedback to understand complex math and physics concepts. Manual content creation is slow and expensive.',
    constraints: '4-month development timeline, physics simulations must run at stable 30 FPS on low-end devices, complex AI-generated JSON parsing, limited infrastructure budget.',
    solution: 'Built with Next.js, TypeScript, and Material UI. Developed 5 interactive physics-based games using P5.js and DnD-kit with custom drag-and-drop mechanics (balance scales, water flow simulation, color mixing, hangers, geometry). Integrated AI APIs for automated game element generation with structured JSON parsing. Implemented Redux Toolkit for complex state management across game progression and scoring.',
    result: 'Delivered fully working interactive demo with stable 30 FPS physics simulations and automated content generation pipeline. Architecture prepared for future scaling and production deployment.',
    perspectives: {
      [Perspective.USER]: {
        title: 'Interactive Learning Experience',
        content: 'Designed intuitive drag-and-drop mechanics for multi-step puzzles with immediate visual feedback and animated physics behavior, making abstract math concepts easier to understand.'
      },
      [Perspective.BUSINESS]: {
        title: 'Scalable Content Generation',
        content: 'AI-assisted generation significantly reduces manual content creation effort and enables rapid curriculum expansion in future production versions.'
      },
      [Perspective.TECH]: {
        title: 'Physics Simulations & Complex State',
        content: 'Engineered multiple physics-based mini-games with stable rendering performance and centralized Redux state management, ensuring predictable gameplay logic and extensibility.'
      }
    }
  },
  {
    id: 'mind-mentor',
    title: 'MindMentor - B2B Mentor Marketplace Platform',
    context: 'B2B platform for selling mentorship, lessons, and professional services. Includes Admin, Mentor, and User panels where mentors can create lessons, projects, teams, and paid services.',
    problem: 'Experts lacked a structured platform to monetize mentorship, manage students, and deliver structured learning or consulting services in one system.',
    constraints: 'Role-based architecture with 3 dashboards, complex content management, secure payments, and scalable frontend architecture.',
    solution: 'Built with React, TypeScript, Redux, MUI, and SASS. Implemented three-panel system (Admin, Mentor, User), mentor content creation flows, service listings, and structured interaction between mentors and users.',
    result: 'Delivered functional B2B mentorship platform demo demonstrating full mentor lifecycle: content creation, service publishing, and user interaction across role-based dashboards.',
    perspectives: {
      [Perspective.USER]: {
        title: 'Structured Mentor Interaction',
        content: 'Users can find mentors, access lessons or services, and interact through a clear multi-role interface designed for professional learning and consulting.'
      },
      [Perspective.BUSINESS]: {
        title: 'Mentor Monetization Model',
        content: 'Platform enables experts to sell lessons, services, and team collaboration, creating scalable revenue opportunities for educational or consulting businesses.'
      },
      [Perspective.TECH]: {
        title: 'Role-Based Frontend Architecture',
        content: 'Implemented scalable React + TypeScript architecture with Redux state management and modular dashboard separation for Admin, Mentor, and User roles.'
      }
    }
  },
  {
    id: 'drive-car',
    title: 'DriveCar - Car Sales Full-Stack Platform',
    context: 'Full-stack automobile sales platform built independently from scratch to working demo, including frontend, backend, and database architecture.',
    problem: 'Car sellers needed digital platform to present inventory, manage listings, and allow customers to browse and interact with available vehicles online.',
    constraints: 'Solo full-stack development, relational database design, secure backend API, and production-ready deployment configuration.',
    solution: 'Developed full-stack application using React, TypeScript, Tailwind, Redux, Node.js, Express, and PostgreSQL. Implemented vehicle catalog, detailed pages, admin management, and backend REST API.',
    result: 'Delivered complete working demo demonstrating full-stack architecture, CRUD operations, authentication flow, and deployment-ready backend structure.',
    perspectives: {
      [Perspective.USER]: {
        title: 'Simple Car Discovery',
        content: 'Users can browse available vehicles, view specifications, and interact with listings through a clean and responsive interface.'
      },
      [Perspective.BUSINESS]: {
        title: 'Digital Vehicle Sales Channel',
        content: 'Provides structured system for managing inventory and presenting vehicles online, forming the foundation for scalable car sales operations.'
      },
      [Perspective.TECH]: {
        title: 'End-to-End Full-Stack Delivery',
        content: 'Complete TypeScript-based stack from database to UI with REST API architecture and modular frontend state management.'
      }
    }
  },
  {
    id: 'edupath',
    title: 'Edupath - School Platform & Course System',
    context: 'Comprehensive school platform supporting multiple lesson types (sports, science, and others) with both offline and online education workflows.',
    problem: 'Educational organizations required unified system to present programs, manage lessons, and promote school activities across disciplines.',
    constraints: 'Content diversity, responsive UX, SEO visibility, and scalable structure for future expansion.',
    solution: 'Built modern web platform with structured lesson categories, responsive UI, and architecture suitable for institutional school promotion and course management.',
    result: 'Delivered production-ready school platform demo demonstrating structured education presentation and scalable architecture for institutional growth.',
    perspectives: {
      [Perspective.USER]: {
        title: 'Clear Education Navigation',
        content: 'Students and parents can easily explore lesson categories, formats, and school programs through intuitive navigation.'
      },
      [Perspective.BUSINESS]: {
        title: 'School Promotion & Structure',
        content: 'Platform supports institutional branding, program visibility, and structured presentation of educational services.'
      },
      [Perspective.TECH]: {
        title: 'Scalable Education Architecture',
        content: 'Designed flexible frontend structure allowing expansion of lesson types, formats, and administrative capabilities.'
      }
    }
  },
  {
    id: 'kaitech-lms',
    title: 'Kaitech Analytics Dashboard, LMS & Internal CRM',
    context: 'Enterprise internal system including analytics dashboard, LMS, and CRM used inside company environment for up to ~1000 employees.',
    problem: 'Company required unified internal platform for analytics, learning, and employee management with scalable architecture.',
    constraints: 'Enterprise RBAC, legacy integrations, strict deadlines, and maintainable frontend architecture for internal scaling.',
    solution: 'Led frontend architecture using Next.js and TypeScript, enforced code standards, implemented RBAC dashboards, analytics visualization, LMS flows, and internal CRM interfaces.',
    result: 'Delivered internal enterprise platform used within company environment, improving analytics visibility, structured learning, and internal management workflows.',
    perspectives: {
      [Perspective.USER]: {
        title: 'Internal Productivity Tools',
        content: 'Employees access analytics, learning materials, and internal systems through unified dashboards.'
      },
      [Perspective.BUSINESS]: {
        title: 'Operational Efficiency',
        content: 'Centralized internal platform improves decision-making, training processes, and employee workflow management.'
      },
      [Perspective.TECH]: {
        title: 'Enterprise Frontend Architecture',
        content: 'Scalable TypeScript architecture with RBAC, modular dashboards, and maintainable enterprise-grade structure.'
      }
    }
  }
];

export const DECISIONS: EngineeringDecision[] = [
  {
    topic: 'State Management',
    decision: 'Redux Toolkit for complex apps, Zustand for lightweight projects',
    why: 'Redux Toolkit fits large-scale predictable state flows, while Zustand enables simpler and faster development for smaller interaction-heavy apps.',
    tradeoffs: ['Redux adds boilerplate', 'Zustand has smaller ecosystem', 'State choice must match complexity']
  },
  {
    topic: 'Styling Strategy',
    decision: 'Tailwind CSS + UI libraries (Shadcn / MUI)',
    why: 'Utility-first styling accelerates development while UI libraries provide accessibility and consistency.',
    tradeoffs: ['Verbose class names', 'Requires discipline in design system', 'Learning curve for teams']
  },
  {
    topic: 'TypeScript Adoption',
    decision: 'Full TypeScript across stack',
    why: 'Prevents runtime errors, improves maintainability, and scales across teams and large codebases.',
    tradeoffs: ['Slower initial development', 'Complex typing in edge cases']
  }
];