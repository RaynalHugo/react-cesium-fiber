import React, { useEffect, useRef } from "react";
import {
  Cartesian3,
  HeadingPitchRoll,
  IonResource,
  Ion,
  createWorldTerrain,
} from "cesium";
import { Viewer, useViewer } from "../viewer";

require("cesium/Widgets/widgets.css");

export default {
  title: "Data Source",
  component: Viewer,
};

const UsaGeojson = () => {
  const geojsonRef = useRef();

  useEffect(() => {
    geojsonRef.current.load(process.env.PUBLIC_URL + "./us-states.topojson");
  }, [geojsonRef.current]);

  return <geoJsonDataSource ref={geojsonRef} />;
};

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkODhiMzU5YS0wYzI3LTRlNDItOTlkMC1jZmM1NGMyOThiZjkiLCJpZCI6MjU5LCJzY29wZXMiOlsiYXNyIiwiZ2MiXSwiaWF0IjoxNTkxMDQ3MTIzfQ.tdCE-sqNw6_6LY-j2jk035vpzEmVuAY3ajtBBpLDxuM";

export const GeoJson = () => {
  return (
    <Viewer args={[]}>
      <UsaGeojson />
    </Viewer>
  );
};
