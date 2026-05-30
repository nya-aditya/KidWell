import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Nutrition from './components/Nutrition';
import Library from './components/Library';
import Profile from './components/Profile';
import Routines from './components/Routines';
import Breathing from './components/Breathing';
import './App.css';

const DEFAULT_PROFILE = {
  name: 'Leo',
  age: '3 years, 2 months',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRJt-PHw7Ab8IZpFifCHyEyHed7dj2XLEVkNUYBkDUbqKBxpfK-xg59xrCDYpGDED9x-PuqVMnhQMjaeMlqOUyP9kUwu5ul9YkfZ8T21X9eRmxZJpcHCT9ZsvfnnZNVDy7w8taGnIVM51yld2HJQzwAero4XI-GtyiZsNk2yoLZnral4m1n7xma7nOWtP1VcuZatBkWQLMKY8HFxVLwnFVzBF-a_EICTRvItiV3okyapA_E38LtaWedq0uROwRs2Vr93W2Rc1YUjIf',
  notes: 'Enjoys sensory textures, building blocks, and outdoor play.'
};

const DEFAULT_PROGRESS = {
  sleep: 9, // hours
  play: 45, // minutes
  hydration: 4 // cups
};

const DEFAULT_GOALS = {
  sleep: 11, // target hours
  play: 60, // target minutes
  hydration: 6 // target cups
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('kidwell_currpage') || 'dashboard';
  });

  const [childProfile, setChildProfile] = useState(() => {
    const saved = localStorage.getItem('kidwell_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [dailyProgress, setDailyProgress] = useState(() => {
    const saved = localStorage.getItem('kidwell_progress');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('kidwell_goals');
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });

  // Track selected library item for the Activity Detail Subpage
  const [selectedLibraryItem, setSelectedLibraryItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('kidwell_currpage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('kidwell_profile', JSON.stringify(childProfile));
  }, [childProfile]);

  useEffect(() => {
    localStorage.setItem('kidwell_progress', JSON.stringify(dailyProgress));
  }, [dailyProgress]);

  useEffect(() => {
    localStorage.setItem('kidwell_goals', JSON.stringify(goals));
  }, [goals]);

  // Render correct component based on active tab state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            childProfile={childProfile}
            dailyProgress={dailyProgress}
            goals={goals}
            setDailyProgress={setDailyProgress}
            setCurrentPage={setCurrentPage}
            setSelectedLibraryItem={setSelectedLibraryItem}
          />
        );
      case 'nutrition':
        return (
          <Nutrition
            childProfile={childProfile}
            dailyProgress={dailyProgress}
            setDailyProgress={setDailyProgress}
            goals={goals}
          />
        );
      case 'library':
        return (
          <Library
            selectedLibraryItem={selectedLibraryItem}
            setSelectedLibraryItem={setSelectedLibraryItem}
            setDailyProgress={setDailyProgress}
            goals={goals}
          />
        );
      case 'profile':
        return (
          <Profile
            childProfile={childProfile}
            setChildProfile={setChildProfile}
            goals={goals}
            setGoals={setGoals}
          />
        );
      case 'routines':
        return (
          <Routines
            childProfile={childProfile}
            setDailyProgress={setDailyProgress}
            goals={goals}
          />
        );
      case 'breathing':
        return (
          <Breathing
            childProfile={childProfile}
            setDailyProgress={setDailyProgress}
            goals={goals}
          />
        );
      default:
        return (
          <Dashboard
            childProfile={childProfile}
            dailyProgress={dailyProgress}
            goals={goals}
            setDailyProgress={setDailyProgress}
            setCurrentPage={setCurrentPage}
            setSelectedLibraryItem={setSelectedLibraryItem}
          />
        );
    }
  };

  // Nav Items configuration (4 pages)
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'nutrition', label: 'Nutrition', icon: 'restaurant' },
    { id: 'library', label: 'Library', icon: 'menu_book' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-on-surface antialiased">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-24 flex-col items-center py-10 bg-white border-r border-on-surface/5 custom-shadow z-30">
        <div className="mb-14 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
          <span className="material-symbols-outlined text-4xl text-primary" data-icon="nest_eco_leaf">nest_eco_leaf</span>
        </div>
        <div className="flex flex-col gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSelectedLibraryItem(null); // clear subpage detail state
                }}
                className="p-4 rounded-24 transition-all active:scale-90 cursor-pointer flex items-center justify-center"
                style={{
                  backgroundColor: isActive ? '#add8e6' : 'transparent',
                  color: isActive ? '#00343a' : '#434842'
                }}
                title={item.label}
              >
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 md:pl-24 flex flex-col pb-24 md:pb-0">
        
        {/* Universal Top App Bar */}
        <header className="w-full top-0 sticky z-20 bg-background/80 backdrop-blur-md px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center border-b border-on-surface/5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full overflow-hidden bg-primary-container/30 flex items-center justify-center border border-on-surface/10 cursor-pointer active:scale-95 transition-all"
              onClick={() => setCurrentPage('profile')}
            >
              <img 
                alt={`${childProfile.name}'s profile`} 
                className="w-full h-full object-cover" 
                src={childProfile.avatar} 
              />
            </div>
            <h1 
              className="font-headline-md text-headline-md font-bold text-primary tracking-tight cursor-pointer"
              onClick={() => setCurrentPage('dashboard')}
            >
              KidWell
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick indicators */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-on-surface-variant bg-white px-3 py-1.5 rounded-full border border-on-surface/5">
              <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-sm text-[#006b8c]">water_drop</span> {dailyProgress.hydration}</span>
              <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-sm text-[#006b8c]">nature_people</span> {dailyProgress.play}m</span>
              <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-sm text-secondary">bedtime</span> {dailyProgress.sleep}h</span>
            </div>

            <button className="p-2 text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
          </div>
        </header>

        {/* Dynamic Pages Content */}
        <main className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop pt-8 pb-12">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 px-4 py-4 pb-safe bg-white/95 backdrop-blur-lg border-t border-on-surface/5 rounded-t-24 custom-shadow">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSelectedLibraryItem(null); // clear subpage detail state
                }}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-2xl transition-all active:scale-90 cursor-pointer min-w-[64px]"
                style={{
                  backgroundColor: isActive ? '#add8e6' : 'transparent',
                  color: isActive ? '#00343a' : '#434842'
                }}
              >
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                <span className="font-label-md text-[10px] font-bold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button (Bonus: Quick Launch Routine list) */}
      <button 
        onClick={() => {
          if (currentPage === 'routines') {
            setCurrentPage('dashboard');
          } else {
            setCurrentPage('routines');
          }
        }}
        className="fixed bottom-28 right-6 md:bottom-12 md:right-12 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 border-4 border-white cursor-pointer"
        style={{ 
          backgroundColor: currentPage === 'routines' ? '#F5DADF' : '#add8e6', 
          color: currentPage === 'routines' ? '#77555d' : '#00343a' 
        }}
        title="Check Daily Routines"
      >
        <span className="material-symbols-outlined text-4xl">
          {currentPage === 'routines' ? 'close' : 'playlist_add_check'}
        </span>
      </button>

    </div>
  );
}
