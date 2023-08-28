import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
};

const onStartCreatingPromise = e => {
  e.preventDefault();

  let amount = e.target.amount.value;
  let delay = e.target.delay.value;
  let step = e.target.step.value;

  for (let i = 1; i <= amount; i += 1) {
    let newDelay = (i - 1) * step + +delay;
    setTimeout(() => {
      createPromise(i, newDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }, i * step);
  }
};

refs.form.addEventListener('submit', onStartCreatingPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
