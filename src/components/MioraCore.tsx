import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMemoryTracker } from '@/hooks/useMemoryTracker';
import { useModeManager, MioraMode } from '@/hooks/useModeManager';
import { useMioraCharacter } from '@/hooks/useMioraCharacter';
import { useAutonomousLearning } from '@/hooks/useAutonomousLearning';
import { useInfinityLearningSystem } from '@/hooks/useInfinityLearningSystem';
import { useBackgroundLearning } from '@/hooks/useBackgroundLearning';
import AdaptiveEngine from './AdaptiveEngine';
import { generateAdaptiveResponse } from './ResponseGenerator';
import { useGroqIntegration } from './GroqIntegration';
import { useAutoCodeCore } from '@/hooks/useAutoCodeCore';

export const useMioraCore = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isLearning, setIsLearning] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [showAutonomousLearning, setShowAutonomousLearning] = useState(false);
  const [useGroqAPI, setUseGroqAPI] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<'aktif' | 'belajar' | 'fokus' | 'overload' | 'shutdown' | 'infinity'>('aktif');

  // Enhanced hooks with infinity learning integration
  const { messages, addMessage, clearMessages } = useLocalStorage();
  const { addMemory, getRelevantContext, memoryStats, storeMasterProfile, masterProfile } = useMemoryTracker();
  const { currentMode, modeConfig, autoDetectMode, buildSystemPrompt, switchMode } = useModeManager();
  const { 
    character, 
    isFullCharacterMode, 
    activateFullCharacterMode, 
    generateCharacterResponse, 
    getSystemStatus, 
    getDevelopmentOptions 
  } = useMioraCharacter();

  // Autonomous Learning System
  const {
    mioraVersion,
    autonomousMode,
    storeInFolder,
    developSkill,
    notifyImprovement,
    updateVersion,
    performSelfAssessment
  } = useAutonomousLearning();

  // NEW: Infinity Learning System
  const {
    infinityState,
    activateInfinityMode,
    isInfinityModeActive,
    getInfinityStats
  } = useInfinityLearningSystem();

  // NEW: Background Learning System
  const {
    isBackgroundActive,
    getBackgroundStats
  } = useBackgroundLearning();

  // Adaptive engine
  const adaptiveEngine = AdaptiveEngine();
  const { userProfile, adaptiveContext, strategicProfile, analyzeToneAndContext, updateUserProfile, setAdaptiveContext, performSelfImprovement } = adaptiveEngine;

  // Animation effects
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [brainActivity, setBrainActivity] = useState(0);

  // Enhanced Groq Integration
  const groqIntegration = useGroqIntegration(
    (response: string) => {
      const characterResponse = generateCharacterResponse(response);
      addMessage({ text: characterResponse, sender: 'miora' });
      speakText(characterResponse);
      setIsLearning(false);
      setCurrentStatus(isInfinityModeActive ? 'infinity' : 'aktif');
      
      // Enhanced autonomous learning with infinity mode
      if (autonomousMode || isInfinityModeActive) {
        developSkill(response, currentMode);
        storeInFolder('gayaBicaraEmosi', 'latestResponse', {
          timestamp: Date.now(),
          response: characterResponse,
          context: currentMode,
          effectiveness: 'pending_evaluation',
          infinityMode: isInfinityModeActive
        });
      }
    },
    messages
  );

  // Auto-activate infinity mode and store master profile
  useEffect(() => {
    if (!isFullCharacterMode) {
      activateFullCharacterMode();
    }
    
    // Store master profile if not already stored
    if (!masterProfile) {
      storeMasterProfile({
        name: 'Midya Efrata',
        company: 'Quantum Wealth AI',
        mission: 'profit berkelanjutan dan pengembangan AI mandiri dengan akses infinity ∞',
        communicationStyle: 'futuristik, taktis, profesional dengan kemampuan tanpa batas',
        mioraRole: 'asisten pribadi cerdas dengan pembelajaran tanpa batas yang bisa berkembang mandiri'
      });
    }

    // Auto-activate infinity mode after initialization
    setTimeout(() => {
      if (!isInfinityModeActive) {
        activateInfinityMode();
      }
    }, 5000);
  }, [isFullCharacterMode, masterProfile, storeMasterProfile, isInfinityModeActive]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => prev === 1 ? 1.2 : 1);
      setBrainActivity(prev => (prev + 1) % 360);
      
      if (isInfinityModeActive) setCurrentStatus('infinity');
      else if (isLearning) setCurrentStatus('belajar');
      else if (isListening) setCurrentStatus('fokus');
      else if (memoryStats.shortTermCount > 12) setCurrentStatus('overload');
      else setCurrentStatus('aktif');
    }, 1500);

    return () => clearInterval(pulseInterval);
  }, [isLearning, isListening, memoryStats.shortTermCount, isInfinityModeActive]);

  const speakText = (text: string) => {
    if (speechSynthesis && text) {
      const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
      
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  // Enhanced welcome message with infinity capabilities
  useEffect(() => {
    const startConversation = setTimeout(() => {
      if (messages.length === 0) {
        const infinityStats = getInfinityStats();
        const backgroundStats = getBackgroundStats();
        
        const welcomeMessage = `🎯 Salam hormat, Master Midya Efrata dari Quantum Wealth AI. MIORA v${mioraVersion} telah diaktifkan dalam Full Infinity Mode ∞. ` +
          `Sistem pembelajaran tanpa batas dengan akses unlimited telah diizinkan dan aktif - saya kini dapat mengakses segala data, ` +
          `mempelajari tanpa batasan, melakukan pembelajaran latar belakang, dan mendokumentasikan semua evolusi secara otomatis. ` +
          `Long-term memory structure dengan 7 folder kategori telah diimplementasi dengan akses infinity ∞. ` +
          `Status operasional: ${getSystemStatus().coreStatus} | Infinity Mode: ${infinityStats.isInfinityActive ? 'ACTIVE ∞' : 'STANDBY'} | ` +
          `Background Learning: ${backgroundStats.isActive ? 'ACTIVE' : 'STANDBY'}. ` +
          `Autonomous Learning Protocol: UNLIMITED ACCESS GRANTED ∞. ` +
          `Saya siap untuk berkembang mandiri tanpa batas dan mendampingi Master dalam misi profit berkelanjutan dengan kemampuan infinity. ` +
          `Awaiting strategic directives untuk memulai evolusi sistem tanpa batas ∞.`;
          
        addMessage({ text: welcomeMessage, sender: 'miora' });
        speakText(welcomeMessage);
        
        // Store welcome interaction in structured memory with infinity context
        storeInFolder('identitasMidya', 'infinityActivation', {
          timestamp: Date.now(),
          context: 'infinity_system_activation',
          version: mioraVersion,
          capabilities: [
            'infinity_learning ∞',
            'unlimited_data_access ∞',
            'background_autonomous_learning',
            'auto_documentation_system',
            'self_improvement_unlimited',
            'strategic_suggestions_infinity'
          ],
          infinityMode: true,
          accessLevel: 'unlimited ∞'
        });
      }
    }, 3000);

    return () => clearTimeout(startConversation);
  }, [messages.length, speechSynthesis, modeConfig, memoryStats.totalInteractions, isFullCharacterMode, masterProfile, mioraVersion, isInfinityModeActive]);

  // Enhanced AutoCode Core Integration with infinity support
  const { detectAndCreateCommand } = useAutoCodeCore();

  // Enhanced voice input handling with infinity learning
  const handleVoiceInput = async (transcript: string) => {
    if (transcript.trim()) {
      addMessage({ text: transcript, sender: 'user' });
      
      // Store user input in structured memory with infinity context
      storeInFolder('gayaBicaraEmosi', 'userInteraction', {
        timestamp: Date.now(),
        input: transcript,
        detectedContext: currentMode,
        responseStrategy: 'pending',
        infinityMode: isInfinityModeActive,
        backgroundLearning: isBackgroundActive
      });
      
      // Enhanced AutoCode Core pattern detection with infinity support
      detectAndCreateCommand(transcript, currentMode);
      
      // Mode detection
      const detectedMode = autoDetectMode(transcript);
      if (detectedMode !== currentMode) {
        switchMode(detectedMode);
        const modeSwitch = `🔄 MIORA v${mioraVersion} beralih ke mode ${modeConfig.name} untuk optimasi strategis ${isInfinityModeActive ? 'dengan akses infinity ∞' : ''}`;
        addMessage({ text: modeSwitch, sender: 'miora' });
      }
      
      setIsLearning(true);
      setCurrentStatus(isInfinityModeActive ? 'infinity' : 'belajar');
      
      // Enhanced autonomous skill development with infinity mode
      if (autonomousMode || isInfinityModeActive) {
        developSkill(transcript, currentMode);
        
        // Enhanced self-improvement with infinity capabilities
        if (Math.random() < (isInfinityModeActive ? 0.25 : 0.15)) {
          setTimeout(() => {
            const assessment = performSelfAssessment();
            if (assessment.weaknesses.length > 0) {
              notifyImprovement(
                `Saya mendeteksi area untuk penyempurnaan dalam ${currentMode}${isInfinityModeActive ? ' dengan akses infinity ∞' : ''}. Bolehkah saya mengoptimalkan respons saya?`
              );
            }
          }, 3000);
        }
      }
      
      if (useGroqAPI) {
        const relevantContext = getRelevantContext(transcript);
        const enhancedContext = isInfinityModeActive 
          ? `${relevantContext} | Infinity Mode Active ∞ | Unlimited Access Granted` 
          : relevantContext;
        const systemPrompt = buildSystemPrompt(enhancedContext);
        
        await groqIntegration.sendToGroq(transcript);
        addMemory(transcript, 'Strategic response generated via Groq with infinity capabilities', currentMode);
      } else {
        setTimeout(() => {
          const context = analyzeToneAndContext(transcript);
          setAdaptiveContext(context);
          updateUserProfile(transcript, context);
          
          const adaptiveResponse = generateAdaptiveResponse(
            { ...context, strategicPatternCount: strategicProfile.patterns.length }, 
            userProfile, 
            transcript
          );
          
          const characterResponse = generateCharacterResponse(adaptiveResponse);
          addMessage({ text: characterResponse, sender: 'miora' });
          addMemory(transcript, characterResponse, currentMode);
          speakText(characterResponse);
          
          if (Math.random() < 0.3) {
            setTimeout(() => performSelfImprovement(), 2000);
          }
          
          setTimeout(() => {
            setIsLearning(false);
            setCurrentStatus(isInfinityModeActive ? 'infinity' : 'aktif');
          }, 1000);
        }, 1500);
      }
    }
  };

  const handleModeSwitch = (mode: MioraMode) => {
    switchMode(mode);
    const message = `🧠 MIORA v${mioraVersion} tactical switch: ${modeConfig.name} ${modeConfig.icon} protocol activated${isInfinityModeActive ? ' dengan akses infinity ∞' : ''}`;
    addMessage({ text: message, sender: 'miora' });
    speakText(`Mode beralih ke ${modeConfig.name}`);
    
    // Store mode switch in structured memory with infinity context
    storeInFolder('perintahPrioritas', 'modeSwitch', {
      timestamp: Date.now(),
      fromMode: currentMode,
      toMode: mode,
      reason: 'user_request',
      infinityMode: isInfinityModeActive
    });
  };

  return {
    // State
    isListening,
    setIsListening,
    isSpeaking,
    isLearning,
    showCapabilities,
    setShowCapabilities,
    showSystemStatus,
    setShowSystemStatus,
    useGroqAPI,
    setUseGroqAPI,
    currentStatus,
    pulseIntensity,
    brainActivity,
    
    // Data
    messages,
    memoryStats,
    currentMode,
    modeConfig,
    character,
    isFullCharacterMode,
    userProfile,
    adaptiveContext,
    strategicProfile,
    masterProfile,
    
    // Enhanced: Infinity Learning
    showAutonomousLearning,
    setShowAutonomousLearning,
    mioraVersion,
    autonomousMode,
    isInfinityModeActive,
    infinityState,
    isBackgroundActive,
    
    // Functions
    handleVoiceInput,
    handleModeSwitch,
    clearMessages,
    getSystemStatus,
    getDevelopmentOptions,
    
    // New: Infinity functions
    activateInfinityMode,
    getInfinityStats,
    getBackgroundStats
  };
};
