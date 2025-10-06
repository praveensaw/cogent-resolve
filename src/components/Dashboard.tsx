import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Zap,
  Target,
  BarChart3,
  Activity,
  TrendingDown as TrendingDownIcon
} from "lucide-react";

const Dashboard = () => {
  const [metrics, setMetrics] = useState([
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
  ]);

  const [chartData, setChartData] = useState([
    { day: 'Mon', mttr: 2.8, tickets: 145, resolved: 132 },
    { day: 'Tue', mttr: 2.4, tickets: 167, resolved: 156 },
    { day: 'Wed', mttr: 2.1, tickets: 189, resolved: 178 },
    { day: 'Thu', mttr: 2.3, tickets: 156, resolved: 142 },
    { day: 'Fri', mttr: 2.0, tickets: 198, resolved: 187 },
    { day: 'Sat', mttr: 1.8, tickets: 123, resolved: 118 },
    { day: 'Sun', mttr: 2.2, tickets: 134, resolved: 125 }
  ]);

  const [hourlyData, setHourlyData] = useState([
    { time: '00:00', tickets: 12, aiProcessed: 10 },
    { time: '04:00', tickets: 8, aiProcessed: 7 },
    { time: '08:00', tickets: 45, aiProcessed: 38 },
    { time: '12:00', tickets: 67, aiProcessed: 55 },
    { time: '16:00', tickets: 89, aiProcessed: 72 },
    { time: '20:00', tickets: 54, aiProcessed: 46 }
  ]);

  const [severityData, setSeverityData] = useState([
    { name: 'Critical', value: 23, color: 'hsl(var(--destructive))' },
    { name: 'High', value: 67, color: 'hsl(var(--neon-pink))' },
    { name: 'Medium', value: 145, color: 'hsl(var(--accent))' },
    { name: 'Low', value: 89, color: 'hsl(var(--success))' }
  ]);

  const [performanceData, setPerformanceData] = useState([
    { metric: 'Speed', value: 85 },
    { metric: 'Accuracy', value: 92 },
    { metric: 'Coverage', value: 78 },
    { metric: 'Efficiency', value: 88 },
    { metric: 'Quality', value: 91 }
  ]);

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics => 
        prevMetrics.map(metric => ({
          ...metric,
          value: metric.title.includes('MTTR') 
            ? `${(Math.random() * 2 + 1.5).toFixed(1)} hours`
            : metric.title.includes('Tickets')
            ? `${Math.floor(Math.random() * 200 + 1200)}`
            : metric.title.includes('Rate')
            ? `${Math.floor(Math.random() * 15 + 75)}%`
            : `${(Math.random() * 0.5 + 4.5).toFixed(1)}/5`
        }))
      );

      // Update hourly data
      setHourlyData(prev => prev.map(item => ({
        ...item,
        tickets: Math.floor(Math.random() * 50 + 20),
        aiProcessed: Math.floor(Math.random() * 45 + 15)
      })));

      // Update severity data
      setSeverityData(prev => prev.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 100 + 20)
      })));

      // Update performance data
      setPerformanceData(prev => prev.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 20 + 75)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

      {/* Charts Section Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ticket Volume Trend */}
        <Card className="bg-card/50 backdrop-blur-sm border-neon-blue/30 shadow-ai ai-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-neon-blue" />
              <span>Ticket Volume & Resolution</span>
            </CardTitle>
            <CardDescription>Daily ticket flow and resolution rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--neon-blue))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--electric-blue) / 0.2)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--neon-blue) / 0.3)",
                      borderRadius: "8px"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tickets" 
                    stroke="hsl(var(--neon-blue))" 
                    fillOpacity={1} 
                    fill="url(#colorTickets)"
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="hsl(var(--success))" 
                    fillOpacity={1} 
                    fill="url(#colorResolved)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* MTTR Trends */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              <span>MTTR Trends</span>
            </CardTitle>
            <CardDescription>Mean Time to Resolution optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--primary) / 0.2)",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mttr" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hourly Activity */}
        <Card className="bg-card/50 backdrop-blur-sm border-accent/20 shadow-ai lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              <span>24-Hour Activity Pattern</span>
            </CardTitle>
            <CardDescription>Real-time ticket processing vs AI automation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--accent) / 0.2)" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--accent) / 0.3)",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="tickets" fill="hsl(var(--cyber-blue))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="aiProcessed" fill="hsl(var(--electric-blue))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card className="bg-card/50 backdrop-blur-sm border-neon-pink/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-neon-pink" />
              <span>Severity Distribution</span>
            </CardTitle>
            <CardDescription>Ticket priority breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--neon-pink) / 0.3)",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Performance Radar */}
        <Card className="bg-card/50 backdrop-blur-sm border-glow-cyan/20 shadow-ai ai-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-glow-cyan" />
              <span>AI Performance Metrics</span>
            </CardTitle>
            <CardDescription>Multi-dimensional performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                  <PolarGrid stroke="hsl(var(--glow-cyan) / 0.3)" />
                  <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                  <Radar 
                    name="Performance" 
                    dataKey="value" 
                    stroke="hsl(var(--glow-cyan))" 
                    fill="hsl(var(--glow-cyan))" 
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--glow-cyan) / 0.3)",
                      borderRadius: "8px"
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
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
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-primary/10 hover:border-neon-blue/30 transition-all duration-300">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{dept.name}</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {dept.rate}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-blue to-electric-blue h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_hsl(var(--neon-blue))]"
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