export const d2_rect = (x, y, width, height) => {

  return [
    x, y,
    x + width, y,
    x, y + height,
    x, y + height,
    x + width, y + height,
    x + width, y 
  ]
}