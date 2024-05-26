import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store";
import "../app/globals.css";
import MainHeader from "../components/MainHeader";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
