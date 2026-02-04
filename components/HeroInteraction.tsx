import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import SystemBackground from './SystemBackground';

interface Item {
  id: string;
  content: string;
}

interface SortableItemProps {
  item: Item;
  index: number;
  isCorrectOrder: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, index, isCorrectOrder }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isDragging ? 0.5 : 1, 
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }}
      className={`
        group relative w-56 h-28 rounded-2xl border flex items-center justify-center font-mono text-sm cursor-grab active:cursor-grabbing transition-all duration-300
        ${isCorrectOrder ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]' : 'border-zinc-800 bg-zinc-900/80 backdrop-blur-sm'}
        ${isDragging ? 'opacity-50 z-0' : 'z-10'}
      `}
    >
      {/* Connector Lines */}
      {index < 2 && (
        <motion.div 
          className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-px"
          animate={{
            backgroundColor: isCorrectOrder ? 'rgba(16, 185, 129, 0.3)' : 'rgba(63, 63, 70, 1)',
            transition: { duration: 0.5 }
          }}
        />
      )}
      
      <motion.div 
        className="flex flex-col items-center gap-2 pointer-events-none"
        animate={{
          y: isDragging ? -2 : 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
      >
        <motion.span 
          className="text-[10px] uppercase tracking-[0.2em]"
          animate={{
            color: isCorrectOrder ? 'rgba(16, 185, 129, 0.7)' : 'rgba(161, 161, 170, 1)',
            transition: { duration: 0.3 }
          }}
        >
          Stage 0{index + 1}
        </motion.span>
        <motion.span 
          className="text-xl font-bold tracking-tight"
          animate={{
            color: isCorrectOrder ? 'rgba(236, 253, 245, 1)' : 'rgba(228, 228, 231, 1)',
            scale: isDragging ? 1.05 : 1,
            transition: {
              color: { duration: 0.3 },
              scale: { type: "spring", stiffness: 400, damping: 25 }
            }
          }}
        >
          {item.content}
        </motion.span>
        <motion.div 
          className="w-8 h-1 rounded-full mt-1"
          animate={{
            backgroundColor: isCorrectOrder ? 'rgba(16, 185, 129, 0.5)' : 'rgba(63, 63, 70, 1)',
            width: isDragging ? '48px' : '32px',
            transition: {
              backgroundColor: { duration: 0.5 },
              width: { type: "spring", stiffness: 400, damping: 25 }
            }
          }}
        />
      </motion.div>

      {/* Particle effects on correct order */}
      {isCorrectOrder && (
        <>
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-500/50 pointer-events-none"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-emerald-500/50 pointer-events-none"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
    </motion.div>
  );
};

const DragOverlayItem: React.FC<{ item: Item; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ 
        scale: 1.1,
        rotate: 2,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 30
        }
      }}
      className="relative w-56 h-28 rounded-2xl border border-white/20 bg-zinc-900/95 backdrop-blur-sm flex items-center justify-center font-mono text-sm shadow-[0_25px_50px_rgba(0,0,0,0.5)] ring-2 ring-white/20"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
      
      <div className="flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          Stage 0{index + 1}
        </span>
        <span className="text-xl font-bold tracking-tight text-zinc-100">
          {item.content}
        </span>
        <div className="w-12 h-1 rounded-full mt-1 bg-white/30" />
      </div>
    </motion.div>
  );
};

const HeroInteraction: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 'solution', content: 'Solution' },
    { id: 'problem', content: 'Problem' },
    { id: 'result', content: 'Result' }
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { setHeroComplete } = useStore();
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const isCorrectOrder = 
    items[0].content === 'Problem' && 
    items[1].content === 'Solution' && 
    items[2].content === 'Result';

  useEffect(() => {
    if (isCorrectOrder) {
      setHeroComplete(true);
    } else {
      setHeroComplete(false);
    }
  }, [items, isCorrectOrder, setHeroComplete]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  };

  const activeItem = items.find((item) => item.id === activeId);
  const activeIndex = items.findIndex((item) => item.id === activeId);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-12 px-6 select-none">
      <SystemBackground />
      
      <div className="text-center space-y-4 mb-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] mono text-zinc-500 uppercase tracking-widest mb-4"
        >
          Product Engineering System v1.0
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          BEKJAN <span className="text-zinc-500">TEMENOV</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 max-w-xl mx-auto text-lg md:text-xl font-light"
        >
          Building interactive systems, not pages. <br/>
          <span className="text-sm text-zinc-600 font-mono">Rearrange the flow to unlock engineering depth.</span>
        </motion.p>
      </div>

      <div className="relative z-10">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map(item => item.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {items.map((item, index) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  index={index}
                  isCorrectOrder={isCorrectOrder}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={null}>
            {activeItem ? (
              <DragOverlayItem item={activeItem} index={activeIndex} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <div className="mt-8 relative z-10 flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          {isCorrectOrder ? (
            <motion.button
              key="success"
              onClick={() => navigate('/projects')}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 60px -5px rgba(255,255,255,0.4)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 20
                }
              }}
              className="relative px-10 py-4 rounded-full bg-white text-black text-sm font-bold shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)] overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10">Open Case Studies →</span>
            </motion.button>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }
              }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-mono text-zinc-500 uppercase tracking-widest"
            >
              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                [ Status: Logic Pipeline Incomplete ]
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="flex gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button 
            onClick={() => navigate('/contact')} 
            className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors"
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.95 }}
          >
            Direct Contact
          </motion.button>
          <span className="text-zinc-800">/</span>
          <motion.button 
            onClick={() => navigate('/architecture')} 
            className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors"
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.95 }}
          >
            View Stack
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroInteraction;