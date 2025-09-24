import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import TicketForm from "@/components/TicketForm";
import AnalysisResult from "@/components/AnalysisResult";
import FeedbackSystem from "@/components/FeedbackSystem";
import Dashboard from "@/components/Dashboard";
import Insights from "@/components/Insights";
import SettingsDialog from "@/components/SettingsDialog";
import { useToast } from "@/hooks/use-toast";

interface TicketData {
  ticketId: string;
  department: string;
  title: string;
  description: string;
  priority: string;
  topic: string;
  resolutionStatus: string;
}

interface AnalysisData {
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  priority: number;
  estimatedTime: string;
  confidence: number;
  summary: string;
  rootCause: string;
  solution: string;
  steps: string[];
  similarTickets: Array<{
    id: string;
    title: string;
    similarity: number;
  }>;
  tags: string[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (ticketData: TicketData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Check if API key is configured
      const settings = localStorage.getItem("ai-ticket-resolver-settings");
      if (!settings) {
        toast({
          title: "Configuration Required",
          description: "Please configure your API settings first",
          variant: "destructive",
        });
        setSettingsOpen(true);
        setIsAnalyzing(false);
        return;
      }

      const parsedSettings = JSON.parse(settings);
      if (!parsedSettings.geminiApiKey) {
        toast({
          title: "API Key Missing",
          description: "Please add your Gemini API key in settings",
          variant: "destructive",
        });
        setSettingsOpen(true);
        setIsAnalyzing(false);
        return;
      }

      // Simulate AI analysis with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock analysis result - in real implementation, this would call your AI service
      const mockResult: AnalysisData = {
        severity: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
        category: ticketData.topic,
        priority: Math.floor(Math.random() * 4) + 1,
        estimatedTime: ["15 min", "30 min", "1 hour", "2 hours", "4 hours"][Math.floor(Math.random() * 5)],
        confidence: Math.floor(Math.random() * 20) + 80,
        summary: `This ${ticketData.priority} priority ticket relates to ${ticketData.topic} issues. Based on the description "${ticketData.description.substring(0, 100)}...", the system has identified potential causes and recommended solutions.`,
        rootCause: "The issue appears to be caused by a configuration mismatch in the system settings, potentially related to recent updates or changes in the environment.",
        solution: "Implement a systematic approach to verify and correct the configuration parameters, followed by thorough testing to ensure stability.",
        steps: [
          "Review current system configuration and identify discrepancies",
          "Backup existing configuration files before making changes",
          "Apply the recommended configuration updates",
          "Test the system in a controlled environment",
          "Monitor system performance for 24 hours",
          "Document the changes and update procedures"
        ],
        similarTickets: [
          { id: "TKT-2024-001", title: "Similar configuration issue in production", similarity: 89 },
          { id: "TKT-2024-045", title: "Related system performance problem", similarity: 76 },
          { id: "TKT-2024-032", title: "Configuration mismatch after update", similarity: 72 }
        ],
        tags: ["configuration", "system", ticketData.topic.toLowerCase(), ticketData.department.toLowerCase()]
      };

      setAnalysisResult(mockResult);
      setShowFeedback(true);
      
      toast({
        title: "Analysis Complete",
        description: "AI has successfully analyzed your ticket",
      });

    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFeedbackSubmit = (feedback: any) => {
    toast({
      title: "Feedback Received",
      description: "Thank you for helping us improve our AI system!",
    });
    
    // Here you would send feedback to your backend
    console.log("Feedback submitted:", feedback);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tickets":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ticket Form */}
            <div className="space-y-6">
              <TicketForm 
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            </div>

            {/* Analysis Results & Feedback */}
            <div className="space-y-6">
              <AnalysisResult 
                analysis={analysisResult}
                isLoading={isAnalyzing}
              />
              
              {showFeedback && analysisResult && (
                <FeedbackSystem onFeedbackSubmit={handleFeedbackSubmit} />
              )}
            </div>
          </div>
        );
      case "dashboard":
        return <Dashboard />;
      case "insights":
        return <Insights />;
      case "settings":
        return (
          <div className="max-w-2xl mx-auto">
            <SettingsDialog 
              open={true}
              onOpenChange={(open) => !open && setActiveTab("tickets")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section - only show on tickets tab */}
      {activeTab === "tickets" && <HeroSection />}
      
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Application */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        {renderTabContent()}
      </div>

      {/* Settings Dialog */}
      <SettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
};

export default Index;
