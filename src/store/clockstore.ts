// store.ts

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define the types for the store
interface TimezoneStore {
  timezones: string[];
  selectedTimezones: string[];
  addTimezone: (timezone: string) => void;
  removeTimezone: (timezone: string) => void;
  setSelectedTimezones: (timezones: string[]) => void;
}

// Initialize the store
export const useClockStore = create<TimezoneStore>()(
  persist(
    (set) => ({
      timezones: [
        "America/Toronto",
        "America/Vancouver",
        "America/New_York",
        "Europe/London",
        "Asia/Tokyo",
        "America/Chicago", // Houston
        "Asia/Kolkata", // India
        "Asia/Singapore", // Singapore
      ],
      selectedTimezones: ["America/Toronto"], // Default timezone (Houston)
      addTimezone: (timezone) =>
        set((state) => {
          const newTimezones = [...state.selectedTimezones, timezone];
          return { selectedTimezones: newTimezones };
        }),
      removeTimezone: (timezone) =>
        set((state) => {
          const newTimezones = state.selectedTimezones.filter(
            (tz) => tz !== timezone
          );
          return { selectedTimezones: newTimezones };
        }),
      setSelectedTimezones: (timezones) =>
        set({ selectedTimezones: timezones }),
    }),
    {
      name: "timezone-store", // Key for local storage
    }
  )
);
