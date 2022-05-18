const weather_api_key = config.WEATHER_API_KEY;

let weather = {
    'apiKey': weather_api_key,
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            + city
            + '&units=metric&appid='
            + this.apiKey
        ) .then((responce) => {
            if (!responce.ok) {
                alert('Weather not found.');
                throw new Error('No weather found.');
            }
            return responce.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure, feels_like } = data.main
        const { speed } = data.wind

        // Добавить: давление, ощущыемая темп

        document.querySelector('.city').innerHTML = `Weather in ${name}`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = `${Math.round(temp)}°C`
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind speed: ${speed} m/s`;
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    search: function() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }

}

document.querySelector('.search button').addEventListener('click', function() {
    weather.search();
})

document
.querySelector('.search-bar')
.addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
        weather.search();
    }
})

weather.fetchWeather('Vladivostok')


// console.log('погода в лондоне');
// console.log(weather.fetchWeather('london'));


