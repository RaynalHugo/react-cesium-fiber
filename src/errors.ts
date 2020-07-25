const header = (number) => `[react-cesium-fiber] Error${number} - `;

export const error001 = new Error(header("001") + 'Unsupported "attach" type.');
export const error002 = (containerType, childType) =>
  new Error(
    header("002") +
      `Unknown container/child combination. You can specify how to attach this child ("${childType}") to this container ("${containerType}") using the "attach" props.`
  );
