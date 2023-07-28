const APIKey = 'e8099645bce04f81827133212232807'


// http://api.weatherapi.com/v1/current.json?key=e8099645bce04f81827133212232807&q=London  пример запроса


// Элементы на странице
const header = document.querySelector('#header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

const removeCard = () => {
    const oldCard = document.querySelector('.card')
    if (oldCard) oldCard.remove();
}

const showError = (errorMessage) => {
    const html = `<div class="card">${errorMessage}</div>`
    header.insertAdjacentHTML('afterend', html);
}


const showCard = ({name, country, temp, condition}) => {
    const html = `
        <div class="card">
                <h2 class="card-city">${name}<span>${country}</span></h2>
                <div class="card-weather">
                    <div class="card-value">${temp}<sup>°c</sup></div>
                    <img class="card-img" src="img/CloudRain.png" alt="weather icon">
                </div>
            <div class="card-description">
                ${condition}
            </div>
        </div>
        `;

    header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}



// Слушаем отправку формы
form.onsubmit = async function (e) {
    //  Отменяем отправку формы
    e.preventDefault();

    // Берем значения из Input, обрезаем пробелы
    let city = input.value.trim();

    // Получаем данные с сервера
    const data = await getWeather(city);


    if(data.error) {
        removeCard();
        showError(data.error.message);
    } else {
        removeCard();


        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text
        }

        showCard(weatherData);
    }


}
