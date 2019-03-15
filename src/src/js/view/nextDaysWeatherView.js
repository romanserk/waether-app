import {
    elements, generateDate, calculateTempMax, calculateTempMin, generateIcon
} from './base';


export const showNextDaysWeatherWeather = forecast => {
    var listNumber = forecast.list.length - 4;
    elements.nextDaysWeather.forEach(function (element, index) {
        element.innerHTML = `
            <div class="forecast-header">
                <div class="day">${generateDate(forecast,index + 1).day}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="images/icons/icon-${generateIcon(forecast.list[listNumber])}.svg" alt="" width=48>
                </div>
                <div class="degree">${calculateTempMax(forecast, forecast.list[listNumber])}<sup>o</sup>C</div>
                <small>${calculateTempMin(forecast, forecast.list[listNumber-4])}<sup>o</sup></small>
            </div>
        `;
        listNumber -= 8;
    });
}



