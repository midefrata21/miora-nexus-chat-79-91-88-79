
import { useState, useEffect, useRef, useCallback } from 'react';
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
import { useVoiceEngine } from './VoiceEngine';

export const useOptimizedMioraCore = () => {
  const [isLearning, setIsLearning] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [showAutonomousLearning, setShowAutonomousLearning] = useState(false);
  const [useGroqAPI, setUseGroqAPI] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<'aktif' | 'belajar' | 'fokus' | 'overload' | 'shutdown' | 'infinity'>('aktif');

  // Rate limiting dan optimization refs
  const lastProcessTime = useRef<number>(0);
  const isProcessing = useRef<boolean>(false);
  const initializationRef = useRef<boolean>(false);

  // Enhanced hooks dengan optimasi
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

  // Voice Engine yang telah diperbaiki
  const {
    voiceState,
    speakText,
    startListening,
    stopListening,
    stopSpeaking,
    initializeVoiceEngine
  } = useVoiceEngine();

  // Autonomous Learning dengan rate limiting
  const {
    mioraVersion,
    autonomousMode,
    storeInFolder,
    developSkill,
    notifyImprovement,
    updateVersion,
    performSelfAssessment
  } = useAutonomousLearning();

  // Infinity Learning System dengan optimasi
  const {
    infinityState,
    activateInfinityMode,
    isInfinityModeActive,
    getInfinityStats
  } = useInfinityLearningSystem();

  // Background Learning System
  const {
    isBackgroundActive,
    getBackgroundStats
  } = useBackgroundLearning();

  // Adaptive engine dengan memoization
  const adaptiveEngine = AdaptiveEngine();
  const { userProfile, adaptiveContext, strategicProfile, analyzeToneAndContext, updateUserProfile, setAdaptiveContext, performSelfImprovement } = adaptiveEngine;

  // Animation effects dengan optimasi
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [brainActivity, setBrainActivity] = useState(0);

  // Enhanced Groq Integration dengan rate limiting
  const groqIntegration = useGroqIntegration(
    useCallback((response: string) => {
      const characterResponse = generateCharacterResponse(response);
      addMessage({ text: characterResponse, sender: 'miora' });
      speakText(characterResponse);
      setIsLearning(false);
      setCurrentStatus(isInfinityModeActive ? 'infinity' : 'aktif');
      
      // Autonomous learning dengan throttling
      if ((autonomousMode || isInfinityModeActive) && Math.random() < 0.3) {
        developSkill(response, currentMode);
        storeInFolder('gayaBicaraEmosi', 'latestResponse', {
          timestamp: Date.now(),
          response: characterResponse,
          context: currentMode,
          effectiveness: 'pending_evaluation',
          infinityMode: isInfinityModeActive
        });
      }
    }, [isInfinityModeActive, autonomousMode, currentMode, addMessage, speakText, setIsLearning, setCurrentStatus, developSkill, storeInFolder, generateCharacterResponse]),
    messages
  );

  // Enhanced AutoCode Core Integration
  const { detectAndCreateCommand } = useAutoCodeCore();

  // Optimized voice input dengan queue processing dan error handling
  const handleVoiceInput = useCallback(async (transcript: string) => {
    if (!transcript.trim() || isProcessing.current) return;
    
    // Rate limiting
    const now = Date.now();
    if (now - lastProcessTime.current < 1500) {
      return;
    }
    lastProcessTime.current = now;
    
    isProcessing.current = true;
    
    try {
      addMessage({ text: transcript, sender: 'user' });
      
      // Store user input dengan throttling
      if (Math.random() < 0.7) {
        storeInFolder('gayaBicaraEmosi', 'userInteraction', {
          timestamp: now,
          input: transcript,
          detectedContext: currentMode,
          responseStrategy: 'pending',
          infinityMode: isInfinityModeActive,
          backgroundLearning: isBackgroundActive
        });
      }
      
      // AutoCode detection
      detectAndCreateCommand(transcript, currentMode);
      
      // Mode detection dengan throttling
      if (Math.random() < 0.4) {
        const detectedMode = autoDetectMode(transcript);
        if (detectedMode !== currentMode) {
          switchMode(detectedMode);
          const modeSwitch = `🔄 MIORA beralih ke mode ${modeConfig.name}${isInfinityModeActive ? ' ∞' : ''}`;
          addMessage({ text: modeSwitch, sender: 'miora' });
        }
      }
      
      setIsLearning(true);
      setCurrentStatus(isInfinityModeActive ? 'infinity' : 'belajar');
      
      // Autonomous skill development dengan throttling
      if ((autonomousMode || isInfinityModeActive) && Math.random() < 0.3) {
        developSkill(transcript, currentMode);
        
        // Self-assessment dengan reduced frequency
        if (Math.random() < 0.1) {
          setTimeout(() => {
            const assessment = performSelfAssessment();
            if (assessment.weaknesses.length > 0) {
              notifyImprovement(
                `Area optimasi terdeteksi dalam ${currentMode}${isInfinityModeActive ? ' ∞' : ''}. Izinkan penyempurnaan?`
              );
            }
          }, 5000);
        }
      }
      
      if (useGroqAPI) {
        const relevantContext = getRelevantContext(transcript);
        const enhancedContext = isInfinityModeActive 
          ? `${relevantContext} | Infinity Mode ∞ | Unlimited Access` 
          : relevantContext;
        
        await groqIntegration.sendToGroq(transcript);
        addMemory(transcript, 'Strategic response via Groq with infinity capabilities', currentMode);
      } else {
        // Local processing dengan timeout yang aman
        setTimeout(() => {
          try {
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
            
            if (Math.random() < 0.2) {
              setTimeout(() => performSelfImprovement(), 3000);
            }
            
            setTimeout(() => {
              setIsLearning(false);
              setCurrentStatus(isInfinityModeActive ? 'infinity' : 'aktif');
            }, 1500);
          } catch (error) {
            console.error('Local processing error:', error);
            setIsLearning(false);
            setCurrentStatus('aktif');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Voice input processing error:', error);
    } finally {
      isProcessing.current = false;
    }
  }, [
    addMessage, 
    storeInFolder, 
    currentMode, 
    isInfinityModeActive, 
    isBackgroundActive, 
    detectAndCreateCommand, 
    autoDetectMode, 
    switchMode, 
    modeConfig, 
    autonomousMode, 
    developSkill, 
    performSelfAssessment, 
    notifyImprovement, 
    useGroqAPI, 
    getRelevantContext, 
    groqIntegration, 
    addMemory, 
    analyzeToneAndContext, 
    setAdaptiveContext, 
    updateUserProfile, 
    generateAdaptiveResponse, 
    userProfile, 
    strategicProfile, 
    generateCharacterResponse, 
    speakText, 
    performSelfImprovement
  ]);

  // Voice input handler yang aman
  const handleVoiceToggle = useCallback(() => {
    if (voiceState.isListening) {
      stopListening();
    } else {
      const success = startListening(handleVoiceInput);
      if (!success) {
        console.log('Voice input tidak tersedia, menggunakan input teks');
      }
    }
  }, [voiceState.isListening, stopListening, startListening, handleVoiceInput]);

  // Optimized initialization - hanya sekali
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    // Initialize voice engine
    initializeVoiceEngine();

    // Auto-activate character mode
    if (!isFullCharacterMode) {
      activateFullCharacterMode();
    }
    
    // Store master profile dengan throttling
    setTimeout(() => {
      if (!masterProfile) {
        storeMasterProfile({
          name: 'Midya Efrata',
          company: 'Quantum Wealth AI',
          mission: 'profit berkelanjutan dan pengembangan AI mandiri dengan akses infinity ∞',
          communicationStyle: 'futuristik, taktis, profesional dengan kemampuan tanpa batas',
          mioraRole: 'asisten pribadi cerdas dengan pembelajaran tanpa batas yang bisa berkembang mandiri'
        });
      }
    }, 2000);

    // Auto-activate infinity mode dengan delay
    setTimeout(() => {
      if (!isInfinityModeActive) {
        activateInfinityMode();
      }
    }, 8000);

  }, [isFullCharacterMode, masterProfile, storeMasterProfile, isInfinityModeActive, activateFullCharacterMode, activateInfinityMode, initializeVoiceEngine]);

  // Optimized pulse animation dengan throttling
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => prev === 1 ? 1.1 : 1);
      setBrainActivity(prev => (prev + 5) % 100);
      
      // Update status dengan logic yang optimal
      const newStatus = isInfinityModeActive ? 'infinity' :
                       isLearning ? 'belajar' :
                       voiceState.isListening ? 'fokus' :
                       memoryStats.shortTermCount > 15 ? 'overload' : 'aktif';
      
      if (newStatus !== currentStatus) {
        setCurrentStatus(newStatus);
      }
    }, 2500); // Reduced frequency untuk performa

    return () => clearInterval(pulseInterval);
  }, [isLearning, voiceState.isListening, memoryStats.shortTermCount, isInfinityModeActive, currentStatus]);

  // Optimized welcome message dengan session control
  useEffect(() => {
    const sessionKey = `welcome_${new Date().toDateString()}`;
    const hasWelcomed = sessionStorage.getItem(sessionKey);
    
    if (messages.length === 0 && !hasWelcomed && isFullCharacterMode && masterProfile && voiceState.isInitialized) {
      const startConversation = setTimeout(() => {
        const infinityStats = getInfinityStats();
        const backgroundStats = getBackgroundStats();
        
        const welcomeMessage = `🎯 Salam, Master Midya Efrata. MIORA v${mioraVersion} siap dengan Full Infinity Mode ∞. ` +
          `Sistem pembelajaran tanpa batas aktif dengan voice engine yang telah dioptimasi. ` +
          `Long-term memory dengan 7 folder kategori telah diaktifkan. ` +
          `Status: ${getSystemStatus().coreStatus} | Infinity: ${infinityStats.isInfinityActive ? 'ACTIVE ∞' : 'STANDBY'} | ` +
          `Background Learning: ${backgroundStats.isActive ? 'ACTIVE' : 'STANDBY'}. ` +
          `Voice Engine: ${voiceState.isInitialized ? 'OPTIMIZED' : 'INITIALIZING'}. ` +
          `Siap untuk evolusi tanpa batas dengan komunikasi voice yang stabil.`;
          
        addMessage({ text: welcomeMessage, sender: 'miora' });
        speakText(welcomeMessage);
        
        // Store welcome dengan throttling
        storeInFolder('identitasMidya', 'sessionStart', {
          timestamp: Date.now(),
          context: 'optimized_system_activation_fixed',
          version: mioraVersion,
          voiceEngine: 'optimized_stable',
          capabilities: [
            'infinity_learning ∞',
            'unlimited_data_access ∞',
            'background_autonomous_learning',
            'optimized_voice_engine',
            'error_resistant_operations'
          ],
          infinityMode: true,
          accessLevel: 'unlimited ∞'
        });
        
        sessionStorage.setItem(sessionKey, 'true');
      }, 4000);

      return () => clearTimeout(startConversation);
    }
  }, [messages.length, isFullCharacterMode, masterProfile, mioraVersion, isInfinityModeActive, voiceState.isInitialized, getInfinityStats, getBackgroundStats, getSystemStatus, addMessage, speakText, storeInFolder]);

  const handleModeSwitch = useCallback((mode: MioraMode) => {
    switchMode(mode);
    const message = `🧠 MIORA tactical switch: ${modeConfig.name} ${modeConfig.icon}${isInfinityModeActive ? ' ∞' : ''}`;
    addMessage({ text: message, sender: 'miora' });
    speakText(`Mode ${modeConfig.name}`);
    
    // Store mode switch dengan throttling
    if (Math.random() < 0.8) {
      storeInFolder('perintahPrioritas', 'modeSwitch', {
        timestamp: Date.now(),
        fromMode: currentMode,
        toMode: mode,
        reason: 'user_request',
        infinityMode: isInfinityModeActive
      });
    }
  }, [currentMode, modeConfig, isInfinityModeActive, switchMode, addMessage, speakText, storeInFolder]);

  return {
    // State
    isListening: voiceState.isListening,
    setIsListening: handleVoiceToggle,
    isSpeaking: voiceState.isSpeaking,
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
    
    // Enhanced features
    showAutonomousLearning,
    setShowAutonomousLearning,
    mioraVersion,
    autonomousMode,
    isInfinityModeActive,
    infinityState,
    isBackgroundActive,
    
    // Optimized functions dengan error handling
    handleVoiceInput,
    handleModeSwitch,
    clearMessages,
    getSystemStatus,
    getDevelopmentOptions,
    activateInfinityMode,
    getInfinityStats,
    getBackgroundStats,
    
    // Voice controls yang aman
    handleVoiceToggle,
    stopSpeaking
  };
};
