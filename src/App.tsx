// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { Cartesian3, Color, GeoJsonDataSource } from "cesium";

import { Viewer } from "./viewer";

const pos1 = Cartesian3.fromDegrees(-114.0, 40.0, 300000.0);
const pos2 = Cartesian3.fromDegrees(-114.0, 30.0, 300000.0);
const pos3 = Cartesian3.fromDegrees(-114.0, 20.0, 300000.0);

const dimensions = new Cartesian3(400000.0, 300000.0, 500000.0);

const greenWithOpacity = Color.GREEN.withAlpha(0.5);

export default function App() {
  // @ts-ignore
  const geojsonRef = useRef();
  const modelRef = useRef();

  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow((current) => !current);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    geojsonRef.current.load(process.env.PUBLIC_URL + "./us-states.topojson");
  }, [geojsonRef.current]);

  return (
    <>
      <Viewer
        style={{ width: "100vw", height: "100vh", boxSizing: "border-box" }}
        args={[{ homeButton: true, resolutionScale: 2 }]}
        homeButton={false}
        // resolutionScale={1}
      >
        <customDataSource show={show}>
          <entity>
            <cartesian3
              attach="position"
              args={[
                -2083516.9683773473,
                -4679655.730028949,
                4270821.855106338,
              ]}></cartesian3>
            <boxGraphics
              attach="box"
              dimensions={dimensions}
              material={Color.BLUE}
            />
          </entity>
          {/* <entity position={pos2}>
            <boxGraphics
              attach="box"
              dimensions={dimensions}
              material={Color.RED}
            />
          </entity> */}
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
          <entity position={pos2}>
            <modelGraphics
              attach="model"
              scale={5000}
              material={Color.RED}
              uri={process.env.PUBLIC_URL + "./plane.glb"}
            />
          </entity>
        </customDataSource>
        <geoJsonDataSource ref={geojsonRef} />
      </Viewer>
    </>
  );
}
