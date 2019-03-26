export default class Weather {
    constructor() {
        this.daysWeather = [];
    }

    setWeather(weather) {

        var city = weather.city.name;

        for (var i = 0; i < 5; i++) {
            var singleDay = {
                city,
            }
            this.daysWeather.push(singleDay);
        }
    };

    generateDate(forecast, dayNum) {
        // var date = new Date();
        // date.setDate(date.getDate() + dayNum);

        var date = new Date();
        date.setDate(date.getDate() + dayNum);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        var dateNumb1 =  yyyy + '-' + mm + '-' + dd;
        var dateNumb2 =  yyyy + '-' + dd + '-' + mm;

        var optionsSt = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };

        var dateString = date.toLocaleDateString("London", optionsSt).split(', ');

        this.daysWeather[dayNum].date =  {
            day: dateString[0],
            month: dateString[1],
            dateNumb1,
            dateNumb2
        }
        this.daysWeather[dayNum].city = forecast.city.name;


    };

    calculateTempMax(weather, date, dayNum){
        var tempMax = -99;

        weather.forEach(function (item) {
            let currDate = item.dt_txt.split(' ')[0];
            if ((currDate === date.dateNumb1 || currDate === date.dateNumb2) && item.main.temp_max > tempMax) {
                tempMax = item.main.temp_max;
            }
        });
        this.daysWeather[dayNum].tempMax = Math.round(tempMax);
    };

    calculateTempMin(weather, date, dayNum){
        var tempMin = 99;
        weather.forEach(function (item) {
            let currDate = item.dt_txt.split(' ')[0];
            if ((currDate === date.dateNumb1 || currDate === date.dateNumb2) && item.main.temp_max < tempMin) {
                tempMin = item.main.temp_min;
            }
        });
        this.daysWeather[dayNum].tempMin = Math.round(tempMin);
    };

    generateIcon(forecast, index) {
        this.daysWeather[index].icon =  forecast.list[index].weather[0].icon.split(forecast.list[index].weather[0].icon.includes('n') ? 'n' : 'd')[0];
    };

    rain(forecast, index) {

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
        this.daysWeather[index].rain =  Math.round(rainmm / (hours === 0 ? 1 : hours));
    };

    calcWind(forecast, index) {
        var windSpeed = 0;
        for (var i = index; i < index + 8; i++) {
            windSpeed += forecast.list[i].wind.speed;
        }
        var dirArr = ['North', 'East', 'South', 'West'];
        var direction = dirArr[Math.round(forecast.list[index + 4].wind.deg / 90)];

        this.daysWeather[index].wind = {
            speed: Math.round(windSpeed / 6),
            dir: direction ? direction : dirArr[3]
        }

    };

}
