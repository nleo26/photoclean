import React from 'react';
import type { Person } from '../types';

export function PersonPicker({
  label,
  people,
  selectedId,
  onSelect





}: {label: string;people: Person[];selectedId: string;onSelect: (id: string) => void;}) {
  return (
    <div>
      <p className="mb-2.5 font-display text-[13px] font-bold text-ink-soft">{label}</p>
      <ul className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-1 no-scrollbar">
        {people.map((person) => {
          const active = person.id === selectedId;
          return (
            <li key={person.id}>
              <button
                type="button"
                onClick={() => onSelect(person.id)}
                aria-pressed={active}
                className="flex w-[62px] flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50 rounded-2xl py-0.5">
                
                <span
                  className={`flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-full transition-[box-shadow,transform] duration-150 ease-soft ${
                  active ?
                  'ring-[3px] ring-spruce ring-offset-2 ring-offset-white' :
                  'ring-1 ring-ink/10'}`
                  }>
                  
                  {person.src ?
                  <img src={person.src} alt="" className="h-full w-full object-cover" /> :

                  <span className="flex h-full w-full items-center justify-center bg-mint-100 font-display text-[15px] font-bold text-spruce-deep">
                      {person.initials}
                    </span>
                  }
                </span>
                <span
                  className={`w-full truncate text-center font-display text-[12px] font-semibold ${
                  active ? 'text-ink' : 'text-ink-faint'}`
                  }>
                  
                  {person.name}
                </span>
              </button>
            </li>);

        })}
      </ul>
    </div>);

}