import React from "react";
import { Viewer } from "../viewer";

require("cesium/Widgets/widgets.css");

export default {
  title: "Viewer",
  component: Viewer,
};

export const Basic = () => {
  return <Viewer />;
};

export const LowResolution = () => {
  return <Viewer resolutionScale={0.2} />;
};
