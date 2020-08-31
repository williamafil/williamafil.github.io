const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const items = document.querySelectorAll('.carousel .item');
let index = 0;

window.show = function(num) {
  index = index + num;
  index = Math.min(Math.max(index,0), items.length-1);

  if (index === 0) {
    prevBtn.classList.toggle('hidden');
    nextBtn.classList.remove('hidden');
  } else if (index === items.length -1) {
    prevBtn.classList.remove('hidden');
    nextBtn.classList.toggle('hidden');
  }
  items[index].scrollIntoView({behavior: 'smooth'});
}
