export const elements = {
    searchBtn: document.querySelector('.find'),
    searchInput: document.querySelector('.search__field'),
    todayWeather: document.querySelector('.today'), 
    nextDaysWeather: document.querySelectorAll('.days'),
    wikiContainer: document.querySelector('.wiki'),
};


export const generateDate = (forecast, dayNum) => {
    var date = new Date();
    date.setDate(date.getDate() + dayNum);
    var optionsSt = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    var optionsNu = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'    
    }

    var dateString = date.toLocaleDateString(forecast.city.country, optionsSt).split(', ');
    var dateNum = date.toLocaleDateString(forecast.city.country, optionsNu).split('/');
    var dateNumb = `${dateNum[2]}-${dateNum[0] > 10 ? dateNum[0] : '0' + dateNum[0]}-${dateNum[1]}`

    return {
        day: dateString[0],
        month: dateString[1],
        dateNumb
    }
};


export const rain = (forecast, index) => {

    let rainmm = 0;
    let hours = 0;
    for (let i = index; i < index + 8; i++) {

        if (forecast.list[i].rain && forecast.list[i].rain['3h']) {
            rainmm += forecast.list[i].rain['3h'];
            hours++;
        } else if (forecast.list[i].snow && forecast.list[i].snow['3h']) {
            rainmm += forecast.list[i].snow['3h'];
            hours++;
        }

    }


    return Math.round(rainmm / (hours === 0 ? 1 : hours));

};

export const calcListNum = (forecast, index) => {
    return forecast.list[index];
};

export const calcWind = (forecast, index) => {
    var windSpeed = 0;
    for (var i = index; i < index+8; i++) {
        windSpeed += forecast.list[i].wind.speed;
    }
    var dirArr = ['North', 'East', 'South', 'West'];
    var direction = dirArr[Math.round(forecast.list[index+4].wind.deg / 90)];

    return {
        speed: Math.round(windSpeed / 6),
        dir: direction ? direction : dirArr[3]
    }

};

export const calculateTempMax = (weather, date) => {
    var tempMax = -99;
    weather.forEach(function(item) {
        if(item.dt_txt.split(' ')[0] === date && item.main.temp_max > tempMax){
            tempMax = item.main.temp_max;
        }
    });
    return Math.round(tempMax);
};

export const calculateTempMin = (weather, date) => {
    var tempMin = 99;
    weather.forEach(function(item) {
        if(item.dt_txt.split(' ')[0] === date && item.main.temp_min < tempMin){
            tempMin = item.main.temp_max; 
        }
    });
    return Math.round(tempMin);
};


export const generateIcon = (forecast, index) => {
    return forecast.list[index].weather[0].icon.split(forecast.list[index].weather[0].icon.includes('n') ? 'n' : 'd')[0];
};



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


export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

