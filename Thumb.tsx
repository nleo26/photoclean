import React from 'react';
import type { ReviewFrame, ScreenshotMock } from '../types';

export function ScreenshotTile({
  mock,
  className = ''



}: {mock: ScreenshotMock;className?: string;}) {
  return (
    <div
      className={`flex flex-col gap-2 bg-sand p-3 ${className}`}
      role="img"
      aria-label={`Screenshot: ${mock.title}`}>
      
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
        <span className="h-1.5 flex-1 rounded-full bg-ink/10" />
      </div>
      <p className="truncate font-display text-[11px] font-bold text-ink/70">{mock.title}</p>
      <div className="flex flex-1 flex-col justify-start gap-1.5">
        {Array.from({ length: mock.lines }).map((_, i) =>
        <span
          key={i}
          className="h-1.5 rounded-full bg-ink/10"
          style={{ width: `${95 - i * 11}%` }} />

        )}
      </div>
    </div>);

}

export function Thumb({
  frame,
  className = '',
  rounded = 'rounded-xl'




}: {frame: ReviewFrame;className?: string;rounded?: string;}) {
  if (frame.screenshot) {
    return <ScreenshotTile mock={frame.screenshot} className={`${rounded} ${className}`} />;
  }
  return (
    <img
      src={frame.src}
      alt={frame.alt ?? ''}
      className={`h-full w-full object-cover ${rounded} ${className}`} />);


}