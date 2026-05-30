import React from 'react';

export default function Insights({ childProfile, dailyProgress, goals }) {
  // Let's create a 7-day data set, ending with today's live stat
  const days = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Today'];
  
  // Historical stats + today's live stats
  const sleepHistory = [9.5, 11, 10, 8.5, 9.8, 10.5, dailyProgress.sleep];
  const playHistory = [50, 75, 60, 30, 45, 50, dailyProgress.play];
  const hydrationHistory = [5, 6, 6, 4, 5, 5, dailyProgress.hydration];

  // Calculations for Averages
  const averageSleep = (sleepHistory.reduce((a, b) => a + b, 0) / 7).toFixed(1);
  const averagePlay = Math.round(playHistory.reduce((a, b) => a + b, 0) / 7);
  const averageHydration = (hydrationHistory.reduce((a, b) => a + b, 0) / 7).toFixed(1);

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 200;
  const padding = 35;

  // 1. Sleep Bar Chart Coordinates
  const maxSleep = Math.max(...sleepHistory, goals.sleep);
  const getBarX = (idx) => padding + (idx * (chartWidth - padding * 2) / 6);
  const getBarY = (val) => chartHeight - padding - (val * (chartHeight - padding * 2) / maxSleep);
  const getBarHeight = (val) => (val * (chartHeight - padding * 2) / maxSleep);
  const barWidth = 24;

  // 2. Play & Hydration Line Chart Coordinates
  const maxPlay = Math.max(...playHistory, goals.play);
  const getPlayX = (idx) => padding + (idx * (chartWidth - padding * 2) / 6);
  const getPlayY = (val) => chartHeight - padding - (val * (chartHeight - padding * 2) / maxPlay);

  const maxHydration = Math.max(...hydrationHistory, goals.hydration);
  const getHydrationX = (idx) => padding + (idx * (chartWidth - padding * 2) / 6);
  const getHydrationY = (val) => chartHeight - padding - (val * (chartHeight - padding * 2) / maxHydration);

  // Generate line chart SVG paths
  const playPoints = playHistory.map((val, idx) => `${getPlayX(idx)},${getPlayY(val)}`).join(' ');
  const hydrationPoints = hydrationHistory.map((val, idx) => `${getHydrationX(idx)},${getHydrationY(val)}`).join(' ');

  return (
    <div className="animate-fadeIn pb-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-2">
          Developmental Insights
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg">
          Detailed metrics showing {childProfile.name}'s daily cycles, outdoor exercise, and progress trends.
        </p>
      </div>

      {/* Row of Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-24 p-6 border border-on-surface/5 custom-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary-fixed rounded-2xl flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl" data-icon="bedtime">bedtime</span>
          </div>
          <div>
            <span className="text-xs text-on-surface-variant uppercase tracking-wider block font-semibold">Sleep Avg</span>
            <span className="font-headline-md text-2xl text-on-surface">{averageSleep}h <span className="text-sm text-on-surface-variant">/ day</span></span>
          </div>
        </div>

        <div className="bg-white rounded-24 p-6 border border-on-surface/5 custom-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-[#e3f2fd] rounded-2xl flex items-center justify-center text-[#006b8c]">
            <span className="material-symbols-outlined text-2xl" data-icon="nature_people">nature_people</span>
          </div>
          <div>
            <span className="text-xs text-on-surface-variant uppercase tracking-wider block font-semibold">Active Play Avg</span>
            <span className="font-headline-md text-2xl text-on-surface">{averagePlay}m <span className="text-sm text-on-surface-variant">/ day</span></span>
          </div>
        </div>

        <div className="bg-white rounded-24 p-6 border border-on-surface/5 custom-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-[#e3f2fd] rounded-2xl flex items-center justify-center text-[#006b8c]">
            <span className="material-symbols-outlined text-2xl" data-icon="water_drop">water_drop</span>
          </div>
          <div>
            <span className="text-xs text-on-surface-variant uppercase tracking-wider block font-semibold">Hydration Avg</span>
            <span className="font-headline-md text-2xl text-on-surface">{averageHydration} <span className="text-sm text-on-surface-variant">cups</span></span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-12">
        {/* Chart 1: Sleep Consistency */}
        <section className="bg-white rounded-24 p-6 md:p-8 border border-on-surface/5 custom-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Sleep Quality Consistency</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Comparing sleep durations over the last 7 days</p>
            </div>
            <span className="px-3 py-1 bg-secondary-fixed text-secondary font-semibold text-xs rounded-lg uppercase">
              Target: {goals.sleep}h
            </span>
          </div>

          {/* SVG Sleep Bar Chart */}
          <div className="w-full relative overflow-x-auto">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full min-w-[380px] h-auto overflow-visible font-body-md"
            >
              {/* Grid Lines */}
              <line x1={padding} y1={getBarY(goals.sleep)} x2={chartWidth - padding} y2={getBarY(goals.sleep)} stroke="#596157" strokeDasharray="4 4" strokeWidth="1" />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#c3c8c0" strokeWidth="1" />
              
              {/* Target Line Label */}
              <text x={chartWidth - padding + 5} y={getBarY(goals.sleep) + 4} fill="#596157" className="text-[9px] font-bold">Goal</text>

              {/* Bars */}
              {sleepHistory.map((val, idx) => {
                const x = getBarX(idx) - barWidth / 2;
                const y = getBarY(val);
                const h = getBarHeight(val);
                const isToday = idx === 6;
                return (
                  <g key={idx} className="group">
                    {/* Tooltip background on hover */}
                    <rect 
                      x={x - 12} 
                      y={y - 28} 
                      width={barWidth + 24} 
                      height="20" 
                      rx="6" 
                      fill="#30312f" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    <text 
                      x={x + barWidth / 2} 
                      y={y - 15} 
                      fill="white" 
                      textAnchor="middle" 
                      className="text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {val}h
                    </text>

                    {/* Bar Rect */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.max(4, h)}
                      rx="6"
                      fill={isToday ? '#655f32' : '#c1c9bd'}
                      className="hover:fill-secondary cursor-pointer transition-colors duration-200"
                    />
                    
                    {/* X-axis labels */}
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      fill={isToday ? '#1b1c1a' : '#737871'}
                      className={`text-[11px] ${isToday ? 'font-bold' : ''}`}
                    >
                      {days[idx]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        {/* Chart 2: Play & Hydration Trends */}
        <section className="bg-white rounded-24 p-6 md:p-8 border border-on-surface/5 custom-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Outdoor Activity & Hydration</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Correlation between play minutes and water intake</p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-[#006b8c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006b8c]"></span> Play
              </span>
              <span className="flex items-center gap-1 text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Water
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full relative overflow-x-auto">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full min-w-[380px] h-auto overflow-visible"
            >
              {/* Grid Lines */}
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#c3c8c0" strokeWidth="1" />
              
              {/* Render Play Path */}
              <polyline
                fill="none"
                stroke="#006b8c"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={playPoints}
                className="opacity-75"
              />

              {/* Render Hydration Path */}
              <polyline
                fill="none"
                stroke="#655f32"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={hydrationPoints}
                className="opacity-75"
              />

              {/* Data points and hover tags */}
              {days.map((day, idx) => {
                const px = getPlayX(idx);
                const py = getPlayY(playHistory[idx]);
                const hx = getHydrationX(idx);
                const hy = getHydrationY(hydrationHistory[idx]);
                const isToday = idx === 6;

                return (
                  <g key={idx}>
                    {/* Play Point */}
                    <circle cx={px} cy={py} r="4" fill="#006b8c" stroke="white" strokeWidth="1.5" className="hover:r-6 cursor-pointer transition-all" />
                    
                    {/* Hydration Point */}
                    <circle cx={hx} cy={hy} r="4" fill="#655f32" stroke="white" strokeWidth="1.5" className="hover:r-6 cursor-pointer transition-all" />

                    {/* Day labels on X-axis */}
                    <text
                      x={px}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      fill={isToday ? '#1b1c1a' : '#737871'}
                      className={`text-[11px] ${isToday ? 'font-bold' : ''}`}
                    >
                      {day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </section>
      </div>

      {/* Narrative Progress & Clinical Summary */}
      <section className="bg-white rounded-24 p-6 md:p-10 border border-on-surface/5 custom-shadow">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-3xl text-primary" data-icon="clinical_notes">clinical_notes</span>
          <h3 className="font-headline-md text-headline-md text-on-surface">Weekly Nurture Insights</h3>
        </div>

        <div className="space-y-6 text-on-surface-variant leading-relaxed text-body-md">
          <div className="bg-surface-container rounded-2xl p-6 border-l-4 border-primary">
            <h4 className="font-label-md text-on-surface text-base mb-1.5 font-bold">Sleep & Focus Correlation</h4>
            <p className="text-sm">
              {childProfile.name}'s bedtime routine was highly stable, achieving a sleep consistency of {((goals.sleep / averageSleep) * 100).toFixed(0)}%. 
              Higher sleep durations strongly correlated with increased outdoor focus. Standard onset was 12 minutes faster.
            </p>
          </div>

          <div className="bg-[#e3f2fd]/20 rounded-2xl p-6 border-l-4 border-[#006b8c]">
            <h4 className="font-label-md text-on-surface text-base mb-1.5 font-bold">Hydration vs. Active Energy</h4>
            <p className="text-sm">
              Today's hydration stands at {dailyProgress.hydration} cups. When {childProfile.name} reaches {goals.hydration} cups, mood score consistency has shown a 12% rise. 
              We recommend timing water consumption immediately following the afternoon outdoor session.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
