const yearOutput = document.getElementById('years');
const monthOutput = document.getElementById('months');
const dayOutput = document.getElementById('days');
const outputs = document.querySelectorAll('.display__number');

let interval = 500; //animation only

const inputs = document.querySelectorAll('.form__input');
const monthInput = document.getElementById('monthInput');
const dayInput = document.getElementById('dayInput');
const yearInput = document.getElementById('yearInput');

// last validation
let validDay;
let validMonth;
let validYear;

const date = new Date();
let year = date.getFullYear();
yearInput.setAttribute('max', year);
let day = date.getDate();
let month = date.getMonth() +1;
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

document.getElementById('form').addEventListener('submit', e => {
    handleSubmit(e);
});
// lub
// document.getElementById('form').addEventListener('submit', e => {handleSubmit(e)});

const setError = (input, message) => {
    input.style.borderColor = 'red';
    input.parentElement.querySelector('.form__error').innerText = message;
    input.parentElement.querySelector('.form__label').style.color = 'red';
};

const setSuccess = input => {
    input.style.borderColor = 'green';
    input.parentElement.querySelector('.form__error').innerText = '';
    input.parentElement.querySelector('.form__label').style.color = 'green';
};

function validate () {
    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();

    if(!dayValue) {
        setError(dayInput, 'This field is required!');
    } else if(parseInt(dayInput.value.trim()) > 31 || 
                ((parseInt(dayInput.value.trim()) > day) && (parseInt(monthInput.value.trim()) == month)) || 
                parseInt(dayInput.value.trim()) > months[month]) {
        setError(dayInput, 'Enter a valid date!')
    } else {
        setSuccess(dayInput);
        validDay = dayValue;
    }

    if(!monthValue) {
        setError(monthInput, 'This field is required!');
    } else if(parseInt(monthInput.value.trim()) > 12 || 
            ((parseInt(monthInput.value.trim()) > month) && (parseInt(yearInput.value.trim()) === year))) {
        setError(monthInput, 'Enter a valid date!')
    } else {
        setSuccess(monthInput);
        validMonth = monthValue;
    }

    if(!yearValue) {
        setError(yearInput, 'This field is required!');
    } else {
        setSuccess(yearInput);
        validYear = yearValue;
    }
}

function handleSubmit (e) {
    e.preventDefault();

    validDay = '';
    validMonth = '';
    validYear = '';

    validate();

    if(validDay && validMonth && validYear) {
        day = date.getDate();
        month = date.getMonth() +1;
        year = date.getFullYear();

        if(dayInput.value > day) {
            day += months[month-1];
            month -=1;
        }
        if(monthInput.value > month) {
            month +=12;
            year -=1;
        }

        const calculatedDay = day - parseInt(dayInput.value);
        const calculatedMonth = month - parseInt(monthInput.value);
        const calculatedYear = year - parseInt(yearInput.value);

        ///////////////////////////////////////////
        // number animation
        dayOutput.setAttribute('end-value', calculatedDay);
        monthOutput.setAttribute('end-value', calculatedMonth);
        yearOutput.setAttribute('end-value', calculatedYear);

        outputs.forEach(e => {
            let startValue = parseInt(e.getAttribute('start-value'));
            let endValue = parseInt(e.getAttribute('end-value'));
        
            let duration = Math.floor(interval /endValue);
            let counter = setInterval(() => {
                if (startValue === endValue) clearInterval(counter); 
                else if(startValue > endValue) startValue--; 
                else startValue++;
                e.innerText = startValue;
                if(startValue === endValue){
                    clearInterval(counter);
                }
            }, duration)
        })

        dayOutput.setAttribute('start-value', calculatedDay);
        monthOutput.setAttribute('start-value', calculatedMonth);
        yearOutput.setAttribute('start-value', calculatedYear);
    }
}