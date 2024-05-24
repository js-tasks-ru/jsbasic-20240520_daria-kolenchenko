function sumSalary(salaries) {
  let result = 0;
  for (let prop in obj) {
    if (Number.isFinite(obj[prop])) {
      result += obj[prop];
    }
  }
  return result;
}
