function isEmpty(obj) {
  let result = 0;
  for (let key in obj){
    result ++;
  }
  return (result === 0);
}
