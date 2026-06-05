"use client";

import { useState } from 'react';
import type { FlowView, SacredArchetype, UserProfile } from '@/types';
import {
  generateSacredArchetype,
  getWesternZodiac,
  getChineseZodiac,
  calculateMBTI,
  calculateDosha,
  getDominantDosha,
  getBirthstoneFromDate,
} from '@/data';
import { LivePresencePanel } from '@/components/LivePresencePanel';
import { LandingSection } from '@/sections/LandingSection';
import { FormIntroSection } from '@/sections/FormIntroSection';
import { QuizSection } from '@/sections/QuizSection';
import { AtlasSignalsSection } from '@/sections/AtlasSignalsSection';
import { LoadingSection } from '@/sections/LoadingSection';
import { ResultSection } from '@/sections/ResultSection';
import { MealPlanSection } from '@/sections/MealPlanSection';
import { ClosingSection } from '@/sections/ClosingSection';
import { ProgressBar } from '@/components/ProgressBar';
import { useLivePresence } from '@/hooks/use-live-presence';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type AppView = FlowView;
const PROFILE_STORAGE_KEY = 'typeatlas-profile';
const LEGACY_PROFILE_STORAGE_KEY = 'sacred-plate-profile';

function readSavedProfile() {
  const saved = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (saved) {
    return saved;
  }

  const legacySaved = localStorage.getItem(LEGACY_PROFILE_STORAGE_KEY);

  if (!legacySaved) {
    return null;
  }

  localStorage.setItem(PROFILE_STORAGE_KEY, legacySaved);
  localStorage.removeItem(LEGACY_PROFILE_STORAGE_KEY);
  return legacySaved;
}

function loadSavedState(): { userProfile: Partial<UserProfile>; result: SacredArchetype | null } {
  const saved = readSavedProfile();

  if (!saved) {
    return { userProfile: {}, result: null };
  }

  try {
    const parsed = JSON.parse(saved);

    if (!parsed.profile?.dosha || !parsed.profile?.dominantDosha) {
      return { userProfile: {}, result: null };
    }

    const profile = {
      ...(parsed.profile as UserProfile),
      birthstone: parsed.profile.birthstone ?? getBirthstoneFromDate(parsed.profile.birthDate),
    } as UserProfile;
    const refreshedResult = generateSacredArchetype(profile);

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({
      profile,
      result: refreshedResult,
      timestamp: new Date().toISOString()
    }));

    return {
      userProfile: profile,
      result: refreshedResult
    };
  } catch (error) {
    console.error('Failed to parse saved profile:', error);
    return { userProfile: {}, result: null };
  }
}

