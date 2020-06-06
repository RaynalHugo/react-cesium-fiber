// @ts-nocheck
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "./styles.css";
import { Cartesian3, Color } from "cesium";

import { Viewer } from "./viewer";
import { useViewer } from "./context";

import { usePreUpdate } from "./hooks";

const pos1 = Cartesian3.fromDegrees(-114.0, 40.0, 300000.0);
const pos2 = Cartesian3.fromDegrees(-114.0, 30.0, 300000.0);
const pos3 = Cartesian3.fromDegrees(-114.0, 20.0, 300000.0);

const dimensions = new Cartesian3(400000.0, 300000.0, 500000.0);

const greenWithOpacity = Color.GREEN.withAlpha(0.5);

const Plane = () => {
  const previousDate = useRef(Cesium.JulianDate.now());

  const actualPosition = useRef([-114.0, 30.0, 1500000.0]);

  const samples = useMemo(() => new Cesium.SampledPositionProperty(), []);

  samples.backwardExtrapolationType = Cesium.ExtrapolationType.EXTRAPOLATE;
  samples.forwardExtrapolationType = Cesium.ExtrapolationType.EXTRAPOLATE;

  // samples.addSample(
  //   new Cesium.JulianDate.now(),
  //   new Cartesian3.fromDegrees(...actualPosition.current)
  // );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // console.log(new Cesium.JulianDate.now());
  //     samples.addSample(
  //       Cesium.JulianDate.now(),
  //       Cartesian3.fromDegrees(...actualPosition.current)
  //     );

  //     actualPosition.current = [
  //       actualPosition.current[0] + 10,
  //       actualPosition.current[1],
  //       actualPosition.current[2],
  //     ];
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const update = useCallback((scene, time) => {
    const increment = Cesium.JulianDate.secondsDifference(
      time,
      previousDate.current
    );

    // if (increment > 2) {
    samples.addSample(
      time,
      new Cartesian3.fromDegrees(...actualPosition.current)
    );

    actualPosition.current = [
      actualPosition.current[0] + increment * 5,
      actualPosition.current[1],
      actualPosition.current[2],
    ];

    previousDate.current = time.clone();
    // }
  }, []);

  usePreUpdate(update);

  console.log("render");
  // useEffect(() => {
  //   const interval = setInterval(update, 10);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <entity
      position={samples}
      // position={new Cartesian3.fromDegrees(...actualPosition.current)}
      description={"Weeeeee, I am a plane"}
      args={[{ id: "Big jet plane" }]}>
      <modelGraphics
        attach="model"
        scale={50000}
        material={Color.RED}
        uri={process.env.PUBLIC_URL + "./plane.glb"}
      />
    </entity>
  );
};

export default function App() {
  // @ts-ignore
  const geojsonRef = useRef();

  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow((current) => !current);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    geojsonRef.current.load(process.env.PUBLIC_URL + "./us-states.topojson");
  }, [geojsonRef.current]);

  return (
    <Viewer
      style={{ width: "100vw", height: "100vh", boxSizing: "border-box" }}
      args={[
        {
          homeButton: true,
          resolutionScale: 1,
          shouldAnimate: true,
          terrainProvider: Cesium.createWorldTerrain(),
        },
      ]}
      homeButton={false}
      // resolutionScale={1}
    >
      <customDataSource show={show} args={["Custom"]}>
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
      </customDataSource>
      <Plane position={pos2} />
      <geoJsonDataSource ref={geojsonRef} />
      <cesium3DTileset
        args={[
          {
            url: Cesium.IonResource.fromAssetId(16421),
          },
        ]}>
        <cesium3DTileStyle
          attach={"style"}
          args={[
            {
              pointSize: "3",
            },
          ]}
        />
      </cesium3DTileset>
      <ZoomTo />
    </Viewer>
  );
}

const ZoomTo = () => {
  const viewer = useViewer();
  console.log("viewer", viewer);

  useEffect(() => {
    viewer &&
      setTimeout(
        viewer.scene.camera.setView({
          destination: new Cesium.Cartesian3(
            4401744.644145314,
            225051.41078911052,
            4595420.374784433
          ),
          orientation: new Cesium.HeadingPitchRoll(
            5.646733805039757,
            -0.276607153839886,
            6.281110875400085
          ),
        }),
        5000
      );
  }, [viewer]);

  return null;
};
