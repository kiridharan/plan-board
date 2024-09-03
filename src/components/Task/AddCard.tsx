"use client";

import { useCardStore } from "@/store/store";
import { AddCardProps,  ColumnType } from "@/types/types";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

export const AddCard = ({ column }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const { addCard } = useCardStore();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // click enter to add card

    const trimmedText = text.trim();
    if (!trimmedText) return;

    addCard(trimmedText, column as ColumnType);

    setAdding(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && adding) {
        e.preventDefault();
        handleSubmit({
          preventDefault: () => {},
        } as FormEvent<HTMLFormElement>); // Create a dummy event for handleSubmit
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [adding, text]);

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          // press enter to add card

          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
