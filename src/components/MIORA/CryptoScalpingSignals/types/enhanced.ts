// Enhanced MIORA Crypto Scalping Types

export interface MIORADepthLevel {
  level: number;
  name: string;
  description: string;
  indicators: string[];
  confidence: number;
  recommendation: string;
  actionPoints: string[];
}

export interface MIORAScalpingAnalysis {
  id: string;
  pair: string;
  timestamp: number;
  overallConfidence: number;
  overallRecommendation: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';
  levels: MIORADepthLevel[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  profitPotential: number; // Percentage
  maxDrawdown: number; // Percentage
  timeHorizon: string;
  marketCondition: 'BULLISH' | 'BEARISH' | 'SIDEWAYS' | 'VOLATILE';
  detailedReport: MIORADetailedReport;
}

export interface MIORADetailedReport {
  executiveSummary: string;
  marketStructureAnalysis: string;
  technicalAnalysis: TechnicalAnalysisReport;
  fundamentalFactors: string[];
  riskAssessment: RiskAssessment;
  actionPlan: ActionPlan;
  monitoringPoints: string[];
  exitStrategy: ExitStrategy;
}

export interface TechnicalAnalysisReport {
  priceAction: string;
  volumeAnalysis: string;
  momentumIndicators: {
    rsi: { value: number; signal: string; weight: number };
    macd: { value: number; signal: string; weight: number };
    stochastic: { value: number; signal: string; weight: number };
  };
  trendIndicators: {
    ema: { short: number; long: number; signal: string; weight: number };
    sma: { value: number; signal: string; weight: number };
    ichimoku: { signal: string; weight: number };
  };
  supportResistance: {
    key_levels: number[];
    nearest_support: number;
    nearest_resistance: number;
    strength: number;
  };
}

export interface RiskAssessment {
  volatility: number;
  correlation: number;
  liquidityRisk: string;
  marketRisk: string;
  technicalRisk: string;
  positionSizing: string;
  riskRewardRatio: number;
}

export interface ActionPlan {
  immediate: string[];
  shortTerm: string[];
  mediumTerm: string[];
  contingency: string[];
}

export interface ExitStrategy {
  profitTargets: {
    level: number;
    price: number;
    percentage: number;
    reasoning: string;
  }[];
  stopLoss: {
    level: number;
    price: number;
    reasoning: string;
  };
  trailingStop: {
    enabled: boolean;
    percentage: number;
    reasoning: string;
  };
}

export interface EnhancedCryptoSignal extends CryptoSignal {
  mioraAnalysis: MIORAScalpingAnalysis;
  qualityScore: number;
  alertLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  executionPriority: number;
}

// Import existing CryptoSignal
import { CryptoSignal } from '../types';