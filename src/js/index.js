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
    showMap
} from './view/showMap';
import {
    updateWikiRes
} from './view/showWikiContent';
import {
    showLocalTime
} from './view/showLocalTimeDate';




const state = {};

const controlSearch = async (query) => {

    // get query from view
    if (!query) {
        query = getInput();
    }
    loader();
    if (query) {

        // new search object and add to state
        state.search = new Search(query);

        // preapere UI for results
        clearInput();

        // search
        await state.search.getResults();

        if (state.search.weatherResult) {

            // render results
            updateWikiRes(state.search.wikiResult);
            state.weather = new Weather();
            state.weather.setWeather(state.search.weatherResult);

            // add results to UI
            todaysWeather.showTodaysWeather(state.weather.daysWeather[0]);
            nextDaysWeatherView.showNextDaysWeather(state.weather.daysWeather);

        }

    }

    controlMap(state.search.weatherResult.city.coord);

    clearLoader();

}


const controlMap = (latLng) => {
    showMap(latLng);
};


elements.searchBtn.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

window.addEventListener('load', async () => {
    state.city = new Location();
    await state.city.getResults();
    controlSearch(state.city.cityName);
});
