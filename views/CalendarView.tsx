
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLunarDate } from '../lunarUtils';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const totalDays = daysInMonth(month, year);
  const startDay = startDayOfMonth(month, year);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysArray = [];
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let i = 1; i <= totalDays; i++) daysArray.push(i);

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className="p-4 pt-10 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Tháng {month + 1}, {year}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronRight size={24} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((day, idx) => (
          <div key={day} className={`text-center text-xs font-bold py-2 ${idx === 0 ? 'text-red-500' : 'text-slate-400'}`}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {daysArray.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;
          
          const solarDate = new Date(year, month, day);
          const isToday = solarDate.toDateString() === new Date().toDateString();
          const lunar = getLunarDate(solarDate);
          const isSunday = idx % 7 === 0;

          return (
            <div 
              key={day} 
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-95 cursor-pointer
                ${isToday ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-slate-100'}
              `}
            >
              <span className={`text-sm font-bold ${!isToday && isSunday ? 'text-red-500' : ''}`}>
                {day}
              </span>
              <span className={`text-[8px] mt-1 ${isToday ? 'text-indigo-100' : 'text-slate-400'}`}>
                {lunar.day}/{lunar.month}
              </span>
              {lunar.day === 1 && (
                <div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${isToday ? 'bg-white' : 'bg-indigo-500'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
        <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Chi tiết ngày</h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          Hôm nay là ngày <span className="font-bold">Mậu Tý</span>, tháng <span className="font-bold">Nhâm Dần</span>. 
          Hướng xuất hành: Hỷ Thần (Đông Nam), Tài Thần (Bắc).
        </p>
      </div>
    </div>
  );
};

export default CalendarView;
