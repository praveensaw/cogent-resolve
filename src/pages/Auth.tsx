import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-ai-tickets.jpg";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Store registered users in localStorage
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (email: string, password: string, name: string) => {
    const users = getRegisteredUsers();
    users.push({ email, password, name });
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user exists and credentials match
    const users = getRegisteredUsers();
    const user = users.find((u: any) => u.email === loginData.email);

    if (!user) {
      toast({
        title: "Account Not Found",
        description: "No account found with this email. Please sign up first.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (user.password !== loginData.password) {
      toast({
        title: "Invalid Credentials",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    toast({
      title: "Welcome back!",
      description: `Successfully logged in as ${user.name}.`,
    });
    
    setIsLoading(false);
    navigate("/dashboard");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user already exists
    const users = getRegisteredUsers();
    const existingUser = users.find((u: any) => u.email === signupData.email);

    if (existingUser) {
      toast({
        title: "Account Already Exists",
        description: "An account with this email already exists. Please log in.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Save new user
    saveUser(signupData.email, signupData.password, signupData.name);
    
    toast({
      title: "Account Created Successfully!",
      description: "Please switch to the Sign In tab to login with your credentials.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI-powered authentication background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/5" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5, 0.5],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-1 h-1 bg-primary/40 rounded-full" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-flex w-20 h-20 bg-gradient-primary rounded-full items-center justify-center mx-auto lg:mx-0"
              >
                <Brain className="h-10 w-10 text-foreground" />
              </motion.div>
              
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Welcome to
                  </span>
                  <br />
                  <span className="text-foreground">
                    AI Future
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                  Experience the next generation of intelligent ticket resolution 
                  powered by advanced AI technology.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2">
                <Brain className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Smart Analysis</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <Card className="bg-card/80 backdrop-blur-md border-primary/20 shadow-2xl">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl font-bold">
                  Join the AI Revolution
                </CardTitle>
                <CardDescription>
                  Access the future of intelligent support systems
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="login" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <TabsContent value="login" className="space-y-6">
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleLogin}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="login-email" className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            required
                            className="bg-background/50 border-primary/30 focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="login-password" className="flex items-center space-x-2">
                            <Lock className="h-4 w-4" />
                            <span>Password</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="login-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                              required
                              className="bg-background/50 border-primary/30 focus:border-primary pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-primary hover:shadow-ai transform hover:scale-105 transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-4 w-4 border-2 border-background border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              Sign In
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </motion.form>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-6">
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSignup}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Full Name</span>
                          </Label>
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={signupData.name}
                            onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                            required
                            className="bg-background/50 border-primary/30 focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signupData.email}
                            onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                            required
                            className="bg-background/50 border-primary/30 focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="flex items-center space-x-2">
                            <Lock className="h-4 w-4" />
                            <span>Password</span>
                          </Label>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create a password"
                            value={signupData.password}
                            onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                            required
                            className="bg-background/50 border-primary/30 focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="flex items-center space-x-2">
                            <Lock className="h-4 w-4" />
                            <span>Confirm Password</span>
                          </Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                            required
                            className="bg-background/50 border-primary/30 focus:border-primary"
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-primary hover:shadow-ai transform hover:scale-105 transition-all duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-4 w-4 border-2 border-background border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              Create Account
                              <Sparkles className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </motion.form>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;