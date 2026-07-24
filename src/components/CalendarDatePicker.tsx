import React from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Language } from "../types";

interface CalendarDatePickerProps {
  selectedDate: string; // "YYYY-MM-DD"
  onChange: (dateStr: string) => void;
  currentLang: Language;
}

const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTH_NAMES_AR = [
  "كانون الثاني (يناير)", "شباط (فبراير)", "آذار (مارس)", "نيسان (أبريل)", "أيار (مايو)", "حزيران (يونيو)",
  "تموز (يوليو)", "آب (أغسطس)", "أيلول (سبتمبر)", "تشرين الأول (أكتوبر)", "تشرين الثاني (نوفمبر)", "كانون الأول (ديسمبر)"
];

const WEEKDAYS_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAYS_AR = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

export default function CalendarDatePicker({ selectedDate, onChange, currentLang }: CalendarDatePickerProps) {
  const isRtl = currentLang === "ar";
  
  // Set default initial date to today if empty
  const today = new Date();
  const todayStr = formatDate(today);
  
  const initialDate = selectedDate ? new Date(selectedDate) : today;
  
  const [currentYear, setCurrentYear] = React.useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(initialDate.getMonth()); // 0-indexed

  // Format a Date object to YYYY-MM-DD
  function formatDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay(); // 0 is Sunday
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleSelectDay = (dayNum: number) => {
    const selected = new Date(currentYear, currentMonth, dayNum);
    onChange(formatDate(selected));
  };

  const monthName = React.useMemo(() => {
    if (currentLang === "ar") return MONTH_NAMES_AR[currentMonth];
    return MONTH_NAMES_EN[currentMonth];
  }, [currentMonth, currentLang]);

  const weekdays = React.useMemo(() => {
    if (currentLang === "ar") return WEEKDAYS_AR;
    return WEEKDAYS_EN;
  }, [currentLang]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // Generate date cells
  const dayCells: React.ReactNode[] = [];
  
  // Empty space for offset
  for (let i = 0; i < firstDayIndex; i++) {
    dayCells.push(<div key={`empty-${i}`} className="h-9 w-full" />);
  }

  // Days in month
  const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(currentYear, currentMonth, d);
    const cellDateStr = formatDate(cellDate);
    const isPast = cellDate < todayReset;
    const isSelected = selectedDate === cellDateStr;
    const isCurrentDay = formatDate(today) === cellDateStr;

    dayCells.push(
      <button
        key={`day-${d}`}
        type="button"
        disabled={isPast}
        aria-pressed={isSelected}
        aria-label={`${monthName} ${d}, ${currentYear}`}
        onClick={() => handleSelectDay(d)}
        className={`h-9 w-full rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
          isSelected
            ? "bg-brand-accent text-brand-btn-text scale-105 shadow-md font-extrabold"
            : isPast
            ? "text-brand-muted/20 cursor-not-allowed line-through"
            : "text-brand-text hover:bg-brand-accent/20 hover:text-brand-accent cursor-pointer"
        } ${isCurrentDay && !isSelected ? "ring-1.5 ring-brand-accent/40" : ""}`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="box-border w-full min-w-0 overflow-hidden bg-brand-input border border-brand-border rounded-xl p-3 space-y-3 sm:p-3.5" id="custom-calendar-picker">
      {/* Month Year Header Selector */}
      <div className={`flex items-center justify-between ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
        <button
          type="button"
          onClick={isRtl ? handleNextMonth : handlePrevMonth}
          aria-label={currentLang === "ar" ? "الشهر السابق" : "Previous month"}
          className="p-1.5 rounded-lg border border-brand-border/80 text-brand-text hover:bg-brand-accent/10 hover:text-brand-accent cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="min-w-0 px-1 text-center text-[11px] font-black tracking-tight text-brand-accent uppercase flex items-center justify-center gap-1 font-sans sm:text-xs sm:gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span className="truncate">{monthName} {currentYear}</span>
        </div>

        <button
          type="button"
          onClick={isRtl ? handlePrevMonth : handleNextMonth}
          aria-label={currentLang === "ar" ? "الشهر التالي" : "Next month"}
          className="p-1.5 rounded-lg border border-brand-border/80 text-brand-text hover:bg-brand-accent/10 hover:text-brand-accent cursor-pointer transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday Labels Header */}
      <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-0.5 text-center font-mono text-[9px] font-bold text-brand-muted uppercase border-b border-brand-border/30 pb-1.5 sm:gap-1 sm:text-[10px]">
        {weekdays.map((wd, index) => (
          <div key={index} className="min-w-0 truncate">{wd}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-0.5 sm:gap-1">
        {dayCells}
      </div>

      {/* Selected indicator info */}
      <div className={`text-[10px] font-bold text-brand-muted/95 flex items-center gap-1.5 pt-1.5 border-t border-brand-border/20 ${isRtl ? "justify-end text-right" : "text-left"}`}>
        <span className="inline-block w-2 h-2 rounded-full bg-brand-accent" />
        <span>
          {currentLang === "ar" 
            ? `التاريخ المحدد: ${selectedDate || "لم يتم التحديد بعد"}`
            : `Selected Date: ${selectedDate || "None"}`}
        </span>
      </div>
    </div>
  );
}
