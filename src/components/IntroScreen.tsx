import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Zap, Target, Rocket, CircuitBoard, Cpu, Network } from "lucide-react";
import heroImage from "@/assets/hero-ai-tickets.jpg";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const phrases = [
    { text: "Welcome to the World of AI", icon: Sparkles },
    { text: "Where Intelligence Meets Innovation", icon: Brain },
    { text: "Powered by Next-Gen Technology", icon: Zap },
    { text: "Revolutionizing Support Systems", icon: Target },
    { text: "Smart Solutions, Instant Results", icon: Brain },
    { text: "The Future is Now", icon: Rocket },
    { text: "Step Into Tomorrow", icon: Sparkles }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPhase < phrases.length - 1) {
        setCurrentPhase(currentPhase + 1);
      } else {
        setShowButtons(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentPhase, phrases.length]);

  const skipIntro = () => {
    setShowButtons(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {/* Background Image with Dynamic Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI Future Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/85 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/20" />
      </div>

      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Animated Particles - More Dynamic */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--accent))' : 'hsl(var(--primary) / 0.6)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1.5, 1, 1.2, 0],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: Math.random() * 300 + 200,
              height: Math.random() * 300 + 200,
              background: `radial-gradient(circle, hsl(var(--primary) / 0.3), transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Digital Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-px bg-gradient-to-b from-primary via-accent to-transparent"
            style={{
              left: `${(i * 7) % 100}%`,
              height: '100%',
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          
          {/* Skip Button */}
          {!showButtons && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-8 right-8"
            >
              <Button 
                variant="ghost" 
                onClick={skipIntro}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip Intro
              </Button>
            </motion.div>
          )}

          {/* Animated Phrases */}
          <AnimatePresence mode="wait">
            {!showButtons && (
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 100, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -100, scale: 0.5, rotateX: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-12"
              >
                {/* Animated Icon with Circuit Effect */}
                <div className="flex justify-center mb-8 relative">
                  {/* Circuit rings */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border-2 border-primary/20 rounded-full"
                        style={{
                          width: 100 + i * 50,
                          height: 100 + i * 50,
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Main Icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative w-32 h-32 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px hsl(var(--primary))',
                          '0 0 60px hsl(var(--primary))',
                          '0 0 20px hsl(var(--primary))'
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                    />
                    {React.createElement(phrases[currentPhase].icon, {
                      className: "h-16 w-16 text-background relative z-10",
                      strokeWidth: 2.5
                    })}
                  </motion.div>

                  {/* Corner Accents */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`corner-${i}`}
                      className="absolute w-4 h-4 border-2 border-primary"
                      style={{
                        top: i < 2 ? -20 : 'auto',
                        bottom: i >= 2 ? -20 : 'auto',
                        left: i % 2 === 0 ? -20 : 'auto',
                        right: i % 2 === 1 ? -20 : 'auto',
                        borderTop: i < 2 ? '2px solid hsl(var(--primary))' : 'none',
                        borderBottom: i >= 2 ? '2px solid hsl(var(--primary))' : 'none',
                        borderLeft: i % 2 === 0 ? '2px solid hsl(var(--primary))' : 'none',
                        borderRight: i % 2 === 1 ? '2px solid hsl(var(--primary))' : 'none',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                {/* Message Box with Glow */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Glowing Background Box */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-electric-blue/20 to-cyber-blue/20 rounded-3xl blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Main Message Box */}
                  <motion.div
                    className="relative backdrop-blur-xl bg-gradient-to-br from-neon-blue/10 via-electric-blue/10 to-cyber-blue/10 border-2 border-neon-blue/30 rounded-3xl p-8 md:p-12 shadow-2xl"
                    animate={{
                      borderColor: [
                        'hsl(var(--neon-blue) / 0.3)',
                        'hsl(var(--electric-blue) / 0.6)',
                        'hsl(var(--cyber-blue) / 0.3)',
                      ],
                      boxShadow: [
                        '0 0 20px hsl(var(--neon-blue) / 0.3)',
                        '0 0 60px hsl(var(--electric-blue) / 0.6)',
                        '0 0 20px hsl(var(--cyber-blue) / 0.3)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {/* Corner Decorations */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`corner-deco-${i}`}
                        className="absolute w-6 h-6"
                        style={{
                          top: i < 2 ? -3 : 'auto',
                          bottom: i >= 2 ? -3 : 'auto',
                          left: i % 2 === 0 ? -3 : 'auto',
                          right: i % 2 === 1 ? -3 : 'auto',
                        }}
                        animate={{
                          rotate: i % 2 === 0 ? 360 : -360,
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <div className="w-full h-full border-t-2 border-l-2 border-electric-blue rounded-tl-lg" 
                          style={{
                            transform: i === 1 ? 'rotate(90deg)' : i === 2 ? 'rotate(270deg)' : i === 3 ? 'rotate(180deg)' : 'none'
                          }}
                        />
                      </motion.div>
                    ))}

                    {/* Text with Enhanced Gradient */}
                    <motion.h1
                      className="text-5xl md:text-8xl font-bold leading-tight bg-gradient-to-r from-glow-cyan via-electric-blue to-neon-blue bg-clip-text text-transparent"
                      style={{
                        backgroundSize: '200% 200%',
                        filter: 'drop-shadow(0 0 30px hsl(var(--electric-blue) / 0.8))',
                      }}
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {phrases[currentPhase].text}
                    </motion.h1>

                    {/* Scan Line Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/20 to-transparent"
                      animate={{
                        y: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Progress Dots */}
                <motion.div
                  className="flex justify-center space-x-3"
                >
                  {phrases.map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: i === currentPhase ? 40 : 12,
                        height: 12,
                        background: i === currentPhase 
                          ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' 
                          : 'hsl(var(--primary) / 0.3)',
                      }}
                      animate={i === currentPhase ? {
                        boxShadow: [
                          '0 0 10px hsl(var(--primary))',
                          '0 0 20px hsl(var(--primary))',
                          '0 0 10px hsl(var(--primary))'
                        ]
                      } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Call to Action */}
          <AnimatePresence>
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="space-y-16"
              >
                {/* Portal Effect */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`portal-${i}`}
                        className="absolute border-4 border-primary/30 rounded-full"
                        style={{
                          width: 200 + i * 100,
                          height: 200 + i * 100,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.5, 0.2],
                          rotate: i % 2 === 0 ? 360 : -360,
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                      />
                    ))}
                  </motion.div>

                  <div className="space-y-8 relative z-10">
                    <motion.div
                      animate={{
                        textShadow: [
                          '0 0 20px hsl(var(--primary))',
                          '0 0 60px hsl(var(--primary))',
                          '0 0 20px hsl(var(--primary))'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                    <motion.h1 
                        className="text-7xl md:text-[10rem] font-bold leading-tight bg-gradient-to-r from-glow-cyan via-electric-blue to-neon-blue bg-clip-text text-transparent"
                        style={{
                          backgroundSize: '200% 200%',
                          filter: 'drop-shadow(0 0 40px hsl(var(--electric-blue)))',
                        }}
                        animate={{ 
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          backgroundPosition: { duration: 5, repeat: Infinity },
                          scale: { duration: 3, repeat: Infinity }
                        }}
                      >
                        AI FUTURE
                      </motion.h1>
                    </motion.div>
                    
                    <motion.div
                      className="flex justify-center items-center space-x-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[CircuitBoard, Cpu, Network].map((Icon, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            y: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                            rotate: { duration: 3, repeat: Infinity, delay: i * 0.3 }
                          }}
                        >
                          <Icon className="h-8 w-8 text-electric-blue drop-shadow-[0_0_10px_hsl(var(--electric-blue))]" />
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <motion.p 
                      className="text-2xl md:text-4xl text-foreground/80 max-w-3xl mx-auto font-light"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Step into the world of intelligent ticket resolution
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      onClick={onComplete}
                      className="px-16 py-8 text-xl font-bold bg-gradient-to-r from-success via-primary to-accent bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-2xl shadow-success/60 relative overflow-hidden group border-2 border-success/50"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <Rocket className="mr-3 h-7 w-7 relative z-10" />
                      <span className="relative z-10">Enter the Future</span>
                    </Button>
                  </motion.div>
                  
                  <motion.p 
                    className="text-base text-muted-foreground"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Experience the next generation of AI-powered support
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;