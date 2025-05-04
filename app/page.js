"use client"

import { useState, useEffect, useRef } from 'react';
import { Heart, Flower, Stars, Gift, Coffee, Sparkles, Sun, Music, Camera, Cake, Award, Crown, Gem, Snowflake, Star, PlayCircle, PauseCircle } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [rotateEffect, setRotateEffect] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [animateHearts, setAnimateHearts] = useState(false);
  const [specialEffects, setSpecialEffects] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const audioRef = useRef(null);
  
  const features = [
    "Endless Love",
    "Unwavering Support",
    "Incredible Strength",
    "Timeless Wisdom",
    "Boundless Patience",
    "Unconditional Care"
  ];
  
  // Toggle the card open/closed
  const toggleCard = () => {
    if (showEnvelope) {
      setShowEnvelope(false);
      setTimeout(() => {
        setShowConfetti(true);
        setShowFireworks(true);
        setTimeout(() => {
          setIsOpen(true);
          setRotateEffect(true);
          setTimeout(() => {
            setShowSparkles(true);
            setTimeout(() => {
              setShowMessage(true);
              setAnimateHearts(true);
            }, 800);
          }, 500);
        }, 1000);
      }, 500);
    } else {
      setIsOpen(!isOpen);
      setRotateEffect(true);
      
      if (!isOpen) {
        setShowConfetti(true);
        setShowFireworks(true);
        setTimeout(() => {
          setShowSparkles(true);
          setTimeout(() => {
            setShowMessage(true);
            setAnimateHearts(true);
          }, 800);
        }, 500);
      } else {
        setShowMessage(false);
        setAnimateHearts(false);
        setTimeout(() => {
          setShowSparkles(false);
          setShowFireworks(false);
          setShowConfetti(false);
        }, 1000);
      }
    }
    
    setTimeout(() => setRotateEffect(false), 1000);
  };
  
  // Toggle music playback
  const toggleMusic = (e) => {
    e.stopPropagation();
    setPlayMusic(!playMusic);
    
    if (!playMusic) {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };
  
  // Add hover effect
  const handleMouseEnter = () => {
    setHoverEffect(true);
  };
  
  const handleMouseLeave = () => {
    setHoverEffect(false);
  };
  
  // Trigger special effects
  const triggerSpecialEffects = (e) => {
    e.stopPropagation();
    setSpecialEffects(true);
    setShowFireworks(true);
    
    setTimeout(() => {
      setSpecialEffects(false);
      setShowFireworks(false);
    }, 5000);
  };
  
  // Cycle through photos
  const cyclePhotos = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % 3);
  };
  
  // Feature carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Ambient background effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOpen) {
        setShowSparkles(prev => !prev);
        setTimeout(() => {
          setShowSparkles(prev => !prev);
        }, 1000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  // Generate floating elements
  const FloatingElements = () => {
    const elements = [];
    const colors = ['text-red-400', 'text-pink-500', 'text-red-500', 'text-pink-400', 'text-rose-300', 'text-purple-300'];
    const icons = [Heart, Flower, Stars, Music, Gift, Snowflake, Star];
    
    for (let i = 0; i < 45; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 8}s`;
      const size = 14 + Math.random() * 20;
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      const IconComponent = icons[Math.floor(Math.random() * icons.length)];
      const opacity = 0.3 + Math.random() * 0.7;
      const animationDuration = 6 + Math.random() * 10;
      
      elements.push(
        <div 
          key={i}
          className={`absolute ${colorClass} animate-float`}
          style={{
            left,
            animationDelay,
            animationDuration: `${animationDuration}s`,
            top: '-20px',
            opacity,
            filter: 'blur(0.5px)',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          <IconComponent size={size} fill={Math.random() > 0.5 ? "currentColor" : ""} />
        </div>
      );
    }
    
    return elements;
  };
  
  // Generate background sparkles effect
  const Sparkle = ({ size, style, color }) => {
    return (
      <div className={`absolute ${color} animate-twinkle`} style={style}>
        <Sparkles size={size} />
      </div>
    );
  };
  
  const BackgroundSparkles = () => {
    const sparkles = [];
    const colors = ['text-yellow-200', 'text-white', 'text-pink-200', 'text-purple-200', 'text-gold-300'];
    
    for (let i = 0; i < 40; i++) {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const size = 8 + Math.random() * 16;
      const delay = Math.random() * 5;
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.3 + Math.random() * 0.7;
      
      sparkles.push(
        <Sparkle
          key={i}
          size={size}
          color={colorClass}
          style={{
            top,
            left,
            opacity,
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    
    return sparkles;
  };
  
  // Create confetti particles
  const Confetti = () => {
    const particles = [];
    const colors = ['bg-red-400', 'bg-pink-400', 'bg-yellow-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400', 'bg-gold-300'];
    
    for (let i = 0; i < 120; i++) {
      const left = `${Math.random() * 100}%`;
      const width = 5 + Math.random() * 8;
      const height = width * (Math.random() * 0.6 + 0.4);
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 4;
      
      particles.push(
        <div 
          key={i}
          className={`absolute ${colorClass} rounded-sm`}
          style={{
            left,
            width: `${width}px`,
            height: `${height}px`,
            animation: `confettiFall ${duration}s ease-in ${delay}s infinite`,
            opacity: 0,
            top: '-10px',
          }}
        />
      );
    }
    
    return particles;
  };
  
  // Create fireworks effect
  const Fireworks = () => {
    const fireworks = [];
    const colors = ['bg-red-400', 'bg-pink-400', 'bg-yellow-300', 'bg-purple-400', 'bg-blue-300', 'bg-green-300'];
    
    for (let i = 0; i < 15; i++) {
      const left = 10 + Math.random() * 80;
      const top = 10 + Math.random() * 60;
      const size = 120 + Math.random() * 80;
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 3;
      
      fireworks.push(
        <div 
          key={i}
          className={`absolute ${colorClass} rounded-full`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            animation: `firework 2s ease-out ${delay}s infinite`,
            opacity: 0,
          }}
        />
      );
    }
    
    return fireworks;
  };
  
  // Photo frames for memories
  const PhotoFrame = ({ index }) => {
    const frames = [
      { bg: 'bg-rose-100', icon: <Heart size={32} className="text-pink-400" />, label: 'Cherished Memories' },
      { bg: 'bg-purple-100', icon: <Star size={32} className="text-purple-400" />, label: 'Magical Moments' },
      { bg: 'bg-amber-100', icon: <Sun size={32} className="text-amber-400" />, label: 'Golden Times' },
    ];
    
    const frame = frames[index];
    
    return (
      <div className={`${frame.bg} p-3 rounded-lg shadow-md transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
        <div className="border-2 border-dashed border-white p-4 rounded flex flex-col items-center">
          {frame.icon}
          <div className="w-20 h-20 bg-white/80 rounded-md mt-2 flex items-center justify-center">
            <Camera size={28} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium mt-2 text-gray-600">{frame.label}</p>
        </div>
      </div>
    );
  };
  
  // Animated hearts explosion
  const HeartExplosion = () => {
    if (!animateHearts) return null;
    
    const hearts = [];
    const colors = ['text-red-400', 'text-pink-500', 'text-rose-400', 'text-purple-300'];
    
    for (let i = 0; i < 20; i++) {
      const delay = Math.random() * 2;
      const size = 16 + Math.random() * 20;
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      const duration = 1 + Math.random() * 2;
      const angle = Math.random() * 360;
      const distance = 40 + Math.random() * 100;
      
      hearts.push(
        <div 
          key={i}
          className={`absolute left-1/2 top-1/2 ${colorClass}`}
          style={{
            animation: `heartExplosion ${duration}s ease-in-out ${delay}s forwards`,
            transformOrigin: 'center',
            transform: `rotate(${angle}deg) translateX(${distance}px)`,
            opacity: 0,
          }}
        >
          <Heart size={size} fill="currentColor" />
        </div>
      );
    }
    
    return hearts;
  };
  
  // Envelope component
  const Envelope = () => {
    return (
      <div 
        className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-rose-400 to-pink-600 rounded-lg shadow-2xl overflow-hidden relative cursor-pointer hover:shadow-glow-pink transition-all duration-500 transform hover:scale-105"
        onClick={toggleCard}
      >
        {/* Envelope texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
        
        {/* Envelope flap */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-300 to-pink-400 origin-top transform hover:rotate-x-180 transition-transform duration-1000 z-20">
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-pink-500/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 text-white text-opacity-5 text-6xl font-serif blur-sm flex items-center justify-center transform -rotate-12">
                MOM
              </div>
              <Heart className="text-white/80 transform rotate-6" size={64} fill="currentColor" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Crown className="text-yellow-200/90" size={28} />
              </div>
            </div>
          </div>
          
          {/* Envelope seal */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-600 rounded-full border-4 border-pink-300/50 z-30 flex items-center justify-center">
            <Heart className="text-white" size={20} fill="currentColor" />
          </div>
          
          {/* Envelope triangles */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="w-full h-0 border-l-[25vw] border-r-[25vw] border-t-[15vw] border-l-transparent border-r-transparent border-t-pink-500/30 max-w-md mx-auto"></div>
          </div>
        </div>
        
        {/* Envelope body */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="mb-6 animate-float">
              <Stars className="inline-block text-yellow-200 drop-shadow-lg" size={40} />
            </div>
            <h2 className="text-white font-serif text-3xl font-bold mb-3 drop-shadow-md">
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-white animate-shimmer">
                Happy Mother's Day
              </span>
            </h2>
            <p className="text-pink-100 text-lg">Tap to open your special card</p>
            
            <div className="mt-6 flex justify-center">
              <div className="animate-bounce">
                <Heart className="text-white mx-1" fill="currentColor" size={24} />
              </div>
              <div className="animate-bounce animation-delay-300">
                <Heart className="text-white mx-1" fill="currentColor" size={24} />
              </div>
              <div className="animate-bounce animation-delay-600">
                <Heart className="text-white mx-1" fill="currentColor" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 p-4 overflow-hidden">
      {/* Music player */}
      <audio 
        ref={audioRef}
        src="https://example.com/mom-audio.mp3" // In a real implementation, a valid audio URL would go here
        loop
      />
      
      {/* Soft glow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-blend-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/10 via-rose-300/10 to-purple-200/10 animate-pulse-slow"></div>
        <div className="absolute rounded-full w-64 h-64 bg-pink-200/20 blur-3xl top-1/4 left-1/4 animate-blob"></div>
        <div className="absolute rounded-full w-80 h-80 bg-purple-200/20 blur-3xl top-1/2 right-1/4 animate-blob animation-delay-2000"></div>
        <div className="absolute rounded-full w-72 h-72 bg-yellow-200/10 blur-3xl bottom-1/3 right-1/3 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Floating elements in background */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingElements />
      </div>
      
      {/* Background sparkles */}
      {showSparkles && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <BackgroundSparkles />
        </div>
      )}
      
      {/* Confetti container */}
      {showConfetti && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <Confetti />
        </div>
      )}
      
      {/* Fireworks container */}
      {showFireworks && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <Fireworks />
        </div>
      )}
      
      {/* Seasonal decoration */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-200/40 to-transparent rounded-br-full"></div>
      </div>
      <div className="fixed bottom-0 right-0 w-40 h-40 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-purple-200/40 to-transparent rounded-tl-full"></div>
      </div>
      
      {/* Heart explosion effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <HeartExplosion />
      </div>
      
      {/* Show envelope or card */}
      {showEnvelope ? (
        <Envelope />
      ) : (
        /* Card container */
        <div 
          className={`relative w-full max-w-md transition-all duration-1000 ease-in-out cursor-pointer ${
            isOpen ? 'scale-100' : 'scale-95 hover:scale-100'
          } ${rotateEffect ? 'animate-card-rotate' : ''}`}
          onClick={toggleCard}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card cover */}
          <div 
            className={`bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 rounded-2xl shadow-2xl overflow-hidden relative z-10 transition-all duration-1000 ${
              isOpen ? 'transform -translate-y-8 rounded-b-none shadow-glow-pink' : hoverEffect ? 'shadow-glow-pink scale-102' : ''
            }`}
          >
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-20"></div>
            
            <div className="relative p-8 text-center">
              {/* Crown decoration */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <Crown className="text-yellow-200 drop-shadow-lg" size={40} />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 p-4">
                <Stars className="text-yellow-200 drop-shadow-md" size={32} />
              </div>
              <div className="absolute top-0 left-0 p-4">
                <Flower className="text-white drop-shadow-md" size={32} />
              </div>
              <div className="absolute bottom-12 right-6">
                <Sparkles className="text-yellow-100/80 drop-shadow-md" size={24} />
              </div>
              <div className="absolute bottom-12 left-6">
                <Sun className="text-yellow-100/80 drop-shadow-md" size={24} />
              </div>
              
              {/* Decorative ribbon */}
              <div className="absolute top-16 left-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-200/50 to-transparent"></div>
              
              {/* Feature spotlight */}
              <div className="absolute top-6 left-0 right-0 flex justify-center">
                <div className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium tracking-wide transition-all duration-700 transform">
                  {features[currentFeature]}
                </div>
              </div>
              
              {/* Cover text with golden frame */}
              <div className="mt-16 mb-6 relative">
                {/* Golden decorative frame */}
                <div className="absolute -top-6 -left-2 -right-2 -bottom-2 border-2 border-yellow-200/50 rounded-lg transform -rotate-1"></div>
                <div className="absolute -top-6 -left-2 -right-2 -bottom-2 border-2 border-yellow-200/30 rounded-lg transform rotate-1"></div>
                
                <h1 className="text-white font-serif text-5xl font-bold tracking-wide mb-3 relative">
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-white animate-shimmer">Happy Mother's Day</span>
                  <span className="absolute -top-1 -left-1 text-pink-200/40 blur-sm">Happy Mother's Day</span>
                </h1>
                
                <p className="text-pink-100 font-medium text-xl relative">
                  To the world's most amazing mom
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200/70 to-transparent"></span>
                </p>
              </div>
              
              {/* Award badge */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse-slow opacity-70 blur-sm">
                    <Award className="text-yellow-300/70" size={64} />
                  </div>
                  <Award className="text-yellow-200" size={64} />
                  <div className="absolute inset-0 flex items-center justify-center pt-1">
                    <Heart className="text-white" size={20} fill="currentColor" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 text-white text-xs py-1 px-3 rounded-full shadow-md">
                    #1 Mom Ever
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="flex justify-center my-6 relative">
                <div className="absolute inset-0 animate-pulse-slow opacity-70 blur-sm">
                  <Heart className="text-pink-300 mx-1 absolute left-1/4" fill="currentColor" size={28} />
                  <Heart className="text-pink-300 mx-1 absolute left-1/2" fill="currentColor" size={28} />
                  <Heart className="text-pink-300 mx-1 absolute right-1/4" fill="currentColor" size={28} />
                </div>
                <Heart className="text-white mx-2 animate-bounce relative z-10" fill="white" size={32} />
                <Heart className="text-white mx-2 animate-bounce animation-delay-100 relative z-10" fill="white" size={32} />
                <Heart className="text-white mx-2 animate-bounce animation-delay-200 relative z-10" fill="white" size={32} />
              </div>
              
              <div className="flex justify-center mt-4 space-x-4">
                <button 
                  className="rounded-full w-10 h-10 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-300" 
                  onClick={toggleMusic}
                >
                  {playMusic ? 
                    <PauseCircle className="text-white" size={24} /> : 
                    <PlayCircle className="text-white" size={24} />
                  }
                </button>
                <button 
                  className="rounded-full w-10 h-10 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-300" 
                  onClick={triggerSpecialEffects}
                >
                  <Sparkles className="text-white" size={24} />
                </button>
              </div>
              
              <p className="text-pink-100 text-sm mt-8 font-medium relative inline-block">
                <span className="relative">
                  {isOpen ? "Click to close" : "Click to open"}
                  <span className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200/70 to-transparent"></span>
                </span>
              </p>
            </div>
          </div>
          
          {/* Card inside */}
          <div 
            className={`bg-gradient-to-b from-white to-pink-50 rounded-b-2xl shadow-inner overflow-hidden transition-all duration-1000 ease-in-out ${
              isOpen ? 'max-h-screen p-8' : 'max-h-0 p-0'
            }`}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute top-4 left-4">
                <Heart size={120} />
              </div>
              <div className="absolute bottom-4 right-4">
                <Flower size={100} />
              </div>
            </div>
            
            {showMessage && (
              <div className="animate-fadeIn relative">
                {/* Decorative icons */}
                <div className="flex justify-center mb-6 relative">
                  <div className="absolute inset-0 blur-sm opacity-30 animate-pulse-slow">
                    <Gift className="text-rose-300 absolute left-1/3" size={24} />
                    <Coffee className="text-rose-300 absolute right-1/3" size={24} />
                    <Cake className="text-rose-300 absolute left-1/2" size={24} />
                    <Camera className="text-rose-300 absolute right-1/2" size={24} />
                  </div>
                  <Gift className="text-pink-500 mr-3 drop-shadow-sm" size={24} />
                  <Coffee className="text-pink-500 mx-3 drop-shadow-sm" size={24} />
                  <Cake className="text-pink-500 ml-3 drop-shadow-sm" size={24} />
                </div>
                
                {/* Gem decoration */}
                <div className="flex justify-center -mt-2 mb-4">
                  <div className="relative">
                    <Gem className="text-pink-400" size={24} />
                    <div className="absolute inset-0 text-pink-200 animate-pulse opacity-50">
                      <Gem size={24} />
                    </div>
                  </div>
                </div>
                
                {/* Decorative ribbon */}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-6"></div>
                
                <p className="text-gray-700 leading-relaxed mb-4 font-serif italic text-lg">
                  Dear Mom,
                </p>
                
                <div className="relative">
                  <div className="absolute -left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>
                  <p className="text-gray-700 leading-relaxed mb-4 pl-3">
                    Your love is the greatest gift I've ever received. Your strength, 
                    wisdom, and kindness have shaped who I am today. Your warm embrace
                    feels like home, and your smile brightens even the darkest days.
                  </p>
                
                  <p className="text-gray-700 leading-relaxed mb-4 pl-3">
                    Thank you for your endless support, comforting hugs, and for 
                    always believing in me when I couldn't believe in myself. You've 
                    taught me how to face life's challenges with courage and grace.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 pl-3">
                    Today and every day, I celebrate the wonderful woman you are.
                    The love you've given me has been my foundation and my inspiration.
                    You are truly extraordinary in every way.
                  </p>
                </div>
                
                {/* Photo gallery */}
                <div className="flex justify-center space-x-4 my-6">
                  <div onClick={cyclePhotos} className="cursor-pointer">
                    <PhotoFrame index={photoIndex} />
                  </div>
                </div>
                
                {/* Interactive message section */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg shadow-inner mb-6">
                  <div className="text-center mb-2">
                    <span className="text-pink-500 font-medium">♥ Reasons I Love You ♥</span>
                  </div>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li className="flex items-center">
                      <Heart className="text-pink-400 mr-2" size={14} fill="currentColor" />
                      <span>Your unconditional love that never wavers</span>
                    </li>
                    <li className="flex items-center">
                      <Star className="text-yellow-400 mr-2" size={14} fill="currentColor" />
                      <span>The way you always know exactly what to say</span>
                    </li>
                    <li className="flex items-center">
                      <Flower className="text-purple-400 mr-2" size={14} />
                      <span>How you transform every house into a loving home</span>
                    </li>
                    <li className="flex items-center">
                      <Sun className="text-amber-400 mr-2" size={14} fill="currentColor" />
                      <span>Your bright smile that lights up my darkest days</span>
                    </li>
                    <li className="flex items-center">
                      <Music className="text-blue-400 mr-2" size={14} />
                      <span>The beautiful memories we've created together</span>
                    </li>
                  </ul>
                </div>
                
                {/* Special surprise button */}
                <div className="text-center mb-6">
                  <button 
                    onClick={triggerSpecialEffects}
                    className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:brightness-110"
                  >
                    <span className="flex items-center">
                      <Gift className="mr-2" size={18} />
                      Special Surprise!
                    </span>
                  </button>
                </div>
                
                {/* Decorative ribbon */}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-6"></div>
                
                <p className="text-gray-700 font-serif text-right italic text-lg">
                  With all my love,
                </p>
                
                <p className="text-gray-700 font-bold text-right">
                  Your child
                </p>
                
                {/* Photo frame decoration */}
                <div className="absolute bottom-2 right-2 w-16 h-16 border-2 border-pink-200/30 rounded-lg transform rotate-6 flex items-center justify-center">
                  <Camera className="text-pink-300/50" size={28} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-40px) scale(1.1) rotate(5deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-80px) scale(0.8) rotate(-5deg);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -15px) scale(1.1);
          }
          50% {
            transform: translate(-10px, 20px) scale(0.9);
          }
          75% {
            transform: translate(-15px, -10px) scale(1.05);
          }
        }
        
        .animate-blob {
          animation: blob 15s ease-in-out infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 5s linear infinite;
          background-size: 200% 100%;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        
        @keyframes card-rotate {
          0% {
            transform: rotate(0deg) scale(0.95);
          }
          25% {
            transform: rotate(-2deg) scale(1);
          }
          75% {
            transform: rotate(2deg) scale(1);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }
        
        .animate-card-rotate {
          animation: card-rotate 1s ease-out forwards;
        }
        
        @keyframes firework {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes heartExplosion {
          0% {
            opacity: 0;
            transform: translateX(0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateX(var(--distance)) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateX(calc(var(--distance) * 1.5)) scale(0.8);
          }
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .shadow-glow-pink {
          box-shadow: 0 0 30px -5px rgba(236, 72, 153, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}