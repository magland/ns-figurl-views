/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export type TAItem = {
  path: string;
  neurodataType: string;
  startTime: number;
  endTime: number;
  color: string;
};

export const isTAItem = (x: any): x is TAItem => {
  if (typeof x !== "object") return false;
  if (typeof x.path !== "string") return false;
  if (typeof x.neurodataType !== "string") return false;
  if (typeof x.startTime !== "number") return false;
  if (typeof x.endTime !== "number") return false;
  if (typeof x.color !== "string") return false;
  return true;
};

export type Data = {
  items: TAItem[];
};

export const isData = (x: any): x is Data => {
  if (typeof x !== "object") return false;
  if (!Array.isArray(x.items)) return false;
  for (const item of x.items) {
    if (!isTAItem(item)) return false;
  }
  return true;
};
