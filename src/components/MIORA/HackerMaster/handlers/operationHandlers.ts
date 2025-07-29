import { Layer1Capabilities, Layer2Capabilities, Layer3Capabilities, HackerReport } from '../types/hackerTypes';
import { 
  generateLayer1Findings, 
  generateLayer2Findings, 
  generateLayer3Findings,
  generateLayer1Recommendations,
  generateLayer2Recommendations,
  generateLayer3Recommendations
} from '../utils/reportingFunctions';

export const createLayer1Operation = (
  category: keyof Layer1Capabilities, 
  action: string,
  setHackerReports: React.Dispatch<React.SetStateAction<HackerReport[]>>,
  setHackerState: React.Dispatch<React.SetStateAction<any>>,
  addToast: (toast: any) => void
): HackerReport => {
  const report: HackerReport = {
    layer: 1,
    timestamp: Date.now(),
    actions: [action],
    findings: generateLayer1Findings(category, action),
    recommendations: generateLayer1Recommendations(category),
    riskAssessment: 'low'
  };

  setHackerReports(prev => [report, ...prev.slice(0, 49)]);
  
  addToast({
    title: `🔍 Layer 1: ${action}`,
    description: `${category} operation completed - ${report.findings.length} findings`,
    duration: 4000,
  });

  setHackerState(prev => ({
    ...prev,
    experiencePoints: prev.experiencePoints + 10,
    skillPoints: prev.skillPoints + 2
  }));

  return report;
};

export const createLayer2Operation = (
  category: keyof Layer2Capabilities, 
  action: string,
  setHackerReports: React.Dispatch<React.SetStateAction<HackerReport[]>>,
  setHackerState: React.Dispatch<React.SetStateAction<any>>,
  addToast: (toast: any) => void
): HackerReport => {
  const report: HackerReport = {
    layer: 2,
    timestamp: Date.now(),
    actions: [action],
    findings: generateLayer2Findings(category, action),
    recommendations: generateLayer2Recommendations(category),
    riskAssessment: Math.random() > 0.5 ? 'medium' : 'high'
  };

  setHackerReports(prev => [report, ...prev.slice(0, 49)]);
  
  addToast({
    title: `⚡ Layer 2: ${action}`,
    description: `${category} executed - Risk level: ${report.riskAssessment}`,
    duration: 5000,
  });

  setHackerState(prev => ({
    ...prev,
    experiencePoints: prev.experiencePoints + 25,
    skillPoints: prev.skillPoints + 5,
    reputation: prev.reputation + 3
  }));

  return report;
};

export const createLayer3Operation = (
  category: keyof Layer3Capabilities, 
  action: string,
  setHackerReports: React.Dispatch<React.SetStateAction<HackerReport[]>>,
  setHackerState: React.Dispatch<React.SetStateAction<any>>,
  addToast: (toast: any) => void
): HackerReport => {
  const report: HackerReport = {
    layer: 3,
    timestamp: Date.now(),
    actions: [action],
    findings: generateLayer3Findings(category, action),
    recommendations: generateLayer3Recommendations(category),
    riskAssessment: 'critical'
  };

  setHackerReports(prev => [report, ...prev.slice(0, 49)]);
  
  addToast({
    title: `🚨 Layer 3: ${action}`,
    description: `Advanced ${category} - CRITICAL LEVEL OPERATION`,
    duration: 6000,
  });

  setHackerState(prev => ({
    ...prev,
    experiencePoints: prev.experiencePoints + 50,
    skillPoints: prev.skillPoints + 10,
    reputation: prev.reputation + 8,
    hackerLevel: Math.max(prev.hackerLevel, 3)
  }));

  return report;
};