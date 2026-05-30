import React, { useState } from 'react';

const LIBRARY_ITEMS = [
  {
    id: 'breathing_balloon',
    title: 'The Breathing Balloon',
    category: 'Mindfulness',
    duration: '5 mins',
    ageGroup: '2-5 years',
    description: 'A gentle introduction to deep breathing through the imagery of a magical expanding balloon.',
    steps: [
      'Find a comfortable seated position with Leo.',
      'Imagine a small balloon inside your tummy.',
      'Breathe in slowly to inflate the balloon (count to 4).',
      'Hold your breath for a brief moment (count to 2).',
      'Breathe out slowly to deflate the balloon (count to 4).',
      'Repeat 5 times, noticing how peaceful you feel.'
    ],
    materials: ['A quiet space', 'A real balloon (optional, to demonstrate first)'],
    badge: 'Breathe Master',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqhp3OaC-m8rhRBvfvJUi_Bv1AzaDIt3_iHpmjw74Y_R0JDE75TdDie2WJzlDb7dpj6eivg-HT0ooG0TH-5HXsA4UP8moYEaglAZS7ONzSEhDKuT_Rz_8wgaYrHAThRhysy-ZBQRNByLLIvnQyBwEVojKQX5fNubgusm1NNK5PX44enBzRpPwAYk43dYsXZfz2VzCUkdeWCSbk0VsufpXT8ZkK17g9fbnvp0Ke0CyClMSFmGVt8Q4wDkgFeI8RkEzz0QzEGgtGg9L2'
  },
  {
    id: 'zoo_yoga',
    title: 'Zoo Parade Yoga',
    category: 'Yoga',
    duration: '12 mins',
    ageGroup: '2-5 years',
    description: 'Move like your favorite animals in this energetic yoga flow for all skill levels.',
    steps: [
      'Stand tall like a Giraffe reaching for high leaves (stretch hands high).',
      'Pose like a sleeping Lion on the floor (child\'s pose).',
      'Balance like a Flamingo on one foot (hold for 5 seconds).',
      'Crawl slowly like a Tortoise, keeping your back rounded.',
      'Do 3 giant frog jumps to burn off extra energy.'
    ],
    materials: ['Comfortable clothing', 'Soft rug or yoga mat'],
    badge: 'Yoga Lion',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFT4LhpZ3qoECPOH1NbDrhYILiFJ6jaUsllnSOhJrJeUdBX7HPBdjwZUg4j5K6KTeUiIxdrqB26I2aU6-xWO64zTkp6JUtcbSZjFM9RPbJykpl1zTo7ReDSiR7xwWKFAW2zgJ_Et80MXNPUeP7SKS1VKSqoWYfqnmclHjxWR6S6R1mBbP-XP2dxHucPk6hFWM52gFwpbWn-SwPkBjys5lgfhvAcbU82-utzY0pLOF06zMh8B9DB3ORbyt07LaNNIWt4fHjSXuvmI43'
  },
  {
    id: 'quiet_pond',
    title: 'The Quiet Pond',
    category: 'Bedtime',
    duration: '8 mins',
    ageGroup: 'All Ages',
    description: 'A guided visualization to help quiet the mind and prepare the body for restful sleep.',
    steps: [
      'Lie down comfortably in bed with dim lights.',
      'Close your eyes and imagine a completely still, glassy pond.',
      'Imagine peaceful glowing fireflies dancing over the water.',
      'Take three slow, deep breaths, feeling the body sink into the bed.',
      'Listen to the quiet sounds of the evening in your imagination.'
    ],
    materials: ['A cozy bed', 'Dim lighting'],
    badge: 'Pond Whisperer',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPziOvJ8LiFYk1rf52cdQBsqoIVd-MdQ3w66Qd3g3C8ybUhMsD5ranMyPwaTiVSgOwBVuf7cKgL2Sm4sdw66DRigpu_BILtZ3dNEMw_w4ODM04wiexkXmOW1skKUcsDpl07zkfxxasLoT86zzUkNOlYnkc50dRq4kihJpTSo24wqW8YY3yZrt7poZbv0SLqD2sCxrtN-VVl95tAVCQxL-8bpRtAz2odISi8UaDNq7P0cpCsYrBWLF0OwhoX9iq5SfAq2jHEoZJCXJ4'
  },
  {
    id: 'musical_statues',
    title: 'Musical Statues',
    category: 'Quick Play',
    duration: '15 mins',
    ageGroup: '2-5 years',
    description: 'Express yourself through free dance and learn focus through the magic of freeze-play.',
    steps: [
      'Play some upbeat, happy music.',
      'Dance freely around the room, making silly shapes.',
      'Pause the music unexpectedly.',
      'Freeze like a statue as soon as the music stops!',
      'Hold the pose for 5 seconds without laughing or moving.',
      'Start the music again and repeat!'
    ],
    materials: ['A music player', 'Safe open space to dance'],
    badge: 'Freeze King',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzwGnfcEERpWJNg4iAwg5-BmR-ndfrp1vwK_Mq8jc73gNOEKs6eLWH_f6lxgS5gbSSch0CD1lxa3x2RikE4_lVkBccbMVF4ZG9ohBr2jiDNojnWwbhKUUf1gb6ckB73e1AQx7VubMKAU2X_osQeqIja7pWCgqM_qquDZrkfRoB_OsBwwYqRwYBEdysJyCOP94QqLsG7FPmIrJ2OpBoranG9KTlUmnitGyDfz1cDqQZ98iPoe8NuVI8wTudxeoOftqmbcJMa9IinxO2'
  },
  {
    id: 'forest_adventure',
    title: 'Forest Adventure',
    category: 'Mindfulness',
    duration: '10 mins',
    ageGroup: '2-5 years',
    description: 'An imaginative journey through the woods to discover the five senses in nature.',
    steps: [
      'Close your eyes and pretend we are stepping onto a soft forest path.',
      'What do you see? (Describe green leaves, tall pines, active bugs).',
      'What do you hear? (Listen for bird songs or wind in branches).',
      'What do you smell? (Imagine fresh pine wood or damp grass).',
      'Touch a dry leaf or smooth rock (use sensory props if nearby).'
    ],
    materials: ['Imaginative storytelling', 'Sensory props like a leaf or stone (optional)'],
    badge: 'Forest Guide',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXu69Z6NHkF5TLthz5Wav5-90J0YPhTZApKhg2JsF7yOzBNxdZNKx5eLIriqqqtbFQ-PuSBJER-dIf10OyU_89r42bikhgYNRvkgCcu6dnp4ezHap-6JzVStJJ16Sx2RSLDpw3LF0h2i0iwnpYbEasf8ZGWgT3xieqtU2Lh4qKJZdRpmzBQBv7T20dWDI965QEVVYVyx41_dT0qIk57-uKR37DPHULyxiHYB5zfME8sAa_eOVvVNQLpyEJhjpCHTFW8rJjGHFC2PLH7w'
  },
  {
    id: 'sunbeam_stretch',
    title: 'Sunbeam Stretch',
    category: 'Yoga',
    duration: '7 mins',
    ageGroup: '2-5 years',
    description: 'Wake up your body with these gentle morning stretches designed to energize.',
    steps: [
      'Reach your hands up high to catch the morning sunbeams.',
      'Bend forward to touch your toes, saying "good morning" to your feet.',
      'Stretch side to side like a tree swaying in a gentle morning breeze.',
      'Sit on the floor and butterfly stretch (bring feet together and flutter knees).',
      'Take a deep breath and let out a big morning yawn.'
    ],
    materials: ['Warm sunny spot in the house', 'Soft carpet or yoga mat'],
    badge: 'Sunbeam Catcher',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxg0qYT5rsNaAn4SVOq7EXTAH1siKcIXsFXStXYYA820UIh7dR6OvHOVd1zLw6bgYwEDH8uxVw6Vllrizsm6pmt_q0TdC8R9XcleuudmSo2tJ2Io0yOSOdRosMBn14NkFZfdsu7Ke5uCG9byxJ-t0k7B1QZ6TIgz7j6DeoMRqC6qncf8iN1aUXfsGFNxwiJm6dDOgxJ7iJsDFVTmFuuwU3_2HF5ASgE8p2cmabYL6PTEwuEXkKFB7UBLKeGSHsyRwydeAbE207AhCy'
  }
];

