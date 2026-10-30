import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SearchIcon, SendIcon, SparklesIcon } from 'lucide-react';
import { LibraryProvider } from '../contexts/LibraryContext';
import { useScreenInit } from '../useScreenInit.js';
import { PhoneFrame } from '../components/PhoneFrame';
import { Screens } from '../components/Screens';
import type { TabId } from '../types';

const PITCH: {label: string;copy: string;Icon: typeof SearchIcon;}[] = [
{
  label: 'Tidy',
  copy: 'Blurry shots, near-duplicates, stale screenshots and forgotten videos, pre-sorted into piles you can clear in a minute.',
  Icon: SparklesIcon
},
{
  label: 'Find',
  copy: 'Ask in plain words — “photos I took at this house”, “Jimmy’s birthday” — and see what it understood before you scroll.',
  Icon: SearchIcon
},
{
  label: 'Share',
  copy: 'Pick a person and a recipient. Every photo of them is gathered and sent in one go.',
  Icon: SendIcon
}];


export function Prototype({
  initialTab,
  showIntro,
  homeVariant




}: {initialTab: TabId;showIntro: boolean;homeVariant: 'minimal' | 'detailed';}) {
  const screenInit = useScreenInit();
  const startTab = screenInit.tab as TabId ?? initialTab;
  const startVariant = screenInit.homeVariant as 'minimal' | 'detailed' | undefined ?? homeVariant;

  return (
    <div className="min-h-full w-full bg-canvas font-sans text-ink">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col items-center justify-center gap-14 sm:px-8 sm:py-12 lg:flex-row lg:items-center lg:gap-24">
        {showIntro &&
        <aside className="hidden max-w-sm lg:block">
            <p className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-spruce">
              Rollup
            </p>
            <h1 className="mt-3 font-display text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
              Your camera roll, finally under control.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              One app that clears the clutter, finds any photo the way you'd describe it, and sends
              the right ones to the right people.
            </p>
            <ul className="mt-9 flex flex-col gap-6 border-t border-ink/10 pt-8">
              {PITCH.map(({ label, copy, Icon }) =>
            <li key={label} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-spruce ring-1 ring-ink/8">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.3} />
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-bold text-ink">{label}</span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-soft">{copy}</span>
                  </span>
                </li>
            )}
            </ul>
            <Link
            to="/summary"
            className="mt-9 inline-flex items-center gap-1.5 font-display text-[14px] font-bold text-spruce transition-opacity duration-150 ease-soft hover:opacity-70">
            
              View the 2-page summary
              <ArrowRightIcon className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </aside>
        }

        <LibraryProvider initialTab={startTab}>
          <PhoneFrame>
            <Screens homeVariant={startVariant} />
          </PhoneFrame>
        </LibraryProvider>
      </div>
    </div>);

}