import { PropsWithChildren } from "react";
import { HostConfig } from "react-reconciler";
import * as Cesium from "cesium";

export type CesiumObject = unknown;
export type Detach = (container: CesiumObject, child: CesiumObject) => void;
type Attach =
  | string
  | ((container: CesiumObject, child: CesiumObject) => Detach);

// Types for React-reconciler
type Type = string;

type Props = PropsWithChildren<{
  args?: any;
  onUpdate?: any;
  [key: string]: any;
}>;

//FIXME:
type Container = CesiumObject;

type Instance = {
  cesiumObject: CesiumObject;
  attach?: Attach;
  detach: (container: Container, child: Container) => void;
};

type Text = null;

export type Reconciler = HostConfig<
  Type,
  Props,
  Container,
  Instance,
  Text,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
>;

export type createInstance = Reconciler["createInstance"];
