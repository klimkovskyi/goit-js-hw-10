import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const intputDelay = document.querySelector('input[name="delay"]');
const fulfiledRadio = document.querySelector('input[value="fulfilled"]');
const rejectedRadio = document.querySelector('input[value="rejected"]');
const submitBtn = document.querySelector('.form button');

const makePromise = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fulfiledRadio.checked) {
                resolve(delay);
            } else if (rejectedRadio.checked) {
                reject(delay);
            }
        }, delay)
    })
}

const resetFormValue = () => {
    intputDelay.value = '';
    fulfiledRadio.checked = false;
    rejectedRadio.checked = false;
}

submitBtn.addEventListener('click', (evt) => { 
    evt.preventDefault();
    const delay = +intputDelay.value;

    if (!delay) {
        iziToast.warning({
            title: 'Caution',
            message: 'You forgot important data',
            position: 'topRight',
        });
        return;
    }

    if (!fulfiledRadio.checked && !rejectedRadio.checked) {
        iziToast.warning({
            title: 'Caution',
            message: 'You forgot to choose state',
            position: 'topRight',
        });
        return;
    }

    makePromise(delay)
        .then((delay) => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay} ms`,
                position: 'topRight',
            })
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay} ms`,
                position: 'topRight',
            })
        })
        .finally(() => resetFormValue());
});

