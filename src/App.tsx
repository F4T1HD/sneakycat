import React, { useState, useEffect } from 'react';
import { CatEyes } from './components/CatEyes';
import { StarryBackground } from './components/StarryBackground';
import { Rocket, ChevronDown, Copy } from 'lucide-react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [triggerEyeBurst, setTriggerEyeBurst] = useState(0);
  const tokenAddress = "ttttooooorrrrreeee";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const eyeCenterX = window.innerWidth / 2;
    const eyeCenterY = window.innerHeight / 2;
    
    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX);
    const distance = Math.min(10, Math.hypot(mousePosition.x - eyeCenterX, mousePosition.y - eyeCenterY) / 30);
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    setEyePosition({ x, y });
  }, [mousePosition]);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopied(true);
    setTriggerEyeBurst(prev => prev + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-[#1a0b2e] to-gray-950 relative overflow-hidden">
      <StarryBackground />
      <CatEyes eyePosition={eyePosition} burstTrigger={triggerEyeBurst} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="animate-bounce mb-12">
          <Rocket className="text-purple-400 w-24 h-24" />
        </div>
        
        <div className="space-y-4 mb-8">
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-yellow-300 to-purple-400 tracking-tight animate-pulse">
            $SNEAK
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-green-400 text-sm">Built on Solana</p>
          </div>
        </div>
        
        <p className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-purple-400 to-yellow-200 text-transparent bg-clip-text">
          The Most Suspicious Meme Coin Ever 👀
        </p>

        <div className="space-y-6 text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed mb-12">
          <p className="italic text-purple-300/90">
            "Faster than a Solana transaction, sneakier than your ex"
          </p>
          <p className="text-lg text-yellow-200/80">
            Warning: This token might ninja its way into your wallet while you're distracted by the eyes
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-16">
          <div 
            className="flex items-center gap-2 px-6 py-3 bg-gray-800/40 backdrop-blur-sm rounded-xl cursor-pointer hover:bg-gray-800/60 transition-all duration-300"
            onClick={handleCopy}
          >
            <span className="text-purple-300 font-mono text-sm">{tokenAddress}</span>
            <Copy size={16} className="text-purple-300" />
            <span className={`absolute -top-8 text-sm text-purple-300 transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
              Copied!
            </span>
          </div>
          
          <button className="group px-12 py-6 bg-gradient-to-r from-purple-600 to-yellow-600 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105">
            <span className="text-gray-900">Buy on Pump.fun</span>
            <span className="block text-xs text-gray-800">(if you can catch us)</span>
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-purple-400 w-12 h-12" />
        </div>
      </div>
    </div>
  );
}

export default App;