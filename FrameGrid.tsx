import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Thumb } from './Thumb';
import type { ReviewFrame } from '../types';

export function FrameGrid({
  frames,
  selected,
  onToggle,
  removed = []





}: {frames: ReviewFrame[];selected: number[];onToggle: (index: number) => void;removed?: number[];}) {
  return (
    <ul className="grid grid-cols-3 gap-1.5">
      {frames.map((frame, i) => {
        if (removed.includes(i)) return null;
        const isSelected = selected.includes(i);
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => onToggle(i)}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? 'Deselect' : 'Select'} ${
              frame.alt ?? frame.screenshot?.title ?? 'photo'}`
              }
              className="relative block aspect-square w-full overflow-hidden rounded-xl bg-sand ring-offset-2 ring-offset-white transition-[box-shadow] duration-150 ease-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
              
              <Thumb frame={frame} rounded="rounded-xl" className="h-full w-full" />
              {isSelected &&
              <span className="pointer-events-none absolute inset-0 rounded-xl bg-clay/25 ring-[3px] ring-inset ring-clay" />
              }
              {frame.badge && !isSelected &&
              <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-md bg-black/55 px-1.5 py-0.5 font-display text-[10px] font-bold text-white">
                  {frame.badge}
                </span>
              }
              <span
                className={`pointer-events-none absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-150 ease-soft ${
                isSelected ?
                'border-clay bg-clay text-white' :
                'border-white/85 bg-black/20 text-transparent'}`
                }>
                
                <CheckIcon className="h-3 w-3" strokeWidth={3} />
              </span>
            </button>
          </li>);

      })}
    </ul>);

}