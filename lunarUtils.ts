
/**
 * Simplified Lunar calculation logic for Vietnam.
 * In a real production app, we would use the full astronomical formulas 
 * but for this prototype we simulate the logic or use approximations.
 */

export const getLunarDate = (date: Date) => {
  // Mock conversion logic: Real conversion is complex (Hồ Ngọc Đức's algorithm)
  // This function simulates the response for UI demonstration.
  // In a real implementation, we'd bundle a lunar library.
  const d = date.getDate();
  const m = date.getMonth() + 1;
  
  // Basic simulation: lunar day usually trails solar by some amount
  const lunarDay = (d + 5) % 30 || 30;
  const lunarMonth = m; // Approximate
  const lunarYear = date.getFullYear();
  
  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap: false,
    label: `${lunarDay}/${lunarMonth}`
  };
};

export const getCanChi = (year: number) => {
  const can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const chi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  return `${can[(year + 6) % 10]} ${chi[(year + 8) % 12]}`;
};
