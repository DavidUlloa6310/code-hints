import React from "react";
import { useState } from "react";
import Image from "next/image";
import { HiOutlineArrowSmRight } from "react-icons/hi";

export function NavBar({
  className,
  setChatVisible,
}: {
  className?: string;
  setChatVisible: (state: boolean) => void;
}) {
  const [problemsMenuActive, setProblemsMenu] = useState(false);
  const [isChatActive, toggleChatActive] = useState(false);
  const [isActive, setActive] = useState(false);

  const handleMenu = () => {
    setProblemsMenu(!problemsMenuActive);
  };

  const handleChatToggle = () => {
    toggleChatActive(!isChatActive);
    setChatVisible(!isChatActive);
  };

  return (
    <div
      className={`flex h-11 w-4/5 items-center ${
        isActive ? "fixed" : "hidden"
      } shadow-md" rounded-full bg-darkBlue`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="justify-right flex items-center">
        <div className="flex items-center">
          <button
            className="pl-4 pr-2 font-titan text-sm text-darkGrayText"
            onClick={handleMenu}
          >
            Problems Set
          </button>
          <HiOutlineArrowSmRight />
        </div>
        <div className="justify-right flex items-center">
          <button className="delay-80 px-4 py-2 font-titan text-sm text-darkGrayText transition ease-in-out hover:-translate-y-1">
            Visualize
          </button>
          <div
            className={`bg-${
              isChatActive ? "yellowAlert" : "lightGreen"
            } delay-80 mr-2 rounded-lg px-4 py-1 font-titan text-sm transition ease-in-out hover:-translate-y-1 `}
          >
            <button
              className="text-white drop-shadow-md"
              onClick={handleChatToggle}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
