function checkSpam(str) {
  let first = '1xBet'.toLowerCase();
  let second = 'XXX'.toLowerCase();
  str = str.toLowerCase();
  return (str.includes(first) || str.includes(second));
}
