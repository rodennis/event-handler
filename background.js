let background = ['assets/concert.jpg', 'assets/basketball.jpg', 'assets/football.jpg']
//change background image every x seconds
let html = document.querySelector('.background')
let i = 0;
setInterval(function () {
  html.style.backgroundImage = "url(" + background[i] + ")";
  i = i + 1;
  if (i == background.length) {
    i = 0;
  }
}, 3000);
