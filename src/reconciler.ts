// @ts-nocheck
import ReactReconciler from "react-reconciler";
import { upperFirst } from "lodash/fp";
import * as Cesium from "cesium";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkODhiMzU5YS0wYzI3LTRlNDItOTlkMC1jZmM1NGMyOThiZjkiLCJpZCI6MjU5LCJzY29wZXMiOlsiYXNyIiwiZ2MiXSwiaWF0IjoxNTkxMDQ3MTIzfQ.tdCE-sqNw6_6LY-j2jk035vpzEmVuAY3ajtBBpLDxuM";

const instances = new Map();

const hasSetter = (proto, key) =>
  Object.getOwnPropertyDescriptor(proto, key)?.set != null;

const appendInitialChild = (
  { cesiumObject: container },
  { cesiumObject: child, attach }
) => {
  const containerType = container.constructor.name;
  const childType = child.constructor.name;

  console.log("\nappendInitialChild:" + childType + " into " + containerType);

  switch (containerType) {
    case "CustomDataSource":
    case "GeoJsonDataSource":
    case "Viewer":
      switch (childType) {
        case "Entity":
          container.entities.add(child);
          break;

        case "GeoJsonDataSource":
        case "CustomDataSource":
          container.dataSources.add(child);
          break;

        case "Cesium3DTileset":
          container.scene.primitives.add(child);
          break;

        default:
          throw new Error("Unsupported children");
      }

      break;

    case "Cesium3DTileset":
    case "Entity":
    default:
      container[attach] = child;
      break;
  }

  // console.log(args);
};

const reconciler = ReactReconciler({
  supportsMutation: true,
  getRootHostContext() {},
  getChildHostContext() {},
  shouldSetTextContent() {
    return false;
  },
  prepareUpdate(
    instance,
    type,
    oldProps: object,
    newProps: object,
    rootContainerInstance,
    host
  ) {
    // console.log(oldProps, newProps);
    const oldKeys = Object.keys(oldProps);
    const newKeys = Object.keys(newProps);

    // keys have same length
    if (oldKeys.length !== newKeys.length) {
      return true;
    } // keys are the same
    else if (oldKeys.some((value, index) => newKeys[index] !== value)) {
      return true;
    } else {
      return oldKeys
        .filter((key) => key !== "children")
        .some((key) => oldProps[key] !== newProps[key]);
    }
  },

  removeChild(...args) {
    console.log("removeChild", ...args);
  },
  replaceContainerChildren(...args) {
    console.log("removeChild", ...args);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    const { cesiumObject } = instance;
    const { children, args, onUpdate, ...props } = newProps;

    const proto = Object.getPrototypeOf(cesiumObject);

    Object.entries(props)
      .filter(([key]) => hasSetter(proto, key))
      .forEach(([key, value]) => {
        cesiumObject[key] = value;
      });

    if (typeof onUpdate === "function") {
      onUpdate(cesiumObject);
    }
  },
  prepareForCommit() {},
  resetAfterCommit() {},

  createTextInstance() {},
  createInstance(
    type: string,
    props,
    rootContainerInstance,
    getChildHostContext,
    internalInstanceHandle
  ) {
    console.log("create instance", type);
    const { args = [], attach, children, ...remainingProps } = props;

    const propName = upperFirst(type);

    const cesiumObject = new Cesium[propName](...args);
    const proto = Object.getPrototypeOf(cesiumObject);

    Object.entries(remainingProps)
      .filter(([key]) => hasSetter(proto, key))
      .forEach(([key, value]) => {
        cesiumObject[key] = value;
      });

    return { cesiumObject, attach: attach };
  },
  appendChild(...args) {
    console.log("appendChild", args);
  },
  appendInitialChild: appendInitialChild,
  appendChildToContainer(...args) {
    console.log("appendChildToContainer", args);
  },
  finalizeInitialChildren() {},
  removeChildFromContainer(container, child) {
    console.log("removeChildFromContainer");
  },
  getPublicInstance(instance) {
    return instance.cesiumObject;
  },
  switchInstance(...args) {
    console.log("switchInstance", args);
  },
});

export function render(what: React.ReactNode, where: HTMLElement) {
  let container;
  if (instances.has(where)) {
    container = instances.get(where);
  } else {
    container = reconciler.createContainer(where, false, false);
    instances.set(where, container);
  }

  reconciler.updateContainer(what, container, null, () => null);
  return reconciler.getPublicRootInstance(container);
}
