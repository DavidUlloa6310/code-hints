import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { HiOutlineArrowSmRight } from "react-icons/hi";

export function NavBar({
  className,
  setChatVisible,
  isChatVisible,
}: {
  className?: string;
  setChatVisible: (state: boolean) => void;
  isChatVisible: boolean;
}) {
  const [problemsMenuActive, setProblemsMenu] = useState(false);
  // const [isChatActive, toggleChatActive] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isVisualizationActive, setVisualization] = useState(false);

  const handleMenu = () => {
    setProblemsMenu(!problemsMenuActive);
  };

  const handleChatToggle = () => {
    // toggleChatActive(!isChatActive);
    setChatVisible(!isChatVisible);
  };

  const handleVisualization = () => {
    setVisualization(!isVisualizationActive);
  };

  const content = (
    <div
      className={`absolute right-[12.25%] top-3 z-[20] flex w-[75%] flex-col justify-center rounded-full bg-darkBlue px-4 ${
        isActive ? "fixed" : "fixed opacity-0"
      }`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{
        transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      <div className="flex justify-between">
        <div className="justify-left flex items-center">
          <button
            className="pl-4 pr-2 font-titan text-sm text-darkGrayText hover:scale-105"
            onClick={handleMenu}
          >
            Problems Set
          </button>
        </div>
        <div className="flex justify-between">
          <button className="delay-80 px-4 py-2 font-titan text-sm text-darkGrayText transition ease-in-out hover:-translate-y-1">
            Visualize
          </button>
          <button
            className={`my-2 rounded-full py-1 text-white drop-shadow-sm ${
              isChatVisible ? "bg-yellowAlert" : "bg-lightGreen"
            } delay-80 mr-2 rounded-lg px-2 font-titan text-sm transition ease-in-out hover:-translate-y-1`}
            onClick={handleChatToggle}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );

  return content;
}
