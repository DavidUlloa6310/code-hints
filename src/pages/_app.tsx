import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useEffect } from "react";
// import mermaid from "mermaid";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // useEffect(() => {
  //   mermaid.initialize({ startOnLoad: true });

  //   mermaid.setParseErrorHandler((err, hash) => {
  //     console.log(err);
  //     console.log(hash);
  //   });
  // }, []);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
