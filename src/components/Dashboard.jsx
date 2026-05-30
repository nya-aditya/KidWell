import React from 'react';

export default function Dashboard({
  childProfile,
  dailyProgress,
  goals,
  setDailyProgress,
  setCurrentPage,
  setSelectedLibraryItem
}) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();

  // Helper to adjust progress limits
  const adjustStat = (metric, amount) => {
    setDailyProgress(prev => {
      const current = prev[metric];
      const maxVal = goals[metric] * 1.5; // allow going slightly over goals
      const newVal = Math.max(0, Math.min(maxVal, current + amount));
      return { ...prev, [metric]: newVal };
    });
  };

  const sleepPct = Math.min(100, (dailyProgress.sleep / goals.sleep) * 100);
  const playPct = Math.min(100, (dailyProgress.play / goals.play) * 100);
  const waterPct = Math.min(100, (dailyProgress.hydration / goals.hydration) * 100);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section: Kid's Core Profile */}
      <section className="mb-12 relative overflow-hidden bg-white rounded-24 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 custom-shadow border border-on-surface/5">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 blob-shape rotate-12"></div>
        <div className="relative z-10 flex-1">
          <p className="font-label-md text-label-md text-on-surface-variant mb-2 tracking-widest">{dateStr}</p>
          <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-4">
            {childProfile.name}'s Daily Journey
          </h2>
          <p className="text-on-surface-variant font-body-lg text-body-lg mb-8 max-w-md">
            Today is focused on motor skills and sensory play. Sarah, are you ready for {childProfile.name}'s morning routine?
          </p>
          <button 
            onClick={() => setCurrentPage('routines')}
            className="px-8 py-4 rounded-full font-label-md text-label-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 cursor-pointer" 
            style={{ backgroundColor: '#add8e6', color: '#00343a' }}
          >
            Start Morning Routine
            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
          </button>
        </div>
        <div className="relative z-10 w-full md:w-1/2 flex justify-center">
          <div className="w-full aspect-square max-w-[320px] bg-primary-container/10 organic-border overflow-hidden p-3 border-2 border-primary-container/30">
            <img 
              alt={`${childProfile.name}'s Portrait`} 
              className="w-full h-full object-cover organic-border" 
              src={childProfile.avatar} 
            />
          </div>
        </div>
      </section>

      {/* Bento Grid: Tracking Data */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
        {/* Daily Nurture Goals: Emphasized Data Tracking */}
        <section className="md:col-span-7 lg:col-span-8 bg-white rounded-24 p-6 md:p-10 custom-shadow border border-on-surface/5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Daily Nurture Goals</h3>
              <p className="text-sm text-on-surface-variant font-medium mt-1">
                Adjust and log {childProfile.name}'s health and wellness metrics in real time
              </p>
            </div>
            <div className="w-10 h-10 bg-primary-container/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" data-icon="monitoring">monitoring</span>
            </div>
          </div>
          
          <div className="space-y-10">
            {/* Sleep Metric */}
            <div className="group">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined" data-icon="bedtime">bedtime</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md block">Sleep</span>
                    <span className="text-xs text-on-surface-variant">Quality Rest</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 bg-surface-container rounded-lg p-1 border border-on-surface/5">
                    <button 
                      onClick={() => adjustStat('sleep', -0.5)}
                      className="w-7 h-7 rounded-md hover:bg-white flex items-center justify-center active:scale-90 transition-all font-bold text-secondary"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => adjustStat('sleep', 0.5)}
                      className="w-7 h-7 rounded-md hover:bg-white flex items-center justify-center active:scale-90 transition-all font-bold text-secondary"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-headline-md text-headline-md text-on-surface min-w-[70px] text-right">
                    {dailyProgress.sleep}h <span className="text-on-surface-variant text-body-md">/ {goals.sleep}h</span>
                  </span>
                </div>
              </div>
              
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(89,97,87,0.3)] transition-all duration-500 ease-out" 
                  style={{ width: `${sleepPct}%` }}
                ></div>
              </div>
            </div>

            {/* Outdoor Play Metric */}
            <div className="group">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] flex items-center justify-center text-[#006b8c]">
                    <span className="material-symbols-outlined" data-icon="nature_people">nature_people</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md block">Outdoor Play</span>
                    <span className="text-xs text-on-surface-variant">Active Discovery</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 bg-surface-container rounded-lg p-1 border border-on-surface/5">
                    <button 
                      onClick={() => adjustStat('play', -5)}
                      className="w-7 h-7 rounded-md hover:bg-white flex items-center justify-center active:scale-90 transition-all font-bold text-[#006b8c]"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => adjustStat('play', 5)}
                      className="w-7 h-7 rounded-md hover:bg-white flex items-center justify-center active:scale-90 transition-all font-bold text-[#006b8c]"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-headline-md text-headline-md text-on-surface min-w-[70px] text-right">
                    {dailyProgress.play}m <span className="text-on-surface-variant text-body-md">/ {goals.play}m</span>
                  </span>
                </div>
              </div>
              
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full shadow-[0_0_10px_rgba(173,216,230,0.6)] transition-all duration-500 ease-out" 
                  style={{ width: `${playPct}%`, backgroundColor: '#add8e6' }}
                ></div>
              </div>
            </div>

            {/* Hydration Metric */}
            <div className="group">
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e3f2fd] flex items-center justify-center text-[#006b8c]">
                    <span className="material-symbols-outlined" data-icon="water_drop">water_drop</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md block">Hydration</span>
                    <span className="text-xs text-on-surface-variant">Daily Intake</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 bg-surface-container rounded-lg p-1 border border-on-surface/5">
                    <button 
                      onClick={() => adjustStat('hydration', -1)}
                      className="w-7 h-7 rounded-md hover:bg-white flex items-center justify-center active:scale-90 transition-all font-bold text-[#006b8c]"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => adjustStat('hydration', 1)}
                      className="w-7 h-7 rounded-md hover:bg-white flex items-center justify-center active:scale-90 transition-all font-bold text-[#006b8c]"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-headline-md text-headline-md text-on-surface min-w-[70px] text-right">
                    {dailyProgress.hydration} <span className="text-on-surface-variant text-body-md">/ {goals.hydration} cups</span>
                  </span>
                </div>
              </div>
              
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full shadow-[0_0_10px_rgba(173,216,230,0.6)] transition-all duration-500 ease-out" 
                  style={{ width: `${waterPct}%`, backgroundColor: '#add8e6' }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiet Moment Card: Soft Pink */}
        <section className="md:col-span-5 lg:col-span-4 bg-[#F5DADF] rounded-24 p-8 custom-shadow flex flex-col justify-between relative overflow-hidden group border border-on-surface/5">
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/20 blob-shape transition-transform duration-700 group-hover:scale-125"></div>
          <div className="relative z-10 animate-pulse-slow">
            <div className="w-14 h-14 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <span className="material-symbols-outlined text-on-secondary-container text-4xl" data-icon="self_improvement">self_improvement</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-secondary-container mb-3">Quiet Moment</h3>
            <p className="text-on-secondary-container/80 font-body-md text-body-md mb-10 leading-relaxed">
              Bond with {childProfile.name} through a guided mindful breathing session.
            </p>
          </div>
          <button 
            onClick={() => setCurrentPage('breathing')}
            className="relative z-10 bg-on-secondary-container text-white py-4 rounded-2xl font-label-md text-label-md w-full transition-all hover:shadow-lg active:scale-95 cursor-pointer"
          >
            Start Breathing
          </button>
        </section>
      </div>

      {/* Weekly Insights Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Weekly Insights</h3>
            <p className="text-sm text-on-surface-variant">{childProfile.name}'s developmental progress over time</p>
          </div>
          <button 
            onClick={() => setCurrentPage('insights')}
            className="font-label-md text-label-md flex items-center gap-1 text-primary hover:opacity-80 group transition-all cursor-pointer"
          >
            View Full Report 
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="trending_flat">trending_flat</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Insight Card 1 */}
          <div className="bg-white rounded-24 p-8 border border-on-surface/5 hover:border-primary-container/40 transition-all custom-shadow group">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 bg-primary-container/20 rounded-2xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary" data-icon="analytics">analytics</span>
              </div>
              <div>
                <h4 class="font-label-md text-label-md text-on-surface">Mood Balance</h4>
                <p className="text-xs text-on-surface-variant">Last 7 Days</p>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              {childProfile.name} was 15% more energetic this week following longer outdoor play sessions.
            </p>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="material-symbols-outlined text-lg text-primary" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-lg text-primary" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-lg text-primary" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-lg text-primary" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-lg text-outline-variant" data-icon="star">star</span>
            </div>
          </div>

          {/* Insight Card 2 */}
          <div className="bg-white rounded-24 p-8 border border-on-surface/5 hover:border-primary-container/40 transition-all custom-shadow group">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 bg-secondary-fixed rounded-2xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary" data-icon="schedule">schedule</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface">Sleep Quality</h4>
                <p className="text-xs text-on-surface-variant">Consistency: 85%</p>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Bedtime routine is becoming more stable. Average sleep onset is 12 mins faster.
            </p>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-4/5 transition-all duration-1000" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* Weekend Plan Card: Soft Blue */}
          <div 
            className="rounded-24 p-8 flex flex-col justify-between sm:col-span-2 lg:col-span-1 border border-on-surface/5 hover:shadow-2xl transition-all shadow-xl text-on-surface relative overflow-hidden group" 
            style={{ backgroundColor: '#add8e6' }}
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 blob-shape rotate-45 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined" data-icon="event_note">event_note</span>
                <h4 className="font-headline-md text-headline-md">Weekend Plan</h4>
              </div>
              <p className="font-body-md text-body-md text-blue-contrast/80 mb-10 leading-relaxed">
                Based on {childProfile.name}'s progress, we recommend a sensory nature walk on Saturday morning.
              </p>
            </div>
            <button 
              onClick={() => {
                setSelectedLibraryItem({
                  title: "Sensory Nature Walk",
                  category: "Outdoor Play",
                  duration: "45-60 mins",
                  ageGroup: "2-4 years",
                  description: "A mindful walk outdoors focused on observing details in nature. Engage all five senses by examining leaf shapes, listening to birds, feeling tree bark, smelling flowers, and observing path bugs.",
                  steps: [
                    "Prepare a small collecting bag or bucket for safe objects.",
                    "Walk slowly through a park or nature trail.",
                    "Ask open-ended questions: 'What color is this leaf?', 'How does this bark feel?'",
                    "Listen closely for 1 minute: list all sounds heard.",
                    "Identify 3 different textures (rough bark, soft petal, hard pebble)."
                  ],
                  materials: ["Small bag/bucket", "Magnifying glass (optional)"]
                });
                setCurrentPage('library');
              }}
              className="relative z-10 bg-white px-6 py-4 rounded-2xl font-label-md text-label-md w-full shadow-sm hover:shadow-md active:scale-95 transition-all text-[#00343a] cursor-pointer"
            >
              Explore Activity
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
