import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const picker = document.querySelector("#datetime-picker");
const start = document.querySelector("button[data-start]");
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');
start.setAttribute('disabled', true);
let timerId = null;
let msValue = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() < new Date().getTime()) {
          start.setAttribute('disabled', true);
          Notiflix.Notify.failure("Please choose a date in the future");
      } else {
          start.removeAttribute('disabled');
          msValue = selectedDates[0];
          
          
      }
  },
};
flatpickr(picker, options);

const addLeadingZero = (value) => {
    return String(value).padStart(2,'0')
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds =addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}


const timeCounterHandler = () => {
    let currentDate = new Date();
    let time = msValue - currentDate;
    let timeEl = convertMs(time);
if (time >= 0) {
          daysEl.textContent = timeEl.days
            hoursEl.textContent = timeEl.hours
            minutesEl.textContent = timeEl.minutes
            secEl.textContent = timeEl.seconds
    
} else {
    clearInterval(timerId)
    Notiflix.Notify.success('Твій час вийшов!')
     }
}
start.addEventListener("click", () => {
    timerId = setInterval(timeCounterHandler, 1000);
});
