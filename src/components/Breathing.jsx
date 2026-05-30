import React, { useState, useEffect, useRef } from 'react';

export default function Breathing({ childProfile, setDailyProgress, goals }) {
  const [duration, setDuration] = useState(60); // session length in seconds (1 min default)
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [breathState, setBreathState] = useState('Ready'); // 'Inhale', 'Hold', 'Exhale', 'Ready', 'Complete'
  const [audioEnabled, setAudioEnabled] = useState(false);

  const timerRef = useRef(null);
  const breathCycleRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);

  // Initialize Web Audio API for relaxing chime
  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      
      // Resume context if suspended (browser security)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create oscillator (low frequency soothing hum)
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(136.1, ctx.currentTime); // Om frequency / calming hum

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime); // low volume

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
    } catch (e) {
      console.log('Web Audio not supported or failed to initialize', e);
    }
  };

  const stopSynth = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch (e) {}
      oscRef.current = null;
    }
  };

  // Adjust synthesizer gain based on breath state to simulate swelling sound
  useEffect(() => {
    if (isActive && audioEnabled && gainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const g = gainRef.current.gain;
      
      if (breathState === 'Inhale') {
        g.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3.8); // swell volume
      } else if (breathState === 'Hold') {
        g.setValueAtTime(0.12, ctx.currentTime);
      } else if (breathState === 'Exhale') {
        g.exponentialRampToValueAtTime(0.02, ctx.currentTime + 3.8); // fade volume
      }
    }
  }, [breathState, isActive, audioEnabled]);

  // Handle Play/Pause
  const toggleSession = () => {
    if (isActive) {
      // Pause
      setIsActive(false);
      stopSynth();
    } else {
      // Start
      if (breathState === 'Ready' || breathState === 'Complete') {
        setTimeLeft(duration);
        setBreathState('Inhale');
      }
      setIsActive(true);
      if (audioEnabled) {
        startSynth();
      }
    }
  };

  // Audio switcher toggle
  const toggleAudio = () => {
    if (audioEnabled) {
      setAudioEnabled(false);
      stopSynth();
    } else {
      setAudioEnabled(true);
      if (isActive) {
        startSynth();
      }
    }
  };

  // Main countdown timer
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Completed!
      setIsActive(false);
      setBreathState('Complete');
      stopSynth();
      
      // Update sleep/calm score in daily stats as a reward!
      setDailyProgress(prev => ({
        ...prev,
        sleep: Math.min(goals.sleep * 1.2, prev.sleep + 0.5) // Breathing session relaxes child, +0.5h quality rest value
      }));
    }

    return () => clearTimeout(timerRef.current);
  }, [isActive, timeLeft]);

  // Breathing Inhale / Hold / Exhale cycle loop (10s total: 4s inhale, 2s hold, 4s exhale)
  useEffect(() => {
    if (!isActive) {
      if (breathState !== 'Complete') {
        setBreathState('Ready');
      }
      return;
    }

    let cycleTime = 0;
    
    const runCycle = () => {
      cycleTime = (cycleTime + 1) % 10;
      if (cycleTime === 0) {
        setBreathState('Inhale');
      } else if (cycleTime === 4) {
        setBreathState('Hold');
      } else if (cycleTime === 6) {
        setBreathState('Exhale');
      }
    };

    breathCycleRef.current = setInterval(runCycle, 1000);

    return () => clearInterval(breathCycleRef.current);
  }, [isActive]);

  const resetSession = () => {
    setIsActive(false);
    stopSynth();
    setTimeLeft(duration);
    setBreathState('Ready');
  };

  const handleDurationChange = (secs) => {
    setDuration(secs);
    setTimeLeft(secs);
    setIsActive(false);
    stopSynth();
    setBreathState('Ready');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine breathing circle scale and color
  let circleClass = 'w-48 h-48 bg-white/40 rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out';
  if (isActive) {
    if (breathState === 'Inhale') {
      circleClass = 'w-64 h-64 bg-white/70 rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-2xl scale-110';
    } else if (breathState === 'Hold') {
      circleClass = 'w-64 h-64 bg-white/80 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.8)] scale-110';
    } else if (breathState === 'Exhale') {
      circleClass = 'w-48 h-48 bg-white/30 rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-md scale-95';
    }
  }

  return (
    <div className="animate-fadeIn max-w-lg mx-auto pb-12">
      {/* Container */}
      <div className="bg-[#F5DADF] rounded-24 p-8 md:p-12 custom-shadow border border-on-surface/5 flex flex-col items-center text-center relative overflow-hidden min-h-[580px] justify-between">
        
        {/* Background blobs */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        {/* Top bar controls */}
        <div className="w-full flex justify-between items-center relative z-10">
          {/* Audio toggle */}
          <button 
            onClick={toggleAudio}
            className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-xl flex items-center justify-center text-on-secondary-container hover:bg-white/60 transition-colors cursor-pointer active:scale-90"
            title="Calming Chime Sound"
          >
            <span className="material-symbols-outlined">
              {audioEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Time Picker */}
          <div className="flex bg-white/30 p-1 rounded-xl">
            {[60, 120, 300].map(s => (
              <button
                key={s}
                disabled={isActive}
                onClick={() => handleDurationChange(s)}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-label-md transition-all ${
                  duration === s 
                    ? 'bg-white text-on-secondary-container shadow-sm' 
                    : 'text-on-secondary-container/70 hover:text-on-secondary-container disabled:opacity-50 cursor-pointer'
                }`}
              >
                {s / 60}m
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Center Stage */}
        <div className="my-10 flex flex-col items-center justify-center relative z-10">
          
          {/* Animated Circle */}
          <div className="w-72 h-72 flex items-center justify-center relative">
            
            {/* Pulsing outer aura */}
            {isActive && (
              <div 
                className={`absolute inset-0 rounded-full bg-white/10 animate-ping opacity-25 transition-all duration-[4000ms] ${
                  breathState === 'Inhale' ? 'scale-125' : 'scale-100'
                }`}
              ></div>
            )}

            {/* Inner Core Circle */}
            <div className={circleClass}>
              <div className="flex flex-col items-center">
                {/* Dynamic Message */}
                <span className="font-headline-md text-2xl text-on-secondary-container font-bold tracking-tight">
                  {breathState === 'Ready' && 'Start Session'}
                  {breathState === 'Inhale' && 'Breathe In'}
                  {breathState === 'Hold' && 'Hold'}
                  {breathState === 'Exhale' && 'Breathe Out'}
                  {breathState === 'Complete' && 'All Done!'}
                </span>
                
                {/* Visual indicator tag */}
                {isActive && (
                  <span className="text-[10px] text-on-secondary-container/50 uppercase tracking-widest mt-1.5 font-bold">
                    {breathState}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Subtitle instructions */}
          <p className="mt-8 text-on-secondary-container/80 text-sm font-semibold max-w-xs h-6">
            {breathState === 'Ready' && `Relax with ${childProfile.name} in a calming space.`}
            {breathState === 'Inhale' && 'Slowly fill your lungs with air.'}
            {breathState === 'Hold' && 'Relax your shoulders and sit quietly.'}
            {breathState === 'Exhale' && 'Slowly let the air slip away.'}
            {breathState === 'Complete' && 'Wonderful. That felt very relaxing!'}
          </p>
        </div>

        {/* Bottom controls */}
        <div className="w-full space-y-6 relative z-10">
          {/* Big countdown timer text */}
          <div className="text-3xl font-bold text-on-secondary-container tracking-wider font-label-md">
            {formatTime(timeLeft)}
          </div>

          <div className="flex gap-4 justify-center">
            {/* Play/Pause Button */}
            <button
              onClick={toggleSession}
              className="px-8 py-4 bg-on-secondary-container text-white rounded-2xl font-label-md text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                {isActive ? 'pause' : 'play_arrow'}
              </span>
              {isActive ? 'Pause' : 'Start Quiet Moment'}
            </button>

            {/* Reset Button */}
            {(isActive || timeLeft < duration || breathState === 'Complete') && (
              <button
                onClick={resetSession}
                className="w-12 h-12 bg-white/40 hover:bg-white/60 text-on-secondary-container rounded-2xl flex items-center justify-center active:scale-95 transition-colors cursor-pointer"
                title="Reset Session"
              >
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            )}
          </div>
        </div>

        {/* Session Success Badge Details */}
        {breathState === 'Complete' && (
          <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-8 animate-fadeIn">
            <span className="material-symbols-outlined text-6xl text-[#77555d] mb-4 animate-bounce">self_improvement</span>
            <h3 className="font-headline-lg text-[#77555d] font-bold mb-2">Mindful breathing complete!</h3>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed mb-6">
              You and {childProfile.name} successfully practiced calming breathing. Today's sleep score quality has been boosted by +0.5h!
            </p>
            <div className="px-6 py-3 bg-[#F5DADF] text-[#77555d] rounded-2xl font-bold font-label-md text-xs tracking-wider uppercase mb-8">
              🏆 Unlocked: Mindfulness Master Badge
            </div>
            <button
              onClick={resetSession}
              className="px-6 py-3 bg-on-secondary-container text-white font-label-md rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
            >
              Practice Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
