import React from "react";
import { Provider } from "react-redux";
import "../app/globals.css";
import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
