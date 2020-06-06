import * as React from "react";
import { render } from "react-dom";

import App from "./App";

import { hot } from "react-hot-loader/root";

const HotApp = hot(App);

const rootElement = document.getElementById("root");
// @ts-ignore
render(<HotApp />, rootElement);
