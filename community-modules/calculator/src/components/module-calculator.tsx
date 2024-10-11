"use client";

import { cn } from "@repo/ui/utils";
import type { ButtonHTMLAttributes } from "react";
import { create } from "zustand";

export function ModuleCalculator() {
  const { result } = useCalculatorModuleStore();

  return (
    <div className="grid grid-cols-[1fr] h-full gap-2 p-4 w-full">
      <div className="border-2 pr-2 flex justify-end items-center border-blue-500 rounded-2xl">
        <p className="text-3xl font-semibold">{result || "0"}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton color="orange">{"("}</CalculatorButton>
        <CalculatorButton color="orange">{"CE"}</CalculatorButton>
        <CalculatorButton color="orange">{")"}</CalculatorButton>
        <CalculatorButton color="orange">{"C"}</CalculatorButton>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton>{"1"}</CalculatorButton>
        <CalculatorButton>{"2"}</CalculatorButton>
        <CalculatorButton>{"3"}</CalculatorButton>
        <CalculatorButton color="orange">{"+"}</CalculatorButton>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton>{"4"}</CalculatorButton>
        <CalculatorButton>{"5"}</CalculatorButton>
        <CalculatorButton>{"6"}</CalculatorButton>
        <CalculatorButton color="orange">{"-"}</CalculatorButton>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton>{"7"}</CalculatorButton>
        <CalculatorButton>{"8"}</CalculatorButton>
        <CalculatorButton>{"9"}</CalculatorButton>
        <CalculatorButton color="orange">{"*"}</CalculatorButton>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CalculatorButton>{"."}</CalculatorButton>
        <CalculatorButton>{"0"}</CalculatorButton>
        <CalculatorButton color="orange">{"="}</CalculatorButton>
        <CalculatorButton color="orange">{"/"}</CalculatorButton>
      </div>
    </div>
  );
}

function CalculatorButton({
  children,
  className,
  color = "default",
  ...props
}: Readonly<{
  children: string;
  className?: string;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  color?: "default" | "orange";
}>) {
  const { result, setResult } = useCalculatorModuleStore();

  const calculate = () => {
    const checkResult = result.includes("--") ? result.replace("--", "+") : result;

    try {
      // biome-ignore lint/security/noGlobalEval: <probably need to be replaced in the futur>
      setResult(`${eval(checkResult) || ""}`);
    } catch (error) {
      setResult("error");
      console.error(error);
    }
  };

  const reset = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  function handleClick(button: string) {
    if (button === "=") {
      calculate();
    } else if (button === "C") {
      reset();
    } else if (button === "CE") {
      backspace();
    } else {
      setResult(result + button);
    }
  }

  function getButtonLabel(button: string) {
    switch (button) {
      case "*":
        return "×";
      case "/":
        return "÷";
      case "CE":
        return "⌫";
      default:
        return button;
    }
  }

  return (
    <button
      // disabled={isStatic}
      type="button"
      name={children}
      onClick={() => handleClick(children)}
      className={cn(
        "rounded-2xl font-medium text-xl hover:bg-opacity-80 transition-colors duration-200 disabled:cursor-not-allowed",
        className,
        color === "default"
          ? "bg-gray-100 dark:bg-neutral-700"
          : "bg-orange-500 text-white ",
      )}
      {...props}
    >
      {getButtonLabel(children)}
    </button>
  );
}

type CalculatorModuleStoreType = {
  result: string;
  setResult: (result: string) => void;
};

export const useCalculatorModuleStore = create<CalculatorModuleStoreType>((set) => ({
  result: "",
  setResult: (result: string) => set({ result }),
}));
