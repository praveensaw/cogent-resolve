import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Zap, 
  Target, 
  Shield,
  TrendingUp,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-ai-tickets.jpg";

const HeroSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Gemini AI Analysis",
      description: "Advanced AI-powered ticket classification and analysis"
    },
    {
      icon: Zap,
      title: "FAISS Embeddings",
      description: "Lightning-fast similarity search across ticket database"
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Find similar tickets with high accuracy rates"
    },
    {
      icon: Shield,
      title: "Intelligent Routing",
      description: "Automatic priority and severity classification"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track resolution patterns and optimize workflows"
    },
    {
      icon: Clock,
      title: "Time Estimation",
      description: "AI-powered resolution time predictions"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI-powered support center with neural networks and data visualization"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-6">
            <div className="flex justify-center space-x-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 neural-pulse">
                <Brain className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
              <Badge className="bg-accent/10 text-accent border-accent/20">
                <Zap className="h-3 w-3 mr-1" />
                Enterprise Ready
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Intelligent
              </span>
              <br />
              <span className="text-foreground">
                Ticket Resolution
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your support workflow with AI-powered analysis that delivers 
              instant insights, similarity matching, and intelligent resolution recommendations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-ai transition-all duration-300 hover:scale-105"
              >
                <div className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                95%
              </div>
              <p className="text-sm text-muted-foreground">Analysis Accuracy</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-neural bg-clip-text text-transparent">
                {"<60s"}
              </div>
              <p className="text-sm text-muted-foreground">Average Analysis Time</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                10M+
              </div>
              <p className="text-sm text-muted-foreground">Tickets Analyzed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;