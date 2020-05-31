import * as React from "react";
import { render } from "./reconciler";

import App from "./App";

const rootElement = document.getElementById("root");
// @ts-ignore
render(<App />, rootElement);
