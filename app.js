const yearOutput = document.getElementById('years');
const monthOutput = document.getElementById('months');
const dayOutput = document.getElementById('days');

const date = new Date();
let day = date.getDay();
let month = date.getMonth() +1;
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const monthInput = document.getElementById('monthInput');
const dayInput = document.getElementById('dayInput');
const yearInput = document.getElementById('yearInput');
yearInput.setAttribute('max', year);

document.getElementById('form').addEventListener('submit', handleSubmit);
// lub
// document.getElementById('form').addEventListener('submit', e => {handleSubmit(e)});


const validate = () => {

    const inputs = document.querySelectorAll('.form__input');
    let validator = true;
    inputs.forEach(e => {
        const parent = e.parentElement;
        if(!e.value) {
            e.style.borderColor = 'red';
            parent.querySelector('.form__error').innerText = 'This field is required!';
            parent.querySelector('.form__label').style.color = 'red';
            validator = false;
        } else if(monthInput.value.trim() > 12) {
            monthInput.style.borderColor = 'red';
            monthInput.parentElement.querySelector('.form__error').innerText = 'Month must be under 13!';
            monthInput.parentElement.querySelector('.form__label').style.color = 'red';
            validator = false;
        } else if(dayInput.value.trim() > 31) {
            dayInput.style.borderColor = 'red';
            dayInput.parentElement.querySelector('.form__error').innerText = 'Day must be under 32!';
            dayInput.parentElement.querySelector('.form__label').style.color = 'red';
            validator = false;
        } else {
            e.style.borderColor = 'green';
            parent.querySelector('.form__error').innerText = '';
            parent.querySelector('.form__label').style.color = 'green';
            validator = true;
        }
    })
    console.log(validator);
    return validator;
}

function handleSubmit (e) {
    e.preventDefault();
    if(validate()) {
        if(dayInput > day) {
            day += months[month-1];
            month -=1;
        }
        if(monthInput > month) {
            month +=12;
            year -=1;
        }

        const d = day - dayInput.value;
        const m = month - monthInput.value;
        const y = year - yearInput.value;

        dayOutput.innerText = d;
        monthOutput.innerText = m;
        yearOutput.innerText = y;
    }
}