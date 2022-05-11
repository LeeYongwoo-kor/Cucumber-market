import CustomUser from "@components/customUser";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <div className="mx-auto w-full max-w-xl">
        <CustomUser />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
