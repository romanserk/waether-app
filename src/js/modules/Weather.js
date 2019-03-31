export default class Weather {


    constructor() {
        this.daysWeather = new Array();
    }


    setWeather(forecast) {

        this.list = forecast.list;

        this.daysWeather = Array.apply(null, Array(5)).map((val,index) => val = {
            city: forecast.city.name,
        });

    };


    generateDate() {

        var optionsSt = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };

        this.daysWeather.forEach(function(element,index) {
            var date = new Date();
            var dd , mm , yyyy;
            date.setDate(date.getDate() + index);
            dd = date.getDate();
            mm = date.getMonth() + 1; //January is 0
            yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var dateNumb1 = yyyy + '-' + mm + '-' + dd;
            var dateNumb2 = yyyy + '-' + dd + '-' + mm;


            var dateString = date.toLocaleDateString("London", optionsSt).split(', ');

            element.date = {
                day: dateString[0],
                month: dateString[1],
                dateNumb1,
                dateNumb2
            }
        });


    };

    parseList() {

        this.daysWeather.forEach(function(today, index) {
            var date = today.date;
            today.dailyWeather = [];

            this.list.forEach(function(item, index) {
                let currDate = item.dt_txt.split(' ')[0];

                if (currDate === date.dateNumb1 || currDate === date.dateNumb2) {
                    today.dailyWeather.push(item);
                }
            },today);

        },this);

    };

    calculateTempMaxMin() {
        var tempMax,tempMin;

        // loop on all days
        this.daysWeather.forEach(function(today, index){
            // current day
            tempMax = today.dailyWeather[0].main.temp_max;
            tempMin = today.dailyWeather[0].main.temp_min;

            // loop on each day
            today.dailyWeather.forEach(function(item, index) {
                if (item.main.temp_max > tempMax){
                    tempMax = item.main.temp_max;
                }
                if (item.main.temp_min < tempMin) {
                    tempMin = item.main.temp_min;
                }
            });

            today.tempMax = Math.round(tempMax);
            today.tempMin = Math.round(tempMin);

        },this);


    };

    generateIcon() {
        var currIcon;

        this.daysWeather.forEach(function(item, index) {
            currIcon = item.dailyWeather[0].weather[0].icon;
            item.icon = currIcon.split(currIcon.includes('n') ? 'n' : 'd')[0]
        });

    };


    rain() {

        let rainmm = 0;
        let hours = 0;
        // loop on all days
        this.daysWeather.forEach(function(today, index){

            // loop on each day
            today.dailyWeather.forEach(function(item, index) {
                if (item.rain && item.rain['3h']){
                    rainmm += item.rain['3h'];
                    hours++;
                }
                else if (item.snow && item.snow['3h']) {
                    rainmm += item.snow['3h'];
                    hours++;
                }
            });

            today.rain = Math.round(rainmm / (hours === 0 ? 1 : hours));

        },this);


    };


    calcWind() {

        var windSpeed = 0;
        var dirArr = ['North', 'East', 'South', 'West'];
        var direction;
        // loop on all days
        this.daysWeather.forEach(function(today, index){

            // loop on each day
            today.dailyWeather.forEach(function(item, index) {
                windSpeed += item.wind.speed;
                direction = dirArr[Math.round(item.wind.deg / 90)];
            });

            today.wind = {
                speed: Math.round(windSpeed / 6),
                dir: direction ? direction : dirArr[3]
            }

        },this);

    };

}
