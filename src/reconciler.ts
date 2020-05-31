// @ts-nocheck
import ReactReconciler from "react-reconciler";
import { upperFirst } from "lodash/fp";
import * as Cesium from "cesium";

const hasSetter = (proto, key) =>
  Object.getOwnPropertyDescriptor(proto, key)?.set != null;

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

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    const { cesiumObject } = instance;

    const { children, args, ...props } = newProps;

    const proto = Object.getPrototypeOf(cesiumObject);

    Object.entries(props)
      .filter(([key]) => hasSetter(proto, key))
      .forEach(([key, value]) => {
        cesiumObject[key] = value;
      });
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
    const { args = [], ref, attach, children, ...remainingProps } = props;

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
    // console.log("appendChild");
    // console.log(args);
  },
  appendInitialChild(
    { cesiumObject: container },
    { cesiumObject: child, attach }
  ) {
    console.log("\nappendInitialChild");

    const containerType = container.constructor.name;
    const childType = child.constructor.name;

    switch (containerType) {
      case "Entity":
        container[attach] = child;
        break;

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

          default:
            throw new Error("Unsupported children");
        }

        break;

      default:
        throw new Error("Unsupported container");
    }

    // console.log(args);
  },
  appendChildToContainer(...args) {
    // console.log("appendChildToContainer");
    // console.log(args);
  },
  finalizeInitialChildren() {},
  removeChildFromContainer() {},
  getPublicInstance(instance) {
    return instance.cesiumObject;
  },
});

export function render(what: React.ReactNode, where: HTMLElement) {
  // console.log(what, where);
  const container = reconciler.createContainer(where, false, false);
  reconciler.updateContainer(what, container, null, () =>
    console.log("first update")
  );
}
