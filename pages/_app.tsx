import CustomUser from "@components/customUser";
import type { AppProps } from "next/app";
import Script from "next/script";
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
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </SWRConfig>
  );
}

export default MyApp;
