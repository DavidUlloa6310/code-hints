import React from "react";
import Link from "next/link";
import Image from "next/image";

function LogoHeader() {
  return (
    <div className="justify-left my-3 flex w-full flex-row items-center gap-2 pl-8">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          height={100}
          width={100}
          alt="CodeHints Logo"
        />
      </Link>
      <div>
        <h1 className=" font-titan text-4xl">CodeHints</h1>
        <p className=" font-roboto text-gray-500">Your A.I. Interview Buddy</p>
      </div>
    </div>
  );
}

export default LogoHeader;
