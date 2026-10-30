import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { Photo } from '../types';

export function PhotoGrid({
  photos,
  selectedIds,
  onToggle




}: {photos: Photo[];selectedIds?: string[];onToggle?: (id: string) => void;}) {
  const selectable = Boolean(onToggle && selectedIds);

  return (
    <ul className="grid grid-cols-3 gap-1.5">
      {photos.map((photo) => {
        const selected = selectedIds?.includes(photo.id) ?? false;
        const tile =
        <span className="relative block aspect-square overflow-hidden rounded-xl bg-sand">
            <img
            src={photo.src}
            alt={photo.alt}
            className={`h-full w-full object-cover transition-opacity duration-150 ease-soft ${
            selectable && !selected ? 'opacity-45' : 'opacity-100'}`
            } />
          
            {selectable &&
          <span
            className={`absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-150 ease-soft ${
            selected ?
            'border-spruce bg-spruce text-white' :
            'border-white/80 bg-black/25 text-transparent'}`
            }>
            
                <CheckIcon className="h-3 w-3" strokeWidth={3} />
              </span>
          }
          </span>;


        return (
          <li key={photo.id}>
            {selectable ?
            <button
              type="button"
              onClick={() => onToggle?.(photo.id)}
              aria-pressed={selected}
              aria-label={`${selected ? 'Remove' : 'Include'} ${photo.alt}`}
              className="block w-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-spruce/50">
              
                {tile}
              </button> :

            tile
            }
          </li>);

      })}
    </ul>);

}