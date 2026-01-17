
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Clock, ChevronRight } from 'lucide-react';
import { CountdownEvent } from '../types';

interface Props {
  events: CountdownEvent[];
  onAdd: (e: CountdownEvent) => void;
  onDelete: (id: string) => void;
}

const CountdownCard: React.FC<{ event: CountdownEvent; onDelete: (id: string) => void }> = ({ event, onDelete }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0, expired: false });

  useEffect(() => {
    const calculate = () => {
      const diff = event.targetDate.getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft(prev => ({ ...prev, expired: true }));
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
        expired: false
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [event.targetDate]);

  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group mb-4">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg">{event.title}</h4>
            <p className="text-xs text-slate-400 font-medium">
              {event.targetDate.toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
        </div>
        <button 
          onClick={() => onDelete(event.id)}
          className="p-2 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <TimeBox value={timeLeft.days} label="Ngày" />
        <TimeBox value={timeLeft.hours} label="Giờ" />
        <TimeBox value={timeLeft.mins} label="Phút" />
        <TimeBox value={timeLeft.secs} label="Giây" highlight />
      </div>

      {timeLeft.expired && (
        <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] flex items-center justify-center rounded-[2rem]">
          <span className="bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Đã hoàn thành</span>
        </div>
      )}
    </div>
  );
};

const TimeBox: React.FC<{ value: number; label: string; highlight?: boolean }> = ({ value, label, highlight }) => (
  <div className={`flex flex-col items-center p-3 rounded-2xl ${highlight ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-800'}`}>
    <span className="text-xl font-black font-mono leading-none">{value.toString().padStart(2, '0')}</span>
    <span className={`text-[8px] font-bold uppercase mt-1 ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{label}</span>
  </div>
);

const CountdownView: React.FC<Props> = ({ events, onAdd, onDelete }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('00:00');

  const handleAdd = () => {
    if (!newTitle || !newDate) return;
    const [hours, minutes] = newTime.split(':').map(Number);
    const target = new Date(newDate);
    target.setHours(hours, minutes, 0);

    onAdd({
      id: Date.now().toString(),
      title: newTitle,
      targetDate: target,
      isLunar: false,
      category: 'personal'
    });
    setNewTitle('');
    setNewDate('');
    setNewTime('00:00');
    setShowAdd(false);
  };

  return (
    <div className="p-6 pt-10 animate-in slide-in-from-right duration-500 pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Đếm ngược</h2>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Sự kiện & Deadline</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="p-4 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-100 active:scale-90 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {showAdd && (
        <div className="mb-8 bg-white border-2 border-indigo-100 p-6 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
          <h3 className="text-lg font-bold mb-5 text-slate-800 flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
            Tạo sự kiện mới
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Tên sự kiện</label>
              <input 
                type="text" 
                placeholder="Ví dụ: Sinh nhật, Deadline dự án..."
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white transition-all font-medium"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Ngày</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white transition-all font-medium"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Giờ</label>
                <input 
                  type="time" 
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white transition-all font-medium"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={handleAdd} className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all">Tạo ngay</button>
            <button onClick={() => setShowAdd(false)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold active:scale-95 transition-all">Hủy</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {events.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="text-slate-200" size={40} />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Chưa có sự kiện nào được theo dõi</p>
          </div>
        ) : (
          events.map(event => <CountdownCard key={event.id} event={event} onDelete={onDelete} />)
        )}
      </div>
    </div>
  );
};

export default CountdownView;
