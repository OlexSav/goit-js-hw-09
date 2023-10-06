const changeColorStart = document.querySelector('[data-start]');
const changeColorStop = document.querySelector('[data-stop]');
const changeColorBackground = document.querySelector('body');
changeColorStart.addEventListener('click', startSwitching);
changeColorStop.addEventListener('click', stopSwitching);
let timerId = null;

function startSwitching() {
  timerId = setInterval(() => {
    changeColorBackground.style.backgroundColor = getRandomHexColor();
  }, 1000);
  changeColorStop.removeAttribute('disabled');
  changeColorStart.setAttribute('disabled', true);
}

function stopSwitching() {
  clearInterval(timerId);
  changeColorStart.removeAttribute('disabled');
  changeColorStop.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
