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


// Слушаем отправку формы
form.onsubmit = function (e) {
    //  Отменяем отправку формы
    e.preventDefault();

    // Берем значения из Input, обрезаем пробелы и табы

    let city = input.value.trim();

    // Адрес запроса 
    const url = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;

    // Выполнение запроса 
    fetch(url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {

            console.log(data);
            
            

            if (data.error) {
                removeCard();
                showError(data.error.message);

            } else {

                // Отображаем полученные данные в карточке 
                removeCard();

                // Разметка для карточки  
                const html = `
                    <div class="card">
                            <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
                            <div class="card-weather">
                                <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                                <img class="card-img" src="img/CloudRain.png" alt="weather icon">
                            </div>
                        <div class="card-description">
                            ${data.current.condition.text}
                        </div>
                    </div>
                    `;
                // Отображаем карточку на странице
                header.insertAdjacentHTML('afterend', html);
            }
        });

}
