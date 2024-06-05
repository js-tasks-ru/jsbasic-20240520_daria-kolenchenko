function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  button.addEventListener('click', () => text.hasAttribute('hidden') ? text.removeAttribute('hidden') : text.setAttribute('hidden', true));
}
