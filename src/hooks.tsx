import { useEffect } from "react";

import { useViewer } from "./context";

export const usePostUpdate = (callback) => {
  const viewer = useViewer();

  useEffect(() => {
    if (viewer != null) {
      const { scene } = viewer;
      console.log("setting", viewer);
      return scene.postUpdate.addEventListener(callback);
      // returns a function to remove the event listener
    }
  }, [callback, viewer]);
};

export const usePostRender = (callback) => {
  const viewer = useViewer();

  useEffect(() => {
    if (viewer != null) {
      const { scene } = viewer;
      console.log("setting", viewer);
      return scene.postRender.addEventListener(callback);
      // returns a function to remove the event listener
    }
  }, [callback, viewer]);
};

export const usePreUpdate = (callback) => {
  const viewer = useViewer();

  useEffect(() => {
    if (viewer != null) {
      const { scene } = viewer;
      console.log("setting", viewer);
      return scene.preUpdate.addEventListener(callback);
      // returns a function to remove the event listener
    }
  }, [callback, viewer]);
};

export const usePreRender = (callback) => {
  const viewer = useViewer();

  useEffect(() => {
    if (viewer != null) {
      const { scene } = viewer;
      console.log("setting", viewer);
      return scene.preRender.addEventListener(callback);
      // returns a function to remove the event listener
    }
  }, [callback, viewer]);
};
