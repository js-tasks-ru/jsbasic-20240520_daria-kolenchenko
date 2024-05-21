function factorial(n) {
  let result = 1;
  for (let i = n; i >= 1; i -= 1) {
    result = result * i;
  }
  return result;
}
