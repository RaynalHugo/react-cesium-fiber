import ReactReconciler from "react-reconciler";
import { upperFirst } from "lodash/fp";
import Cesium from "cesium";

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
  createInstance(...props) {
    console.log(props);
    const propName = upperFirst(props[0]);
    console.log(propName);
    console.log(Cesium);
    // console.log(Cesium[propName]);
    // return new Cesium[propName]();
    // new Cesium.Viewer(container, options)
  },
  appendChild() {},
  appendInitialChild() {},
  // @ts-ignore
  finalizeInitialChildren() {},
  appendChildToContainer() {}
});

export function render(what: string, where: string) {
  console.log(what, where);
  const container = reconciler.createContainer(where, false, false);
  reconciler.updateContainer(what, container, null, () =>
    console.log("first update")
  );
}
