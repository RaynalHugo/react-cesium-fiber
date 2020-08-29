import { isString } from "lodash/fp";
import { destroyObject } from "cesium";
import { error003 } from "../errors";
import { isFunction } from "lodash/fp";

export const removeChild = (
  { cesiumObject: container },
  { cesiumObject: child, attach, detach }
) => {
  if (isFunction(detach)) {
    detach(container, child);
  } else if (isString(attach)) {
    container[attach] = null;
  } else {
    throw error003(container.constructor.name, child.constructor.name);
  }

  destroyObject(child);
  console.log("removeChild");
};
