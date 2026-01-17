
import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  AlarmClock, 
  Timer, 
  Home as HomeIcon,
  Globe
} from 'lucide-react';
import { Tab, Alarm, CountdownEvent, WorldClock } from './types';
import HomeView from './views/HomeView';
import CalendarView from './views/CalendarView';
import CountdownView from './views/CountdownView';
import AlarmView from './views/AlarmView';
import WorldClockView from './views/WorldClockView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [countdowns, setCountdowns] = useState<CountdownEvent[]>([
    { id: '1', title: 'Tết Nguyên Đán 2025', targetDate: new Date(2025, 0, 29, 0, 0, 0), isLunar: true, category: 'holiday' },
    { id: '2', title: 'Khai xuân Giáp Thìn', targetDate: new Date(2025, 1, 1, 8, 30, 0), isLunar: false, category: 'work' }
  ]);
  const [worldClocks, setWorldClocks] = useState<WorldClock[]>([
    { id: '1', city: 'Hà Nội', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
    { id: '2', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
    { id: '3', city: 'Paris', country: 'France', timezone: 'Europe/Paris' },
    { id: '4', city: 'New York', country: 'USA', timezone: 'America/New_York' },
  ]);

  // Handle Alarms (Simulated)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentH = now.getHours().toString().padStart(2, '0');
      const currentM = now.getMinutes().toString().padStart(2, '0');
      const timeStr = `${currentH}:${currentM}`;

      alarms.forEach(alarm => {
        if (alarm.isActive && alarm.time === timeStr) {
          if ('Notification' in window && Notification.permission === 'granted') {
             new Notification("BÁO THỨC!", { body: alarm.label, icon: "https://cdn-icons-png.flaticon.com/512/182/182103.png" });
          } else {
             console.log(`ALARM FIRING: ${alarm.label}`);
          }
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [alarms]);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME: return <HomeView />;
      case Tab.CALENDAR: return <CalendarView />;
      case Tab.COUNTDOWN: return <CountdownView events={countdowns} onAdd={(e) => setCountdowns([...countdowns, e])} onDelete={(id) => setCountdowns(countdowns.filter(c => c.id !== id))} />;
      case Tab.ALARM: return <AlarmView alarms={alarms} onUpdate={setAlarms} />;
      case Tab.WORLD_CLOCK: return (
        <WorldClockView 
          clocks={worldClocks} 
          onAdd={(c) => setWorldClocks([...worldClocks, c])} 
          onDelete={(id) => setWorldClocks(worldClocks.filter(c => c.id !== id))}
        />
      );
      default: return <HomeView />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 border-x border-slate-200 overflow-hidden relative shadow-2xl shadow-slate-300">
      {/* OS Simulation Header */}
      <div className="h-10 w-full bg-transparent flex justify-between items-center px-6 text-[11px] font-bold text-slate-800 z-50">
        <span className="font-mono">9:41</span>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-slate-800 rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span>LTE</span>
          <div className="w-6 h-3 border border-slate-800 rounded-[2px] p-[1px] flex">
            <div className="w-4 h-full bg-slate-800 rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {renderContent()}
      </main>

      {/* Modern Floating Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 h-20 bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] flex items-center justify-around px-4 z-50">
        <NavButton 
          active={activeTab === Tab.HOME} 
          icon={<HomeIcon size={22} />} 
          label="Home" 
          onClick={() => setActiveTab(Tab.HOME)} 
        />
        <NavButton 
          active={activeTab === Tab.CALENDAR} 
          icon={<CalendarIcon size={22} />} 
          label="Lịch" 
          onClick={() => setActiveTab(Tab.CALENDAR)} 
        />
        <div className="relative -top-1">
           <NavButton 
            active={activeTab === Tab.COUNTDOWN} 
            icon={<Timer size={22} />} 
            label="Đếm" 
            onClick={() => setActiveTab(Tab.COUNTDOWN)} 
          />
        </div>
        <NavButton 
          active={activeTab === Tab.ALARM} 
          icon={<AlarmClock size={22} />} 
          label="Báo" 
          onClick={() => setActiveTab(Tab.ALARM)} 
        />
        <NavButton 
          active={activeTab === Tab.WORLD_CLOCK} 
          icon={<Globe size={22} />} 
          label="Zone" 
          onClick={() => setActiveTab(Tab.WORLD_CLOCK)} 
        />
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all duration-500 w-12 h-12 rounded-2xl ${active ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`transition-all duration-300 ${active ? 'transform -translate-y-1' : ''}`}>
      {icon}
    </div>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
    {active && <div className="w-1 h-1 bg-indigo-600 rounded-full mt-1"></div>}
  </button>
);

export default App;
