import React, { useState } from 'react';

const PRESET_AVATARS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCRJt-PHw7Ab8IZpFifCHyEyHed7dj2XLEVkNUYBkDUbqKBxpfK-xg59xrCDYpGDED9x-PuqVMnhQMjaeMlqOUyP9kUwu5ul9YkfZ8T21X9eRmxZJpcHCT9ZsvfnnZNVDy7w8taGnIVM51yld2HJQzwAero4XI-GtyiZsNk2yoLZnral4m1n7xma7nOWtP1VcuZatBkWQLMKY8HFxVLwnFVzBF-a_EICTRvItiV3okyapA_E38LtaWedq0uROwRs2Vr93W2Rc1YUjIf',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256&h=256',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256'
];

export default function Profile({
  childProfile,
  setChildProfile,
  goals,
  setGoals
}) {
  const [name, setName] = useState(childProfile.name);
  const [age, setAge] = useState(childProfile.age);
  const [notes, setNotes] = useState(childProfile.notes);
  const [avatar, setAvatar] = useState(childProfile.avatar);
  const [gender, setGender] = useState('Male');

  const [sleepGoal, setSleepGoal] = useState(goals.sleep);
  const [playGoal, setPlayGoal] = useState(goals.play);
  const [waterGoal, setWaterGoal] = useState(goals.hydration);

  const [caregivers, setCaregivers] = useState([
    { name: 'Sarah (Mom)', role: 'Primary Caregiver', active: true },
    { name: 'David (Dad)', role: 'Caregiver', active: true },
    { name: 'Dr. Green (Pediatrician)', role: 'Clinician Viewer', active: false }
  ]);
  const [newCaregiverEmail, setNewCaregiverEmail] = useState('');

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Save child details
    setChildProfile({
      name,
      age,
      notes,
      avatar
    });

    // Save target goals
    setGoals({
      sleep: parseFloat(sleepGoal) || 11,
      play: parseInt(playGoal) || 60,
      hydration: parseInt(waterGoal) || 6
    });

    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  const handleAddCaregiver = (e) => {
    e.preventDefault();
    if (!newCaregiverEmail) return;

    // Simulate invite
    const newName = newCaregiverEmail.split('@')[0];
    setCaregivers(prev => [
      ...prev,
      { name: `${newName} (Invited)`, role: 'Caregiver', active: false }
    ]);
    setNewCaregiverEmail('');
  };

  return (
    <div className="animate-fadeIn pb-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-2">
          Kid's Profile
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg">
          Manage {childProfile.name}'s information, set health targets, and share access with caregivers.
        </p>
      </div>

      {showSaveSuccess && (
        <div className="mb-8 p-4 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center gap-3 animate-slideIn">
          <span className="material-symbols-outlined text-2xl">check_circle</span>
          <div>
            <h5 className="font-bold">Profile Updated!</h5>
            <p className="text-xs">Your changes have been saved and applied to today's goals dashboard.</p>
          </div>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Left Column (Avatar & Goals targets) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Avatar selector card */}
          <div className="bg-white rounded-24 p-6 border border-on-surface/5 custom-shadow text-center flex flex-col items-center">
            <h3 className="font-label-md text-on-surface text-sm uppercase tracking-widest border-b border-on-surface/5 pb-3 mb-6 w-full">
              Child Avatar
            </h3>
            
            <div className="w-32 h-32 bg-primary-container/10 organic-border overflow-hidden p-2 border-2 border-primary-container/30 mb-6 relative group">
              <img 
                src={avatar} 
                alt="Selected Portrait" 
                className="w-full h-full object-cover organic-border" 
              />
            </div>

            {/* Presets List */}
            <div className="flex gap-2 justify-center mb-2">
              {PRESET_AVATARS.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAvatar(url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${
                    avatar === url ? 'border-primary scale-110' : 'border-transparent hover:border-outline-variant'
                  }`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <span className="text-[10px] text-on-surface-variant font-medium">Select photo above to swap avatar</span>
          </div>

          {/* Daily Goal Targets Card */}
          <div className="bg-white rounded-24 p-6 border border-on-surface/5 custom-shadow space-y-5">
            <h3 className="font-label-md text-on-surface text-sm uppercase tracking-widest border-b border-on-surface/5 pb-3 w-full">
              Daily Target Goals
            </h3>

            {/* Sleep target */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase">Sleep Target (hours)</label>
              <input
                type="number"
                step="0.5"
                required
                value={sleepGoal}
                onChange={(e) => setSleepGoal(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm font-semibold"
              />
            </div>

            {/* Outdoor play target */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase">Play Target (minutes)</label>
              <input
                type="number"
                required
                value={playGoal}
                onChange={(e) => setPlayGoal(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm font-semibold"
              />
            </div>

            {/* Water target */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase">Water Target (cups)</label>
              <input
                type="number"
                required
                value={waterGoal}
                onChange={(e) => setWaterGoal(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Right Column (Details inputs & Caregivers list) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Details input card */}
          <div className="bg-white rounded-24 p-6 md:p-8 border border-on-surface/5 custom-shadow space-y-6">
            <h3 className="font-label-md text-on-surface text-sm uppercase tracking-widest border-b border-on-surface/5 pb-3 w-full">
              Child Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="Leo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm font-medium"
                />
              </div>

              {/* Age text */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase">Age description</label>
                <input
                  type="text"
                  required
                  placeholder="3 years, 2 months"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender selector */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm font-medium appearance-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Notes / focus */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase">Developmental Notes / Focus Area</label>
              <textarea
                rows="3"
                placeholder="E.g., Focused on fine motor skills and tactile play..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm font-medium resize-none"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-on-surface/5 text-right">
              <button
                type="submit"
                className="px-8 py-3.5 text-white font-label-md text-sm rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                style={{ backgroundColor: '#655f32' }}
              >
                Save Details & Targets
              </button>
            </div>
          </div>

          {/* Caregivers Management Card */}
          <div className="bg-white rounded-24 p-6 md:p-8 border border-on-surface/5 custom-shadow">
            <h3 className="font-label-md text-on-surface text-sm uppercase tracking-widest border-b border-on-surface/5 pb-3 w-full mb-6">
              Family Circle & Caregivers
            </h3>

            {/* Invitation Bar */}
            <div className="mb-6 flex gap-2">
              <input
                type="email"
                placeholder="Enter caregiver email address..."
                value={newCaregiverEmail}
                onChange={(e) => setNewCaregiverEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm"
              />
              <button
                type="button"
                onClick={handleAddCaregiver}
                className="px-5 py-3 text-white bg-secondary hover:opacity-90 font-semibold text-xs rounded-xl transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Invite Member
              </button>
            </div>

            {/* Caregiver List */}
            <div className="space-y-4">
              {caregivers.map((cg, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-surface-container-low border border-on-surface/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl text-on-surface-variant">person</span>
                    <div>
                      <h5 className="font-semibold text-sm text-on-surface">{cg.name}</h5>
                      <span className="text-xs text-on-surface-variant">{cg.role}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg tracking-wider ${
                    cg.active 
                      ? 'bg-secondary-container text-on-secondary-container' 
                      : 'bg-surface-container-high text-on-surface-variant opacity-60'
                  }`}>
                    {cg.active ? 'Active' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
