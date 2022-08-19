/**
 * Sample an f(x, y) in a 2D grid.
 */
 export function sample(options) {
    const minX = options.minX;
    const maxX = options.maxX;
    const stepX = options.stepX;
  
    const minY = options.minY;
    const maxY = options.maxY;
    const stepY = options.stepX;
  
    const fn = options.fn;
  
    const numRows = Math.ceil(maxY / stepY);
    const numCols = Math.ceil(maxX / stepX);
  
    const samples = new Array<number[]>();
  
    for (let row = 0; row <= numRows; row++) {
      const y = row * stepY;
      samples.push([]);
      for (let col = 0; col <= numCols; col++) {
        const x = col * stepX;
        samples[row].push(fn(x, y));
      }
    };
  
    return samples;
  };
  
  