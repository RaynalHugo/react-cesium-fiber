import React, { useEffect } from "react";
import {
  Cartesian3,
  HeadingPitchRoll,
  IonResource,
  Ion,
  createWorldTerrain,
} from "cesium";
import { Viewer, useViewer } from "../viewer";

import "../types";

require("cesium/Widgets/widgets.css");

export default {
  title: "3D Tiles",
  component: Viewer,
};

const ZoomTo = () => {
  const viewer = useViewer();

  useEffect(() => {
    viewer &&
      viewer.scene.camera.setView({
        destination: new Cartesian3(
          4401744.644145314,
          225051.41078911052,
          4595420.374784433
        ),
        orientation: new HeadingPitchRoll(
          5.646733805039757,
          -0.276607153839886,
          6.281110875400085
        ),
      });
  }, [viewer]);
  return null;
};

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkODhiMzU5YS0wYzI3LTRlNDItOTlkMC1jZmM1NGMyOThiZjkiLCJpZCI6MjU5LCJzY29wZXMiOlsiYXNyIiwiZ2MiXSwiaWF0IjoxNTkxMDQ3MTIzfQ.tdCE-sqNw6_6LY-j2jk035vpzEmVuAY3ajtBBpLDxuM";

export const Tileset = () => (
  <Viewer
    args={[{ shouldAnimate: true, terrainProvider: createWorldTerrain() }]}>
    <ZoomTo />
    <cesium3DTileset
      args={[
        {
          url: IonResource.fromAssetId(16421),
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
  </Viewer>
);
