
import React, { useState, useEffect } from 'react';
import { getLunarDate, getCanChi } from '../lunarUtils';
import { Timer, Bell } from 'lucide-react';

const HomeView: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const lunar = getLunarDate(time);
  const canChi = getCanChi(time.getFullYear());

  const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

  return (
    <div className="p-6 pt-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-xs font-bold text-slate-400 tracking-[0.3em] mb-2 uppercase">Hệ thống thời gian</h2>
        <div className="text-6xl font-extralight tracking-tighter text-slate-900 mb-2 font-mono">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
        <div className="text-base font-semibold text-indigo-500 bg-indigo-50 px-4 py-1 rounded-full inline-block">
          {dayNames[time.getDay()]}, {time.toLocaleDateString('vi-VN')}
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2rem] p-7 text-white shadow-2xl shadow-indigo-200 mb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className="text-indigo-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Âm lịch Việt Nam</h3>
            <p className="text-4xl font-black">Ngày {lunar.day}</p>
            <p className="text-lg font-medium text-indigo-200/80">Tháng {lunar.month}, {lunar.year}</p>
            <p className="text-sm text-indigo-300/60 mt-2 italic font-serif">Năm {canChi}</p>
          </div>
          <div className="bg-indigo-500/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest">Hà Nội</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/5 p-3 rounded-2xl">
            <p className="text-[9px] uppercase font-bold text-indigo-300/70 mb-1">Giờ Hoàng Đạo</p>
            <p className="text-xs font-semibold">Tý, Dần, Mão, Ngọ</p>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl">
            <p className="text-[9px] uppercase font-bold text-indigo-300/70 mb-1">Hướng xuất hành</p>
            <p className="text-xs font-semibold">Hỷ Thần: Đông Nam</p>
          </div>
        </div>
      </div>

      {/* Mini Countdown Widget */}
      <div className="w-full bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
            <Timer size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sắp diễn ra</p>
            <h4 className="font-bold text-slate-800">Tết Nguyên Đán</h4>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-mono font-bold text-indigo-600">32d 14h</p>
          <p className="text-[9px] text-slate-400 font-bold uppercase">Đếm ngược</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <QuickCard label="Báo thức" value="07:30" icon={<Bell size={18} />} color="bg-rose-50 text-rose-500" />
        <QuickCard label="Múi giờ" value="ICT (UTC+7)" icon={<GlobeIcon />} color="bg-emerald-50 text-emerald-500" />
      </div>
    </div>
  );
};

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const QuickCard: React.FC<{ label: string; value: string; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-white border border-slate-50 p-4 rounded-[1.5rem] flex items-center gap-4 shadow-sm">
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-[9px] text-slate-400 uppercase font-black">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default HomeView;
