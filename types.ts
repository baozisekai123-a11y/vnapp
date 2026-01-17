
export interface Alarm {
  id: string;
  time: string; // HH:mm
  label: string;
  isActive: boolean;
  repeatDays: number[]; // 0-6 (Sun-Sat)
}

export interface CountdownEvent {
  id: string;
  title: string;
  targetDate: Date; // Bao gồm cả giờ phút giây
  isLunar: boolean;
  category: 'work' | 'personal' | 'holiday';
}

export interface WorldClock {
  id: string;
  city: string;
  timezone: string;
  country: string;
}

export enum Tab {
  HOME = 'home',
  CALENDAR = 'calendar',
  COUNTDOWN = 'countdown',
  ALARM = 'alarm',
  WORLD_CLOCK = 'world_clock'
}
