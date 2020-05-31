import ReactReconciler from "react-reconciler";
import { upperFirst } from "lodash/fp";
import * as Cesium from "cesium";

const reconciler = ReactReconciler({
  supportsMutation: true,
  getRootHostContext() {},
  getChildHostContext() {},
  shouldSetTextContent() {
    return false;
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
    const propName = upperFirst(type);
    // console.log(propName);
    // console.log(props);

    if (propName === "Viewer") {
      // @ts-ignore
      return new Cesium[propName](rootContainerInstance, props);
    } else {
      // @ts-ignore
      const returned = new Cesium[propName](props);
      // console.log(returned);
      return returned;
    }
  },
  appendChild(...args) {
    // console.log("appendChild");
    // console.log(args);
  },
  appendInitialChild(container, child) {
    console.log("appendInitialChild");

    // @ts-ignore
    const containerType = container.constructor.name;

    if (containerType === "Entity") {
      console.log(containerType);
      // @ts-ignore
      container["box"] = child;
    } else {
      console.log(containerType);
      console.log(child);
      // @ts-ignore
      container.entities.add(child);
    }

    //

    //@ts-ignore

    // console.log(args);
  },
  appendChildToContainer(...args) {
    // console.log("appendChildToContainer");
    // console.log(args);
  },
  // @ts-ignore
  finalizeInitialChildren() {},
});

export function render(what: string, where: string) {
  console.log(what, where);
  const container = reconciler.createContainer(where, false, false);
  reconciler.updateContainer(what, container, null, () =>
    console.log("first update")
  );
}
