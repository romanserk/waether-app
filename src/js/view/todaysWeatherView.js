import {
    elements, generateDate, calculateTempMax, generateIcon
} from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const showTodaysWeather = forecast => {
    console.log(forecast);

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
            <span><img src="images/icon-umberella.png" alt="">${todayRain(todayListNum(forecast))}mm</span>
            <span><img src="images/icon-wind.png" alt="">${calculateTodaysWind(forecast).speed}km/h</span>
            <span><img src="images/icon-compass.png" alt="">${calculateTodaysWind(forecast).dir}</span>
        </div>
    `;
};



const todayRain = forecast => forecast.rain['3h'] ? forecast.rain['3h'] : '0';

const todayListNum = forecast => forecast.list[Math.round((forecast.list.length - 32) / 2)];

const calculateTodaysWind = forecast => {
    var wind = forecast.list[0].wind;
    var dirArr = ['North', 'East', 'South', 'West'];

    return {
        speed: Math.round(wind.speed),
        dir: dirArr[Math.round(wind.deg / 90)]
    }

};


