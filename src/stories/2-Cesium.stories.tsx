import React from "react";

require("cesium/Widgets/widgets.css");

import { Viewer } from "../viewer";

export default {
  title: "Viewer",
  component: Viewer,
};

export const Basic = () => {
  return <Viewer />;
};

export const LowResolution = () => {
  return <Viewer resolutionScale={0.5} />;
};
