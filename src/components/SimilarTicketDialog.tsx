import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, User, Tag } from "lucide-react";

interface SimilarTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    title: string;
    description: string;
    priority: string;
    department: string;
    status: string;
    resolution: string;
    resolvedAt: string;
    similarity: number;
  } | null;
}

const SimilarTicketDialog = ({ isOpen, onClose, ticket }: SimilarTicketDialogProps) => {
  if (!ticket) return null;

  const getPriorityColor = (priority: string) => {
    if (!priority) return 'outline';
    
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-md border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <CheckCircle className="h-6 w-6 text-success" />
            <span>Similar Ticket Details</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {ticket.similarity}% Match
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ticket Info */}
          <Card className="bg-background/30 border-primary/20 shadow-ai">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-primary">#{ticket.id}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {ticket.status}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription className="text-lg font-medium text-foreground">
                {ticket.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Department:</span>
                  <span className="text-sm font-medium">{ticket.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Resolved:</span>
                  <span className="text-sm font-medium">{ticket.resolvedAt}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span>Description</span>
                </h4>
                <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-primary/10">
                  {ticket.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Resolution */}
          <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20 shadow-ai ai-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-success">
                <CheckCircle className="h-5 w-5" />
                <span>AI Resolution</span>
              </CardTitle>
              <CardDescription>
                This solution was successfully applied to resolve the similar ticket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 p-4 rounded-lg border border-success/20">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {ticket.resolution}
                </p>
              </div>
              
              <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
                <p className="text-sm text-success font-medium">
                  ✅ This solution can be adapted for your current ticket
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimilarTicketDialog;