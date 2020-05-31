import React, { useRef, useLayoutEffect } from "react";
import { render } from "./reconciler";

export const Viewer = ({
  children,
  args = [],
  style = {},
  ...viewerProps
}: React.PropsWithChildren<{ args: any[]; style: React.CSSProperties }>) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const props = { args: [ref.current, ...args], ...viewerProps };
      // @ts-ignore
      const wrapped = <viewer {...props}>{children}</viewer>;
      render(wrapped, ref.current);
    }
  }, [children, ref.current]);
  return <div style={style} ref={ref}></div>;
};
