import { useState, useEffect } from 'react';
import { Plus, X, TrendingUp } from 'lucide-react';
import { DailyCheckList } from './DailyCheckList';
import { WeeklyProgress } from './WeeklyProgress';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
}

const COLORS = [
  '#10b981', // green
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#06b6d4', // cyan
];

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedCompletions = localStorage.getItem('completions');
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
    if (savedCompletions) {
      setCompletions(JSON.parse(savedCompletions));
    }
  }, []);

  // Save habits to localStorage
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);

  // Save completions to localStorage
  useEffect(() => {
    if (completions.length > 0) {
      localStorage.setItem('completions', JSON.stringify(completions));
    }
  }, [completions]);

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        icon: '✓',
        color: COLORS[habits.length % COLORS.length],
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setShowAddForm(false);
    }
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter((h) => h.id !== habitId));
    setCompletions(completions.filter((c) => c.habitId !== habitId));
  };

  const toggleCompletion = (habitId: string, date: string) => {
    const existingIndex = completions.findIndex(
      (c) => c.habitId === habitId && c.date === date
    );

    if (existingIndex >= 0) {
      const newCompletions = [...completions];
      newCompletions[existingIndex].completed = !newCompletions[existingIndex].completed;
      setCompletions(newCompletions);
    } else {
      setCompletions([
        ...completions,
        { habitId, date, completed: true },
      ]);
    }
  };

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Rastreador de Hábitos
          </h1>
          <p className="text-slate-600">
            Acompanhe seus hábitos diários e veja seu progresso semanal
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Daily Checklist */}
          <div className="space-y-6">
            {/* Habits Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Meus Hábitos
                </h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={20} />
                  Adicionar
                </button>
              </div>

              {showAddForm && (
                <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                  <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                    placeholder="Nome do novo hábito..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addHabit}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setNewHabitName('');
                      }}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {habits.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p>Nenhum hábito adicionado ainda.</p>
                  <p className="text-sm mt-1">Clique em "Adicionar" para começar!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                          style={{ backgroundColor: habit.color }}
                        >
                          {habit.icon}
                        </div>
                        <span className="font-medium text-slate-700">
                          {habit.name}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Daily Checklist */}
            {habits.length > 0 && (
              <DailyCheckList
                habits={habits}
                completions={completions}
                todayDate={getTodayString()}
                onToggleCompletion={toggleCompletion}
              />
            )}
          </div>

          {/* Right Column - Weekly Progress */}
          {habits.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-blue-500" size={24} />
                <h2 className="text-xl font-semibold text-slate-800">
                  Progresso Semanal
                </h2>
              </div>
              <WeeklyProgress habits={habits} completions={completions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
