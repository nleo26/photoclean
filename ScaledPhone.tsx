import React from 'react';

const PHONE_W = 392;
const PHONE_H = 812;

export function ScaledPhone({ children, scale = 0.76 }: {children: React.ReactNode;scale?: number;}) {
  return (
    <div className="relative shrink-0" style={{ width: PHONE_W * scale, height: PHONE_H * scale }}>
      <div
        className="absolute left-0 top-0"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        
        {children}
      </div>
    </div>);

}