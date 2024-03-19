const weatherConditionTranslations = {
    'Clear': 'Açık',
    'Partly cloudy': 'Parçalı bulutlu',
    'Cloudy ': 'Bulutlu',
    'Overcast': 'Kapalı',
    'Mist': 'Sisli',
    'Patchy rain nearby': 'Yer yer yağmurlu',
    'Patchy rain possible': 'Yer yer yağmur olasılığı',
    'Patchy snow possible': 'Yer yer kar olasılığı',
    'Patchy sleet possible': 'Yer yer karla karışık yağmur olasılığı',
    'Patchy freezing drizzle possible': 'Yer yer don drizzlesi olasılığı',
    'Thundery outbreaks possible': 'Gökgürültülü sağanak yağış olasılığı',
    'Blowing snow': 'Kar fırtınası',
    'Blizzard': 'Kar fırtınası',
    'Fog': 'Sis',
    'Freezing fog': 'Donmuş sis',
    'Patchy light drizzle': 'Hafif çiseleme',
    'Light rain': 'Hafif yağmur',
    'Moderate rain at times': 'Zaman zaman orta şiddetli yağmur',
    'Heavy rain at times': 'Zaman zaman kuvvetli yağmur',
    'Patchy light rain with thunder': 'Hafif yağmurlu gök gürültülü',
    'Moderate or heavy rain with thunder': 'Orta veya kuvvetli yağmurlu gök gürültülü',
    'Patchy light snow': 'Hafif kar yağışlı',
    'Light snow': 'Hafif kar yağışı',
    'Sunny': 'Güneşli',
    'Patchy moderate snow': 'Orta şiddetli kar yağışlı',
    'Moderate snow': 'Orta şiddetli kar yağışı',
    'Patchy heavy snow': 'Kuvvetli kar yağışlı',
    'Heavy snow': 'Kuvvetli kar yağışı',
    'Ice pellets': 'Dolu tanesi',
    'Light sleet': 'Hafif karla karışık yağmur',
    'Moderate or heavy sleet': 'Orta veya kuvvetli karla karışık yağmur',
    'Patchy light snow with thunder': 'Hafif kar yağışlı gök gürültülü',
    'Moderate or heavy snow with thunder': 'Orta veya kuvvetli kar yağışlı gök gürültülü'
};

function translateWeatherCondition(conditionText) {
    return weatherConditionTranslations[conditionText] || conditionText;
}

function createWeatherCard(location, temperature, iconUrl, conditionText, country) {
    const containerItem = document.createElement('div');
    containerItem.className = 'container-item';

    containerItem.innerHTML = `
        <div class="item-header">
            <div class="locations">
                <h3>${location.name}</h3>
                <p>${country}</p>
            </div>
        </div>
        <div class="temperature-wrapper">
            <h3>${translateWeatherCondition(conditionText)}</h3>
            <div class="icon-wrapper">
                <img src="${iconUrl}" alt="">
            </div>
        </div>
        <h2>${temperature}°C</h2>
    `;

    document.querySelector('.container').appendChild(containerItem);
}

function getWeatherInfo(apiKey, cities) {
    cities.forEach(city => {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const { temp_c: temperature, condition } = data.current;

                if (condition && condition.text) {
                    const translatedCondition = translateWeatherCondition(condition.text);
                    createWeatherCard(data.location, temperature, condition.icon, translatedCondition, data.location.country);
                } else {
                    console.error(`Hava durumu durumu bilgisi alınamadı for ${city}`);
                }
                console.log(data);
            })
            .catch(error => console.error(`Hava durumu bilgisi alınırken bir hata oluştu for ${city}: ${error.message}`));
    });
}

const apiKey = '3c7611ae8a2247a481b141249242702';
const cities = ['Istanbul', 'Ankara', 'Izmir', 'Sinop', 'Kirklareli', 'Sakarya', 'Ayancik', 'mykonos', 'Rize', 'Samsun', 'Amalfi', 'kocaeli', 'London', 'Amsterdam', 'Berlin', 'Rostow', 'St. Petersburg','Moskova', 'Elazig', 'Rennes', 'Sydney', 'Pekin', 'new york','paris', 'cape town'];

getWeatherInfo(apiKey, cities);
