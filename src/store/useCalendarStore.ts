import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your event type
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  priority: 1 | 2 | 3 | 4;
}

// Define your store interface
interface CalendarStore {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (updatedEvent: CalendarEvent) => void;
  removeEvent: (id: number) => void;
}

// Explicitly typing the persist middleware
const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      updateEvent: (updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          ),
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
    }),
    {
      name: "calendar-events-storage", // The name of the local storage key
    }
  )
);

export default useCalendarStore;
