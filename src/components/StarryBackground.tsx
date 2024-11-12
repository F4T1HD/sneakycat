import React from 'react';
import { Star, Moon } from 'lucide-react';

export function StarryBackground() {
  return (
    <>
      {[...Array(100)].map((_, i) => (
        <Star
          key={i}
          size={Math.random() * 6 + 1}
          className="text-purple-200/10 absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <div className="absolute top-10 right-10">
        <Moon size={80} className="text-purple-300/30" />
      </div>
    </>
  );
}