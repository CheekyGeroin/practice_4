import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const currentTime = new Date();
let deadline = 0;
refs.startBtn.disabled = true;

const removeDisabled = () => {
  refs.startBtn.disabled = false;
};

const onClose = selectedDates => {
  if (currentTime > selectedDates[0]) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }
  if (currentTime < selectedDates[0]) {
    deadline = selectedDates[0];
    removeDisabled();
  }
};

const onClick = () => {
  const pad = value => {
    return String(value).padStart(2, '0');
  };
  const timer = () => {
    const today = new Date();
    const delta = deadline - today;
    const seconds = pad(Math.floor(delta / 1000) % 60);
    const minutes = pad(Math.floor(delta / 1000 / 60) % 60);
    const hours = pad(Math.floor(delta / 1000 / 60 / 60) % 24);
    const days = pad(Math.floor(delta / 1000 / 60 / 60 / 24));
    if (seconds >= 0 || minutes >= 0 || hours >= 0 || days >= 0) {
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    } else {
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
    }
  };
  setInterval(timer, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentTime,
  minuteIncrement: 1,
  onClose,
};

flatpickr(refs.datePicker, options);

refs.startBtn.addEventListener('click', onClick);
