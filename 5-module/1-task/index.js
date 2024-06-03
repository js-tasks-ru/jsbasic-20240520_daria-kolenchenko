function hideSelf() {
  const target = document.querySelector('.hide-self-button');
  target.addEventListener('click', () => target.hidden = !target.hidden);
}
