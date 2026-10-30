import React from 'react';
import { BatteryFullIcon, SignalHighIcon, WifiIcon } from 'lucide-react';

const FRAMED =
'h-[812px] w-[392px] rounded-[46px] border-[10px] border-ink shadow-[0_40px_90px_-40px_rgba(20,32,28,0.55)]';
const RESPONSIVE =
'h-[100svh] w-full sm:h-[812px] sm:w-[392px] sm:rounded-[46px] sm:border-[10px] sm:border-ink sm:shadow-[0_40px_90px_-40px_rgba(20,32,28,0.55)]';

export function PhoneFrame({
  children,
  framed = false



}: {children: React.ReactNode;framed?: boolean;}) {
  return (
    <div
      className={`relative mx-auto flex flex-col overflow-hidden bg-surface ${framed ? FRAMED : RESPONSIVE}`}>
      
      <div className="flex shrink-0 items-center justify-between px-7 pb-1 pt-3.5 text-[13px] font-semibold text-ink">
        <span>9:41</span>
        <span
          className={`${framed ? 'block' : 'hidden sm:block'} absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-ink`} />
        
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <SignalHighIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
          <WifiIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
          <BatteryFullIcon className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </div>
      {children}
    </div>);

}