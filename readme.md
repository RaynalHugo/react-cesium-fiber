# react-cesium-fiber

[![npm version](https://badge.fury.io/js/react-cesium-fiber.svg)](https://badge.fury.io/js/react-cesium-fiber)

`react-cesium-fiber` is a React <a href="https://reactjs.org/docs/codebase-overview.html#renderers">renderer</a> for <a href="https://cesium.com/cesiumjs/">CesiumJs</a> on the web.

## 👨🏻‍💻**Work in Progress**🛠

## A few notes

- Greatly inspired by the amazing <a href="https://github.com/react-spring/react-three-fiber">react-three-fiber</a> package and <a href="https://www.youtube.com/watch?v=CGpMlWVcHok">this mind-blowing video</a> of <a href="https://twitter.com/sophiebits">Sophie Alpert</a>.
- Based on the work of the Cesium team and the <a href="https://cesium.com/cesiumjs/">CesiumJS</a> library.
- `react-cesium-fiber` is a very young project. If you are looking for something more production-ready, you can have a look at <a href="https://github.com/darwin-education/resium">resium</a> (even if I think that `react-cesium-fiber` conception is way easier to maintain.)

## Get started

### 1. Create your react app and add basic cesium configuration.

You can follow <a href="https://github.com/darwin-education/craco-cesium">craco-cesium</a> really nice tutorial. But note that you don't need to add `resium`.

### 2. Add `react-cesium-fiber` with your favorite provider.

```shell
npm install react-cesium-fiber
```

or

```shell
yarn add react-cesium-fiber
```

### 3. Add a Viewer in your app

```jsx
import React from "react";
import { Viewer } from "react-cesium-fiber";

const App = () => <Viewer />;
```

### 4. Add more components in your Viewer

```jsx
import React from "react";
import { Color } from "cesium";
import { Viewer } from "react-cesium-fiber";

const App = () => (
  <Viewer>
    <entity>
      <cartesian3
        attach="position"
        constructFrom="fromDegrees"
        args={[-114.0, 30.0, 300000.0]}
      />
      <boxGraphics attach="box" material={Color.RED}>
        <cartesian3 attach="dimensions" args={[400000.0, 300000.0, 500000.0]} />
      </boxGraphics>
    </entity>
  </Viewer>
);
```

Note that you don't need to import `entity`, `cartesian3` or `boxGraphics`. That's the magic of the react-reconciler.
