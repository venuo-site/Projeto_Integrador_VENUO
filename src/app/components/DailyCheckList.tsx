import { Check } from 'lucide-react';
import { Habit, HabitCompletion } from './HabitTracker';

interface DailyCheckListProps {
  habits: Habit[];
  completions: HabitCompletion[];
  todayDate: string;
  onToggleCompletion: (habitId: string, date: string) => void;
}

export function DailyCheckList({
  habits,
  completions,
  todayDate,
  onToggleCompletion,
}: DailyCheckListProps) {
  const isHabitCompleted = (habitId: string): boolean => {
    const completion = completions.find(
      (c) => c.habitId === habitId && c.date === todayDate
    );
    return completion?.completed || false;
  };

  const getCompletionRate = (): number => {
    if (habits.length === 0) return 0;
    const completedCount = habits.filter((h) => isHabitCompleted(h.id)).length;
    return Math.round((completedCount / habits.length) * 100);
  };

  const completionRate = getCompletionRate();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Lista Diária
        </h2>
        <p className="text-sm text-slate-600">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">
            Progresso de Hoje
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {completionRate}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {habits.map((habit) => {
          const isCompleted = isHabitCompleted(habit.id);
          return (
            <button
              key={habit.id}
              onClick={() => onToggleCompletion(habit.id, todayDate)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                isCompleted
                  ? 'border-green-500 bg-green-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Checkbox */}
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isCompleted && <Check size={18} className="text-white" />}
              </div>

              {/* Habit Icon */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                style={{ backgroundColor: habit.color }}
              >
                {habit.icon}
              </div>

              {/* Habit Name */}
              <span
                className={`flex-1 text-left font-medium ${
                  isCompleted
                    ? 'text-green-700 line-through'
                    : 'text-slate-700'
                }`}
              >
                {habit.name}
              </span>
            </button>
          );
        })}
      </div>

      {completionRate === 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-center">
          <p className="text-white font-semibold text-lg">
            🎉 Parabéns! Você completou todos os hábitos hoje!
          </p>
        </div>
      )}
    </div>
  );
}
