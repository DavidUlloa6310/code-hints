import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

/*
Welcome message to display only once when the user logs into two sum for the first time to show them how to get around with the app
*/
const Welcome = () => {
  const [showModal, setShowModal] = useState(true);

  const closeModal1 = () => {
    setShowModal((showModal) => !showModal);
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowModal(true);

      localStorage.setItem("hasVisited", "true");
    }

    localStorage.setItem("hasVisited", "true");
  }, []);

  return (
    <div>
      {showModal && (
        <div>
          <div className="fixed z-[40] h-full w-full bg-grayBlue opacity-50 hover:cursor-pointer"></div>
          <div
            className={`fixed z-[41] flex h-full w-full flex-col items-center justify-center w-full${
              showModal
                ? "translate-y-0 scale-100 opacity-100"
                : "scale-80 pointer-events-none opacity-0"
            } transform transition-opacity duration-300 ease-in-out`}
            onClick={closeModal1}
          >
            <Image
              className="drop-shadow-2xl               "
              src="/images/logo.svg"
              alt="CodeHints Logo"
              width={200}
              height={200}
            />
            <h1 className="font-titan text-6xl text-yellowAlert drop-shadow-lg">
              Welcome to CodeHints!
            </h1>
            <h2 className="mt-5 text-center font-roboto text-2xl text-white drop-shadow-md ">
              Practicing Coding Interviews with AI
            </h2>
            <h3 className="text-md mt-3 text-center font-roboto text-lightGreen drop-shadow-md">
              Hover over the top of the editor to see more options!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