function App() {
  const [savedState] = useState(loadSavedState);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>(savedState.userProfile);
  const [result, setResult] = useState<SacredArchetype | null>(savedState.result);
  const [quizProgress, setQuizProgress] = useState<{ progress: number; label: string } | null>(null);

  const progressMap: Record<AppView, number> = {
    'landing': 0,
    'form': 10,
    'quiz-mbti': 30,
    'quiz-dosha': 55,
    'quiz-signals': 72,
    'loading': 80,
    'result': 90,
    'mealplan': 95,
    'closing': 100
  };
  const progress = progressMap[currentView];
  const liveProgress =
    currentView === 'quiz-mbti' && quizProgress
      ? Math.round(15 + quizProgress.progress * 0.35)
      : currentView === 'quiz-dosha' && quizProgress
        ? Math.round(55 + quizProgress.progress * 0.25)
        : currentView === 'quiz-signals' && quizProgress
          ? Math.round(72 + quizProgress.progress * 0.08)
        : progress;
  const liveProgressLabel =
    currentView === 'landing'
      ? 'Browsing landing page'
      : currentView === 'form'
        ? 'Entering profile'
        : currentView === 'quiz-mbti' || currentView === 'quiz-dosha' || currentView === 'quiz-signals'
          ? quizProgress?.label ?? 'Answering questions'
          : currentView === 'loading'
            ? 'Generating result'
            : currentView === 'result'
              ? 'Viewing result'
              : currentView === 'mealplan'
                ? 'Reviewing ingredients'
                : 'Wrapping up';
  const {
    sessionId,
    participants,
    isConnected,
  } = useLivePresence({
    view: currentView,
    progress: liveProgress,
    progressLabel: liveProgressLabel,
    userProfile,
    result,
  });

  const handleStart = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = (name: string, birthDate: string) => {
    const date = new Date(birthDate);
    const year = date.getFullYear();
    
    setUserProfile({
      name,
      birthDate,
      birthYear: year,
      westernZodiac: getWesternZodiac(date),
      chineseZodiac: getChineseZodiac(year),
      birthstone: getBirthstoneFromDate(date),
    });
    
    setCurrentView('quiz-mbti');
  };

  const handleMBTIComplete = (answers: number[], bloodType?: UserProfile['bloodType']) => {
    setUserProfile(prev => ({ 
      ...prev, 
      bloodType,
      mbti: calculateMBTI(answers)
    }));
    setCurrentView('quiz-dosha');
  };

  const handleDoshaComplete = (answers: number[]) => {
    const doshaScores = calculateDosha(answers);
    const dominantDosha = getDominantDosha(doshaScores);

    setUserProfile(prev => ({
      ...prev,
      dosha: doshaScores,
      dominantDosha,
    }));
    setCurrentView('quiz-signals');
  };

  const handleSignalsComplete = (
    signals: Pick<UserProfile, 'enneagram' | 'hogwartsHouse' | 'loveLanguage' | 'chronotype'>,
  ) => {
    const completeProfile: UserProfile = {
      ...userProfile as UserProfile,
      ...signals,
    };

    setUserProfile(completeProfile);
    setCurrentView('loading');

    setTimeout(() => {
      const archetype = generateSacredArchetype(completeProfile);
      setResult(archetype);
      
      // Save to localStorage
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({
        profile: completeProfile,
        result: archetype,
        timestamp: new Date().toISOString()
      }));
      
      setCurrentView('result');
    }, 4800);
  };

  const handleViewMealPlan = () => {
    setCurrentView('mealplan');
  };

  const handleViewClosing = () => {
    setCurrentView('closing');
  };

  const handleRestart = () => {
    setUserProfile({});
    setResult(null);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(LEGACY_PROFILE_STORAGE_KEY);
    setCurrentView('landing');
  };

  const handleShare = async () => {
    if (navigator.share && result) {
      try {
        await navigator.share({
          title: `My TypeAtlas Profile: ${result.name}`,
          text: `I discovered my archetype in TypeAtlas: ${result.name}. Find yours at TypeAtlas.`,
          url: window.location.href
        });
      } catch {
        toast.error('Could not share. Try copying the link instead.');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownloadPDF = async () => {
    if (!result || !userProfile.name) {
      toast.error('No profile data available');
      return;
    }

    try {
      toast.info('Generating your TypeAtlas PDF...');
      
      // Create a temporary container for PDF content
      const pdfContainer = document.createElement('div');
      pdfContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 800px;
        background: #0B0D10;
        color: #F4F6FF;
        padding: 40px;
        font-family: 'Inter', sans-serif;
      `;
      document.body.appendChild(pdfContainer);

      // Generate PDF content
      const doshaPercentages = {
        vata: Math.round((userProfile.dosha?.vata || 0) / 21 * 100),
        pitta: Math.round((userProfile.dosha?.pitta || 0) / 21 * 100),
        kapha: Math.round((userProfile.dosha?.kapha || 0) / 21 * 100)
      };

      pdfContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 32px; margin-bottom: 10px;">✦ TYPEATLAS ✦</h1>
          <p style="color: #A7B0C8; font-size: 14px;">Your Personalized Nutrition Guide</p>
        </div>
        
        <div style="background: rgba(18, 21, 28, 0.8); border: 1px solid rgba(243, 184, 85, 0.3); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 24px; text-align: center; margin-bottom: 8px;">${result.name}</h2>
          <p style="color: #A7B0C8; text-align: center; font-size: 14px;">${result.dietStyle}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid rgba(243, 184, 85, 0.2); padding-bottom: 8px;">Your Sacred Profile</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Western Zodiac:</span> <span style="color: #F4F6FF;">${userProfile.westernZodiac}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Chinese Zodiac:</span> <span style="color: #F4F6FF;">${userProfile.chineseZodiac}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Blood Type:</span> <span style="color: #F4F6FF;">${userProfile.bloodType ?? 'Not provided'}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Personality:</span> <span style="color: #F4F6FF;">${userProfile.mbti}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Enneagram:</span> <span style="color: #F4F6FF;">${userProfile.enneagram ?? 'Skipped'}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">House:</span> <span style="color: #F4F6FF;">${userProfile.hogwartsHouse ?? 'Skipped'}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Love Language:</span> <span style="color: #F4F6FF;">${userProfile.loveLanguage ?? 'Skipped'}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Chronotype:</span> <span style="color: #F4F6FF;">${userProfile.chronotype ?? 'Skipped'}</span>
            </div>
            <div style="background: rgba(18, 21, 28, 0.5); padding: 12px; border-radius: 8px;">
              <span style="color: #A7B0C8;">Birthstone:</span> <span style="color: #F4F6FF;">${userProfile.birthstone ?? 'Unavailable'}</span>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid rgba(243, 184, 85, 0.2); padding-bottom: 8px;">Dosha Balance</h3>
          <div style="font-size: 13px;">
            <div style="margin-bottom: 8px;"><span style="color: #A7B0C8;">Vata:</span> <span style="color: #F4F6FF;">${doshaPercentages.vata}%</span></div>
            <div style="margin-bottom: 8px;"><span style="color: #A7B0C8;">Pitta:</span> <span style="color: #F4F6FF;">${doshaPercentages.pitta}%</span></div>
            <div style="margin-bottom: 8px;"><span style="color: #A7B0C8;">Kapha:</span> <span style="color: #F4F6FF;">${doshaPercentages.kapha}%</span></div>
            <div style="color: #F3B855; margin-top: 8px;">Dominant: ${userProfile.dominantDosha}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid rgba(243, 184, 85, 0.2); padding-bottom: 8px;">Optimal Nutrition</h3>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; text-align: center; font-size: 12px;">
            <div style="background: rgba(243, 184, 85, 0.1); padding: 12px; border-radius: 8px;">
              <div style="color: #F3B855; font-size: 18px; font-weight: bold;">${result.macros.protein}%</div>
              <div style="color: #A7B0C8;">Protein</div>
            </div>
            <div style="background: rgba(243, 184, 85, 0.1); padding: 12px; border-radius: 8px;">
              <div style="color: #F3B855; font-size: 18px; font-weight: bold;">${result.macros.carbs}%</div>
              <div style="color: #A7B0C8;">Carbs</div>
            </div>
            <div style="background: rgba(243, 184, 85, 0.1); padding: 12px; border-radius: 8px;">
              <div style="color: #F3B855; font-size: 18px; font-weight: bold;">${result.macros.fats}%</div>
              <div style="color: #A7B0C8;">Fats</div>
            </div>
            <div style="background: rgba(243, 184, 85, 0.1); padding: 12px; border-radius: 8px;">
              <div style="color: #F3B855; font-size: 18px; font-weight: bold;">${result.macros.fiber}g</div>
              <div style="color: #A7B0C8;">Fiber</div>
            </div>
            <div style="background: rgba(243, 184, 85, 0.1); padding: 12px; border-radius: 8px;">
              <div style="color: #F3B855; font-size: 14px; font-weight: bold;">Daily</div>
              <div style="color: #A7B0C8;">Hydration</div>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid rgba(243, 184, 85, 0.2); padding-bottom: 8px;">Ingredients to Prioritize</h3>
          <div style="font-size: 12px; color: #A7B0C8;">
            ${result.ingredientsToPrioritize.map(ingredient => `<span style="display: inline-block; background: rgba(34, 197, 94, 0.1); color: #86efac; padding: 4px 8px; border-radius: 12px; margin: 2px;">${ingredient}</span>`).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid rgba(243, 184, 85, 0.2); padding-bottom: 8px;">Ingredients to Limit or Avoid</h3>
          <div style="font-size: 12px; color: #A7B0C8;">
            ${result.foodsToAvoid.map(food => `<span style="display: inline-block; background: rgba(239, 68, 68, 0.1); color: #fca5a5; padding: 4px 8px; border-radius: 12px; margin: 2px;">${food}</span>`).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="font-family: 'Cinzel', serif; color: #F3B855; font-size: 18px; margin-bottom: 12px; border-bottom: 1px solid rgba(243, 184, 85, 0.2); padding-bottom: 8px;">Sacred Rituals</h3>
          <ul style="font-size: 12px; color: #A7B0C8; padding-left: 16px;">
            ${result.rituals.map(ritual => `<li style="margin-bottom: 6px;">${ritual}</li>`).join('')}
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(243, 184, 85, 0.2);">
          <p style="color: #F3B855; font-size: 12px; font-style: italic;">✦ ${result.insight} ✦</p>
          <p style="color: #A7B0C8; font-size: 10px; margin-top: 12px;">Generated by TypeAtlas • ${new Date().toLocaleDateString()}</p>
        </div>
      `;

      // Capture the content as canvas
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0B0D10'
      });

      // Calculate PDF dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      // Add image to PDF (scaled to fit)
      const scaledWidth = imgWidth * ratio * 0.95;
      const scaledHeight = imgHeight * ratio * 0.95;
      const x = (pdfWidth - scaledWidth) / 2;
      
      // If content is too long, we need multiple pages
      let heightLeft = scaledHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', x, position, scaledWidth, scaledHeight);
      heightLeft -= pdfHeight;
      
      // Add new pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', x, position, scaledWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      // Save the PDF
      pdf.save(`TypeAtlas-${userProfile.name}-${result.name}.pdf`);
      
      // Clean up
      document.body.removeChild(pdfContainer);
      
      toast.success('Your TypeAtlas PDF has been downloaded!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark text-foreground relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Progress bar */}
      {currentView !== 'landing' && (
        <ProgressBar progress={progress} />
      )}
      
      {/* Main content */}
      <main className="relative z-10">
        {currentView === 'landing' && (
          <LandingSection
            onStart={handleStart}
            onResume={() => setCurrentView('result')}
            hasSavedProfile={Boolean(result && userProfile.name)}
          />
        )}
        
        {currentView === 'form' && (
          <FormIntroSection 
            onSubmit={handleFormSubmit}
            onBack={() => setCurrentView('landing')}
          />
        )}
        
        {currentView === 'quiz-mbti' && (
          <QuizSection 
            type="mbti"
            userProfile={userProfile}
            onComplete={handleMBTIComplete}
            onBack={() => setCurrentView('form')}
            onProgressChange={setQuizProgress}
          />
        )}
        
        {currentView === 'quiz-dosha' && (
          <QuizSection 
            type="dosha"
            userProfile={userProfile}
            onComplete={handleDoshaComplete}
            onBack={() => setCurrentView('quiz-mbti')}
            onProgressChange={setQuizProgress}
          />
        )}

        {currentView === 'quiz-signals' && (
          <AtlasSignalsSection
            userProfile={userProfile}
            onComplete={handleSignalsComplete}
            onBack={() => setCurrentView('quiz-dosha')}
            onProgressChange={setQuizProgress}
          />
        )}
        
        {currentView === 'loading' && (
          <LoadingSection />
        )}
        
        {currentView === 'result' && result && (
          <ResultSection 
            result={result}
            userProfile={userProfile as UserProfile}
            onViewMealPlan={handleViewMealPlan}
          />
        )}
        
        {currentView === 'mealplan' && result && (
          <MealPlanSection 
            result={result}
            onViewClosing={handleViewClosing}
            onBack={() => setCurrentView('result')}
          />
        )}
        
        {currentView === 'closing' && result && (
          <ClosingSection 
            result={result}
            onRestart={handleRestart}
            onShare={handleShare}
            onDownloadPDF={handleDownloadPDF}
          />
        )}
      </main>

      <LivePresencePanel
        sessionId={sessionId}
        participants={participants}
        isConnected={isConnected}
      />
      
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#12151C',
            border: '1px solid rgba(243, 184, 85, 0.3)',
            color: '#F4F6FF'
          }
        }}
      />
    </div>
  );
}

export default App;
