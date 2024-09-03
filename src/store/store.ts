import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CardType, ColumnType } from "@/types/types";
//
interface CardStore {
  cards: CardType[];
  addCard: (title: string, column: ColumnType) => void;
  setCards: (cards: CardType[]) => void;
  moveCard: (id: string, column: ColumnType) => void;
}

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      cards: [],
      addCard: (title, column) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: Math.random().toString(),
              title,
              column,
            } as CardType, // Create and add the new card
          ],
        })),
      setCards: (cards) =>
        set(() => ({
          cards,
        })),
      moveCard: (id, column) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, column } : card
          ),
        })),
    }),
    {
      name: "card-storage", // name of the local storage key
    }
  )
);
