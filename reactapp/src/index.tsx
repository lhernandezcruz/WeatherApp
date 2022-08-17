import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ChakraProvider } from "@chakra-ui/react";
import AppProvider from "./AppProvider";

ReactDOM.render(
  <ChakraProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </ChakraProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
