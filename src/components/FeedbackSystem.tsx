import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  Send,
  CheckCircle
} from "lucide-react";

interface FeedbackSystemProps {
  onFeedbackSubmit?: (feedback: {
    rating: string;
    comment: string;
    satisfaction: number;
  }) => void;
}

const FeedbackSystem: React.FC<FeedbackSystemProps> = ({ onFeedbackSubmit }) => {
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratings = [
    { 
      value: "excellent", 
      label: "Excellent", 
      color: "bg-gradient-primary hover:shadow-glow",
      score: 5 
    },
    { 
      value: "good", 
      label: "Good", 
      color: "bg-gradient-neural hover:shadow-neural",
      score: 4 
    },
    { 
      value: "satisfactory", 
      label: "Satisfactory", 
      color: "bg-gradient-cyber hover:shadow-ai",
      score: 3 
    },
    { 
      value: "sufficient", 
      label: "Sufficient", 
      color: "bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/40",
      score: 2 
    },
    { 
      value: "poor", 
      label: "Poor", 
      color: "bg-destructive/20 hover:bg-destructive/30 border-destructive/40",
      score: 1 
    }
  ];

  const handleSubmit = () => {
    if (!selectedRating) return;
    
    const selectedRatingData = ratings.find(r => r.value === selectedRating);
    const feedback = {
      rating: selectedRating,
      comment,
      satisfaction: selectedRatingData?.score || 0
    };
    
    onFeedbackSubmit?.(feedback);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedRating("");
      setComment("");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-success/20 shadow-glow">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center neural-pulse">
              <CheckCircle className="h-8 w-8 text-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Thank You!</h3>
              <p className="text-sm text-muted-foreground">
                Your feedback has been recorded and will help improve our AI system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-ai">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-neon-pink" />
          <span>How satisfied are you with this solution?</span>
        </CardTitle>
        <CardDescription>
          Your feedback helps us improve our AI analysis and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ratings.map((rating) => (
            <Button
              key={rating.value}
              variant="outline"
              onClick={() => setSelectedRating(rating.value)}
              className={`
                h-auto p-4 text-center transition-all duration-300 neon-border
                ${selectedRating === rating.value 
                  ? `${rating.color} border-2 ai-glow` 
                  : 'bg-background/30 border-primary/20 hover:bg-primary/10'
                }
              `}
            >
              <div className="space-y-2">
                <ThumbsUp className="h-5 w-5 mx-auto" />
                <div className="text-sm font-medium">{rating.label}</div>
                {selectedRating === rating.value && (
                  <Badge variant="secondary" className="bg-foreground/10 text-foreground">
                    Selected
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>

        {/* Comment Section */}
        {selectedRating && (
          <div className="space-y-3 animate-fade-in">
            <label className="text-sm font-medium text-foreground flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Additional Comments (Optional)
            </label>
            <Textarea
              placeholder="Tell us more about your experience with this AI solution..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] bg-background/50 border-primary/20 focus:border-primary/40 transition-colors resize-none"
            />
          </div>
        )}

        {/* Submit Button */}
        {selectedRating && (
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-neon hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        )}

        {/* Info Footer */}
        <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground">
            🤖 This feedback is used to train our AI models and improve future ticket analysis
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSystem;