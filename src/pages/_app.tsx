import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'antd/dist/antd.css';
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
