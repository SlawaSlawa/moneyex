'use strict';

// Burger and Header-Navigation
const burgerBtn = document.getElementById('burger');
const navMenu = document.getElementById('headerNav');


burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger--active');
    navMenu.classList.toggle('header__navigation--active');
    console.log(navMenu);

});
// ///Burger and Header-Navigation END

// Swiper-Slider
var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView: 2,
    spaceBetween: 40,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        850: {
            slidesPerView: 2,
        }
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',
    }
})
// ///Swiper-Slider END

// -------------------------------CONVERTER----------------------------
const beforeInput = document.getElementById('inputNum'),
    afterInput = document.getElementById('resultNum'),
    beforeInputBasedValute = document.getElementById('inputMoneyBefore'),
    afterInputBasedValute = document.getElementById('inputMoneyAfter');



// const data = [

// ];

const basedValueRUB = {
    eur: 0.0112704629,
    usd: 0.0133600068,
    rub: 1
};

const basedValueEUR = {
    rub: 88.7275,
    usd: 1.1854,
    eur: 1
};

const basedValueUSD = {
    rub: 74.8502615151,
    eur: 0.843597098,
    usd: 1
};


let data = '';

function sendRequest(basedValute = 'RUB') {

    const url = `https://api.exchangeratesapi.io/latest?base=${basedValute}&symbols=USD,EUR,RUB`;
    const urlNotEUR = `https://api.exchangeratesapi.io/latest?base=${basedValute}&symbols=USD,RUB`;
    const xmr = new XMLHttpRequest();

    if (basedValute != 'EUR') {
        xmr.open('GET', url, false);
    } else {
        xmr.open('GET', urlNotEUR, false);
    }

    xmr.addEventListener('readystatechange', function () {
        if ((xmr.readyState == 4) && xmr.status == 200) {
            data = xmr.responseText;
            data = JSON.parse(data);

            if (basedValute == 'RUB') {
                basedValueRUB.eur = data.rates.EUR;
                basedValueRUB.usd = data.rates.USD;
                basedValueRUB.rub = 1;
            }

            if (basedValute == 'EUR') {
                basedValueEUR.eur = 1;
                basedValueEUR.usd = data.rates.USD;
                basedValueEUR.rub = data.rates.RUB;
            }

            if (basedValute == 'USD') {
                basedValueUSD.eur = data.rates.EUR;
                basedValueUSD.usd = 1;
                basedValueUSD.rub = data.rates.RUB;
            }
        } else {
            const errorCloseBtn = document.getElementById('errorCloseBtn');
            const sendError = document.getElementById('sendError');
            sendError.style.display = 'flex';

            sendError.addEventListener('click', () => {
                sendError.style.display = 'none';
            });

            errorCloseBtn.addEventListener('click', () => {
                sendError.style.display = 'none';
            });
        }
    });
    xmr.send();
}

sendRequest('RUB');
sendRequest('USD');
sendRequest('EUR');

// Получение и преобразование введенных значений 
function getInputBasedValute() {
    const value = parseFloat(beforeInput.value);

    if (beforeInputBasedValute.value == 'RUB') {
        for (let item in basedValueRUB) {
            if (item == afterInputBasedValute.value.toLowerCase()) {
                getResult(basedValueRUB[item], value);
            }
        }
    }

    if (beforeInputBasedValute.value == 'EUR') {
        for (let item in basedValueEUR) {
            if (item == afterInputBasedValute.value.toLowerCase()) {
                getResult(basedValueEUR[item], value);
            }
        }
    }

    if (beforeInputBasedValute.value == 'USD') {
        for (let item in basedValueUSD) {
            if (item == afterInputBasedValute.value.toLowerCase()) {
                getResult(basedValueUSD[item], value);
            }
        }
    }


    return true;
}

function getResult(koef, num) {
    let result = ((num * koef) - (num * koef) * 5 / 100).toFixed(3);
    afterInput.value = result;
}

// function getEvents() {
beforeInput.addEventListener('input', getInputBasedValute);
beforeInputBasedValute.addEventListener('input', getInputBasedValute);
afterInputBasedValute.addEventListener('input', getInputBasedValute);
// }

// ///////////////////////////CONVERTER----------------------------

// ---------------------------Плавная прокрутка по якорям
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

}
// ///////////////////////////Плавная прокрутка по якорям










