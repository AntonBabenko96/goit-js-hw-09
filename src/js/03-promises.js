import Notiflix from 'notiflix';
const delay = document.querySelector('input[name=delay');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const form = document.querySelector('.form');
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  let promiseDelay = delay.value * 1;
  let promiseStep = step.value * 1;
  let promiseCounter = amount.value * 1;

  for (let i = 1; i <= promiseCounter; i += 1) {
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );

    promiseDelay += promiseStep;
  }
});