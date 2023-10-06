import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputSelector = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

let countInterval;
startButton.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= Date.now()) {
      alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

const calendar = flatpickr(inputSelector, options);

startButton.addEventListener('click', () => {
  const selectedDate = calendar.selectedDates[0];

  if (selectedDate > Date.now()) {
    const timeDifference = selectedDate - Date.now();
    startCalculation(timeDifference);
  } else {
    alert('Please choose a date in the future');
  }
});

function startCalculation(ms) {
  if (countInterval) {
    clearInterval(countInterval);
  }
  countInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(ms);
    dataDays.textContent = addZero(days);
    dataHours.textContent = addZero(hours);
    dataMinutes.textContent = addZero(minutes);
    dataSeconds.textContent = addZero(seconds);

    if (ms <= 0) {
      clearInterval(countInterval);
      alert('Count has finished!');
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
    } else {
      ms -= 1000;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return value < 10 ? `0${value}` : value.toString();
}
