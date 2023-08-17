function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const INTERVAL_DELAY = 1000;

let intervalId = null;

let bodyBgColor = null;

refs.stopBtn.disabled = true;

const onStopChangeColor = () => {
  clearInterval(intervalId);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
};
const onchangeColor = () => {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  refs.stopBtn.addEventListener('click', onStopChangeColor);
};

refs.startBtn.addEventListener('click', onchangeColor);
