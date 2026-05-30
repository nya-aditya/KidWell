import React, { useState, useEffect } from 'react';

const SUGGESTED_MEALS = {
  breakfast: {
    name: 'Oatmeal with Blueberries & Chia Seeds',
    calories: 220,
    protein: 6, // grams
    carbs: 38,
    fat: 5,
    checked: false
  },
  lunch: {
    name: 'Avocado Chicken Wrap with Carrot Sticks',
    calories: 340,
    protein: 22,
    carbs: 28,
    fat: 14,
    checked: false
  },
  snack: {
    name: 'Apple Slices with Organic Peanut Butter',
    calories: 180,
    protein: 4,
    carbs: 20,
    fat: 10,
    checked: false
  },
  dinner: {
    name: 'Baked Salmon with Sweet Potato & Broccoli',
    calories: 410,
    protein: 28,
    carbs: 35,
    fat: 16,
    checked: false
  }
};

export default function Nutrition({ childProfile, dailyProgress, setDailyProgress, goals }) {
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('kidwell_meals');
    return saved ? JSON.parse(saved) : SUGGESTED_MEALS;
  });

  const [customFoodName, setCustomFoodName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('kidwell_meals', JSON.stringify(meals));
  }, [meals]);

  // Calculate daily intake totals based on checked meals
  const totals = Object.keys(meals).reduce((acc, key) => {
    const meal = meals[key];
    if (meal.checked) {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
    }
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Add custom food logs
  const handleAddCustomFood = (e) => {
    e.preventDefault();
    if (!customFoodName) return;

    const cals = parseInt(customCalories) || 0;
    const prot = parseInt(customProtein) || 0;

    // We generate a custom key and add it to our meals list
    const customKey = `custom_${Date.now()}`;
    
    setMeals(prev => ({
      ...prev,
      [customKey]: {
        name: customFoodName,
        calories: cals,
        protein: prot,
        carbs: Math.round(cals * 0.1), // rough estimate for display
        fat: Math.round(cals * 0.03),
        checked: true, // logged immediately
        isCustom: true
      }
    }));

    setCustomFoodName('');
    setCustomCalories('');
    setCustomProtein('');
    setShowAddModal(false);
  };

  const toggleMeal = (mealKey) => {
    setMeals(prev => ({
      ...prev,
      [mealKey]: {
        ...prev[mealKey],
        checked: !prev[mealKey].checked
      }
    }));
  };

  const removeCustomMeal = (mealKey) => {
    setMeals(prev => {
      const updated = { ...prev };
      delete updated[mealKey];
      return updated;
    });
  };

  // Adjust hydration cups from this nutrition page as well
  const adjustWater = (amount) => {
    setDailyProgress(prev => {
      const current = prev.hydration;
      const newVal = Math.max(0, Math.min(goals.hydration * 1.5, current + amount));
      return { ...prev, hydration: newVal };
    });
  };

  // Nutrition targets (Reference Toddler 1-3 years: ~1200 kcal, 13g protein)
  const targetCalories = 1200;
  const targetProtein = 13;
  const calPercent = Math.min(100, (totals.calories / targetCalories) * 100);
  const protPercent = Math.min(100, (totals.protein / targetProtein) * 100);

  return (
    <div className="animate-fadeIn pb-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background mb-2">
          Nutrition & Diet Tracker
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg">
          Plan balanced meals and log healthy nutrients for {childProfile.name}'s development.
        </p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-12">
        
        {/* Left Bento: Nutrition Stats Tracker */}
        <section className="lg:col-span-4 bg-white rounded-24 p-6 md:p-8 border border-on-surface/5 custom-shadow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface">Daily Progress</h3>
              <span className="material-symbols-outlined text-primary" data-icon="restaurant">restaurant</span>
            </div>

            {/* Calorie Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-on-surface">Calories Intake</span>
                <span className="text-on-surface-variant">{totals.calories} / {targetCalories} kcal</span>
              </div>
              <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${calPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Protein Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-on-surface">Protein</span>
                <span className="text-on-surface-variant">{totals.protein}g / {targetProtein}g</span>
              </div>
              <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary rounded-full transition-all duration-500" 
                  style={{ width: `${protPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Macros Summary */}
            <div className="grid grid-cols-3 gap-2 text-center bg-surface-container p-3.5 rounded-2xl border border-on-surface/5">
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Protein</span>
                <span className="block font-bold text-sm text-on-surface">{totals.protein}g</span>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Carbs</span>
                <span className="block font-bold text-sm text-on-surface">{totals.carbs}g</span>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Fats</span>
                <span className="block font-bold text-sm text-on-surface">{totals.fat}g</span>
              </div>
            </div>
          </div>

          {/* Hydration Tracker Inside Nutrition */}
          <div className="mt-8 pt-6 border-t border-on-surface/5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b8c]">water_drop</span>
                <span className="text-sm font-bold text-on-surface">Hydration</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1">
                <button onClick={() => adjustWater(-1)} className="w-6 h-6 hover:bg-white flex items-center justify-center rounded-md font-bold text-[#006b8c] cursor-pointer">-</button>
                <button onClick={() => adjustWater(1)} className="w-6 h-6 hover:bg-white flex items-center justify-center rounded-md font-bold text-[#006b8c] cursor-pointer">+</button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-on-surface-variant font-medium">Daily Water Intake</span>
              <span className="font-bold text-on-surface text-sm">{dailyProgress.hydration} / {goals.hydration} cups</span>
            </div>
          </div>
        </section>

        {/* Right Bento: Meal Log Checklist */}
        <section className="lg:col-span-8 bg-white rounded-24 p-6 md:p-8 border border-on-surface/5 custom-shadow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Leo's Daily Meal Planner</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Toggle meals eaten today or add custom snacks</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm font-bold">add</span>
              Log Food
            </button>
          </div>

          <div className="space-y-4">
            {Object.keys(meals).map((key) => {
              const meal = meals[key];
              const isDefaultMeal = ['breakfast', 'lunch', 'snack', 'dinner'].includes(key);
              
              return (
                <div 
                  key={key}
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4.5 rounded-2xl border transition-all ${
                    meal.checked 
                      ? 'bg-surface-container-low border-primary/20' 
                      : 'bg-white border-on-surface/5'
                  }`}
                >
                  <div 
                    onClick={() => toggleMeal(key)}
                    className="flex items-start gap-3.5 cursor-pointer flex-1"
                  >
                    {/* Checkbox circle */}
                    <div 
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 transition-all mt-0.5 ${
                        meal.checked 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-outline-variant hover:border-primary'
                      }`}
                    >
                      {meal.checked && <span className="material-symbols-outlined text-[10px] font-bold">check</span>}
                    </div>

                    <div>
                      {isDefaultMeal && (
                        <span className="text-[10px] text-primary uppercase font-bold tracking-wider block">
                          {key}
                        </span>
                      )}
                      <h4 className={`text-sm font-semibold text-on-surface ${meal.checked ? 'line-through text-on-surface-variant opacity-60' : ''}`}>
                        {meal.name}
                      </h4>
                      <span className="text-xs text-on-surface-variant">
                        {meal.calories} kcal • {meal.protein}g Protein
                      </span>
                    </div>
                  </div>

                  {/* Remove button for custom foods */}
                  {!isDefaultMeal && (
                    <button 
                      onClick={() => removeCustomMeal(key)}
                      className="p-1.5 hover:bg-surface-container rounded-lg text-error hover:opacity-80 transition-all cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Recommended Toddler Healthy Eating Tips */}
      <section className="bg-white rounded-24 p-6 md:p-10 border border-on-surface/5 custom-shadow">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-3xl text-[#006b8c]" data-icon="lightbulb">lightbulb</span>
          <h3 className="font-headline-md text-headline-md text-on-surface">Toddler Nutrition Guidance</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-on-surface-variant text-sm leading-relaxed">
          <div className="bg-[#dde5d9]/40 p-6 rounded-2xl border border-on-surface/5">
            <h4 className="font-bold text-on-surface mb-2">Engage in Food Exploration</h4>
            <p>
              Toddlers learn about food through touching, sniffing, and playing with texture. 
              Let {childProfile.name} feed himself, even if it gets messy! Hand-eye coordination and motor control improve as they pick up peas or soft berries.
            </p>
          </div>
          
          <div className="bg-[#e2d9a0]/40 p-6 rounded-2xl border border-on-surface/5">
            <h4 className="font-bold text-on-surface mb-2">Protein Intake Reference</h4>
            <p>
              Toddlers only need about 13 grams of protein daily. 
              Checking the lunch Salmon or Breakfast oatmeal easily fulfills their requirement. Avoid overloading protein; focus on dietary fibers and minerals.
            </p>
          </div>
        </div>
      </section>

      {/* Log Custom Food Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <form 
            onSubmit={handleAddCustomFood}
            className="bg-white max-w-md w-full rounded-3xl p-6 md:p-8 custom-shadow border border-on-surface/10 animate-scaleUp"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface">Log Food Item</h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-surface-container rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Food Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Greek Yogurt, Whole Wheat Toast" 
                  value={customFoodName}
                  onChange={(e) => setCustomFoodName(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Calories (kcal)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 120" 
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Protein (g)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 8" 
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container rounded-xl border border-on-surface/5 focus:outline-none focus:border-primary/50 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-sm font-semibold rounded-xl transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 text-white text-sm font-semibold rounded-xl transition-all hover:opacity-95 active:scale-98 cursor-pointer text-center"
                style={{ backgroundColor: '#655f32' }}
              >
                Add Log
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
