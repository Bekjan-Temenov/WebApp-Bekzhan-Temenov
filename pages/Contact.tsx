
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const links = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bekjan-temenov', icon: '👤' },
    { label: 'GitHub', url: 'https://github.com/Bekjan-Temenov', icon: '💻' },
    { label: 'Telegram', url: 'https://t.me/temen0v', icon: '✈️' },
    { label: 'Email', url: 'mailto:temenovbekzan@gmail.com', icon: '✉️' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8"
      >
        <h2 className="text-5xl font-bold tracking-tight">Let's build something <span className="text-zinc-500 italic">meaningful</span>.</h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          I am currently open to Frontend / Fullstack Engineer roles where product thinking and engineering rigor are valued.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border border-zinc-800 rounded-2xl hover:bg-white hover:text-black hover:border-white transition-all group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</div>
              <div className="text-xs font-bold uppercase tracking-widest">{link.label}</div>
            </a>
          ))}
        </div>

        <div className="pt-16 space-y-4">
           <a 
            href="#" 
            className="inline-block px-12 py-4 bg-zinc-100 text-black font-bold rounded-full hover:bg-white transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]"
           >
             Download Full CV (PDF)
           </a>
           <p className="text-xs text-zinc-600">Bishkek-based // Remote // Relocation Friendly</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
