import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Zap, Target, Rocket } from "lucide-react";
import heroImage from "@/assets/hero-ai-tickets.jpg";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const phrases = [
    { text: "Welcome to the Future", icon: Sparkles },
    { text: "AI-Powered Intelligence", icon: Brain },
    { text: "Lightning Fast Resolution", icon: Zap },
    { text: "Precision Targeting", icon: Target },
    { text: "The Future is Here", icon: Rocket }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPhase < phrases.length - 1) {
        setCurrentPhase(currentPhase + 1);
      } else {
        setShowButtons(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentPhase, phrases.length]);

  const skipIntro = () => {
    setShowButtons(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Background Image with Dynamic Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI Future Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 1.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity },
                      scale: { duration: 1.5, repeat: Infinity }
                    }}
                    className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center"
                  >
                    {React.createElement(phrases[currentPhase].icon, {
                      className: "h-12 w-12 text-foreground"
                    })}
                  </motion.div>
                </div>

                <motion.h1 
                  className="text-6xl md:text-8xl font-bold leading-tight"
                  animate={{ 
                    background: [
                      "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
                      "linear-gradient(45deg, hsl(var(--accent)), hsl(var(--primary)))",
                      "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  {phrases[currentPhase].text}
                </motion.h1>

                <motion.div
                  className="flex justify-center space-x-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-primary rounded-full"
                      style={{
                        animationDelay: `${i * 0.2}s`
                      }}
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
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <motion.h1 
                    className="text-7xl md:text-9xl font-bold leading-tight bg-gradient-primary bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    AI FUTURE
                  </motion.h1>
                  
                  <motion.p 
                    className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Step into the world of intelligent ticket resolution
                  </motion.p>
                </div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button 
                    size="lg" 
                    onClick={onComplete}
                    className="px-12 py-6 text-lg bg-gradient-primary hover:shadow-ai transform hover:scale-105 transition-all duration-300"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Enter the Future
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Experience the next generation of AI-powered support
                  </p>
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