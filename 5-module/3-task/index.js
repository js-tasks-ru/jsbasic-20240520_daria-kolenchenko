function initCarousel() {
  const width = document.querySelector('.carousel__slide').offsetWidth;
  const carousel = document.querySelector('.carousel__inner');
  const left = document.querySelector('.carousel__arrow_left');
  const right = document.querySelector('.carousel__arrow_right');

  let position = 0;
  left.style.display = 'none';

  right.addEventListener('click', () => {
    position -= width;
    if (position > -width * 4) {
      left.style.display = '';
      carousel.style.transform = `translateX(${position}px)`;
      (position === -width * 3) ? right.style.display = 'none' : right.style.display = '';
      return;
    }
    position = -width * 4;
  });

  left.addEventListener('click', () => {
    position += width;
    if (position <= 0) {
      right.style.display = '';
      carousel.style.transform = `translateX(${position}px)`;
      (position === 0) ? left.style.display = 'none' : left.style.display = '';
      return;
    }
    position = 0;
  });
}
