import { CardType } from "@/types/types";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { useCardStore } from "@/store/store";
export const BurnBarrel = () => {
  const [active, setActive] = useState(false);
  const [cards, setCards] = useCardStore((state) => [
    state.cards,
    state.setCards,
  ]);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer?.getData("cardId");

    if (cardId) {
      setCards(cards.filter((card: CardType) => card.id !== cardId));
    }

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <AiFillDelete className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};
