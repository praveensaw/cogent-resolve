import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Bot, Zap, Brain, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketData {
  ticketId: string;
  department: string;
  title: string;
  description: string;
  priority: string;
  topic: string;
  ticketType: string;
  resolutionStatus: string;
}

interface TicketFormProps {
  onAnalyze: (data: TicketData) => void;
  isAnalyzing: boolean;
  onOpenSettings: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ onAnalyze, isAnalyzing, onOpenSettings }) => {
  const [formData, setFormData] = useState<TicketData>({
    ticketId: `TKT-${Date.now()}`,
    department: "",
    title: "",
    description: "",
    priority: "",
    topic: "",
    ticketType: "",
    resolutionStatus: "open"
  });
  const { toast } = useToast();

  const topics = [
    "Database",
    "Network",
    "Authentication",
    "Performance",
    "Security",
    "API",
    "Frontend",
    "Backend",
    "Infrastructure",
    "Mobile"
  ];

  const departments = [
    "Engineering",
    "DevOps",
    "Frontend",
    "Backend",
    "QA",
    "Product",
    "Design",
    "Infrastructure"
  ];

  const priorities = [
    "Critical",
    "High", 
    "Medium",
    "Low"
  ];

  const ticketTypes = [
    "Incident",
    "Service Request",
    "Change Request"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.topic || !formData.department || !formData.priority || !formData.ticketType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onAnalyze(formData);
  };

  const handleInputChange = (field: keyof TicketData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Bot className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Ticket Resolver
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Intelligent ticket analysis powered by advanced AI
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={onOpenSettings}
            className="border-primary/20 hover:bg-primary/10"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Brain className="h-3 w-3 mr-1" />
            Gemini AI
          </Badge>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
            <Zap className="h-3 w-3 mr-1" />
            FAISS Embeddings
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ticket ID & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Ticket ID</Label>
              <Input
                value={formData.ticketId}
                disabled
                className="bg-muted/50 border-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Status</Label>
              <Input
                value={formData.resolutionStatus}
                disabled
                className="bg-muted/50 border-primary/20 capitalize"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Ticket Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter a clear, descriptive title..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary/40 transition-colors neon-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Ticket Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the issue, including steps to reproduce, expected behavior, and any error messages..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[120px] bg-background/50 border-primary/20 focus:border-primary/40 transition-colors resize-none neon-border"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-foreground">
                Department *
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/40 neon-border">
                  <SelectValue placeholder="Select department..." />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept.toLowerCase()} className="hover:bg-primary/10">
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticketType" className="text-sm font-medium text-foreground">
                Ticket Type *
              </Label>
              <Select value={formData.ticketType} onValueChange={(value) => handleInputChange("ticketType", value)}>
                <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/40 neon-border">
                  <SelectValue placeholder="Select ticket type..." />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                  {ticketTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()} className="hover:bg-primary/10">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-foreground">
                Priority *
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/40 neon-border">
                  <SelectValue placeholder="Select priority..." />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority.toLowerCase()} className="hover:bg-primary/10">
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-sm font-medium text-foreground">
                Topic Category *
              </Label>
              <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary/40 neon-border">
                  <SelectValue placeholder="Select topic..." />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-primary/20">
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic.toLowerCase()} className="hover:bg-primary/10">
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-neon hover:shadow-glow neon-flicker" 
            size="lg"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="cyber-scan">Resolving Ticket with AI...</span>
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Resolve Ticket
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TicketForm;