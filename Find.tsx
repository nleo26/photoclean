import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  FolderPlusIcon,
  MicIcon,
  SearchIcon,
  SendIcon,
  SparklesIcon } from
'lucide-react';
import { matchQuery, suggestions } from '../data/searches';
import { PhotoGrid } from '../components/PhotoGrid';
import { useLibrary } from '../contexts/LibraryContext';
import { useScreenInit } from '../useScreenInit.js';
import type { SavedQuery } from '../types';

type Status = 'idle' | 'loading' | 'results' | 'empty';

export function Find({ presetQuery }: {presetQuery?: string;}) {
  const { setTab } = useLibrary();
  const screenInit = useScreenInit();
  const initialQuery =
  presetQuery ?? (typeof screenInit.findQuery === 'string' ? screenInit.findQuery : '');
  const initialMatch = initialQuery ? matchQuery(initialQuery) : undefined;
  const [value, setValue] = useState(initialQuery);
  const [status, setStatus] = useState<Status>(
    initialQuery ? initialMatch ? 'results' : 'empty' : 'idle'
  );
  const [result, setResult] = useState<SavedQuery | null>(initialMatch ?? null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = (query: string) => {
    setValue(query);
    setStatus('loading');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const match = matchQuery(query);
      setResult(match ?? null);
      setStatus(match ? 'results' : 'empty');
    }, 550);
  };

  const reset = () => {
    setValue('');
    setResult(null);
    setStatus('idle');
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="px-6 pt-3">
        {status === 'idle' ?
        <h1 className="font-display text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
            Ask for a photo the way you'd say it out loud.
          </h1> :

        <button
          type="button"
          onClick={reset}
          className="-ml-1 flex items-center gap-1.5 rounded-full py-1 pr-2 font-display text-[13px] font-bold text-ink-soft transition-colors duration-150 ease-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
          
            <ArrowLeftIcon className="h-4 w-4" strokeWidth={2.5} />
            New search
          </button>
        }

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) run(value);
          }}
          className="mt-4 flex items-center gap-2 rounded-full bg-sand px-4 py-3 ring-1 ring-ink/6 focus-within:ring-2 focus-within:ring-spruce/50">
          
          <SearchIcon className="h-[18px] w-[18px] shrink-0 text-ink-faint" strokeWidth={2.4} />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="find photos of flowers"
            aria-label="Search your photos"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-faint focus:outline-none" />
          
          <button
            type="button"
            aria-label="Search by voice"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-spruce ring-1 ring-ink/6 transition-colors duration-150 ease-soft hover:bg-mint-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
            
            <MicIcon className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 no-scrollbar">
        {status === 'idle' &&
        <>
            <h2 className="mb-3 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink-faint">
              Try asking
            </h2>
            <ul className="flex flex-col gap-2">
              {suggestions.map((s) =>
            <li key={s}>
                  <button
                type="button"
                onClick={() => run(s)}
                className="flex w-full items-center gap-3 rounded-3xl bg-sand px-4 py-3.5 text-left transition-colors duration-150 ease-soft hover:bg-mint-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
                
                    <SparklesIcon className="h-4 w-4 shrink-0 text-spruce" strokeWidth={2.2} />
                    <span className="text-[14px] font-medium text-ink">“{s}”</span>
                  </button>
                </li>
            )}
            </ul>
            <p className="mt-6 text-[12px] leading-relaxed text-ink-faint">
              Names, places, dates and things in the picture all work — and you can combine them.
            </p>
          </>
        }

        {status === 'loading' &&
        <div aria-live="polite">
            <p className="mb-4 text-[13px] font-medium text-ink-soft">Looking through 18,432 photos…</p>
            <ul className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: 9 }).map((_, i) =>
            <li key={i}>
                  <motion.span
                className="block aspect-square rounded-xl bg-ink/6"
                animate={{ opacity: [0.45, 0.85, 0.45] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.05 }} />
              
                </li>
            )}
            </ul>
          </div>
        }

        {status === 'results' && result &&
        <div aria-live="polite">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-[19px] font-bold text-ink">
                {result.count} photos
              </h2>
              <span className="text-[12px] text-ink-faint">Newest first</span>
            </div>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {result.understood.map((chip) =>
            <li
              key={chip}
              className="rounded-full bg-mint-100 px-3 py-1.5 font-display text-[11.5px] font-bold text-spruce-deep">
              
                  {chip}
                </li>
            )}
            </ul>
            <p className="mb-4 mt-2.5 text-[12px] text-ink-faint">
              Not what you meant? Add a detail like “in winter” or “with Grandma”.
            </p>
            <PhotoGrid photos={result.results} />

            <div className="mt-5 flex gap-2.5">
              <button
              type="button"
              onClick={() => setTab('share')}
              className="flex flex-1 items-center justify-center gap-2 rounded-3xl bg-ink py-3.5 font-display text-[14px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
              
                <SendIcon className="h-4 w-4" strokeWidth={2.3} />
                Share these
              </button>
              <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-3xl border border-ink/12 py-3.5 font-display text-[14px] font-bold text-ink transition-colors duration-150 ease-soft hover:bg-ink/4 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
              
                <FolderPlusIcon className="h-4 w-4" strokeWidth={2.3} />
                Save album
              </button>
            </div>
          </div>
        }

        {status === 'empty' &&
        <div aria-live="polite" className="pt-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sand text-ink-faint">
              <SearchIcon className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <h2 className="mt-4 font-display text-[18px] font-bold text-ink">
              Nothing matched “{value}”
            </h2>
            <p className="mx-auto mt-2 max-w-[250px] text-[13.5px] leading-relaxed text-ink-soft">
              Try fewer words, or a person, place or thing — like “Biscuit at the park”.
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {suggestions.slice(0, 3).map((s) =>
            <li key={s}>
                  <button
                type="button"
                onClick={() => run(s)}
                className="rounded-full bg-sand px-3.5 py-2 font-display text-[12.5px] font-bold text-ink transition-colors duration-150 ease-soft hover:bg-mint-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
                
                    {s}
                  </button>
                </li>
            )}
            </ul>
          </div>
        }
      </div>
    </div>);

}