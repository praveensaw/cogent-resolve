import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TicketIcon, 
  BarChart3, 
  Brain, 
  Settings 
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full bg-card/30 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-background/50 border border-primary/20">
            <TabsTrigger 
              value="tickets" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground neon-flicker"
            >
              <TicketIcon className="h-4 w-4 mr-2" />
              Ticket Submission
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-neural data-[state=active]:text-secondary-foreground"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-gradient-cyber data-[state=active]:text-accent-foreground"
            >
              <Brain className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-gradient-neon data-[state=active]:text-neon-pink-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Navigation;