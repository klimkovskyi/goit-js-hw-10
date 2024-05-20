import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const datepicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysEl = document.querySelector("[data-days]");
const hourEl = document.querySelector("[data-hours]");
const minsEl = document.querySelector("[data-minutes]")
const secEl = document.querySelector("[data-seconds]")

// const currentDate = new Date();
startBtn.disabled = true;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        userSelectedDate = selectedDates[0];

        if (userSelectedDate < currentDate) {
            iziToast.error({
                position: "topRight",
                message: 'Please, choose a date in the feature!'
            });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function pad(value) {
    return String(value).padStart(2, "0");
}

function start() {
    startBtn.disabled = true;
    datepicker.disabled = true;

    const intervalId = setInterval(() => {
        const currentDate = new Date().getTime();
        console.log(currentDate);
        const deltaTime = userSelectedDate - currentDate;

        if (deltaTime <= 0) {
        clearInterval(intervalId);
        startBtn.disabled = false;
        datepicker.disabled = false;
        iziToast.success({
            title: 'Timer',
            message: 'Your time is over',
            position: "topRight"
        });
            
        return;
        }

        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        
        daysEl.textContent = days;
        hourEl.textContent = hours;
        minsEl.textContent = minutes;
        secEl.textContent = seconds;
    }, 1000)
}

startBtn.addEventListener("click", start);



