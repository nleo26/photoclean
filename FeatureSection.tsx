import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Thumb } from '../Thumb';
import type { ReviewFrame } from '../../types';

export function FeatureSection({
  id,
  title,
  meta,
  line,
  frames,
  total,
  cleared,
  onOpen,
  above,
  children











}: {id: string;title: string;meta: string;line: string;frames: ReviewFrame[];total: number;cleared?: string;onOpen: () => void;above?: React.ReactNode;children: React.ReactNode;}) {
  const shown = frames.slice(0, 4);
  const more = total - shown.length;

  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-ink/8 py-7">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={`${id}-title`} className="font-display text-[20px] font-extrabold tracking-[-0.01em] text-ink">
          {title}
        </h2>
        <span className="shrink-0 text-[12px] font-medium text-ink-faint">{meta}</span>
      </div>
      <p className="mt-1 text-[13px] text-ink-soft">{line}</p>

      {above && <div className="mt-4">{above}</div>}

      <button
        type="button"
        onClick={onOpen}
        aria-label={`See all ${title}`}
        className="mt-4 grid w-full grid-cols-4 gap-1.5 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
        
        {shown.map((frame, i) => {
          const last = i === shown.length - 1 && more > 0;
          return (
            <span key={i} className="relative block aspect-square overflow-hidden rounded-xl bg-sand">
              <Thumb frame={frame} rounded="rounded-xl" className="h-full w-full" />
              {frame.badge && !last &&
              <span className="absolute bottom-1 left-1 rounded bg-black/55 px-1 py-0.5 font-display text-[9.5px] font-bold text-white">
                  {frame.badge}
                </span>
              }
              {last &&
              <span className="absolute inset-0 flex items-center justify-center bg-ink/55 font-display text-[15px] font-bold text-white">
                  +{more}
                </span>
              }
            </span>);

        })}
      </button>

      <div className="mt-4">
        {cleared ?
        <p className="flex items-center gap-2 rounded-3xl bg-mint-100 px-4 py-3.5 font-display text-[14px] font-bold text-spruce-deep">
            <CheckIcon className="h-4 w-4" strokeWidth={3} />
            {cleared}
          </p> :

        children
        }
      </div>
    </section>);

}