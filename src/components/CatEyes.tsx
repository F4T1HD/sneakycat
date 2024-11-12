import React, { useEffect, useState, useCallback } from 'react';

interface CatEyesProps {
  eyePosition: { x: number; y: number };
  burstTrigger: number;
}

interface EyePair {
  id: number;
  position: { x: number; y: number };
  visible: boolean;
  scale: number;
}

export function CatEyes({ eyePosition, burstTrigger }: CatEyesProps) {
  const [eyePairs, setEyePairs] = useState<EyePair[]>([]);
  const [baseEyePair, setBaseEyePair] = useState<EyePair>({
    id: 0,
    position: { x: 50, y: 50 },
    visible: true,
    scale: 1
  });

  const createEyeBurst = useCallback(() => {
    const newEyePairs: EyePair[] = [];
    const numPairs = 8;

    for (let i = 0; i < numPairs; i++) {
      newEyePairs.push({
        id: Date.now() + i,
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        },
        visible: true,
        scale: Math.random() * 0.5 + 0.5
      });
    }

    setEyePairs(prev => [...prev, ...newEyePairs]);

    // Remove the burst eyes after animation
    setTimeout(() => {
      setEyePairs(prev => prev.filter(pair => !newEyePairs.includes(pair)));
    }, 2000);
  }, []);

  useEffect(() => {
    if (burstTrigger > 0) {
      createEyeBurst();
    }
  }, [burstTrigger, createEyeBurst]);

  useEffect(() => {
    const moveBaseEyes = () => {
      setBaseEyePair(prev => ({
        ...prev,
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        }
      }));
    };

    const interval = setInterval(moveBaseEyes, 4000);
    return () => clearInterval(interval);
  }, []);

  const EyePairComponent = ({ position, scale = 1, isBlinking = false }: { position: { x: number; y: number }, scale?: number, isBlinking?: boolean }) => (
    <div 
      className="absolute transition-all duration-500"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <div className="flex gap-8">
        {[0, 1].map((eye) => (
          <div
            key={eye}
            className="w-20 h-16 bg-purple-900/20 rounded-full relative overflow-hidden backdrop-blur-sm"
            style={{
              clipPath: isBlinking ? 'ellipse(50% 2% at 50% 50%)' : 'ellipse(50% 50% at 50% 50%)',
              transition: 'clip-path 0.1s ease-in-out',
            }}
          >
            <div
              className="w-16 h-14 absolute bg-gradient-to-br from-yellow-400 to-amber-600"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%)`,
                borderRadius: '50%',
              }}
            >
              <div
                className="w-8 h-12 absolute bg-gray-950"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`,
                  borderRadius: '50%',
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div
                  className="w-3 h-3 absolute bg-white/60"
                  style={{
                    top: '20%',
                    left: '20%',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <EyePairComponent position={baseEyePair.position} />
      {eyePairs.map((pair) => (
        <EyePairComponent
          key={pair.id}
          position={pair.position}
          scale={pair.scale}
        />
      ))}
    </>
  );
}