function getMinMax(str) {
  let arr = str.split(' ')
  .filter(item => Number.isFinite(parseInt(item, 10)))
  .map(item => parseFloat(item, 10))
  .sort((a, b) => a - b);
  return {
    min: arr[0],
    max: arr[arr.length - 1]
  }
}