export default function Library({
  selectedLibraryItem,
  setSelectedLibraryItem,
  setDailyProgress,
  goals
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Activities');
  const [showLogSuccess, setShowLogSuccess] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  const categories = ['All Activities', 'Mindfulness', 'Yoga', 'Quick Play', 'Bedtime'];

  const filteredItems = LIBRARY_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Activities' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const toggleStep = (stepIdx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepIdx]: !prev[stepIdx]
    }));
  };

  const handleLogActivity = (item) => {
    if (item.category === 'Yoga' || item.category === 'Quick Play' || item.category === 'Mindfulness') {
      setDailyProgress(prev => ({
        ...prev,
        play: Math.min(goals.play * 1.5, prev.play + 15) // log 15 mins active play
      }));
    } else if (item.category === 'Bedtime') {
      setDailyProgress(prev => ({
        ...prev,
        sleep: Math.min(goals.sleep * 1.2, prev.sleep + 0.5) // log 30 mins quiet rest
      }));
    }
    
    setShowLogSuccess(true);
    setTimeout(() => {
      setShowLogSuccess(false);
      setSelectedLibraryItem(null);
      setCompletedSteps({});
    }, 2000);
  };

  // Dedicated Detail Subpage View
  if (selectedLibraryItem) {
    const item = selectedLibraryItem;
    const totalSteps = item.steps.length;
    const doneSteps = Object.values(completedSteps).filter(Boolean).length;
    const progressPercent = Math.round((doneSteps / totalSteps) * 100);

    return (
      <div className="animate-fadeIn pb-12">
        {/* Back navigation */}
        <button
          onClick={() => {
            setSelectedLibraryItem(null);
            setCompletedSteps({});
          }}
          className="flex items-center gap-1.5 text-primary hover:opacity-80 font-label-md text-sm mb-6 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg" data-icon="arrow_back">arrow_back</span>
          Back to Activity Library
        </button>

        {/* Subpage Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          
          {/* Main Content (Left, 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Details Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-on-surface/5 custom-shadow">
              
              {/* Image banner */}
              <div className="w-full h-64 rounded-2xl overflow-hidden mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3.5 py-1 bg-tertiary-container/30 text-on-tertiary-fixed-variant font-bold text-xs uppercase tracking-wider rounded-full">
                    {item.category}
                  </span>
                  <h2 className="font-headline-lg text-3xl text-primary mt-3">
                    {item.title}
                  </h2>
                </div>
              </div>

              <p className="text-on-surface-variant font-body-md text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Progress Indicator for Steps */}
              <div className="bg-surface-container p-4.5 rounded-2xl border border-on-surface/5 flex justify-between items-center gap-4">
                <div>
                  <span className="text-xs font-bold text-on-surface-variant uppercase">Steps Progress</span>
                  <span className="block text-sm font-semibold text-on-surface">{doneSteps} of {totalSteps} completed</span>
                </div>
                <div className="w-32 h-2.5 bg-white rounded-full overflow-hidden border border-on-surface/5">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Checklist of Steps */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-on-surface/5 custom-shadow">
              <h3 className="font-headline-md text-xl text-primary mb-6 font-bold">Activity Steps</h3>
              <div className="space-y-4">
                {item.steps.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`flex items-start gap-4 p-4.5 rounded-2xl border transition-all cursor-pointer hover:bg-surface-container-low ${
                        isDone ? 'bg-surface-container-low border-primary/25' : 'bg-white border-on-surface/5'
                      }`}
                    >
                      <div 
                        className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center border shrink-0 transition-all ${
                          isDone ? 'bg-primary border-primary text-white' : 'border-outline-variant'
                        }`}
                      >
                        {isDone && <span className="material-symbols-outlined text-[10px] font-bold">check</span>}
                      </div>
                      <span className={`text-sm font-medium text-on-surface leading-relaxed ${isDone ? 'line-through text-on-surface-variant opacity-60' : ''}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Info (Right, 1 col) */}
          <div className="space-y-6">
            
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-on-surface/5 custom-shadow space-y-6">
              <h4 className="font-label-md text-primary text-sm uppercase tracking-widest border-b border-on-surface/5 pb-3 font-bold">
                Key Information
              </h4>
              
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Recommended Age</span>
                <span className="font-label-md text-on-surface text-base">{item.ageGroup}</span>
              </div>
              
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Duration</span>
                <span className="font-label-md text-on-surface text-base">{item.duration}</span>
              </div>

              {item.badge && (
                <div>
                  <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Completion Reward</span>
                  <span className="font-label-md text-primary font-bold text-sm uppercase tracking-wide flex items-center gap-1.5 mt-1">
                    <span className="material-symbols-outlined text-lg">emoji_events</span>
                    {item.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Materials Card */}
            {item.materials && item.materials.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-on-surface/5 custom-shadow">
                <h4 className="font-label-md text-primary text-sm uppercase tracking-widest border-b border-on-surface/5 pb-3 mb-4 font-bold">
                  Materials Required
                </h4>
                <div className="space-y-2.5">
                  {item.materials.map((mat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completion Trigger Card */}
            <div className="bg-secondary-fixed rounded-2xl p-6 border border-on-surface/5 flex flex-col justify-between">
              <div>
                <h4 className="font-headline-md text-lg text-on-secondary-fixed mb-2 flex items-center gap-2 font-bold">
                  <span className="material-symbols-outlined">verified</span>
                  Log Progress
                </h4>
                <p className="text-xs text-on-secondary-fixed-variant leading-relaxed mb-6">
                  Ready to complete? Logging this will record active play/rest metrics to Leo's daily chart tracker.
                </p>
              </div>

              {showLogSuccess ? (
                <div className="bg-white/85 p-3 rounded-xl text-center text-xs font-bold text-[#00343a] animate-scaleUp">
                  🎉 Stats Boost Logged successfully!
                </div>
              ) : (
                <button
                  onClick={() => handleLogActivity(item)}
                  className="w-full py-4 text-white font-label-md rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: '#655f32' }}
                >
                  Complete & Log Stats
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Activity Library grid list view
  return (
    <div className="animate-fadeIn pb-12 relative">
      {/* Decorative Organic Blobs */}
      <div className="absolute -top-20 -right-10 w-64 h-64 bg-tertiary-container/20 organic-blob -z-10 animate-pulse-slow"></div>
      <div className="absolute top-80 -left-20 w-80 h-80 bg-primary-container/20 organic-blob -z-10"></div>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-4">
          Activity Library
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Explore a world of mindfulness, yoga, and creative play designed specifically for little explorers.
        </p>
      </div>

      {/* Search and Filter bar */}
      <div className="max-w-4xl mx-auto space-y-6 mb-12">
        {/* Search Input */}
        <div className="relative group transition-all duration-200 focus-within:scale-[1.01]">
          <input
            type="text"
            placeholder="Search for 'Breathing' or 'Yoga'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-14 pr-6 rounded-2xl border-none bg-white custom-shadow font-body-md text-on-surface focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
          />
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-brand-blue" data-icon="search">search</span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-label-md transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-blue text-white shadow-sm hover:scale-105'
                    : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:scale-105'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards list */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl overflow-hidden custom-shadow hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-tertiary">schedule</span>
                    <span className="font-label-md text-xs text-on-surface">{item.duration}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-headline-md text-primary font-bold">
                      {item.title}
                    </h3>
                    <button 
                      onClick={() => setSelectedLibraryItem(item)}
                      className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined" data-icon="play_arrow" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                  </div>
                  <p className="font-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tag Footer */}
              <div className="px-6 pb-6 pt-0">
                <span className="px-3 py-1 rounded-full bg-tertiary-container/30 text-on-tertiary-fixed-variant font-label-md text-[10px] uppercase font-bold tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-on-surface/5 custom-shadow max-w-lg mx-auto">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4" data-icon="search_off">search_off</span>
          <h4 className="font-headline-md text-headline-md text-primary mb-2 font-bold">No activities found</h4>
          <p className="text-on-surface-variant text-body-md">Try checking your spelling or selecting another filter category.</p>
        </div>
      )}
    </div>
  );
}
