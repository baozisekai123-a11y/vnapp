
import React, { useState, useEffect } from 'react';
import { Globe, Plus, Trash2, Sun, Moon, Search, X } from 'lucide-react';
import { WorldClock } from '../types';

interface Props {
  clocks: WorldClock[];
  onAdd: (c: WorldClock) => void;
  onDelete: (id: string) => void;
}

const PREDEFINED_CITIES = [
  { city: 'London', country: 'UK', timezone: 'Europe/London' },
  { city: 'Paris', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow' },
  { city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
  { city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
  { city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai' },
  { city: 'Seoul', country: 'S. Korea', timezone: 'Asia/Seoul' },
  { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
  { city: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City' },
  { city: 'Sao Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo' },
  { city: 'Johannesburg', country: 'S. Africa', timezone: 'Africa/Johannesburg' },
  { city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok' },
  { city: 'New Delhi', country: 'India', timezone: 'Asia/Kolkata' },
];

const WorldClockView: React.FC<Props> = ({ clocks, onAdd, onDelete }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeData = (zone: string) => {
    const timeStr = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(currentTime);

    const [hours] = timeStr.split(':').map(Number);
    const isDay = hours >= 6 && hours < 18;

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      timeZoneName: 'shortOffset'
    });
    const parts = formatter.formatToParts(currentTime);
    const offset = parts.find(p => p.type === 'timeZoneName')?.value || "";

    return { timeStr, isDay, offset };
  };

  const filteredCities = PREDEFINED_CITIES.filter(c => 
    !clocks.find(existing => existing.city === c.city) &&
    (c.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 pt-10 animate-in slide-in-from-right duration-500 pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Thế giới</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Múi giờ tiêu biểu</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-4 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-100 active:scale-90 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {clocks.map(clock => {
          const { timeStr, isDay, offset } = getTimeData(clock.timezone);
          return (
            <div key={clock.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group relative overflow-hidden transition-all hover:shadow-md">
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 rounded-full -mr-10 -mt-10 ${isDay ? 'bg-amber-400' : 'bg-indigo-900'}`}></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-4 rounded-2xl transition-colors ${isDay ? 'bg-amber-50 text-amber-500' : 'bg-indigo-50 text-indigo-600'}`}>
                  {isDay ? <Sun size={24} /> : <Moon size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{clock.city}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    {clock.country} • {offset}
                  </p>
                </div>
              </div>
              
              <div className="text-right relative z-10 flex flex-col items-end">
                <div className="flex items-center gap-2">
                   <span className="text-3xl font-mono font-bold text-slate-900 tracking-tighter">
                    {timeStr}
                  </span>
                  <button 
                    onClick={() => onDelete(clock.id)}
                    className="ml-2 p-2 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className={`text-[9px] font-bold uppercase mt-1 px-2 py-0.5 rounded-full ${isDay ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {isDay ? 'Ban ngày' : 'Ban đêm'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* City Picker Modal Simulation */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-end justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-6 animate-in slide-in-from-bottom duration-500 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">Thêm thành phố</h3>
              <button onClick={() => setIsAdding(false)} className="p-2 bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Tìm thành phố hoặc quốc gia..."
                className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white font-medium"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pr-1">
              {filteredCities.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onAdd({ ...c, id: Date.now().toString() + idx });
                    setIsAdding(false);
                    setSearchTerm('');
                  }}
                  className="w-full text-left p-4 hover:bg-indigo-50 rounded-2xl transition-all border border-transparent hover:border-indigo-100 group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-indigo-600">{c.city}</p>
                      <p className="text-xs text-slate-400">{c.country}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-50 px-2 py-1 rounded-md uppercase">
                      {c.timezone.split('/')[0]}
                    </span>
                  </div>
                </button>
              ))}
              {filteredCities.length === 0 && (
                <p className="text-center py-10 text-slate-400 text-sm italic">Không tìm thấy thành phố nào khác</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center bg-indigo-50/30 p-6 rounded-[2rem] border border-dashed border-indigo-100">
        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Thông tin</p>
        <p className="text-xs text-slate-500 mt-1">Giờ được cập nhật thời gian thực dựa trên múi giờ chuẩn IANA.</p>
      </div>
    </div>
  );
};

export default WorldClockView;
