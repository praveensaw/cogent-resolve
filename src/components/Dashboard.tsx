import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

const Dashboard = () => {
  const metrics = [
    {
      title: "MTTR (Mean Time to Resolution)",
      value: "2.4 hours",
      change: "-15%",
      trend: "down",
      icon: Clock,
      color: "success"
    },
    {
      title: "Resolved Tickets",
      value: "1,247",
      change: "+23%",
      trend: "up",
      icon: CheckCircle,
      color: "primary"
    },
    {
      title: "Auto-Resolve Rate",
      value: "78%",
      change: "+12%",
      trend: "up",
      icon: Zap,
      color: "accent"
    },
    {
      title: "CSAT Score",
      value: "4.8/5",
      change: "+0.3",
      trend: "up",
      icon: Target,
      color: "neon-pink"
    }
  ];

  const departments = [
    { name: "Engineering", tickets: 145, resolved: 132, rate: 91 },
    { name: "DevOps", tickets: 89, resolved: 85, rate: 96 },
    { name: "Frontend", tickets: 67, resolved: 58, rate: 87 },
    { name: "Backend", tickets: 123, resolved: 109, rate: 89 },
    { name: "QA", tickets: 45, resolved: 42, rate: 93 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-destructive";
  };

  return (
    <div className="space-y-8">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const TrendIcon = getTrendIcon(metric.trend);
          const IconComponent = metric.icon;
          
          return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai ai-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <div className="flex items-center space-x-1">
                      <TrendIcon className={`h-4 w-4 ${getTrendColor(metric.trend)}`} />
                      <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-${metric.color === 'neon-pink' ? 'cyber' : metric.color}`}>
                    <IconComponent className="h-6 w-6 text-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MTTR Trends */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>MTTR Trends (Last 30 Days)</span>
            </CardTitle>
            <CardDescription>Mean Time to Resolution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-primary/20 rounded-lg neon-border">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 mx-auto text-primary neural-pulse" />
                <p className="text-sm text-muted-foreground">Chart visualization coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span>Department Performance</span>
            </CardTitle>
            <CardDescription>Resolution rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-primary/10">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{dept.name}</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {dept.rate}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ai-glow"
                        style={{ width: `${dept.rate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{dept.resolved} resolved</span>
                      <span>{dept.tickets} total</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-neon-pink" />
            <span>Real-time Activity</span>
          </CardTitle>
          <CardDescription>Live ticket processing and AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: "TKT-2024-156", action: "AI Analysis Complete", time: "2 min ago", type: "success" },
              { id: "TKT-2024-157", action: "Similarity Match Found", time: "5 min ago", type: "info" },
              { id: "TKT-2024-158", action: "Auto-Resolved", time: "7 min ago", type: "success" },
              { id: "TKT-2024-159", action: "Manual Review Required", time: "12 min ago", type: "warning" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-primary/10 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-success' : 
                    activity.type === 'info' ? 'bg-accent' : 'bg-destructive'
                  } neural-pulse`}></div>
                  <div>
                    <span className="text-sm font-medium text-foreground">#{activity.id}</span>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;