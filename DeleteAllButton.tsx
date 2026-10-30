import React, { useEffect, useState } from 'react';
import { Trash2Icon } from 'lucide-react';

export function DeleteAllButton({ count, onConfirm }: {count: number;onConfirm: () => void;}) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type="button"
      onClick={() => armed ? onConfirm() : setArmed(true)}
      aria-live="polite"
      className={`flex items-center justify-center gap-1.5 whitespace-nowrap rounded-3xl py-3.5 font-display text-[14px] font-bold transition-colors duration-150 ease-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 ${
      armed ? 'bg-clay text-white' : 'border border-clay/30 text-clay hover:bg-clay-soft'}`
      }>
      
      <Trash2Icon className="h-4 w-4" strokeWidth={2.4} />
      {armed ? `Tap to delete ${count}` : `Delete all ${count}`}
    </button>);

}