import ReactReconciler from "react-reconciler";

import { commitUpdate } from "./commit-update";
import { createInstance } from "./create-instance";
import { appendChild } from "./append-child";
import { removeChild } from "./remove-child";
import { prepareUpdate } from "./prepare-update";
import { getPublicInstance } from "./get-public-instance";
import { shouldSetTextContent } from "./should-set-text-content";
import { finalizeInitialChildren } from "./finalize-initial-children";

const instances = new Map();

const reconciler = ReactReconciler({
  appendChild,
  appendInitialChild: appendChild,
  commitUpdate,
  createInstance,
  finalizeInitialChildren,
  getPublicInstance,
  prepareUpdate,
  removeChild,
  shouldSetTextContent,
  supportsMutation: true,

  appendChildToContainer() {},
  createTextInstance() {},
  getChildHostContext() {},
  getRootHostContext() {},
  prepareForCommit() {},
  removeChildFromContainer() {},
  replaceContainerChildren() {},
  resetAfterCommit() {},
  // @ts-ignore
  switchInstance() {},
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
