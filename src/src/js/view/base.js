export const elements = {
    searchBtn: document.querySelector('.find'),
    searchInput: document.querySelector('.search__field'),
    todayWeather: document.querySelector('.today'), 
    nextDaysWeather: document.querySelectorAll('.days'),
    wikiContainer: document.querySelector('.wiki'),
};


export const generateDate = (forecast, dayNum) => {
    var event = new Date();
    event.setDate(event.getDate() + dayNum);
    var options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    var dateString = event.toLocaleDateString(forecast.city.country, options).split(', ');

    return {
        day: dateString[0],
        month: dateString[1]
    }
};

export const calculateTempMax = (forecast, listNum) => Math.round(listNum.main.temp_max);
export const calculateTempMin = (forecast, listNum) => Math.round(listNum.main.temp_min);

export const generateIcon = forecast => forecast.weather[0].icon.split(forecast.weather[0].icon.includes('n') ? 'n' : 'd')[0];

export const loader = () => {
    const page = document.querySelector('.forecast-table');
    const loader = `
        <div class="loader">LOADING...</div>
    `;
    page.insertAdjacentHTML('beforeend', loader);

}

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
}