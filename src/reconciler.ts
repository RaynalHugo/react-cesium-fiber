// @ts-nocheck
import ReactReconciler from "react-reconciler";
import { upperFirst, isString } from "lodash/fp";
import * as Cesium from "cesium";
import { error001, error002, error003, error004, error005 } from "./errors";
import { isFunction, isNil } from "lodash/fp";

import { updateCesiumObject } from "./utils/update-cesium-object";

const instances = new Map();

const defaultAttach = (container, child) => {
  const containerType = container.constructor.name;
  const childType = child.constructor.name;

  // console.log("\nappendInitialChild:" + childType + " into " + containerType);
  switch (containerType) {
    case "CustomDataSource":
    case "GeoJsonDataSource": {
      switch (childType) {
        case "Entity":
          container.entities.add(child);
          return (container, child) => container.entities.remove(child);
        default:
          throw error002;
      }
    }
    case "Viewer": {
      switch (childType) {
        case "Entity":
          container.entities.add(child);
          return (container, child) => container.entities.remove(child);
        case "GeoJsonDataSource":
        case "CustomDataSource":
          container.dataSources.add(child);
          return (container, child) =>
            container.dataSources.remove(child, true);

        case "Cesium3DTileset":
          container.scene.primitives.add(child);
          return (container, child) => container.scene.primitives.remove(child);

        default:
          throw error002(containerType, childType);
      }
    }

    default:
      throw error002(containerType, childType);
  }
};

const appendInitialChild = (containerNode, childNode) => {
  const { cesiumObject: container } = containerNode;
  const { cesiumObject: child, attach = defaultAttach } = childNode;
  switch (typeof attach) {
    case "string":
      container[attach] = child;
      break;

    case "function":
      childNode.detach = attach(container, child);
      break;
    default:
      throw error001;
  }
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

  removeChild(
    { cesiumObject: container },
    { cesiumObject: child, attach, detach }
  ) {
    if (isFunction(detach)) {
      detach(container, child);
    } else if (isString(attach)) {
      container[attach] = null;
    } else {
      throw error003(container.constructor.name, child.constructor.name);
    }

    Cesium.destroyObject(child);
    console.log("removeChild");
  },
  replaceContainerChildren(...args) {
    console.log("replaceContainerChildren", ...args);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    const { cesiumObject } = instance;
    const { children, args, onUpdate, ...props } = newProps;

    //TODO: Check if prop has changed before setting it
    updateCesiumObject(cesiumObject, props);

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
    const {
      args = [],
      constructFrom,
      attach,
      children,
      ...remainingProps
    } = props;

    const name = upperFirst(type);
    const target = Cesium[name];

    let cesiumObject;

    if (isNil(target)) {
      throw error004(name);
    } else if (isNil(constructFrom)) {
      cesiumObject = new target(...args);
    } else if (isFunction(target[constructFrom])) {
      cesiumObject = target[constructFrom](...args);
    } else {
      throw error005(constructFrom, target);
    }

    updateCesiumObject(cesiumObject, props);
    return { cesiumObject, attach: attach };
  },
  appendChild(...args) {
    console.log("appendChild", args);
    appendInitialChild(...args);
  },
  appendInitialChild: appendInitialChild,
  appendChildToContainer(...args) {
    console.log("appendChildToContainer", args);
  },
  finalizeInitialChildren(...args) {
    // console.log("finalizeInitialChildren", args);
  },
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
