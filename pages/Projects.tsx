
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASE_STUDIES } from '../constants';
import { Perspective } from '../types';

const Projects: React.FC = () => {
  const [activePerspectives, setActivePerspectives] = useState<Record<string, Perspective>>(
    CASE_STUDIES.reduce((acc, study) => ({ ...acc, [study.id]: Perspective.USER }), {})
  );

  const togglePerspective = (projectId: string, p: Perspective) => {
    setActivePerspectives(prev => ({ ...prev, [projectId]: p }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <header className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-4 tracking-tight"
        >
          Selected Cases
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-500 max-w-2xl text-lg font-light"
        >
          Proven solutions for complex business problems. Use the perspective toggle to audit the engineering depth behind each result.
        </motion.p>
      </header>

      <div className="space-y-32">
        {CASE_STUDIES.map((project, idx) => (
          <motion.section 
            key={project.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] block mb-2">
                  0{idx + 1} // Platform
                </span>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">{project.title}</h3>
                <p className="text-zinc-400 leading-relaxed italic border-l-2 border-zinc-800 pl-6 py-1">
                  "{project.context}"
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-[0.2em]">The Challenge</h4>
                <p className="text-zinc-300 leading-relaxed font-light">{project.problem}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-[0.2em]">Engineered Solution</h4>
                <p className="text-zinc-300 leading-relaxed font-light">{project.solution}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {project.result}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-full min-h-[450px] shadow-2xl relative">
              <div className="flex bg-zinc-900/50 border-b border-zinc-800">
                {(Object.values(Perspective)).map((p) => (
                  <button
                    key={p}
                    onClick={() => togglePerspective(project.id, p)}
                    className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      activePerspectives[project.id] === p 
                      ? 'bg-zinc-100 text-black' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              
              <div className="p-10 flex-1 relative overflow-hidden">
                {/* Visual texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePerspectives[project.id]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 relative z-10"
                  >
                    <div className="inline-block px-2 py-0.5 rounded border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">
                      Audit Mode: {activePerspectives[project.id]}
                    </div>
                    <h5 className="text-2xl font-bold tracking-tight text-white">
                      {project.perspectives[activePerspectives[project.id]].title}
                    </h5>
                    <p className="text-zinc-400 leading-relaxed text-base font-light">
                      {project.perspectives[activePerspectives[project.id]].content}
                    </p>
                    
                    <div className="pt-12">
                      <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent mb-4" />
                      <pre className="text-[10px] mono text-zinc-600 flex justify-between">
                        <span>// timestamp: {new Date().getFullYear()}.0{idx + 1}</span>
                        <span>// state: production_ready</span>
                      </pre>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Projects;
