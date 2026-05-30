import React, { useState, useEffect } from 'react';

const INITIAL_ROUTINES = {
  morning: {
    title: 'Morning Routine',
    icon: 'wb_sunny',
    color: '#e2d9a0',
    accentColor: '#655f32',
    tasks: [
      { id: 'm1', text: 'Rise & Shine stretch', done: false },
      { id: 'm2', text: 'Healthy, balanced breakfast', done: false },
      { id: 'm3', text: 'Brush teeth & wash face', done: false },
      { id: 'm4', text: 'Put on shoes for school/daycare', done: false }
    ],
    badge: 'Morning Champion'
  },
  afternoon: {
    title: 'Afternoon Play',
    icon: 'nature_people',
    color: '#dde5d9',
    accentColor: '#596157',
    tasks: [
      { id: 'a1', text: 'Kick the ball or active play outdoors', done: false },
      { id: 'a2', text: 'Collect 5 colorful leaves or flowers', done: false },
      { id: 'a3', text: 'Hydrate with a full water cup', done: false },
      { id: 'a4', text: 'Clean up toys and blocks', done: false }
    ],
    badge: 'Play Pioneer'
  },
  bedtime: {
    title: 'Bedtime Calm',
    icon: 'bedtime',
    color: '#f9ccd5',
    accentColor: '#77555d',
    tasks: [
      { id: 'b1', text: 'Warm bath and cozy pajamas', done: false },
      { id: 'b2', text: 'Read a bedtime story book', done: false },
      { id: 'b3', text: '5-minute guided breathing session', done: false },
      { id: 'b4', text: 'Turn off lights and sound machine on', done: false }
    ],
    badge: 'Dreamer King'
  }
};

export default function Routines({ childProfile, setDailyProgress, goals }) {
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem('kidwell_routines');
    return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
  });

  const [activeTab, setActiveTab] = useState('morning');
  const [routineCompletedAlert, setRoutineCompletedAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem('kidwell_routines', JSON.stringify(routines));
  }, [routines]);

  const toggleTask = (routineKey, taskId) => {
    setRoutines(prev => {
      const targetRoutine = prev[routineKey];
      const updatedTasks = targetRoutine.tasks.map(t => 
        t.id === taskId ? { ...t, done: !t.done } : t
      );
      
      const newRoutine = { ...targetRoutine, tasks: updatedTasks };
      const wasCompletedBefore = targetRoutine.tasks.every(t => t.done);
      const isCompletedNow = updatedTasks.every(t => t.done);
      
      // If completed just now, reward caregiver & child and log stats!
      if (!wasCompletedBefore && isCompletedNow) {
        handleRoutineCompletionReward(routineKey, targetRoutine.badge);
      }

      return {
        ...prev,
        [routineKey]: newRoutine
      };
    });
  };

  const handleRoutineCompletionReward = (routineKey, badgeName) => {
    // Grant stats as rewards
    if (routineKey === 'morning') {
      setDailyProgress(prev => ({ ...prev, hydration: Math.min(goals.hydration, prev.hydration + 1) })); // +1 water
    } else if (routineKey === 'afternoon') {
      setDailyProgress(prev => ({ ...prev, play: Math.min(goals.play * 1.5, prev.play + 20) })); // +20 mins play
    } else if (routineKey === 'bedtime') {
      setDailyProgress(prev => ({ ...prev, sleep: Math.min(goals.sleep * 1.2, prev.sleep + 1) })); // +1h sleep
    }

    setRoutineCompletedAlert({
      routineTitle: routines[routineKey].title,
      badge: badgeName
    });

    // Clear alert after 4s
    setTimeout(() => {
      setRoutineCompletedAlert(null);
    }, 4500);
  };

  const resetRoutine = (routineKey) => {
    setRoutines(prev => {
      const resetTasks = prev[routineKey].tasks.map(t => ({ ...t, done: false }));
      return {
        ...prev,
        [routineKey]: { ...prev[routineKey], tasks: resetTasks }
      };
    });
  };

  const activeRoutine = routines[activeTab];
  const doneCount = activeRoutine.tasks.filter(t => t.done).length;
  const totalCount = activeRoutine.tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="animate-fadeIn pb-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-2">
          Daily Routines
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg">
          Complete checklists to unlock badges and log health achievements for {childProfile.name}.
        </p>
      </div>

      {/* Routine switch tabs */}
      <div className="flex gap-4 mb-8 border-b border-on-surface/5 pb-4 overflow-x-auto no-scrollbar">
        {Object.keys(routines).map((key) => {
          const r = routines[key];
          const isSelected = activeTab === key;
          const rDoneCount = r.tasks.filter(t => t.done).length;
          const rTotalCount = r.tasks.length;
          const isFull = rDoneCount === rTotalCount;
          
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl font-label-md text-sm transition-all border whitespace-nowrap cursor-pointer hover:shadow-sm"
              style={{
                backgroundColor: isSelected ? r.color : 'white',
                color: isSelected ? r.accentColor : '#434842',
                borderColor: isSelected ? r.accentColor : 'rgba(0,0,0,0.05)'
              }}
            >
              <span className="material-symbols-outlined text-lg">{r.icon}</span>
              <span>{r.title}</span>
              {rDoneCount > 0 && (
                <span 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: isFull ? '#655f32' : r.accentColor }}
                >
                  {isFull ? '✓' : `${rDoneCount}/${rTotalCount}`}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Routine completion success alert banner */}
      {routineCompletedAlert && (
        <div className="mb-8 p-6 bg-[#e2d9a0] text-on-primary-fixed border border-primary/20 rounded-24 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-slideIn">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="material-symbols-outlined text-5xl text-primary" data-icon="workspace_premium">workspace_premium</span>
            <div>
              <h4 className="font-headline-md text-xl text-primary font-bold">Awesome Job!</h4>
              <p className="text-sm text-on-primary-fixed-variant">
                You completed the <strong>{routineCompletedAlert.routineTitle}</strong> with {childProfile.name}!
              </p>
            </div>
          </div>
          <div className="px-5 py-2.5 bg-white/60 border border-primary-container rounded-xl font-label-md text-xs tracking-wider uppercase text-primary font-bold text-center">
            🏆 Unlocked: {routineCompletedAlert.badge}
          </div>
        </div>
      )}

      {/* Main Checklist Card */}
      <div className="bg-white rounded-24 p-6 md:p-10 border border-on-surface/5 custom-shadow">
        
        {/* Progress header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="font-headline-md text-2xl text-on-surface">{activeRoutine.title} Tracker</h3>
            <p className="text-xs text-on-surface-variant mt-1">Check off items as you complete them together</p>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-4">
            <span className="text-sm font-semibold text-on-surface-variant">{progressPercent}% Done</span>
            <div className="w-32 h-2.5 bg-surface-container rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${progressPercent}%`, 
                  backgroundColor: activeRoutine.accentColor 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Task Items */}
        <div className="space-y-4 mb-8">
          {activeRoutine.tasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => toggleTask(activeTab, task.id)}
              className="flex items-center gap-4 p-5 rounded-2xl border border-on-surface/5 hover:border-on-surface/10 hover:bg-surface-container-low transition-all cursor-pointer group"
            >
              {/* Custom checkbox */}
              <div 
                className="w-7 h-7 rounded-xl flex items-center justify-center transition-all border shrink-0"
                style={{
                  backgroundColor: task.done ? activeRoutine.accentColor : 'transparent',
                  borderColor: task.done ? activeRoutine.accentColor : '#737871',
                  color: 'white'
                }}
              >
                {task.done && (
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                )}
              </div>
              
              <span 
                className={`text-body-md font-medium select-none transition-all ${
                  task.done 
                    ? 'line-through text-on-surface-variant opacity-60' 
                    : 'text-on-surface group-hover:text-primary'
                }`}
              >
                {task.text}
              </span>
            </div>
          ))}
        </div>

        {/* Actions footer */}
        <div className="flex justify-between items-center border-t border-on-surface/5 pt-6">
          <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-primary" data-icon="emoji_events">emoji_events</span>
            Reward: {activeRoutine.badge} Badge + Stats Boost
          </span>
          
          <button
            onClick={() => resetRoutine(activeTab)}
            className="px-5 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            Reset Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
