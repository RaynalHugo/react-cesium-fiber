import React, { useRef, useMemo } from "react";
import {
  Cartesian3,
  JulianDate,
  SampledPositionProperty,
  ExtrapolationType,
} from "cesium";
import { Viewer } from "../viewer";
import { usePreRender } from "../hooks";

import "../types";

require("cesium/Widgets/widgets.css");

export default {
  title: "Model",
  component: Viewer,
};

const PlaneModel = () => {
  const previousDate = useRef(JulianDate.now());

  const actualPosition = useRef<[number, number, number]>([
    -114.0,
    30.0,
    1500000.0,
  ]);

  const samples = useMemo(() => new SampledPositionProperty(), []);

  usePreRender((scene, time) => {
    const increment = JulianDate.secondsDifference(time, previousDate.current);

    samples.addSample(time, Cartesian3.fromDegrees(...actualPosition.current));

    samples.backwardExtrapolationType = ExtrapolationType.EXTRAPOLATE;
    samples.forwardExtrapolationType = ExtrapolationType.EXTRAPOLATE;

    actualPosition.current = [
      actualPosition.current[0] + increment * 5,
      actualPosition.current[1],
      actualPosition.current[2],
    ];

    previousDate.current = time.clone();
  }, []);

  return (
    <entity
      // position={new Cartesian3.fromDegrees(...actualPosition.current)}
      position={samples}
      description={"Weeeeee, I am a plane"}
      args={[{ id: "Big jet plane" }]}>
      <modelGraphics
        attach="model"
        scale={50000}
        // material={Color.RED}
        uri={"./plane.glb"}
      />
    </entity>
  );
};

export const Plane = () => (
  <Viewer args={[{ shouldAnimate: true }]}>
    <PlaneModel />
  </Viewer>
);
