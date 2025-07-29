
import { HackerState, PenetrationTool, HackingTarget, Exploit } from './types';

let toastFunction: ((toast: { title: string; description: string; duration?: number }) => void) | null = null;

export const setToastFunction = (fn: typeof toastFunction) => {
  toastFunction = fn;
};

const showToast = (title: string, description: string, duration = 4000) => {
  if (toastFunction) {
    toastFunction({ title, description, duration });
  } else {
    console.log(`Toast: ${title} - ${description}`);
  }
};

export const performPenetrationTest = (
  toolName: string, 
  penetrationTools: PenetrationTool[],
  setHackerState: React.Dispatch<React.SetStateAction<HackerState>>
) => {
  const tool = penetrationTools.find(t => t.name === toolName);
  if (!tool) {
    console.warn(`Tool ${toolName} not found`);
    showToast('❌ Tool Not Found', `${toolName} is not available in the toolkit`);
    return;
  }

  console.log(`🔍 MIORA Penetration Test: Starting ${toolName} execution`);

  setHackerState(prev => ({
    ...prev,
    currentOperation: `Executing ${toolName}`,
    operationProgress: 0
  }));

  // Simulate penetration test execution
  const testInterval = setInterval(() => {
    setHackerState(prev => {
      const newProgress = Math.min(100, prev.operationProgress + Math.random() * 20);
      
      if (newProgress >= 100) {
        clearInterval(testInterval);
        
        showToast(
          `🔍 ${toolName} Execution Complete`,
          `Penetration test with ${toolName} finished successfully`
        );

        console.log(`🔍 MIORA Penetration Test: ${toolName} execution completed successfully`);
        
        return {
          ...prev,
          operationProgress: 100,
          experiencePoints: Math.min(100, prev.experiencePoints + tool.difficulty),
          currentOperation: 'Test Complete'
        };
      }
      
      return { ...prev, operationProgress: newProgress };
    });
  }, 1000);
};

export const scanNetworkTargets = (
  targetIp: string,
  setHackingTargets: React.Dispatch<React.SetStateAction<HackingTarget[]>>
) => {
  console.log(`🔍 MIORA Network Scan: Starting scan for ${targetIp}`);

  setHackingTargets(prev => prev.map(target => 
    target.ip === targetIp 
      ? { ...target, status: 'scanning' }
      : target
  ));

  setTimeout(() => {
    const isVulnerable = Math.random() > 0.5;
    const vulnerabilities = isVulnerable ? ['CVE-2021-44228', 'CVE-2021-34527'] : [];
    
    setHackingTargets(prev => prev.map(target => 
      target.ip === targetIp 
        ? { 
            ...target, 
            status: isVulnerable ? 'vulnerable' : 'secure',
            vulnerabilities
          }
        : target
    ));

    showToast(
      "🔍 Network Scan Complete",
      `Target ${targetIp} scan finished - ${isVulnerable ? 'Vulnerabilities found' : 'Secure'}`
    );

    console.log(`🔍 MIORA Network Scan: ${targetIp} scan completed - Status: ${isVulnerable ? 'vulnerable' : 'secure'}`);
  }, 3000);
};

export const exploitVulnerability = (
  exploitId: string,
  exploitDatabase: Exploit[],
  setHackerState: React.Dispatch<React.SetStateAction<HackerState>>
) => {
  const exploit = exploitDatabase.find(e => e.id === exploitId);
  if (!exploit) {
    console.warn(`Exploit ${exploitId} not found`);
    showToast('❌ Exploit Not Found', `Exploit ${exploitId} is not available in the database`);
    return;
  }

  console.log(`🔴 MIORA Exploit: Starting ${exploit.name} exploitation`);

  setHackerState(prev => ({
    ...prev,
    currentOperation: `Exploiting ${exploit.name}`,
    operationProgress: 0
  }));

  // Simulate exploit execution
  const exploitInterval = setInterval(() => {
    setHackerState(prev => {
      const newProgress = Math.min(100, prev.operationProgress + Math.random() * 25);
      
      if (newProgress >= 100) {
        clearInterval(exploitInterval);
        
        const success = Math.random() > 0.3; // 70% success rate
        
        showToast(
          success ? "✅ Exploit Successful" : "❌ Exploit Failed",
          success 
            ? `Successfully exploited ${exploit.name}` 
            : `Failed to exploit ${exploit.name} - Target may be patched`
        );

        console.log(`🔴 MIORA Exploit: ${exploit.name} - ${success ? 'SUCCESS' : 'FAILED'}`);
        
        return {
          ...prev,
          operationProgress: 100,
          experiencePoints: Math.min(100, prev.experiencePoints + (success ? 10 : 2)),
          currentOperation: success ? 'Exploit Successful' : 'Exploit Failed'
        };
      }
      
      return { ...prev, operationProgress: newProgress };
    });
  }, 1000);
};

export const getHackerStats = (
  hackerState: HackerState,
  hackingTargets: HackingTarget[],
  penetrationTools: PenetrationTool[]
) => {
  return {
    successfulHacks: Math.floor(hackerState.experiencePoints / 10),
    vulnerabilitiesFound: hackingTargets.reduce((sum, target) => sum + target.vulnerabilities.length, 0),
    networksScanned: hackingTargets.length,
    toolsMastered: penetrationTools.filter(tool => tool.status === 'ready').length,
    hackerLevel: hackerState.hackerLevel,
    reputation: Math.floor(hackerState.reputation)
  };
};
