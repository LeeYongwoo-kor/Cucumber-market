import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";

const PUBLIC_PAGE = ["/enter"];

function MyApp({ Component, pageProps }: AppProps) {
  useUser(PUBLIC_PAGE);
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
