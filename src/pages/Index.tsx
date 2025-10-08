import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import TicketForm from "@/components/TicketForm";
import AnalysisResult from "@/components/AnalysisResult";
import FeedbackSystem from "@/components/FeedbackSystem";
import Dashboard from "@/components/Dashboard";
import Insights from "@/components/Insights";
import SettingsDialog from "@/components/SettingsDialog";
import { useToast } from "@/hooks/use-toast";

interface TicketData {
  ticketId: string;
  department: string;
  title: string;
  description: string;
  priority: string;
  topic: string;
  resolutionStatus: string;
}

interface AnalysisData {
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  priority: number;
  estimatedTime: string;
  confidence: number;
  summary: string;
  rootCause: string;
  solution: string;
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

const Index = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (ticketData: TicketData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Check if API key is configured
      const settings = localStorage.getItem("ai-ticket-resolver-settings");
      if (!settings) {
        toast({
          title: "Configuration Required",
          description: "Please configure your API settings first",
          variant: "destructive",
        });
        setSettingsOpen(true);
        setIsAnalyzing(false);
        return;
      }

      const parsedSettings = JSON.parse(settings);
      if (!parsedSettings.geminiApiKey) {
        toast({
          title: "API Key Missing",
          description: "Please add your Gemini API key in settings",
          variant: "destructive",
        });
        setSettingsOpen(true);
        setIsAnalyzing(false);
        return;
      }

      // Simulate AI analysis with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock analysis result - in real implementation, this would call your AI service
      const mockResult: AnalysisData = {
        severity: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
        category: ticketData.topic,
        priority: Math.floor(Math.random() * 4) + 1,
        estimatedTime: ["15 min", "30 min", "1 hour", "2 hours", "4 hours"][Math.floor(Math.random() * 5)],
        confidence: Math.floor(Math.random() * 20) + 80,
        summary: `TECHNICAL ANALYSIS: ${ticketData.priority.toUpperCase()} priority ${ticketData.topic} issue detected. Stack trace indicates ${ticketData.topic === 'database' ? 'connection pool exhaustion' : ticketData.topic === 'api' ? 'rate limiting threshold breach' : ticketData.topic === 'authentication' ? 'JWT token validation failure' : 'service dependency failure'}. Error propagation chain: Request → Middleware → ${ticketData.topic === 'backend' ? 'Service Layer' : ticketData.topic === 'frontend' ? 'Component Rendering' : 'Data Layer'} → Exception Handler. Correlation ID: ${ticketData.ticketId}`,
        rootCause: `ROOT CAUSE ANALYSIS:\n\nException Stack Trace:\n  at ${ticketData.topic}Service.execute() [Line 247]\n  at RequestHandler.process() [Line 156]\n  at Middleware.authenticate() [Line 89]\n  \nUnderlying Issue: ${ticketData.topic === 'database' ? 'HikariCP connection pool reached max size (20 connections). Active connections: 20, Idle: 0, Pending: 47. Query execution timeout after 30000ms. Likely cause: N+1 query problem or missing index on frequently queried columns.' : ticketData.topic === 'api' ? 'Rate limiter enforcing 100 req/min per client. Current rate: 347 req/min. Redis counter key TTL misconfigured at 30s instead of 60s causing premature resets and false positives.' : ticketData.topic === 'authentication' ? 'JWT signature verification failing. Token payload shows exp: 1704067200, current timestamp: 1704070800 (3600s drift). Server clock skew detected between auth service (UTC+0) and API gateway (UTC-8 misconfigured).' : ticketData.topic === 'network' ? 'TCP connection timeout at Layer 4. Firewall rules blocking egress on port 443 to external services. iptables chain OUTPUT policy DROP without explicit ALLOW for target subnet 172.16.0.0/12.' : 'Dependency service health check returning HTTP 503. Upstream service restart detected at timestamp 2024-10-08T14:23:17Z. Circuit breaker tripped after 5 consecutive failures (threshold: 50%).'}\n\nImpact Assessment: ${ticketData.priority === 'critical' ? 'Production traffic affected. Estimated 1200 req/min failing. Revenue impact: $450/hour.' : 'Degraded performance. Latency increased from p95 120ms to 2400ms. User experience severely impacted.'}`,
        solution: `TECHNICAL SOLUTION:\n\n${ticketData.topic === 'database' ? '1. IMMEDIATE FIX (Hotfix):\n   - Scale connection pool: HikariCP.maximumPoolSize = 50\n   - Enable connection timeout: connectionTimeout = 20000ms\n   - Add slow query logging: log_min_duration_statement = 500ms\n\n2. CODE OPTIMIZATION:\n   ```sql\n   -- Add missing index\n   CREATE INDEX idx_users_email ON users(email);\n   CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);\n   \n   -- Fix N+1 query\n   -- BEFORE:\n   SELECT * FROM users;\n   for each user: SELECT * FROM orders WHERE user_id = ?;\n   \n   -- AFTER:\n   SELECT u.*, o.* FROM users u \n   LEFT JOIN orders o ON u.id = o.user_id;\n   ```\n\n3. MONITORING:\n   - Enable pgBadger for query analysis\n   - Set up connection pool metrics in Prometheus\n   - Alert when active connections > 40' : ticketData.topic === 'api' ? '1. RATE LIMITER CONFIG FIX:\n   ```javascript\n   // Update Redis TTL to match rate window\n   const rateLimiter = new RateLimiter({\n     points: 100,\n     duration: 60, // Fixed: was 30\n     blockDuration: 60,\n     keyPrefix: "rl",\n     storeClient: redisClient\n   });\n   ```\n\n2. IMPLEMENT TOKEN BUCKET:\n   ```python\n   class TokenBucket:\n       def __init__(self, capacity=100, refill_rate=100/60):\n           self.capacity = capacity\n           self.tokens = capacity\n           self.refill_rate = refill_rate\n           self.last_refill = time.time()\n   ```\n\n3. ADD GRACEFUL DEGRADATION:\n   - Return HTTP 429 with Retry-After header\n   - Implement exponential backoff on client side' : ticketData.topic === 'authentication' ? '1. TIME SYNCHRONIZATION FIX:\n   ```bash\n   # Install NTP on all servers\n   sudo apt-get install ntp\n   sudo systemctl enable ntp\n   sudo systemctl start ntp\n   \n   # Verify time sync\n   timedatectl status\n   ntpq -p\n   ```\n\n2. JWT VALIDATION UPDATE:\n   ```typescript\n   // Add clock skew tolerance\n   const verifyOptions: VerifyOptions = {\n     algorithms: ["RS256"],\n     issuer: "auth.example.com",\n     audience: "api.example.com",\n     clockTolerance: 300 // 5 minutes tolerance\n   };\n   \n   jwt.verify(token, publicKey, verifyOptions);\n   ```\n\n3. MONITORING:\n   - Add Prometheus metric for clock drift\n   - Alert when drift > 60 seconds' : '1. CONFIGURATION AUDIT:\n   ```yaml\n   # docker-compose.yml\n   services:\n     api:\n       environment:\n         - NODE_ENV=production\n         - LOG_LEVEL=debug\n         - TIMEOUT=30000\n         - MAX_RETRIES=3\n   ```\n\n2. ERROR HANDLING:\n   ```javascript\n   try {\n     const result = await service.call();\n   } catch (error) {\n     logger.error({\n       error: error.message,\n       stack: error.stack,\n       correlationId: req.id\n     });\n     throw new ServiceError("Upstream failure", 503);\n   }\n   ```'}\n\nESTIMATED DOWNTIME: 0 minutes (rolling deployment)\nRISK LEVEL: ${ticketData.priority === 'critical' ? 'HIGH - Requires change approval board review' : 'MEDIUM - Can be deployed via standard pipeline'}`,
        steps: 
          ticketData.topic === 'database' ? [
            "1. ANALYSIS: Run EXPLAIN ANALYZE on slow queries: psql -U admin -d prod -c \"EXPLAIN ANALYZE SELECT ...;\"",
            "2. BACKUP: pg_dump -U admin -Fc prod > backup_$(date +%Y%m%d_%H%M%S).dump",
            "3. INDEX CREATION: Execute DDL scripts in maintenance window (lock time ~2-5 seconds per index)",
            "4. CONNECTION POOL: Update application.properties → spring.datasource.hikari.maximumPoolSize=50",
            "5. DEPLOY: Rolling restart of application pods → kubectl rollout restart deployment/api-service",
            "6. VALIDATION: Monitor connection pool metrics → Grafana dashboard \"Database Connections\"",
            "7. PERFORMANCE TEST: Run load test → k6 run --vus 100 --duration 5m load-test.js",
            "8. DOCUMENTATION: Update runbook with new connection pool settings and index schema"
          ] : ticketData.topic === 'api' ? [
            "1. REDIS CONFIG: Update rate limiter settings → redis-cli CONFIG SET maxmemory-policy allkeys-lru",
            "2. CODE CHANGE: Modify RateLimiterMiddleware.ts → set duration from 30 to 60 seconds",
            "3. UNIT TEST: npm test src/middleware/RateLimiter.test.ts --coverage",
            "4. STAGING DEPLOY: Deploy to staging → helm upgrade api-service ./charts --set env=staging",
            "5. LOAD TEST: artillery run --target https://staging.api.example.com scenarios/rate-limit-test.yml",
            "6. CANARY RELEASE: Deploy 10% traffic → kubectl set image deployment/api api=api:v2.3.1-canary",
            "7. MONITOR METRICS: Watch error rate in DataDog → query: service:api status:error",
            "8. FULL ROLLOUT: Complete deployment if metrics are stable after 30 minutes"
          ] : ticketData.topic === 'authentication' ? [
            "1. TIME AUDIT: Check NTP sync on all nodes → ansible all -m shell -a 'timedatectl'",
            "2. NTP SETUP: Install chrony → ansible-playbook playbooks/setup-ntp.yml",
            "3. JWT LIBRARY UPDATE: Modify auth middleware to add clockTolerance parameter",
            "4. CODE REVIEW: Create PR with changes → gh pr create --title \"Fix JWT clock skew\"",
            "5. INTEGRATION TEST: npm run test:integration -- --grep \"JWT validation\"",
            "6. SECURITY SCAN: trivy image api-service:latest → check for CVEs",
            "7. DEPLOY: Blue-green deployment → switch traffic from blue to green after validation",
            "8. POST-DEPLOY: Monitor auth failure rate → should drop from 15% to <0.1%"
          ] : [
            "1. LOG AGGREGATION: Query ELK stack → GET /logs-*/_search {\"query\":{\"match\":{\"level\":\"ERROR\"}}}",
            "2. DEPENDENCY GRAPH: Review service mesh topology → kubectl get virtualservices -n prod",
            "3. CIRCUIT BREAKER CONFIG: Update Istio destination rule → maxConnections: 100, http1MaxPendingRequests: 10",
            "4. RETRY POLICY: Add exponential backoff → retries: {attempts: 3, perTryTimeout: 2s, retryOn: 5xx}",
            "5. HEALTH CHECK: Fix endpoint → return 200 only when all critical deps are healthy",
            "6. FEATURE FLAG: Enable gradual rollout → LaunchDarkly flag \"new-service-integration\" → 5% users",
            "7. ROLLBACK PLAN: Prepare rollback script → kubectl rollout undo deployment/api-service",
            "8. INCIDENT REVIEW: Schedule postmortem → document RCA, timeline, prevention measures"
          ],
        similarTickets: [
          { 
            id: "TKT-2024-001", 
            title: `${ticketData.topic} production incident - connection pool exhaustion`, 
            description: `SEVERITY: P1 - Production outage affecting 45% of traffic\n\nERROR LOG:\nException in thread "http-nio-8080-exec-47"\njava.sql.SQLTransientConnectionException: HikariPool-1 - Connection is not available, request timed out after 30000ms.\n  at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:197)\n  at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:162)\n\nMETRICS AT INCIDENT TIME:\n- Active DB connections: 50/50 (100% utilization)\n- Avg query time: 2.3s (baseline: 120ms)\n- Request queue depth: 1247 pending\n- CPU: 87% (normally 35%)\n- Memory: 11.2GB / 16GB\n\nAFFECTED ENDPOINTS:\n- GET /api/v1/users/* → 503 Service Unavailable\n- POST /api/v1/orders → Timeout after 30s`,
            priority: "critical",
            department: "Infrastructure",
            status: "Resolved",
            resolution: `RESOLUTION SUMMARY:\n\nROOT CAUSE:\nN+1 query pattern introduced in PR #4521 causing exponential connection consumption. Each user fetch triggered 12 additional queries for related entities without proper JOIN optimization.\n\nCODE FIX:\n\`\`\`java\n// BEFORE (Bad)\n@GetMapping("/users/{id}")\npublic User getUser(@PathVariable Long id) {\n    User user = userRepository.findById(id);\n    user.getOrders(); // Triggers separate query\n    user.getProfile(); // Triggers separate query  \n    user.getPermissions(); // Triggers separate query\n    return user;\n}\n\n// AFTER (Fixed)\n@GetMapping("/users/{id}")\npublic User getUser(@PathVariable Long id) {\n    return userRepository.findByIdWithAssociations(id);\n}\n\n@Query("SELECT u FROM User u " +\n       "LEFT JOIN FETCH u.orders " +\n       "LEFT JOIN FETCH u.profile " +\n       "LEFT JOIN FETCH u.permissions " +\n       "WHERE u.id = :id")\nUser findByIdWithAssociations(@Param("id") Long id);\n\`\`\`\n\nINFRASTRUCTURE CHANGES:\n1. Increased connection pool: 50 → 100 (HikariCP maxPoolSize)\n2. Added connection timeout: 30s → 20s (fail faster)\n3. Enabled statement caching: prepStmtCacheSize=250\n\nDATABASE OPTIMIZATION:\n\`\`\`sql\nCREATE INDEX idx_orders_user_id ON orders(user_id);\nCREATE INDEX idx_profiles_user_id ON profiles(user_id);\nCREATE INDEX idx_permissions_user_id ON user_permissions(user_id);\n\nANALYZE users, orders, profiles, user_permissions;\n\`\`\`\n\nRESULTS:\n✓ Query time: 2.3s → 95ms (96% improvement)\n✓ Connection utilization: 100% → 35%\n✓ Request success rate: 55% → 99.97%\n✓ p95 latency: 4200ms → 180ms\n\nDEPLOYMENT:\n- Deployed via blue-green strategy\n- Zero downtime\n- Full rollout completed in 12 minutes\n\nPOSTMORTEM ACTIONS:\n[ ] Add query performance tests to CI/CD\n[ ] Implement connection pool monitoring alerts\n[ ] Update code review checklist for ORM patterns\n[ ] Add database query audit to PR template`,
            resolvedAt: "2024-01-15T14:23:00Z",
            similarity: 89 
          },
          { 
            id: "TKT-2024-045", 
            title: `${ticketData.topic} service degradation - memory leak detected`, 
            description: `INCIDENT REPORT:\n\nERROR PATTERN:\nOutOfMemoryError: Java heap space\n  at java.util.Arrays.copyOf(Arrays.java:3332)\n  at java.util.ArrayList.grow(ArrayList.java:275)\n  \nHEAP DUMP ANALYSIS:\nTop memory consumers:\n1. ConcurrentHashMap instances: 4.2GB (38%)\n2. ArrayList instances: 2.8GB (25%)\n3. String instances: 1.9GB (17%)\n\nGC METRICS:\n- Full GC frequency: Every 2.3 minutes (normally: 1/hour)\n- GC pause time: avg 8.7s, max 23.4s\n- Heap after GC: 10.1GB / 12GB (84% full)\n\nAPPLICATION SYMPTOMS:\n- Response times degrading over time: 200ms → 5000ms\n- CPU spiking to 100% during GC\n- Container restart count: 47 in 6 hours`,
            priority: "high",
            department: "Engineering",
            status: "Resolved",
            resolution: `TECHNICAL RESOLUTION:\n\nMEMORY LEAK SOURCE:\nEvent listener accumulation in WebSocket handler. Each connection registered a listener without cleanup on disconnect.\n\n\`\`\`javascript\n// PROBLEMATIC CODE:\nclass WebSocketHandler {\n  constructor() {\n    this.connections = new Map();\n    this.listeners = new Map(); // LEAK: never cleaned up\n  }\n  \n  onConnect(socket) {\n    const listener = (data) => socket.send(data);\n    eventEmitter.on('update', listener);\n    this.listeners.set(socket.id, listener); // Added but never removed\n  }\n  \n  onDisconnect(socket) {\n    this.connections.delete(socket.id);\n    // BUG: Forgot to remove listener!\n  }\n}\n\n// FIXED CODE:\nclass WebSocketHandler {\n  onDisconnect(socket) {\n    const listener = this.listeners.get(socket.id);\n    if (listener) {\n      eventEmitter.off('update', listener);\n      this.listeners.delete(socket.id);\n    }\n    this.connections.delete(socket.id);\n  }\n}\n\`\`\`\n\nMONITORING SETUP:\n\`\`\`yaml\n# prometheus-rules.yml\ngroups:\n  - name: memory_alerts\n    rules:\n      - alert: HighMemoryUsage\n        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.85\n        for: 5m\n        annotations:\n          description: "Memory usage above 85% for {{ $labels.pod }}"\n      \n      - alert: FrequentGC\n        expr: rate(jvm_gc_collection_seconds_count[5m]) > 10\n        annotations:\n          description: "GC frequency abnormally high"\n\`\`\`\n\nPERFORMANCE IMPACT:\n✓ Memory usage: 11.2GB → 3.8GB (stable)\n✓ GC pause: 8.7s → 120ms average\n✓ Connection capacity: 500 → 10,000 concurrent\n✓ Zero memory-related crashes since fix\n\nPREVENTION:\n- Added memory profiling to staging tests\n- Implemented automatic heap dump on OOM\n- Set up memory leak detection in CI`,
            resolvedAt: "2024-01-20T09:15:00Z",
            similarity: 76 
          }
        ],
        tags: [
          ticketData.topic.toLowerCase(), 
          ticketData.department.toLowerCase(),
          "production",
          "p" + (Math.floor(Math.random() * 4) + 1).toString(),
          ticketData.priority.toLowerCase(),
          "stack-trace",
          "performance"
        ]
      };

