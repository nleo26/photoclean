import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  FocusIcon,
  LockIcon,
  ReceiptIcon,
  SmartphoneIcon,
  VideoIcon } from
'lucide-react';
import { piles, storage } from '../data/piles';
import { useLibrary } from '../contexts/LibraryContext';
import { Thumb } from '../components/Thumb';
import { ClutterGraphic } from '../components/ClutterGraphic';
import { PileSheet } from './PileSheet';
import { useScreenInit } from '../useScreenInit.js';
import type { Pile } from '../types';

const PILE_ICONS = {
  blur: FocusIcon,
  dup: CopyIcon,
  shot: SmartphoneIcon,
  paper: ReceiptIcon,
  video: VideoIcon
} as const;

export function Tidy() {
  const { reclaimableGb, freedMb, deletedCount, clearedPiles } = useLibrary();
  const screenInit = useScreenInit();
  const [activePile, setActivePile] = useState<Pile | null>(
    () => piles.find((p) => p.id === screenInit.pileId) ?? null
  );

  const usedPct = storage.usedGb / storage.totalGb * 100;
  const reclaimPct = reclaimableGb / storage.totalGb * 100;
  const totalToReview = piles.
  filter((p) => !clearedPiles.includes(p.id)).
  reduce((sum, p) => sum + p.count, 0);

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 pb-8 no-scrollbar">
        <header className="pt-3">
          <p className="font-display text-[13px] font-extrabold tracking-[0.02em] text-spruce">
            Rollup
          </p>
          <h1 className="mt-2 font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink">
            You can free up{' '}
            <span className="text-spruce">{reclaimableGb.toFixed(1)} GB</span> without
            losing a memory.
          </h1>
        </header>

        <div className="mt-5" aria-hidden="true">
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-ink/8">
            <span className="h-full bg-ink/70" style={{ width: `${usedPct - reclaimPct}%` }} />
            <span className="h-full bg-spruce" style={{ width: `${reclaimPct}%` }} />
          </div>
          <div className="mt-2 flex items-center gap-4 text-[12px] font-medium text-ink-faint">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink/70" /> Keeping
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-spruce" /> Can be freed
            </span>
          </div>
        </div>

        <div className="mt-6">
          <ClutterGraphic />
        </div>

        <button
          type="button"
          onClick={() => setActivePile(piles.find((p) => !clearedPiles.includes(p.id)) ?? piles[0])}
          className="group mt-6 flex w-full items-center gap-4 rounded-4xl bg-ink px-5 py-5 text-left transition-transform duration-150 ease-soft active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
          
          <span className="flex-1">
            <span className="block font-display text-[19px] font-bold text-white">
              Start tidying
            </span>
            <span className="mt-0.5 block text-[13px] text-white/65">
              {totalToReview.toLocaleString()} items to glance at · about 3 minutes
            </span>
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-spruce text-white transition-transform duration-150 ease-soft group-hover:translate-x-0.5">
            <ArrowRightIcon className="h-5 w-5" strokeWidth={2.5} />
          </span>
        </button>

        {freedMb > 0 &&
        <p className="mt-4 flex items-start gap-2.5 rounded-3xl bg-mint-100 px-4 py-3.5 text-[13px] font-medium text-spruce-deep">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} />
            <span>
              Freed {freedMb >= 1024 ? `${(freedMb / 1024).toFixed(1)} GB` : `${Math.round(freedMb)} MB`}{' '}
              today. {deletedCount} {deletedCount === 1 ? 'item' : 'items'} sitting in Recently
              Deleted for 30 days.
            </span>
          </p>
        }

        <h2 className="mb-1 mt-8 font-display text-[15px] font-bold text-ink">Or pick a pile</h2>
        <ul className="divide-y divide-ink/6">
          {piles.map((pile) => {
            const Icon = PILE_ICONS[pile.tint];
            const cleared = clearedPiles.includes(pile.id);
            return (
              <li key={pile.id}>
                <button
                  type="button"
                  onClick={() => setActivePile(pile)}
                  className="flex w-full items-center gap-4 py-4 text-left transition-opacity duration-150 ease-soft hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/40">
                  
                  <span className="relative flex h-[52px] w-[52px] shrink-0 items-center">
                    {pile.thumbs.slice(0, 3).map((frame, i) =>
                    <span
                      key={i}
                      className="absolute h-[42px] w-[42px] overflow-hidden rounded-xl border-2 border-white bg-sand"
                      style={{ left: i * 7, zIndex: 3 - i }}>
                      
                        <Thumb frame={frame} rounded="rounded-[9px]" className="h-full w-full" />
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2.4} />
                      <span className="truncate font-display text-[15px] font-bold text-ink">
                        {pile.title}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-ink-soft">
                      {cleared ? 'Reviewed — all clear' : pile.subtitle}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    {cleared ?
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-100 text-spruce">
                        <CheckIcon className="h-4 w-4" strokeWidth={3} />
                      </span> :

                    <>
                        <span className="text-right">
                          <span className="block font-display text-[14px] font-bold text-ink">
                            {pile.count}
                          </span>
                          <span className="block text-[11px] text-ink-faint">{pile.freeable}</span>
                        </span>
                        <ChevronRightIcon className="h-4 w-4 text-ink-faint" strokeWidth={2.5} />
                      </>
                    }
                  </span>
                </button>
              </li>);

          })}
        </ul>

        <p className="mt-6 flex items-start gap-2 text-[12px] leading-relaxed text-ink-faint">
          <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
          Everything is sorted on your phone. Nothing is deleted until you tap delete, and it waits
          30 days in Recently Deleted.
        </p>
      </div>

      {activePile && <PileSheet pile={activePile} onClose={() => setActivePile(null)} />}
    </>);

}