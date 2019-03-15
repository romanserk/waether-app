import {
    generateDate,
    calcListNum,
    calculateTempMax,
    generateIcon,
    rain,
    calcWind,
    calculateTempMin
} from '../view/base';


export default class Weather {
    constructor() {
        this.daysWeather = [];
    }

    setWeather(weather) {

        var city = weather.city.name;
        for (var i = 0; i < 5; i++) {
            var date = generateDate(weather, i);
            var singleDay = {
                city,
                date,
                tempMax: calculateTempMax(weather.list, date.dateNumb),
                tempMin: calculateTempMin(weather.list, date.dateNumb),
                icon: generateIcon(weather, i),
                rain: rain(weather, i),
                wind: calcWind(weather, i)
            }

            this.daysWeather.push(singleDay);
        }


    };



}