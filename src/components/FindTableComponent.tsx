"use client";

import { useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateDates, generateTimeSlots } from "@/lib/utils";

interface FindTableProps {
  onSubmit?: (data: ReservationData) => void;
}

interface ReservationData {
  date: string;
  time: string;
  guests: string;
}

export function FindTableComponent({ onSubmit }: FindTableProps) {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("");

  const guestOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1} ${i === 0 ? "Guest" : "Guests"}`,
    value: String(i + 1),
  }));

  const handleSubmit = () => {
    if (date && time && guests) {
      onSubmit?.({ date, time, guests });
    }
  };

  return (
    <div className="w-full lg:max-w-5xl max-w-full mx-auto lg:px-4 px-6">
      <div className="bg-burgundy-900/95 backdrop-blur-sm border border-white/10 rounded-2xl lg:p-6 p-4 shadow-2xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-xs uppercase tracking-wide flex items-center gap-2">
              <Calendar size={14} />
              Date
            </label>
            <Select value={date} onValueChange={setDate}>
              <SelectTrigger className="bg-burgundy-800 border-white/20 text-white hover:bg-burgundy-700 focus:ring-crimson-500 h-11">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent className="bg-burgundy-800 border-white/20 max-h-[300px] z-[100]">
                {generateDates().map((d) => (
                  <SelectItem
                    key={d.value}
                    value={d.value}
                    className="text-white hover:bg-burgundy-700 focus:bg-burgundy-700 cursor-pointer"
                  >
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-xs uppercase tracking-wide flex items-center gap-2">
              <Clock size={14} />
              Time
            </label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="bg-burgundy-800 border-white/20 text-white hover:bg-burgundy-700 focus:ring-crimson-500 h-11">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-burgundy-800 border-white/20 max-h-[300px] z-[100]">
                {generateTimeSlots().map((t) => (
                  <SelectItem
                    key={t.value}
                    value={t.value}
                    className="text-white hover:bg-burgundy-700 focus:bg-burgundy-700 cursor-pointer"
                  >
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-xs uppercase tracking-wide flex items-center gap-2">
              <Users size={14} />
              Guests
            </label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="bg-burgundy-800 border-white/20 text-white hover:bg-burgundy-700 focus:ring-crimson-500 h-11">
                <SelectValue placeholder="Number of people" />
              </SelectTrigger>
              <SelectContent className="bg-burgundy-800 border-white/20 max-h-[300px] z-[100]">
                {guestOptions.map((g) => (
                  <SelectItem
                    key={g.value}
                    value={g.value}
                    className="text-white hover:bg-burgundy-700 focus:bg-burgundy-700 cursor-pointer"
                  >
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col lg:gap-2 gap-0 lg:justify-end justify-start lg:mt-0 mt-2">
            <Button
              onClick={handleSubmit}
              disabled={!date || !time || !guests}
              className="w-full bg-crimson-500 hover:bg-crimson-600 text-white font-medium h-11 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
