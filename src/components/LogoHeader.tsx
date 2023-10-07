import React from "react";

import Image from "next/image";

function LogoHeader() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Image
        src="/images/logo.svg"
        height={100}
        width={100}
        alt="CodeHints Logo"
      />
      <div>
        <h1 className=" font-titan text-4xl">CodeHints</h1>
        <p className=" font-roboto text-gray-500">Your A.I. Interview Buddy</p>
      </div>
    </div>
  );
}

export default LogoHeader;
