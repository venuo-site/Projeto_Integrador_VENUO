import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Habit, HabitCompletion } from './HabitTracker';

interface WeeklyProgressProps {
  habits: Habit[];
  completions: HabitCompletion[];
}

export function WeeklyProgress({ habits, completions }: WeeklyProgressProps) {
  const weekData = useMemo(() => {
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      
      // Count completions for this day
      const dayCompletions = completions.filter(
        (c) => c.date === dateString && c.completed
      );
      
      const completedCount = dayCompletions.length;
      const totalHabits = habits.length;
      const completionRate = totalHabits > 0 
        ? Math.round((completedCount / totalHabits) * 100) 
        : 0;

      data.push({
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        completados: completedCount,
        total: totalHabits,
        taxa: completionRate,
      });
    }

    return data;
  }, [habits, completions]);

  const habitStreakData = useMemo(() => {
    return habits.map((habit) => {
      let currentStreak = 0;
      const today = new Date();
      
      // Check consecutive days from today backwards
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const completion = completions.find(
          (c) => c.habitId === habit.id && c.date === dateString && c.completed
        );
        
        if (completion) {
          currentStreak++;
        } else {
          break;
        }
      }

      return {
        name: habit.name,
        streak: currentStreak,
        color: habit.color,
      };
    });
  }, [habits, completions]);

  const totalCompletions = useMemo(() => {
    return completions.filter((c) => c.completed).length;
  }, [completions]);

  const averageCompletionRate = useMemo(() => {
    if (weekData.length === 0) return 0;
    const sum = weekData.reduce((acc, day) => acc + day.taxa, 0);
    return Math.round(sum / weekData.length);
  }, [weekData]);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Total de Hábitos</p>
          <p className="text-2xl font-bold text-blue-700">{habits.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <p className="text-sm text-green-600 mb-1">Completados</p>
          <p className="text-2xl font-bold text-green-700">{totalCompletions}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <p className="text-sm text-purple-600 mb-1">Média Semanal</p>
          <p className="text-2xl font-bold text-purple-700">{averageCompletionRate}%</p>
        </div>
      </div>

      {/* Daily Completions Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Hábitos Completados por Dia
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Bar 
              dataKey="completados" 
              fill="#3b82f6" 
              radius={[8, 8, 0, 0]}
              name="Completados"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Completion Rate Line Chart */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Taxa de Conclusão (%)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value}%`, 'Taxa']}
            />
            <Line 
              type="monotone" 
              dataKey="taxa" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Habit Streaks */}
      {habitStreakData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Sequências Atuais
          </h3>
          <div className="space-y-2">
            {habitStreakData.map((habit) => (
              <div key={habit.name} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: habit.color }}
                />
                <span className="flex-1 text-sm text-slate-700">
                  {habit.name}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {habit.streak} {habit.streak === 1 ? 'dia' : 'dias'} 🔥
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
