import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target, 
  Lightbulb,
  TrendingUp,
  Users,
  Wrench,
  ExternalLink
} from "lucide-react";
import SimilarTicketDialog from "./SimilarTicketDialog";

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

interface AnalysisResultProps {
  analysis: AnalysisData | null;
  isLoading: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, isLoading }) => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSimilarTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="neural-pulse">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">AI Analysis in Progress</p>
              <p className="text-sm text-muted-foreground">Processing with neural networks...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Lightbulb className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Ready for Analysis</p>
              <p className="text-sm text-muted-foreground">Submit a ticket to get AI-powered insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <Clock className="h-4 w-4" />;
      case "low": return <CheckCircle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Analysis Overview</span>
          </CardTitle>
          <CardDescription>AI-powered ticket analysis results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Badge className={getSeverityColor(analysis.severity)}>
                {getSeverityIcon(analysis.severity)}
                <span className="ml-1 capitalize">{analysis.severity}</span>
              </Badge>
              <p className="text-xs text-muted-foreground">Severity</p>
            </div>
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                P{analysis.priority}
              </Badge>
              <p className="text-xs text-muted-foreground">Priority</p>
            </div>
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                <Clock className="h-3 w-3 mr-1" />
                {analysis.estimatedTime}
              </Badge>
              <p className="text-xs text-muted-foreground">Est. Time</p>
            </div>
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                {analysis.confidence}%
              </Badge>
              <p className="text-xs text-muted-foreground">Confidence</p>
            </div>
          </div>
          
          <Separator className="bg-border/50" />
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-primary" />
              Summary
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysis.summary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Root Cause & Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Root Cause</span>
            </CardTitle>
            <CardDescription>General Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {analysis.rootCause}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>Recommended Solution</span>
            </CardTitle>
            <CardDescription>General Approach</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {analysis.solution}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      {analysis.technicalDetails && (
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5 text-accent" />
              <span>Technical Details</span>
            </CardTitle>
            <CardDescription>In-depth technical analysis and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono bg-background/30 p-4 rounded-lg border border-primary/10 overflow-x-auto">
              {analysis.technicalDetails}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Implementation Steps */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="h-5 w-5 text-primary" />
            <span>Implementation Steps</span>
          </CardTitle>
          <CardDescription>Follow these steps to resolve the issue</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <ol className="space-y-3">
              {analysis.steps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Similar Tickets & Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Users className="h-5 w-5 text-accent" />
              <span>Similar Tickets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-3">
                {analysis.similarTickets.map((ticket, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-lg bg-background/30 border border-primary/10 hover:shadow-glow transition-all duration-300 cursor-pointer group"
                    onClick={() => handleSimilarTicketClick(ticket)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-foreground">{ticket.title}</p>
                        <ExternalLink className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground">#{ticket.id}</p>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {ticket.similarity}%
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              <span>Categories & Tags</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Category</p>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                  {analysis.category}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SimilarTicketDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default AnalysisResult;