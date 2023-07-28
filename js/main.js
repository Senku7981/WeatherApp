const APIKey = 'e8099645bce04f81827133212232807'


// http://api.weatherapi.com/v1/current.json?key=e8099645bce04f81827133212232807&q=London  пример запроса



// Получаем название города 

const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let city;
// Слушаем отправку формы

form.onsubmit = function(e) {
    //  Отменяем отправку формы
    e.preventDefault();

    // Берем значения из Input, обрезаем пробелы и табы

    city = input.value.trim();

    const url  = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;


    fetch(url)
        .then((response) => {
            return response.json();
    }) 
    
    .then((data) => {
        console.log(data);
    });

}
