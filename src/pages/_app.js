import { useEffect } from "react";
import "@/styles/globals.css";
import Chatbot from "../components/Chatbot"; // சாட் பாட்டை இணைக்கிறோம்

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Namma Bhoomi 360 PWA Service Worker Registered"))
        .catch((err) => console.error("PWA SW Registration failed:", err));
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Chatbot />
    </>
  );
}