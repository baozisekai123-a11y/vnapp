
import React, { useState } from 'react';
import { Plus, Trash2, Bell, MoreVertical } from 'lucide-react';
import { Alarm } from '../types';

interface Props {
  alarms: Alarm[];
  onUpdate: (alarms: Alarm[]) => void;
}

const AlarmView: React.FC<Props> = ({ alarms, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTime, setNewTime] = useState("07:00");
  const [newLabel, setNewLabel] = useState("");

  const toggleAlarm = (id: string) => {
    onUpdate(alarms.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const deleteAlarm = (id: string) => {
    onUpdate(alarms.filter(a => a.id !== id));
  };

  const addAlarm = () => {
    const fresh: Alarm = {
      id: Date.now().toString(),
      time: newTime,
      label: newLabel || "Báo thức",
      isActive: true,
      repeatDays: [1, 2, 3, 4, 5]
    };
    onUpdate([...alarms, fresh]);
    setIsAdding(false);
    setNewLabel("");
  };

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className="p-6 pt-10 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Báo thức</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Plus size={20} />
        </button>
      </div>

      {isAdding && (
        <div className="mb-8 bg-indigo-50 p-6 rounded-3xl border border-indigo-100 animate-in slide-in-from-top duration-300">
           <input 
            type="time" 
            className="w-full text-5xl font-light text-center bg-transparent mb-6 text-indigo-700 outline-none"
            value={newTime}
            onChange={e => setNewTime(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Nhãn báo thức"
            className="w-full p-3 mb-4 bg-white border border-indigo-200 rounded-xl outline-none focus:ring-2 ring-indigo-300"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
          />
          <div className="flex gap-3">
            <button onClick={addAlarm} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold">Lưu</button>
            <button onClick={() => setIsAdding(false)} className="flex-1 bg-white text-slate-600 py-3 rounded-xl font-bold border border-slate-200">Hủy</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {alarms.length === 0 && !isAdding && (
          <div className="text-center py-20">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Bell size={32} />
            </div>
            <p className="text-slate-400 font-medium">Chưa có báo thức nào</p>
          </div>
        )}
        
        {alarms.map(alarm => (
          <div key={alarm.id} className={`p-6 rounded-3xl transition-all duration-300 border ${alarm.isActive ? 'bg-white border-indigo-100 shadow-md' : 'bg-slate-50 border-transparent opacity-60'}`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-4xl font-light text-slate-900">{alarm.time}</span>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{alarm.label}</p>
              </div>
              <button 
                onClick={() => toggleAlarm(alarm.id)}
                className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${alarm.isActive ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${alarm.isActive ? 'left-7 shadow-sm' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {weekDays.map((day, idx) => (
                  <span key={idx} className={`text-[9px] font-bold w-6 h-6 flex items-center justify-center rounded-full ${alarm.repeatDays.includes(idx) ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
                    {day}
                  </span>
                ))}
              </div>
              <button onClick={() => deleteAlarm(alarm.id)} className="text-red-400 p-2">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmView;
