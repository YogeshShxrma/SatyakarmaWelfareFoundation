
import React, { useRef, useState } from 'react';

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlareCard: React.FC<GlareCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    
    // Enhanced glare effect
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 30%, transparent 70%)`,
      opacity: 1,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu transition-all duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
        {children}
        {/* Enhanced glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl"
          style={glareStyle}
        />
        {/* Subtle border glow on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-xl border-2 border-primary/20 pointer-events-none transition-opacity duration-300" />
        )}
      </div>
    </div>
  );
};

export default GlareCard;
