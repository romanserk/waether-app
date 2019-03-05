import {
    elements,
    generateDate,
    calculateTempMax,
    generateIcon
} from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const showTodaysWeather = forecast => {

    elements.todayWeather.innerHTML = `
        <div class="forecast-header">
            <div class="day">${generateDate(forecast, 0).day}</div>
            <div class="date">${generateDate(forecast, 0).month}</div>
        </div>
        <div class="forecast-content">
            <div class="location">${forecast.city.name}</div>
            <div class="degree">
                <div class="num">${calculateTempMax(forecast, todayListNum(forecast))}<sup>o</sup>C</div>
                <div class="today-icon forecast-icon">
                    <img src="images/icons/icon-${generateIcon(todayListNum(forecast))}.svg" alt="" width=90>
                </div>	
            </div>
            <span><img src="images/icon-umberella.png" alt="">${todayRain(forecast)}mm</span>
            <span><img src="images/icon-wind.png" alt="">${calculateTodaysWind(forecast).speed}km/h</span>
            <span><img src="images/icon-compass.png" alt="">${calculateTodaysWind(forecast).dir}</span>
        </div>
    `;
};



const todayRain = forecast => {

    var rainmm = 0;
    var hours = 0;
    forecast.list.forEach(function (item) {
        if (item.dt_txt.split(' ')[0] === forecast.list[0].dt_txt.split(' ')[0]) {
            if (item.rain && item.rain['3h']) {
                rainmm += item.rain['3h'];
                hours++;
            } else if (item.snow && item.snow['3h']) {
                rainmm += item.snow['3h'];
                hours++;
            }
        }
    });

    return Math.round(rainmm / (hours === 0 ? 1 : hours));

};

const todayListNum = forecast => forecast.list[Math.round((forecast.list.length - 32) / 2)];

const calculateTodaysWind = forecast => {
    var windSpeed = 0;
    for (var i = 0; i < 6; i++){
        windSpeed += forecast.list[i].wind.speed;
    }
    var dirArr = ['North', 'East', 'South', 'West'];
    var direction = dirArr[Math.round(forecast.list[0].wind.deg / 90)];

    return {
        speed: Math.round(windSpeed / 6),
        dir: direction ? direction : dirArr[3]
    }

};

