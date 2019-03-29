import {
    elements
} from './base';


export const showNextDaysWeather = forecast => {
    elements.nextDaysWeather.forEach(function(element, index) {
        element.innerHTML = `
            <div class="forecast-header">
                <div class="day">${forecast[index].date.day}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="images/icons/icon-${forecast[index].icon}.svg" alt="" width=48>
                </div>
                <div class="degree">${forecast[index].tempMax}<sup>o</sup>C</div>
                <small>${forecast[index].tempMin}<sup>o</sup></small>
            </div>
        `;
    });
}
