
import React from 'react';

const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 liquid-bg"></div>
      
      {/* Floating orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      
      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default LiquidBackground;
