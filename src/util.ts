export const buildMatrix = (width: number, height: number) => {
  return [...new Array(height)]
    .map((row) => [...new Array(width)].map(() => 0));
};

export const flatten
  = (deep: any[]) : any[] =>
    deep.reduce((flat, elem) =>
      flat.concat(Array.isArray(elem) ? flatten(elem) : elem));

export const rand = (min: number, max: number) =>
  Math.round(Math.abs(max - min) * Math.random() + min);
