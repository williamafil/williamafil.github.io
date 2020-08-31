const nav = document.querySelector('nav');
const topOfAbout = document.querySelector('#about').offsetTop;
const topOfExperiences = document.querySelector('#experiences').offsetTop;
const topOfRooms = document.querySelector('#rooms').offsetTop;
const topOfContact = document.querySelector('#contact').offsetTop;

function stickyNav() {
  if (window.scrollY >= topOfAbout) {
    nav.classList.add('white-nav');
  } else {
    nav.classList.remove('white-nav');
  }
}

window.addEventListener('scroll', stickyNav);
getRoomData();