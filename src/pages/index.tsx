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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          src="/images/circle.svg"
          alt="Background Circle"
        />
        <Image
          height={444}
          width={440}
          className="left-540 top-72"
          src="/images/logo.svg"
          alt="CodeHints Logo"
        />
        <h1 className="font-titan text-8xl">CodeHints</h1>

        <Link href="/solve/">Begin</Link>
      </main>
    </>
  );
}
