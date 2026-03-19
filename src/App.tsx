/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Moon, Star, Sparkles, Heart, Flame, Send } from 'lucide-react';

// --- Types ---

enum Step {
  WELCOME = 0,
  CRESCENT = 1,
  WISH = 2,
  FINAL = 3,
}

// --- Components ---

const Fireworks = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticles = Array.from({ length: 5 }).map(() => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#D4AF37', '#F9E27D', '#FFFFFF', '#FFD700', '#C0C0C0'][Math.floor(Math.random() * 5)],
        size: Math.random() * 4 + 2,
      }));
      setParticles((prev) => [...prev.slice(-30), ...newParticles]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 1, y: 0 }}
            animate={{ 
              scale: [0, 1.5, 0.5], 
              opacity: [1, 1, 0],
              y: [0, 20, 40]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: '50%',
              boxShadow: `0 0 15px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const StarField = () => {
  const stars = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Lantern = () => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      rotate: [-2, 2, -2]
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="relative flex flex-col items-center"
  >
    <div className="w-1 h-12 bg-gold-dark/40" />
    <div className="w-16 h-24 bg-gradient-to-b from-gold-dark via-gold to-gold-dark rounded-xl relative shadow-2xl flex items-center justify-center overflow-hidden border border-gold/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-gold-light/40" />
      <Flame className="w-8 h-8 text-gold-light animate-pulse" />
      <div className="absolute bottom-0 w-full h-1 bg-black/20" />
    </div>
    <div className="w-12 h-2 bg-gold-dark rounded-full -mt-1" />
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<Step>(Step.WELCOME);
  const [typingText, setTypingText] = useState("");
  
  const fullTexts = [
    "",
    "ঈদের চাঁদ উঠেছে আকাশে!",
    "আপনার এবং আপনার পরিবারের সবার জীবন আনন্দে ভরে উঠুক। ঈদ মোবারক!",
    "পবিত্র ঈদ-উল-ফিতরের শুভেচ্ছা!"
  ];

  useEffect(() => {
    if (step > Step.WELCOME && step <= Step.FINAL) {
      let i = 0;
      setTypingText("");
      const targetText = fullTexts[step];
      const timer = setInterval(() => {
        setTypingText(targetText.slice(0, i + 1));
        i++;
        if (i >= targetText.length) clearInterval(timer);
      }, 60);
      return () => clearInterval(timer);
    }
  }, [step]);

  const nextStep = () => {
    if (step < Step.FINAL) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center font-sans overflow-hidden relative">
      
      {/* Immersive Background (Palace/Mosque) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?q=80&w=2000&auto=format&fit=crop" 
          alt="Festive Background" 
          className="w-full h-full object-cover opacity-30 grayscale brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_80%)] from-gold/5" />
      </div>

      <StarField />

      {/* Main Container - Responsive Wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Smartphone Frame - Only visible on desktop/tablet, content fills screen on mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-screen sm:w-[340px] sm:h-[680px] bg-[#080808] sm:rounded-[3.5rem] sm:border-[10px] border-[#151515] shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.1)] overflow-hidden flex flex-col gold-glow transition-all duration-500"
        >
          {/* Smartphone Hardware Details - Hidden on mobile */}
          <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#151515] rounded-b-3xl z-50 items-center justify-center gap-2">
             <div className="w-10 h-1 bg-white/5 rounded-full" />
             <div className="w-2 h-2 bg-white/10 rounded-full" />
          </div>
          <div className="hidden sm:block absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-white/10 rounded-full z-50" />

          {/* Screen Content */}
          <div className="relative flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
            
            <AnimatePresence mode="wait">
              {step === Step.WELCOME && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center gap-8 sm:gap-10"
                >
                  <div className="relative">
                    <motion.div 
                      className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-gold-light via-gold to-gold-dark rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-pulse-gold cursor-pointer"
                      onClick={nextStep}
                    >
                      <Gift className="w-12 h-12 sm:w-14 sm:h-14 text-black" strokeWidth={1.5} />
                    </motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border-2 border-gold rounded-3xl"
                    />
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gold gold-text-glow leading-relaxed px-4">
                      আপনার জন্য একটি সারপ্রাইজ!
                    </h2>
                    <button
                      onClick={nextStep}
                      className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-gold-dark to-gold text-black font-bold rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95 gold-glow-strong overflow-hidden"
                    >
                      <span className="relative z-10">সারপ্রাইজটি খুলুন</span>
                      <motion.div 
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === Step.CRESCENT && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center gap-8 sm:gap-10 w-full"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 8, -8, 0],
                      y: [0, -15, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <Moon className="w-28 h-28 sm:w-36 sm:h-36 text-gold-light drop-shadow-[0_0_30px_rgba(249,226,125,0.5)]" strokeWidth={1} />
                    <motion.div 
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4"
                    >
                      <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gold fill-gold" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="glass p-5 sm:p-6 rounded-2xl border-gold/20 w-full max-w-[280px] sm:max-w-none">
                    <h3 className="text-lg sm:text-xl font-semibold text-gold-light min-h-[3.5rem] gold-text-glow">
                      {typingText}
                    </h3>
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={nextStep}
                    className="flex items-center gap-2 text-gold-light/70 text-sm font-medium hover:text-gold transition-colors"
                  >
                    পরবর্তী ধাপ <Send className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}

              {step === Step.WISH && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.3, filter: "blur(10px)" }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center gap-8 sm:gap-10 w-full"
                >
                  <Lantern />

                  <div className="glass p-6 sm:p-8 rounded-3xl border-gold/20 shadow-2xl relative overflow-hidden w-full max-w-[280px] sm:max-w-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                    <p className="text-base sm:text-lg leading-relaxed text-white/90 font-medium italic">
                      "{typingText}"
                    </p>
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    onClick={nextStep}
                    className="px-8 py-3 border-2 border-gold/40 rounded-full text-gold font-bold text-sm hover:bg-gold/10 transition-all gold-glow active:scale-95"
                  >
                    উদযাপন শুরু করুন
                  </motion.button>
                </motion.div>
              )}

              {step === Step.FINAL && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center gap-6 sm:gap-8 w-full"
                >
                  <Fireworks />
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="z-10 relative"
                  >
                    <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-full" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gold gold-text-glow leading-tight tracking-tight px-4">
                      {typingText}
                    </h1>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    className="z-10 flex flex-col items-center gap-6"
                  >
                    <div className="flex gap-4">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                      </motion.div>
                      <div className="flex gap-1">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" />
                      </div>
                      <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                      </motion.div>
                    </div>

                    <button
                      onClick={() => setStep(Step.WELCOME)}
                      className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 text-xs font-semibold tracking-widest uppercase transition-all"
                    >
                      আবার দেখুন
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Watermark */}
            <div className="absolute bottom-6 right-6 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/20 font-bold tracking-widest uppercase">
              <span>Crafted with</span>
              <Heart className="w-2.5 h-2.5 text-red-600/60 fill-red-600/60" />
              <span>by Arefin Rafi</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Floating Icons - Hidden on very small screens */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-10 opacity-5 hidden xl:block"
      >
        <Moon className="w-32 h-32 text-gold" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-10 opacity-5 hidden xl:block"
      >
        <Star className="w-24 h-24 text-gold" />
      </motion.div>
    </div>
  );
}
