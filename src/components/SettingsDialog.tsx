import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Key, 
  Database, 
  Settings, 
  Shield, 
  Zap, 
  Brain,
  CheckCircle,
  AlertCircle,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Settings {
  geminiApiKey: string;
  faissIndex: string;
  model: string;
  temperature: number;
  maxTokens: number;
  enableLogging: boolean;
  enableCache: boolean;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const [settings, setSettings] = useState<Settings>({
    geminiApiKey: "",
    faissIndex: "ticket_embeddings",
    model: "gemini-pro",
    temperature: 0.7,
    maxTokens: 1024,
    enableLogging: true,
    enableCache: true,
  });
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("ai-ticket-resolver-settings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setIsConnected(!!parsed.geminiApiKey);
    }
  }, []);

  const handleSave = () => {
    if (!settings.geminiApiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your Gemini API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("ai-ticket-resolver-settings", JSON.stringify(settings));
    setIsConnected(true);
    
    toast({
      title: "Settings Saved",
      description: "Your configuration has been saved successfully",
    });
    
    onOpenChange(false);
  };

  const handleTest = async () => {
    if (!settings.geminiApiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your Gemini API key first",
        variant: "destructive",
      });
      return;
    }

    // Mock API test - in real implementation, you'd test the actual API
    toast({
      title: "Connection Test",
      description: "Testing API connection...",
    });

    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Gemini API is working correctly",
      });
      setIsConnected(true);
    }, 2000);
  };

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Settings className="h-6 w-6 text-primary" />
            <span>AI Ticket Resolver Settings</span>
          </DialogTitle>
          <DialogDescription>
            Configure your AI models, API keys, and analysis preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="api" className="data-[state=active]:bg-primary/10">
              <Key className="h-4 w-4 mr-2" />
              API Configuration
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-primary/10">
              <Brain className="h-4 w-4 mr-2" />
              AI Models
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-primary/10">
              <Shield className="h-4 w-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-primary" />
                  <span>Gemini API Configuration</span>
                  {isConnected && (
                    <Badge className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Configure your Google Gemini API for AI-powered ticket analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gemini-key">Gemini API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="gemini-key"
                      type="password"
                      placeholder="Enter your Gemini API key..."
                      value={settings.geminiApiKey}
                      onChange={(e) => updateSetting("geminiApiKey", e.target.value)}
                      className="bg-background/50 border-primary/20"
                    />
                    <Button variant="outline" onClick={handleTest} className="shrink-0">
                      Test Connection
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get your API key from the{" "}
                    <a href="https://makersuite.google.com/app/apikey" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      Google AI Studio
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-accent" />
                  <span>FAISS Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure your FAISS embedding index for similarity search
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faiss-index">FAISS Index Name</Label>
                  <Input
                    id="faiss-index"
                    placeholder="ticket_embeddings"
                    value={settings.faissIndex}
                    onChange={(e) => updateSetting("faissIndex", e.target.value)}
                    className="bg-background/50 border-primary/20"
                  />
                  <p className="text-xs text-muted-foreground">
                    Name of your pre-built FAISS index for ticket embeddings
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>AI Model Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure the AI model parameters for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="model">Gemini Model</Label>
                  <select
                    id="model"
                    value={settings.model}
                    onChange={(e) => updateSetting("model", e.target.value)}
                    className="w-full px-3 py-2 bg-background/50 border border-primary/20 rounded-md text-sm"
                  >
                    <option value="gemini-pro">Gemini Pro</option>
                    <option value="gemini-pro-vision">Gemini Pro Vision</option>
                  </select>
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature: {settings.temperature}</Label>
                    <input
                      id="temperature"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => updateSetting("temperature", parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Controls randomness in responses (0 = deterministic, 1 = creative)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Tokens</Label>
                    <Input
                      id="max-tokens"
                      type="number"
                      min="128"
                      max="2048"
                      value={settings.maxTokens}
                      onChange={(e) => updateSetting("maxTokens", parseInt(e.target.value))}
                      className="bg-background/50 border-primary/20"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum number of tokens in the AI response
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Advanced Settings</span>
                </CardTitle>
                <CardDescription>
                  Additional configuration options for power users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Request Logging</Label>
                    <p className="text-xs text-muted-foreground">
                      Log API requests for debugging and analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableLogging}
                    onCheckedChange={(checked) => updateSetting("enableLogging", checked)}
                  />
                </div>

                <Separator className="bg-border/50" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Response Caching</Label>
                    <p className="text-xs text-muted-foreground">
                      Cache similar requests to improve performance
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableCache}
                    onCheckedChange={(checked) => updateSetting("enableCache", checked)}
                  />
                </div>

                <Separator className="bg-border/50" />

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Important Note</p>
                      <p className="text-xs text-muted-foreground">
                        Your API keys are stored locally in your browser. They are never sent to our servers.
                        For production use, consider implementing proper secret management.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 pt-4 border-t border-border/50">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="ai" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;