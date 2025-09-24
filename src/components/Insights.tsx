import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Users,
  Zap,
  Target
} from "lucide-react";

const Insights = () => {
  const topIssues = [
    { 
      issue: "Database Connection Timeout", 
      frequency: 34, 
      trend: "+12%", 
      severity: "high",
      avgResolution: "45 min"
    },
    { 
      issue: "Authentication Service Errors", 
      frequency: 28, 
      trend: "-8%", 
      severity: "critical",
      avgResolution: "23 min"
    },
    { 
      issue: "API Rate Limiting Issues", 
      frequency: 22, 
      trend: "+5%", 
      severity: "medium",
      avgResolution: "67 min"
    },
    { 
      issue: "Frontend Build Failures", 
      frequency: 19, 
      trend: "-15%", 
      severity: "low",
      avgResolution: "34 min"
    },
    { 
      issue: "Memory Leak in Production", 
      frequency: 16, 
      trend: "+18%", 
      severity: "high",
      avgResolution: "89 min"
    }
  ];

  const aiInsights = [
    {
      title: "Pattern Detection",
      description: "Identified recurring issue pattern in authentication microservice",
      confidence: 94,
      icon: Brain,
      type: "critical"
    },
    {
      title: "Resolution Optimization",
      description: "Suggested automation for database timeout issues could reduce MTTR by 40%",
      confidence: 87,
      icon: Zap,
      type: "success"
    },
    {
      title: "Resource Prediction",
      description: "Expected 23% increase in memory-related tickets next week",
      confidence: 76,
      icon: TrendingUp,
      type: "warning"
    },
    {
      title: "Team Workload",
      description: "Backend team approaching capacity - consider load balancing",
      confidence: 91,
      icon: Users,
      type: "info"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case "critical": return "border-destructive/20 bg-destructive/5";
      case "success": return "border-success/20 bg-success/5";
      case "warning": return "border-yellow-500/20 bg-yellow-500/5";
      case "info": return "border-accent/20 bg-accent/5";
      default: return "border-primary/20 bg-primary/5";
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiInsights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <Card 
              key={index} 
              className={`bg-card/50 backdrop-blur-sm border shadow-ai ${getInsightTypeColor(insight.type)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-primary">
                    <IconComponent className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">AI Confidence</span>
                        <span className="text-xs font-medium text-foreground">{insight.confidence}%</span>
                      </div>
                      <Progress 
                        value={insight.confidence} 
                        className="h-2 bg-muted"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Issues Analysis */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-neon-pink" />
            <span>Top Issues Analysis</span>
          </CardTitle>
          <CardDescription>Most frequent issues and their trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topIssues.map((issue, index) => (
              <div key={index} className="p-4 rounded-lg bg-background/30 border border-primary/10 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{issue.issue}</h4>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Avg: {issue.avgResolution}
                      </span>
                      <span>Frequency: {issue.frequency} tickets</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(issue.severity)}>
                      {issue.severity}
                    </Badge>
                    <Badge variant="outline" className={
                      issue.trend.startsWith('+') 
                        ? "text-destructive border-destructive/20" 
                        : "text-success border-success/20"
                    }>
                      {issue.trend}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ai-glow"
                    style={{ width: `${(issue.frequency / 40) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span>Department Breakdown</span>
            </CardTitle>
            <CardDescription>Ticket distribution across teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: "Engineering", count: 45, percentage: 32 },
                { dept: "DevOps", count: 38, percentage: 27 },
                { dept: "QA", count: 28, percentage: 20 },
                { dept: "Product", count: 19, percentage: 14 },
                { dept: "Design", count: 10, percentage: 7 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                    <span className="text-sm font-medium text-foreground">{item.dept}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item.count} tickets</span>
                    <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-success" />
              <span>Resolution Metrics</span>
            </CardTitle>
            <CardDescription>Performance indicators and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary mb-1">85%</div>
                <div className="text-sm text-muted-foreground">First Contact Resolution</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-background/30 border border-primary/10">
                  <div className="text-lg font-semibold text-foreground mb-1">2.1h</div>
                  <div className="text-xs text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/30 border border-primary/10">
                  <div className="text-lg font-semibold text-foreground mb-1">94%</div>
                  <div className="text-xs text-muted-foreground">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;