import Search from './modules/Search'
import Location from './modules/CurretnLocation'
import Weather from './modules/Weather'
import * as todaysWeather from './view/todaysWeatherView';
import * as nextDaysWeatherView from './view/nextDaysWeatherView';
import {
    elements,
    loader,
    clearLoader,
    getInput,
    clearInput
} from './view/base';
import {
    updateWikiRes
} from './view/showWikiContent';

const state = {};

const controlSearch = async (query) => {

    // 1. get query from view
    if (!query) {
        query = getInput();
    }
    loader();
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. preapere UI for results
        clearInput();

        // 4. search     
        await state.search.getResults();

        if (state.search.weatherResult) {
            // 5. render results
            controlWeather(state.search.weatherResult);
            updateWikiRes(state.search.wikiResult);
            // add results to UI
            todaysWeather.showTodaysWeather(state.weather.daysWeather[0]);
            state.weather.daysWeather.splice(0,1);
            nextDaysWeatherView.showNextDaysWeather(state.weather.daysWeather);
        }

    }
    clearLoader();

}

const controlWeather = (forecast) => {

    state.weather = new Weather();  
    state.weather.setWeather(forecast);
    for (var i = 0; i < 5; i++){ 
        state.weather.generateDate(forecast, i);
        let date = state.weather.daysWeather[i].date;
        state.weather.calculateTempMax(forecast.list, date, i);
        state.weather.calculateTempMin(forecast.list, date, i);
        state.weather.generateIcon(forecast, i);
        state.weather.rain(forecast, i);
        state.weather.calcWind(forecast, i);
    }  
    
};


elements.searchBtn.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

window.addEventListener('load', async () =>{
    state.city = new Location();
    await state.city.getResults();
    controlSearch(state.city.cityName);
});
