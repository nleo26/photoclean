import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, LayersIcon, Trash2Icon, XIcon } from 'lucide-react';
import { FrameGrid } from '../components/FrameGrid';
import { useLibrary } from '../contexts/LibraryContext';
import { ReviewSheet } from './ReviewSheet';
import { useScreenInit } from '../useScreenInit.js';
import type { Pile } from '../types';

function formatSize(mb: number) {
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`;
}

export function PileSheet({
  pile,
  onClose,
  initialStep




}: {pile: Pile;onClose: () => void;initialStep?: 'overview' | 'review';}) {
  const { recordCleanup } = useLibrary();
  const screenInit = useScreenInit();
  const [step, setStep] = useState<'overview' | 'review'>(
    initialStep ?? (screenInit.pileStep === 'review' ? 'review' : 'overview')
  );
  const [selected, setSelected] = useState<number[]>([]);
  const [removed, setRemoved] = useState<number[]>([]);
  const [justDeleted, setJustDeleted] = useState(0);

  const avgMb = parseFloat(pile.freeable) * 1024 / pile.count;
  const allIndexes = pile.gallery.map((_, i) => i).filter((i) => !removed.includes(i));
  const remaining = allIndexes.length;
  const allSelected = remaining > 0 && selected.length === remaining;

  const toggle = (index: number) =>
  setSelected((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]);

  const deleteSelected = () => {
    recordCleanup(pile.id, selected.length, selected.length * avgMb);
    setRemoved((prev) => [...prev, ...selected]);
    setJustDeleted(selected.length);
    setSelected([]);
  };

  return (
    <motion.section
      role="dialog"
      aria-label={pile.title}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 z-20 flex flex-col bg-surface">
      
      <header className="flex items-start gap-3 px-5 pb-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to piles"
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/6 text-ink transition-colors duration-150 ease-soft hover:bg-ink/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
          
          <XIcon className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-[19px] font-bold leading-tight text-ink">
            {pile.title}
          </h2>
          <p className="mt-0.5 text-[12.5px] text-ink-faint">
            {pile.count - removed.length} items · up to {pile.freeable} to free
          </p>
        </div>
        {remaining > 0 &&
        <button
          type="button"
          onClick={() => setSelected(allSelected ? [] : allIndexes)}
          className="mt-1 shrink-0 font-display text-[13px] font-bold text-spruce transition-opacity duration-150 ease-soft hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50 rounded-full px-1">
          
            {allSelected ? 'Clear' : 'Select all'}
          </button>
        }
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-5 no-scrollbar">
        {justDeleted > 0 &&
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-3 flex items-start gap-2 rounded-2xl bg-mint-100 px-3.5 py-3 text-[12.5px] font-medium text-spruce-deep">
          
            <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={3} />
            {justDeleted} {justDeleted === 1 ? 'item' : 'items'} moved to Recently Deleted — 30 days
            to undo.
          </motion.p>
        }

        {remaining === 0 ?
        <div className="flex h-full flex-col items-center justify-center pb-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-100 text-spruce">
              <CheckIcon className="h-7 w-7" strokeWidth={3} />
            </span>
            <h3 className="mt-4 font-display text-[20px] font-bold text-ink">Pile cleared</h3>
            <p className="mt-1.5 max-w-[240px] text-[13.5px] leading-relaxed text-ink-soft">
              Nothing left to look at here.
            </p>
          </div> :

        <>
            <p className="mb-3 text-[12.5px] leading-relaxed text-ink-soft">{pile.why}</p>
            <FrameGrid
            frames={pile.gallery}
            selected={selected}
            onToggle={toggle}
            removed={removed} />
          
            <p className="mt-3 text-center text-[11.5px] text-ink-faint">
              Showing the first {remaining} of {pile.count - removed.length}
            </p>
          </>
        }
      </div>

      {remaining > 0 ?
      <div className="shrink-0 border-t border-ink/6 px-5 pb-4 pt-3">
          {selected.length > 0 ?
        <div className="flex gap-2.5">
              <button
            type="button"
            onClick={() => setSelected([])}
            className="rounded-3xl border border-ink/12 px-5 py-4 font-display text-[14px] font-bold text-ink transition-colors duration-150 ease-soft hover:bg-ink/4 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
            
                Cancel
              </button>
              <button
            type="button"
            onClick={deleteSelected}
            className="flex flex-1 items-center justify-center gap-2 rounded-3xl bg-clay py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50">
            
                <Trash2Icon className="h-4 w-4" strokeWidth={2.4} />
                Delete {selected.length} · {formatSize(selected.length * avgMb)}
              </button>
            </div> :

        <>
              <button
            type="button"
            onClick={() => setStep('review')}
            className="flex w-full items-center justify-center gap-2 rounded-3xl bg-ink py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
            
                <LayersIcon className="h-4 w-4" strokeWidth={2.4} />
                Review one by one
              </button>
              <p className="mt-2 text-center text-[11.5px] text-ink-faint">
                Or tap any photo above to delete them in bulk
              </p>
            </>
        }
        </div> :

      <div className="shrink-0 border-t border-ink/6 px-5 pb-4 pt-3">
          <button
          type="button"
          onClick={onClose}
          className="w-full rounded-3xl bg-ink py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
          
            Back to piles
          </button>
        </div>
      }

      {step === 'review' &&
      <ReviewSheet pile={pile} onBack={() => setStep('overview')} onClose={onClose} />
      }
    </motion.section>);

}