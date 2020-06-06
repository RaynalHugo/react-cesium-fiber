import React from "react";
import { Cartesian3, Color } from "cesium";
import { Viewer } from "../viewer";

require("cesium/Widgets/widgets.css");

export default {
  title: "Entity",
  component: Viewer,
};

const pos3 = Cartesian3.fromDegrees(-114.0, 20.0, 300000.0);
const greenWithOpacity = Color.GREEN.withAlpha(0.5);

export const Cylinder = () => {
  return (
    <Viewer>
      <entity position={pos3}>
        <cylinderGraphics
          attach="cylinder"
          length={400000.0}
          topRadius={200000.0}
          bottomRadius={200000.0}
          material={greenWithOpacity}
          outline={true}
          outlineColor={Color.DARK_GREEN}
        />
      </entity>
    </Viewer>
  );
};
