import { error001, error002 } from "../errors";

const defaultAttach = (container, child) => {
  const containerType = container.constructor.name;
  const childType = child.constructor.name;

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

export const appendChild = (containerNode, childNode) => {
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
