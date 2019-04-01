export default class Weather {


    constructor() {
        this.daysWeather = new Array();
    }


    setWeather(forecast) {


        this.daysWeather = Array.apply(null, Array(5)).map((val, index) => val = {
            city: forecast.city.name,
            dailyWeather: [],
        });

        this.parseList(forecast.list);

    };

    // this.daysWeather.length = 5
    // list.length = N
    parseList(list) {
        // O(N)
        this.daysWeather.forEach(function(today, index) {

            this.generateDate(today, index); // O(1)
            this.addAllRelevantListItems(today, list, index); // O(N)
            this.generateIcon(today); // O(1)

            today.dailyWeather.forEach(function(listItem, listIndex) {

                this.calculateTempMaxMin(today, listItem, listIndex); // O(1)
                this.rain(today, listItem, listIndex); // O(1)
                this.calcWind(today, listItem, listIndex); // O(1)

            }, this, today);


        }, this);

    };

    generateDate(today, index) {

        var optionsSt = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };
        var dd, mm, yyyy, date, dateForm1, dateForm2, dateString;

        date = new Date();
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
        dateForm1 = yyyy + '-' + mm + '-' + dd;
        dateForm2 = yyyy + '-' + dd + '-' + mm;


        dateString = date.toLocaleDateString("London", optionsSt).split(', ');

        today.date = {
            day: dateString[0],
            month: dateString[1],
            dateForm1,
            dateForm2
        }


    };

    addAllRelevantListItems(today, list, index) {
        var currDate, toSlice = 0;

        list.forEach(function(item, listIndex) {
            currDate = item.dt_txt.split(' ')[0];

            if (currDate === today.date.dateForm1 || currDate === today.date.dateForm2) {
                today.dailyWeather.push(item);
            }
        });
    };

    calculateTempMaxMin(today, listItem, index) {

        var tempMax, tempMin;

        tempMax = index === 0 ? listItem.main.temp_max : today.tempMax;
        tempMax = listItem.main.temp_max > tempMax ? listItem.main.temp_max : tempMax;

        tempMin = index === 0 ? listItem.main.temp_min : today.tempMin;
        tempMin = listItem.main.temp_min < tempMin ? listItem.main.temp_min : tempMin;

        today.tempMax = Math.round(tempMax);
        today.tempMin = Math.round(tempMin);

    };

    generateIcon(today) {
        var currIcon;
        currIcon = today.dailyWeather[0].weather[0].icon;
        today.icon = currIcon.split(currIcon.includes('n') ? 'n' : 'd')[0]
    };

    rain(today, listItem, listIndex) {

        if (listIndex === 0) {

            today.rain = 0;
            today.rainHours = 0;

        }

        if (listItem.rain && listItem.rain['3h']) {

            today.rain += listItem.rain['3h'];
            today.rainHours++;

        } else if (listItem.snow && listItem.snow['3h']) {

            today.rain += listItem.snow['3h'];
            today.rainHours++;

        }
        if ((listIndex === today.dailyWeather.length - 1) && today.rainHours > 0) {

            today.rain = Math.round(today.rain / today.rainHours);

        }

    };

    calcWind(today, listItem, listIndex) {

        var dirArr = ['North', 'East', 'South', 'West', 'North'];

        if (listIndex === 0) {

            today.wind = {
                speed: listItem.wind.speed,
                dir: listItem.wind.deg
            }

        } else {

            today.wind.speed += listItem.wind.speed;
            today.wind.dir += listItem.wind.deg;

        }

        if ((listIndex === today.dailyWeather.length - 1) && listIndex > 0) {

            today.wind.speed = Math.round(today.wind.speed / listIndex);
            today.wind.dir = dirArr[Math.round((today.wind.dir / listIndex) / 90)];

        }

    };

}
