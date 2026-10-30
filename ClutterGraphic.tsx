import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RotateCcwIcon } from 'lucide-react';
import { ALT, IMG } from '../data/photos';
import { CLUTTER_LABEL, clutterPiles, roll } from '../data/clutter';

type Phase = 'before' | 'flagged' | 'after';

const EASE = [0.23, 1, 0.32, 1] as const;

const CAPTION: Record<Phase, {title: string;detail: string;}> = {
  before: { title: '18,432 photos', detail: 'Clutter hiding in every scroll' },
  flagged: { title: 'Sorting…', detail: 'Spotting blurry shots, repeats and paperwork' },
  after: { title: '14,109 photos', detail: 'Just the ones you want · 7.9 GB freed' }
};

export function ClutterGraphic({ autoPlay = true }: {autoPlay?: boolean;}) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(autoPlay ? 'before' : 'after');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = useCallback(() => {
    clearTimers();
    setPhase('before');
    timers.current.push(setTimeout(() => setPhase('flagged'), 1100));
    timers.current.push(setTimeout(() => setPhase('after'), 2500));
  }, []);

  useEffect(() => {
    if (autoPlay) play();
    return clearTimers;
  }, [autoPlay, play]);

  const choose = (next: 'before' | 'after') => {
    clearTimers();
    setPhase(next);
  };

  const isAfter = phase === 'after';
  const tiles = isAfter ? roll.filter((t) => !t.clutter) : roll;
  const layoutTransition = { duration: reduceMotion ? 0 : 0.3, ease: EASE };

  return (
    <figure>
      <div className="mb-3 flex items-center justify-between">
        <div
          role="tablist"
          aria-label="Compare camera roll"
          className="flex rounded-full bg-sand p-1 ring-1 ring-ink/5">
          
          {(['before', 'after'] as const).map((option) => {
            const active = option === 'after' ? isAfter : !isAfter;
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => choose(option)}
                className={`relative rounded-full px-4 py-1.5 font-display text-[12.5px] font-bold capitalize transition-colors duration-150 ease-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50 ${
                active ? 'text-white' : 'text-ink-soft hover:text-ink'}`
                }>
                
                {active &&
                <motion.span
                  layoutId="clutter-toggle"
                  transition={{ duration: 0.22, ease: EASE }}
                  className={`absolute inset-0 rounded-full ${option === 'after' ? 'bg-spruce' : 'bg-ink'}`} />

                }
                <span className="relative">{option}</span>
              </button>);

          })}
        </div>
        <button
          type="button"
          onClick={play}
          aria-label="Replay animation"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint transition-colors duration-150 ease-soft hover:bg-sand hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
          
          <RotateCcwIcon className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>

      <div className="rounded-4xl bg-sand p-2.5 ring-1 ring-ink/5">
        <div className="flex items-baseline justify-between px-1.5 pb-2 pt-0.5" aria-live="polite">
          <span className="font-display text-[14px] font-bold text-ink">{CAPTION[phase].title}</span>
          <span className="text-[11px] text-ink-faint">{CAPTION[phase].detail}</span>
        </div>

        <motion.ul layout transition={layoutTransition} className="grid grid-cols-4 gap-1">
          <AnimatePresence initial={false} mode="popLayout">
            {tiles.map((tile) => {
              const flagged = phase === 'flagged' && tile.clutter;
              return (
                <motion.li
                  key={tile.id}
                  layout
                  transition={layoutTransition}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18, ease: EASE } }}
                  className="relative aspect-square overflow-hidden rounded-lg bg-ink/5">
                  
                  <img
                    src={IMG[tile.image]}
                    alt={ALT[tile.image]}
                    className={`h-full w-full object-cover transition-opacity duration-200 ease-soft ${
                    phase === 'flagged' && !tile.clutter ? 'opacity-40' : 'opacity-100'}`
                    } />
                  
                  <AnimatePresence>
                    {flagged && tile.clutter &&
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: EASE }}
                      className="pointer-events-none absolute inset-0 flex items-end rounded-lg ring-[2.5px] ring-inset ring-clay">
                      
                        <span className="m-1 rounded bg-clay px-1 py-0.5 font-display text-[8.5px] font-bold leading-none text-white">
                          {CLUTTER_LABEL[tile.clutter]}
                        </span>
                      </motion.span>
                    }
                  </AnimatePresence>
                </motion.li>);

            })}
          </AnimatePresence>
        </motion.ul>

        <AnimatePresence>
          {isAfter &&
          <motion.ul
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="mt-2.5 grid grid-cols-2 gap-1.5"
            aria-label="Clutter set aside into piles">
            
              {clutterPiles.map((pile, i) =>
            <motion.li
              key={pile.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.12 + i * 0.05, duration: 0.22, ease: EASE }}
              className="flex items-center gap-2 rounded-2xl bg-white px-2 py-1.5">
              
                  <span className="relative h-7 w-9 shrink-0">
                    {pile.images.map((image, j) =>
                <img
                  key={image}
                  src={IMG[image]}
                  alt=""
                  className="absolute top-0 h-7 w-7 rounded-md border-2 border-white object-cover"
                  style={{ left: j * 8, zIndex: 2 - j }} />

                )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[11px] font-bold leading-tight text-ink">
                      {pile.label}
                    </span>
                    <span className="block text-[10px] leading-tight text-ink-faint">
                      {pile.count} set aside
                    </span>
                  </span>
                </motion.li>
            )}
            </motion.ul>
          }
        </AnimatePresence>
      </div>
    </figure>);

}