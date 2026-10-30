import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CheckIcon,
  FolderIcon,
  HashIcon,
  LayersIcon,
  SparklesIcon,
  StickyNoteIcon } from
'lucide-react';
import { piles } from '../data/piles';
import { videoCategories } from '../data/videoCategories';
import { useLibrary } from '../contexts/LibraryContext';
import { useScreenInit } from '../useScreenInit.js';
import { FeatureSection } from '../components/home/FeatureSection';
import { DeleteAllButton } from '../components/home/DeleteAllButton';
import { PileSheet } from './PileSheet';
import type { Pile } from '../types';

type Step = 'overview' | 'review';

const DESTINATIONS = [
{ id: 'notes', label: 'Notes', Icon: StickyNoteIcon },
{ id: 'slack', label: 'Slack', Icon: HashIcon },
{ id: 'claude', label: 'Claude', Icon: SparklesIcon },
{ id: 'drive', label: 'Drive', Icon: FolderIcon }];


const getPile = (id: string) => piles.find((p) => p.id === id) as Pile;

export function Home() {
  const { clearedPiles, recordCleanup, reclaimableGb } = useLibrary();
  const screenInit = useScreenInit();
  const [open, setOpen] = useState<{pile: Pile;step: Step;} | null>(() => {
    const pile = piles.find((p) => p.id === screenInit.pileId);
    return pile ? { pile, step: screenInit.pileStep === 'review' ? 'review' : 'overview' } : null;
  });
  const [sentTo, setSentTo] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState(videoCategories[0].id);

  const blurry = getPile('blurry');
  const screenshots = getPile('screenshots');
  const paperwork = getPile('paperwork');
  const videos = getPile('videos');
  const category = videoCategories.find((c) => c.id === categoryId) ?? videoCategories[0];

  const openPile = (pile: Pile, step: Step) => setOpen({ pile, step });
  const deleteAll = (pile: Pile) => recordCleanup(pile.id, pile.count, parseFloat(pile.freeable) * 1024);
  const clearedText = (pile: Pile) =>
  clearedPiles.includes(pile.id) ? `All clear · ${pile.freeable} freed` : undefined;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 pb-4 no-scrollbar">
        <header className="pb-8 pt-4">
          <p className="font-display text-[13px] font-extrabold text-spruce">Rollup</p>
          <h1 className="mt-3 font-display text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
            Less clutter.
            <br />
            <span className="text-ink-faint">More memories.</span>
          </h1>
          <p className="mt-3 text-[14.5px] leading-snug text-ink-soft">
            {reclaimableGb.toFixed(1)} GB you won't miss, sorted into piles.
          </p>
          <button
            type="button"
            onClick={() => openPile(blurry, 'review')}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-3xl bg-ink py-4 font-display text-[15px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
            
            Start tidying
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-150 ease-soft group-hover:translate-x-0.5"
              strokeWidth={2.5} />
            
          </button>
        </header>

        <FeatureSection
          id="blurry"
          title="Blurry & shaky"
          meta={`${blurry.count} · ${blurry.freeable}`}
          line="Out of focus and pocket shots."
          frames={blurry.gallery}
          total={blurry.count}
          cleared={clearedText(blurry)}
          onOpen={() => openPile(blurry, 'overview')}>
          
          <ReviewButton onClick={() => openPile(blurry, 'review')} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <SecondaryButton onClick={() => openPile(blurry, 'overview')}>Select</SecondaryButton>
            <DeleteAllButton count={blurry.count} onConfirm={() => deleteAll(blurry)} />
          </div>
        </FeatureSection>

        <FeatureSection
          id="screenshots"
          title="Old screenshots"
          meta={`${screenshots.count} · ${screenshots.freeable}`}
          line="Over a year old, never opened."
          frames={screenshots.gallery}
          total={screenshots.count}
          cleared={clearedText(screenshots)}
          onOpen={() => openPile(screenshots, 'overview')}>
          
          <ReviewButton onClick={() => openPile(screenshots, 'review')} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <SecondaryButton onClick={() => openPile(screenshots, 'overview')}>Select</SecondaryButton>
            <DeleteAllButton count={screenshots.count} onConfirm={() => deleteAll(screenshots)} />
          </div>
        </FeatureSection>

        <FeatureSection
          id="paperwork"
          title="Receipts, notes & whiteboards"
          meta={`${paperwork.count}`}
          line="Save what matters, clear the rest."
          frames={paperwork.gallery}
          total={paperwork.count}
          cleared={clearedText(paperwork)}
          onOpen={() => openPile(paperwork, 'overview')}>
          
          <ReviewButton onClick={() => openPile(paperwork, 'review')} />
          <p className="mb-2 mt-4 font-display text-[12px] font-bold text-ink-faint">Send all to</p>
          <ul className="grid grid-cols-4 gap-2">
            {DESTINATIONS.map(({ id, label, Icon }) => {
              const sent = sentTo.includes(id);
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setSentTo((prev) => prev.includes(id) ? prev : [...prev, id])}
                    aria-label={sent ? `Sent to ${label}` : `Send to ${label}`}
                    className={`flex w-full flex-col items-center gap-1.5 rounded-2xl py-3 transition-colors duration-150 ease-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50 ${
                    sent ? 'bg-mint-100 text-spruce-deep' : 'bg-sand text-ink hover:bg-mint-50'}`
                    }>
                    
                    {sent ?
                    <CheckIcon className="h-5 w-5" strokeWidth={2.6} /> :

                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                    }
                    <span className="font-display text-[11.5px] font-bold">{sent ? 'Sent' : label}</span>
                  </button>
                </li>);

            })}
          </ul>
        </FeatureSection>

        <FeatureSection
          id="videos"
          title="Long forgotten videos"
          meta={`${category.count} · ${videos.freeable}`}
          line="Never played since the day you shot them."
          frames={category.frames}
          total={category.count}
          cleared={clearedText(videos)}
          onOpen={() => openPile(videos, 'overview')}
          above={
          <ul className="-mx-6 flex gap-2 overflow-x-auto px-6 no-scrollbar" aria-label="Video categories">
              {videoCategories.map((c) => {
              const active = c.id === categoryId;
              return (
                <li key={c.id} className="shrink-0">
                    <button
                    type="button"
                    onClick={() => setCategoryId(c.id)}
                    aria-pressed={active}
                    className={`whitespace-nowrap rounded-full px-3.5 py-2 font-display text-[12.5px] font-bold transition-colors duration-150 ease-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50 ${
                    active ? 'bg-ink text-white' : 'bg-sand text-ink-soft hover:text-ink'}`
                    }>
                    
                      {c.label}
                    </button>
                  </li>);

            })}
            </ul>
          }>
          
          <ReviewButton onClick={() => openPile(videos, 'review')} />
        </FeatureSection>
      </div>

      {open &&
      <PileSheet
        key={`${open.pile.id}-${open.step}`}
        pile={open.pile}
        initialStep={open.step}
        onClose={() => setOpen(null)} />

      }
    </>);

}

function ReviewButton({ onClick }: {onClick: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-3xl bg-ink py-3.5 font-display text-[14.5px] font-bold text-white transition-transform duration-150 ease-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/60">
      
      <LayersIcon className="h-4 w-4" strokeWidth={2.4} />
      Review one by one
    </button>);

}

function SecondaryButton({ onClick, children }: {onClick: () => void;children: React.ReactNode;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-3xl border border-ink/12 py-3.5 font-display text-[14px] font-bold text-ink transition-colors duration-150 ease-soft hover:bg-ink/4 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
      
      {children}
    </button>);

}