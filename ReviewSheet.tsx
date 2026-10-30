import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeftIcon, CheckIcon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import { Thumb } from '../components/Thumb';
import { useLibrary } from '../contexts/LibraryContext';
import type { Pile } from '../types';

interface Decision {
  deleted: boolean;
  mb: number;
}

function formatSize(mb: number) {
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`;
}

export function ReviewSheet({
  pile,
  onBack,
  onClose




}: {pile: Pile;onBack: () => void;onClose: () => void;}) {
  const { recordCleanup } = useLibrary();
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const direction = useRef(1);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-7, 7]);
  const deleteHint = useTransform(x, [-110, -25], [1, 0]);
  const keepHint = useTransform(x, [25, 110], [0, 1]);

  const index = decisions.length;
  const item = pile.items[index];
  const deletedCount = decisions.filter((d) => d.deleted).length;
  const freed = decisions.reduce((sum, d) => sum + (d.deleted ? d.mb : 0), 0);

  const decide = (deleted: boolean) => {
    if (!item) return;
    direction.current = deleted ? -1 : 1;
    x.set(0);
    setDecisions((prev) => [...prev, { deleted, mb: item.mb }]);
  };

  const undo = () => {
    direction.current = 1;
    x.set(0);
    setDecisions((prev) => prev.slice(0, -1));
  };

  const finish = () => {
    if (deletedCount > 0) recordCleanup(pile.id, deletedCount, freed);
    onBack();
  };

  return (
    <motion.section
      role="dialog"
      aria-label={`Review ${pile.title} one by one`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 z-30 flex flex-col bg-surface">
      
      <header className="flex items-center gap-3 px-5 pb-3 pt-4">
        <button
          type="button"
          onClick={item ? onBack : finish}
          aria-label="Back to all photos in this pile"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/6 text-ink transition-colors duration-150 ease-soft hover:bg-ink/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
          
          <ArrowLeftIcon className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[15px] font-bold text-ink">{pile.title}</p>
          <p className="text-[12px] text-ink-faint">
            {item ? `${index + 1} of ${pile.items.length}` : 'All done'} · one at a time
          </p>
        </div>
        {index > 0 && item &&
        <button
          type="button"
          onClick={undo}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 font-display text-[13px] font-bold text-ink-soft transition-colors duration-150 ease-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
          
            <RotateCcwIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
            Undo
          </button>
        }
      </header>

      <div className="mx-5 h-1 overflow-hidden rounded-full bg-ink/8" aria-hidden="true">
        <motion.span
          className="block h-full rounded-full bg-spruce"
          animate={{ width: `${index / pile.items.length * 100}%` }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} />
        
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <AnimatePresence mode="wait">
          {item ?
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction.current * 60, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-1 flex-col">
            
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-sand px-3 py-1.5 font-display text-[12px] font-bold text-ink-soft">
                {item.reason}
              </span>

              <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.55}
              style={{ x, rotate }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) decide(true);else
                if (info.offset.x > 100) decide(false);
              }}
              className="relative flex flex-1 cursor-grab touch-pan-y active:cursor-grabbing">
              
                {item.kind === 'duplicate' ?
              <ul className="grid flex-1 grid-cols-2 gap-2.5">
                    {item.frames.map((frame, i) =>
                <li key={i} className="flex flex-col">
                        <div
                    className={`relative flex-1 overflow-hidden rounded-3xl bg-sand ${
                    frame.best ? 'ring-[3px] ring-spruce' : 'ring-1 ring-ink/10'}`
                    }>
                    
                          <Thumb frame={frame} rounded="rounded-3xl" />
                        </div>
                        <p
                    className={`mt-2 text-center font-display text-[12px] font-bold ${
                    frame.best ? 'text-spruce' : 'text-ink-faint'}`
                    }>
                    
                          {frame.best ? `Keeping · ${frame.label}` : frame.label}
                        </p>
                      </li>
                )}
                  </ul> :

              <div className="relative flex-1 overflow-hidden rounded-4xl bg-sand ring-1 ring-ink/10">
                    <Thumb frame={item.frames[0]} rounded="rounded-4xl" />
                  </div>
              }

                <motion.span
                style={{ opacity: deleteHint }}
                className="pointer-events-none absolute left-4 top-4 rounded-full bg-clay px-3.5 py-1.5 font-display text-[12px] font-bold uppercase tracking-wide text-white">
                
                  Delete
                </motion.span>
                <motion.span
                style={{ opacity: keepHint }}
                className="pointer-events-none absolute right-4 top-4 rounded-full bg-spruce px-3.5 py-1.5 font-display text-[12px] font-bold uppercase tracking-wide text-white">
                
                  Keep
                </motion.span>
              </motion.div>

              <p className="mt-3 text-center text-[12px] text-ink-faint">{item.meta}</p>

              <div className="mt-3 flex gap-3">
                <button
                type="button"
                onClick={() => decide(false)}
                className="flex-1 rounded-3xl border border-ink/12 py-4 font-display text-[15px] font-bold text-ink transition-colors duration-150 ease-soft hover:bg-ink/4 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
                
                  {item.kind === 'duplicate' ? 'Keep both' : 'Keep'}
                </button>
                <button
                type="button"
                onClick={() => decide(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-3xl bg-clay py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50">
                
                  <Trash2Icon className="h-4 w-4" strokeWidth={2.4} />
                  {item.kind === 'duplicate' ? 'Delete the other' : 'Delete'}
                </button>
              </div>
              <p className="mt-2 text-center text-[11.5px] text-ink-faint">
                Swipe left to delete, right to keep
              </p>
            </motion.div> :

          <motion.div
            key="done"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-1 flex-col items-center justify-center text-center">
            
              <motion.span
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.06, duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-spruce">
              
                <CheckIcon className="h-8 w-8" strokeWidth={3} />
              </motion.span>
              <h2 className="mt-5 font-display text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-ink">
                {deletedCount > 0 ? `You freed ${formatSize(freed)}` : 'All reviewed'}
              </h2>
              <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-ink-soft">
                {deletedCount > 0 ?
              `${deletedCount} ${deletedCount === 1 ? 'item' : 'items'} moved to Recently Deleted. You have 30 days to change your mind.` :
              'Nothing deleted — everything you looked at is staying put.'}
              </p>
              <div className="mt-8 flex w-full flex-col gap-2.5">
                <button
                type="button"
                onClick={finish}
                className="w-full rounded-3xl bg-ink py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
                
                  Back to the pile
                </button>
                <button
                type="button"
                onClick={() => {
                  if (deletedCount > 0) recordCleanup(pile.id, deletedCount, freed);
                  onClose();
                }}
                className="w-full rounded-3xl py-3 font-display text-[14px] font-bold text-ink-soft transition-colors duration-150 ease-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
                
                  Done for now
                </button>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.section>);

}