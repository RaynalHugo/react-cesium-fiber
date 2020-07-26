import React from "react";
import {
  Cartesian3,
  Entity,
  ModelGraphics,
  BoxGraphics,
  CylinderGraphics,
  GeoJsonDataSource,
  Property,
  CustomDataSource,
  Cesium3DTileset,
  Cesium3DTileStyle,
} from "cesium";

export declare namespace ReactCesiumFiber {
  type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B;

  type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<
      { [Q in P]: T[P] },
      { -readonly [Q in P]: T[P] },
      P
    >;
  }[keyof T];

  type Writable<Type> = Pick<Type, WritableKeys<Type>>;

  type NonFunctionKeys<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T];

  type WithoutFunctionKeys<T> = Pick<T, NonFunctionKeys<T>>;

  // set the values of type `property` to type any
  type TransformProperty<Object, Replacement = any> = {
    [P in keyof Object]: Object[P] extends Property ? Replacement : Object[P];
  };

  type Overwrite<T, O> = Omit<T, NonFunctionKeys<O>> & O;

  type NodeProps<ConstructorOptions = any> = {
    args?: ConstructorOptions;
    constructFrom?: string;
    attach?:
      | string
      | (<Container = any, Child = any>(
          container: Container,
          child: Child
        ) => (container: Container, child: Child) => void);
    children?: React.ReactNode;
    ref?: React.Ref<React.ReactNode>;
    key?: React.Key;
  };

  type ComponentWithProperties<Type, ConstructorOptions> = NodeProps<
    ConstructorOptions
  > &
    Partial<WithoutFunctionKeys<Writable<Type>>>;

  type Component<Type, ConstructorOptions> = TransformProperty<
    ComponentWithProperties<Type, ConstructorOptions>
  >;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      cartesian3: ReactCesiumFiber.Component<
        Cartesian3,
        ConstructorParameters<typeof Cartesian3>
      >;

      // Entities
      entity: ReactCesiumFiber.Component<
        Entity,
        ConstructorParameters<typeof Entity>
        // [Entity.ConstructorOptions]
      >;

      boxGraphics: ReactCesiumFiber.Component<
        BoxGraphics,
        ConstructorParameters<typeof BoxGraphics>
      >;
      cylinderGraphics: ReactCesiumFiber.Component<
        CylinderGraphics,
        ConstructorParameters<typeof BoxGraphics>
      >;
      modelGraphics: ReactCesiumFiber.Component<
        ModelGraphics,
        ConstructorParameters<typeof ModelGraphics>
      >;

      // Datasources
      customDataSource: ReactCesiumFiber.Component<
        CustomDataSource,
        ConstructorParameters<typeof CustomDataSource>
      >;
      geoJsonDataSource: ReactCesiumFiber.Component<
        GeoJsonDataSource,
        ConstructorParameters<typeof GeoJsonDataSource>
      >;

      // 3DTilesets
      cesium3DTileset: ReactCesiumFiber.Component<
        Cesium3DTileset,
        ConstructorParameters<typeof Cesium3DTileset>
      >;

      cesium3DTileStyle: ReactCesiumFiber.Component<
        Cesium3DTileStyle,
        ConstructorParameters<typeof Cesium3DTileStyle>
      >;
    }
  }
}
