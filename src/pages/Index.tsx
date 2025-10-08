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
  technicalDetails: string;
  steps: string[];
  similarTickets: Array<{
    id: string;
    title: string;
    description: string;
    priority: string;
    department: string;
    status: string;
    resolution: string;
    resolvedAt: string;
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
        summary: `Analysis of ${ticketData.topic} issue with ${ticketData.priority} priority. The system has identified potential issues in the ${ticketData.department} department that require immediate attention. Based on historical patterns, this appears to be a ${ticketData.topic === 'database' ? 'performance-related' : ticketData.topic === 'api' ? 'connectivity or rate-limiting' : ticketData.topic === 'authentication' ? 'security or access' : 'configuration'} issue.`,
        rootCause: `The issue appears to stem from ${ticketData.topic === 'database' ? 'database connection pool exhaustion and possible unoptimized queries causing timeout errors' : ticketData.topic === 'api' ? 'API rate limiting configuration issues or excessive request patterns' : ticketData.topic === 'authentication' ? 'authentication token validation problems or session management issues' : ticketData.topic === 'network' ? 'network connectivity problems or firewall configuration' : 'service dependency failures or misconfiguration'}. This is affecting ${ticketData.priority === 'critical' ? 'critical production systems' : 'application performance'}.`,
        solution: `To resolve this issue: ${ticketData.topic === 'database' ? 'Optimize database queries, add necessary indexes, and increase connection pool size. Review slow query logs and implement caching where appropriate.' : ticketData.topic === 'api' ? 'Review and adjust API rate limits, implement proper retry logic with exponential backoff, and optimize API call patterns.' : ticketData.topic === 'authentication' ? 'Verify authentication configuration, synchronize server time across all instances, and review token expiration settings.' : 'Check service configurations, verify all dependencies are running, and review error logs for specific failure points.'}`,
        technicalDetails: `${ticketData.topic === 'database' ? 'Database Connection Pool Status:\n- Max Pool Size: 20 connections\n- Active Connections: 20\n- Idle Connections: 0\n- Pending Requests: 47\n- Query Timeout: 30000ms\n\nRecommended Actions:\n1. Increase connection pool to 50: HikariCP.maximumPoolSize=50\n2. Add database indexes:\n   CREATE INDEX idx_users_email ON users(email);\n   CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);\n3. Enable slow query logging: log_min_duration_statement=500ms\n4. Review and optimize N+1 query patterns' : ticketData.topic === 'api' ? 'API Rate Limiter Configuration:\n- Current Limit: 100 requests/minute\n- Actual Rate: 347 requests/minute\n- Redis TTL: 30s (misconfigured, should be 60s)\n\nConfiguration Fix:\nconst rateLimiter = new RateLimiter({\n  points: 100,\n  duration: 60,\n  blockDuration: 60,\n  keyPrefix: "rl",\n  storeClient: redisClient\n});\n\nResponse Headers:\nHTTP 429 Too Many Requests\nRetry-After: 60' : ticketData.topic === 'authentication' ? 'JWT Token Validation Issue:\n- Token Expiry: 1704067200\n- Current Time: 1704070800\n- Time Drift: 3600 seconds\n\nServer Synchronization:\nsudo apt-get install ntp\nsudo systemctl enable ntp\nsudo systemctl start ntp\n\nJWT Configuration Update:\nconst verifyOptions = {\n  algorithms: ["RS256"],\n  clockTolerance: 300\n};\njwt.verify(token, publicKey, verifyOptions);' : 'Service Health Check:\n- Status: HTTP 503 Service Unavailable\n- Last Restart: 2024-10-08T14:23:17Z\n- Circuit Breaker: OPEN (threshold 50%)\n- Failed Attempts: 5 consecutive\n\nRecovery Steps:\n1. Check service logs for errors\n2. Verify all dependencies are healthy\n3. Review configuration files\n4. Implement retry logic with exponential backoff'}`,
        steps: [
          "Review the issue details and verify the problem scope",
          "Check system logs and error messages for additional context",
          ticketData.topic === 'database' ? "Analyze database performance metrics and slow query logs" : ticketData.topic === 'api' ? "Review API rate limiting configuration and request patterns" : ticketData.topic === 'authentication' ? "Verify authentication configuration and server time synchronization" : "Check service health and dependency status",
          ticketData.topic === 'database' ? "Create necessary database indexes and optimize queries" : ticketData.topic === 'api' ? "Update rate limiter configuration and implement retry logic" : ticketData.topic === 'authentication' ? "Configure time synchronization and update JWT settings" : "Fix configuration issues and restart affected services",
          "Test the solution in a staging environment",
          "Deploy the fix to production with monitoring",
          "Verify the issue is resolved and monitor for any regressions",
          "Document the root cause and solution for future reference"
        ],
        similarTickets: [
          { 
            id: "TKT-2024-001", 
            title: `Similar ${ticketData.topic} issue - Performance degradation`, 
            description: `Previous incident involving ${ticketData.topic} issues in the ${ticketData.department} department. The issue was related to ${ticketData.topic === 'database' ? 'database connection pool exhaustion and slow queries' : ticketData.topic === 'api' ? 'API rate limiting and request throttling' : ticketData.topic === 'authentication' ? 'authentication token validation failures' : 'service configuration problems'}. Users experienced degraded performance and intermittent errors.`,
            priority: "high",
            department: ticketData.department,
            status: "Resolved",
            resolution: `The issue was resolved by ${ticketData.topic === 'database' ? 'optimizing database queries, adding appropriate indexes, and increasing the connection pool size from 20 to 50 connections. Implemented slow query logging and monitoring.' : ticketData.topic === 'api' ? 'correcting the rate limiter configuration, implementing proper retry logic with exponential backoff, and adding better error handling for rate-limited requests.' : ticketData.topic === 'authentication' ? 'synchronizing server times across all instances using NTP, adding clock tolerance to JWT validation, and updating authentication middleware configuration.' : 'reviewing and updating service configurations, implementing proper health checks, and adding monitoring for service dependencies.'}`,
            resolvedAt: "2024-01-15T14:23:00Z",
            similarity: 89 
          },
          { 
            id: "TKT-2024-045", 
            title: `${ticketData.topic} configuration issue`, 
            description: `Configuration problem affecting ${ticketData.topic} functionality. The issue manifested as ${ticketData.priority === 'critical' ? 'system-wide failures' : 'degraded performance'} impacting user experience. Root cause was traced to ${ticketData.topic === 'database' ? 'suboptimal database configuration and missing indexes' : ticketData.topic === 'api' ? 'incorrect API gateway settings' : 'misconfigured service parameters'}.`,
            priority: "medium",
            department: ticketData.department,
            status: "Resolved",
            resolution: `Fixed by updating configuration files, implementing proper monitoring, and adding automated tests to prevent similar issues. The solution included ${ticketData.topic === 'database' ? 'database optimization and connection pool tuning' : ticketData.topic === 'api' ? 'API rate limit adjustments and caching improvements' : 'service configuration updates and dependency management'}. System performance returned to normal levels after deployment.`,
            resolvedAt: "2024-01-20T09:15:00Z",
            similarity: 76 
          }
        ],
        tags: [
          ticketData.topic.toLowerCase(), 
          ticketData.department.toLowerCase(),
          "production",
          "p" + (Math.floor(Math.random() * 4) + 1).toString(),
          ticketData.priority.toLowerCase(),
          "stack-trace",
          "performance"
        ]
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
