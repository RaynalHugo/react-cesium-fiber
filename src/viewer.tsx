// @ts-nocheck
import React, { useRef, useLayoutEffect, useState } from "react";
import { render } from "./reconciler";

import { ViewerProvider, useViewer } from "./context";

// forward ref ?
export const Viewer = ({
  children,
  args = [],
  style = {},
  ...viewerProps
}: React.PropsWithChildren<{ args?: any[]; style?: React.CSSProperties }>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const props = { args: [containerRef.current, ...args], ...viewerProps };
      const wrapped = (
        <viewer {...props}>
          <ViewerProvider value={viewer}>{children}</ViewerProvider>
        </viewer>
      );
      const returned = render(wrapped, containerRef.current);

      if (viewer == null && returned != null) {
        setViewer(returned);
      }
    }
  }, [children, containerRef.current, viewer]);

  return <div style={style} ref={containerRef}></div>;
};

export { useViewer };
