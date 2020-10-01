import { appendChild } from "./append-child";
import { Reconciler } from "./types";

export const insertBefore = ((parentInstance, child, beforeChild) => {
  //TODO: Handle ordering (for example for layers)
  if (child) {
    appendChild(parentInstance, child);
  }
}) as Reconciler["insertBefore"];
