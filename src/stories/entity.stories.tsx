import React from "react";
import { Cartesian3, Color } from "cesium";
import { Viewer } from "../viewer";

import "../types";

require("cesium/Widgets/widgets.css");

export default {
  title: "Entity",
  component: Viewer,
};

const pos2 = Cartesian3.fromDegrees(-114.0, 30.0, 300000.0);
const pos3 = Cartesian3.fromDegrees(-114.0, 20.0, 300000.0);
const greenWithOpacity = Color.GREEN.withAlpha(0.5);

export const Various = () => {
  return (
    <Viewer>
      <entity>
        <cartesian3
          attach="position"
          args={[-2083516.9683773473, -4679655.730028949, 4270821.855106338]}
        />
        <boxGraphics attach="box" material={Color.BLUE} args={[{}]}>
          <cartesian3
            attach="dimensions"
            args={[400000.0, 300000.0, 500000.0]}
          />
        </boxGraphics>
      </entity>
      <entity position={pos2}>
        <boxGraphics attach="box" material={Color.RED}>
          <cartesian3
            attach="dimensions"
            args={[400000.0, 300000.0, 500000.0]}
          />
        </boxGraphics>
      </entity>
      <entity position={pos3}>
        <cylinderGraphics
          attach="cylinder"
          length={400000.0}
          topRadius={200000.0}
          bottomRadius={200000.0}
          material={greenWithOpacity}
          outline={true}
          outlineColor={Color.DARKGREEN}
        />
      </entity>
    </Viewer>
  );
};
