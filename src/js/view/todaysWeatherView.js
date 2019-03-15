 import {
     elements,
 } from './base';



 export const showTodaysWeather = todayWeather => {

     elements.todayWeather.innerHTML = `
        <div class="forecast-header">
            <div class="day">${todayWeather.date.day}</div>
            <div class="date">${todayWeather.date.month}</div>
        </div>
        <div class="forecast-content">
            <div class="location">${todayWeather.city}</div>
            <div class="degree">
                <div class="num">${todayWeather.tempMax}<sup>o</sup>C</div>
                <div class="today-icon forecast-icon">
                    <img src="images/icons/icon-${todayWeather.icon}.svg" alt="" width=90>
                </div>	
            </div>
            <span><img src="images/icon-umberella.png" alt="">${todayWeather.rain}mm</span>
            <span><img src="images/icon-wind.png" alt="">${todayWeather.wind.speed}km/h</span>
            <span><img src="images/icon-compass.png" alt="">${todayWeather.wind.dir}</span>
        </div>
    `;
 };