      setAnalysisResult(mockResult);
      setShowFeedback(true);
      
      toast({
        title: "Analysis Complete",
        description: "AI has successfully analyzed your ticket",
      });

    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFeedbackSubmit = (feedback: any) => {
    toast({
      title: "Feedback Received",
      description: "Thank you for helping us improve our AI system!",
    });
    
    // Here you would send feedback to your backend
    console.log("Feedback submitted:", feedback);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "tickets":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ticket Form */}
            <div className="space-y-6">
              <TicketForm 
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            </div>

            {/* Analysis Results & Feedback */}
            <div className="space-y-6">
              <AnalysisResult 
                analysis={analysisResult}
                isLoading={isAnalyzing}
              />
              
              {showFeedback && analysisResult && (
                <FeedbackSystem onFeedbackSubmit={handleFeedbackSubmit} />
              )}
            </div>
          </div>
        );
      case "dashboard":
        return <Dashboard />;
      case "insights":
        return <Insights />;
      case "settings":
        return (
          <div className="max-w-2xl mx-auto">
            <SettingsDialog 
              open={true}
              onOpenChange={(open) => !open && setActiveTab("tickets")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section - only show on tickets tab */}
      {activeTab === "tickets" && <HeroSection />}
      
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Application */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        {renderTabContent()}
      </div>

      {/* Settings Dialog */}
      <SettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
};

export default Index;
