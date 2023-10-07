import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeHints</title>
        <meta
          name="description"
          content="CodeHints is a web application that allows users to study for technical interviews, without the painful struggle of clicking the run button over and over again, not knowing what to do!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-vw-screen h-vh-screen absolute inset-0 flex flex-col items-center justify-center bg-babyBlue">
        <Image
          className="-z-7 animate-once animation-wiggle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          src="/images/circle.svg"
          width={800}
          height={800}
          alt="Background Circle"
        />
        <Image
          height={330}
          width={330}
          className="left-540 animate-wiggle top-72 z-10"
          src="/images/logo.svg"
          alt="CodeHints Logo"
        />
        <h1 className="z-10 font-titan text-8xl">CodeHints</h1>
        <h1 className="z-10 mt-5 text-center font-roboto text-3xl text-darkGray  ">
          Your A.I. Interview Buddy
        </h1>

        <div className="delay-80  z-10 mt-10 rounded-full bg-lightGreen py-3 pl-20 pr-20 font-titan text-4xl text-white drop-shadow-lg transition ease-in-out hover:-translate-y-2">
          <Link href="/solve/0">Begin</Link>
        </div>
      </main>
    </>
  );
}
