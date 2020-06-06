// @ts-nocheck
import React, { useRef, useLayoutEffect } from "react";
import { render } from "./reconciler";

import { ViewerProvider, useViewer } from "./context";

export const Viewer = ({
  children,
  args = [],
  style = {},
  ...viewerProps
}: React.PropsWithChildren<{ args: any[]; style: React.CSSProperties }>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const props = { args: [containerRef.current, ...args], ...viewerProps };
      const wrapped = (
        <viewer ref={viewerRef} {...props}>
          <ViewerProvider value={viewerRef.current}>{children}</ViewerProvider>
        </viewer>
      );
      render(wrapped, containerRef.current);
    }
  }, [children, containerRef.current]);

  return <div style={style} ref={containerRef}></div>;
};

export { useViewer };
