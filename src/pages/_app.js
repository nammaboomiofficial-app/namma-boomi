import "@/styles/globals.css";
import Chatbot from "../components/Chatbot"; // சாட் பாட்டை இணைக்கிறோம்

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Chatbot />
    </>
  );
}