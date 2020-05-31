// @ts-nocheck
import * as React from "react";
import "./styles.css";
import { Cartesian3, Color } from "cesium";

export default function App() {
  // @ts-ignore
  return (
    <viewer>
      <entity position={Cartesian3.fromDegrees(-114.0, 40.0, 300000.0)}>
        <boxGraphics
          attach="box"
          dimensions={new Cartesian3(400000.0, 300000.0, 500000.0)}
          material={Color.BLUE}
        />
      </entity>
    </viewer>
  );
}
