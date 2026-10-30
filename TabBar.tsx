import React from 'react';
import { SearchIcon, SendIcon, SparklesIcon } from 'lucide-react';
import { useLibrary } from '../contexts/LibraryContext';
import type { TabId } from '../types';

const TABS: {id: TabId;label: string;Icon: typeof SearchIcon;}[] = [
{ id: 'tidy', label: 'Tidy', Icon: SparklesIcon },
{ id: 'find', label: 'Find', Icon: SearchIcon },
{ id: 'share', label: 'Share', Icon: SendIcon }];


export function TabBar() {
  const { tab, setTab } = useLibrary();

  return (
    <nav
      aria-label="Main"
      className="shrink-0 border-t border-ink/5 bg-surface/95 px-6 pb-5 pt-2 backdrop-blur">
      
      <ul className="flex items-stretch justify-between">
        {TABS.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => setTab(id)}
                aria-current={active ? 'page' : undefined}
                className="group flex w-full flex-col items-center gap-1 rounded-2xl py-2 transition-colors duration-150 ease-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/40">
                
                <Icon
                  className={`h-[22px] w-[22px] transition-colors duration-150 ease-soft ${
                  active ? 'text-spruce' : 'text-ink-faint'}`
                  }
                  strokeWidth={active ? 2.4 : 2} />
                
                <span
                  className={`font-display text-[11px] font-bold tracking-wide transition-colors duration-150 ease-soft ${
                  active ? 'text-spruce' : 'text-ink-faint'}`
                  }>
                  
                  {label}
                </span>
              </button>
            </li>);

        })}
      </ul>
    </nav>);

}