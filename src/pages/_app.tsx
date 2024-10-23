import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { Provider } from "react-redux";
// import store from "@/store";
import { persistor, store } from "@/store"; // Adjust the import path
import MainLayout from "@/componants/MainLayout";
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // List of routes where MainLayout should not be applied
  const noLayoutPages = ['/login'];

  // Check if the current route is in the noLayoutPages array
  const isLayoutRequired = !noLayoutPages.includes(router.pathname);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isLayoutRequired ? (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        ) : (
          <Component {...pageProps} />
        )}
        </PersistGate>
      </Provider>
  );
}
