function sumSalary(salaries) {
  let result = 0;
  for (let prop in salaries) {
    if (Number.isFinite(salaries[prop])) {
      result += salaries[prop];
    }
  }
  return result;
}
