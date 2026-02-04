import React from 'react';
import { motion } from 'framer-motion';
import { DECISIONS } from '../constants';

const Architecture: React.FC = () => {
  const skillCategories = [
    {
      category: 'Frontend Core',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3']
    },
    {
      category: 'State Management',
      skills: ['Redux Toolkit', 'RTK Query', 'Zustand', 'Context API']
    },
    {
      category: 'UI & Styling',
      skills: ['Tailwind CSS', 'Material UI', 'Shadcn UI', 'SCSS/SASS', 'Responsive Design']
    },
    {
      category: 'Animation & Canvas',
      skills: ['P5.js', 'Framer Motion', 'DnD kit', 'SVG']
    },
    {
      category: 'Backend & Data',
      skills: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Nginx']
    },
    {
      category: 'Tools & Workflow',
      skills: ['Git', 'GitHub', 'Vercel', 'Jira', 'Agile/Scrum', 'Code Review']
    },
    {
      category: 'AI Integration',
      skills: ['OpenAI GPT API', 'Midjourney API', 'Structured JSON Parsing']
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <header className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Engineering Depth</h2>
        <p className="text-zinc-500 max-w-2xl">
          A look into how I make technical decisions and structure the systems I build. 
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            System Architecture (Portfolio)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 border border-zinc-700 rounded flex items-center justify-center text-[10px] font-mono text-zinc-400 uppercase">State</div>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <div className="px-3 py-1 bg-zinc-800 rounded text-xs">Zustand</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 border border-zinc-700 rounded flex items-center justify-center text-[10px] font-mono text-zinc-400 uppercase">View</div>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <div className="px-3 py-1 bg-zinc-800 rounded text-xs">React + Tailwind</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 border border-zinc-700 rounded flex items-center justify-center text-[10px] font-mono text-zinc-400 uppercase">Motion</div>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <div className="px-3 py-1 bg-zinc-800 rounded text-xs">Framer Motion</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 border border-zinc-700 rounded flex items-center justify-center text-[10px] font-mono text-zinc-400 uppercase">Data</div>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <div className="px-3 py-1 bg-zinc-800 rounded text-xs">JSON Static Layer</div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-black/50 rounded-lg border border-zinc-800/50">
            <p className="text-xs text-zinc-500 italic">"The site itself acts as a proof of concept for interaction management and performance-first animation."</p>
          </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Core Principles</h3>
           <div className="space-y-3">
              {[
                { title: 'Performance First', desc: 'No animation without a purpose. Keep bundles light.' },
                { title: 'Type Safety', desc: 'Interfaces are the contract between features.' },
                { title: 'Scalable Patterns', desc: 'Components should be as dumb as possible, services as smart as needed.' }
              ].map((principle, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="p-4 border-l-2 border-zinc-800 bg-zinc-900/30"
                >
                  <h4 className="font-bold text-sm">{principle.title}</h4>
                  <p className="text-xs text-zinc-400">{principle.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>

      <div className="space-y-12 mb-20">
        <h3 className="text-2xl font-bold">Trade-offs & Decisions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DECISIONS.map((item, i) => (
            <motion.div 
              key={i}
              className="p-8 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all bg-zinc-950/50"
            >
              <h4 className="text-xs font-mono text-blue-400 uppercase mb-4 tracking-tighter">Decision // {item.topic}</h4>
              <h5 className="text-xl font-bold mb-3">{item.decision}</h5>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{item.why}</p>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Trade-offs</span>
                <ul className="space-y-1">
                  {item.tradeoffs.map((t, idx) => (
                    <li key={idx} className="text-xs text-zinc-500 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-red-500/50 rounded-full shrink-0"></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-2xl font-bold">Technical Skills</h3>
          <div className="h-px bg-zinc-800 flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="p-6 border border-zinc-800 rounded-xl bg-zinc-950/30 hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors"></div>
                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                  {category.category}
                </h4>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 border border-zinc-800 rounded-2xl bg-gradient-to-br from-zinc-950 to-zinc-900/50"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
            <div>
              <h4 className="text-lg font-bold mb-2">2+ Years Commercial Experience</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Specialized in delivering scalable EdTech platforms, LMS systems, and CRM dashboards serving 200–10,000+ users. 
                Led frontend teams, conducted code reviews, and shipped deadline-critical features in Agile environments.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
              <div className="text-2xl font-bold text-emerald-500 mb-1">300-400</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Active Users (AiMektep)</div>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
              <div className="text-2xl font-bold text-blue-500 mb-1">~70%</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Content Creation Time Saved</div>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
              <div className="text-2xl font-bold text-purple-500 mb-1">30 FPS</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Stable Physics Performance</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Architecture;