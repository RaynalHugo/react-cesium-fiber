const header = (number) => `[react-cesium-fiber] Error${number} - `;

export const error001 = new Error(header("001") + 'Unsupported "attach" type.');
export const error002 = (containerType, childType) =>
  new Error(
    header("002") +
      `Couldn't add this child to this container. You can specify how to attach this type of child ("${childType}") to this type of container ("${containerType}") using the "attach" props.`
  );
export const error003 = (containerType, childType) =>
  new Error(
    header("003") +
      `Couldn't remove this child from this container. You can specify how to detach this type of child ("${childType}") from this type of container ("${containerType}") using the "attach" props.`
  );
