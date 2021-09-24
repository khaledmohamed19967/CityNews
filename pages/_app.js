import {Provider} from "react-redux";
import React from "react";
import {createStore} from "redux";
import reducer from "../store"

const store = createStore(reducer);

import '../styles/globals.css'
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "../assets/style/index.css"


function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

  )
}
export default MyApp