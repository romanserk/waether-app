import Search from './modules/Search'
import Location from './modules/CurretnLocation'
import * as todaysWeather from './view/todaysWeatherView';
import * as NextDaysWeather from './view/nextDaysWeatherView';
import {
    elements,
    loader,
    clearLoader
} from './view/base';
import {
    updateWikiRes
} from './view/showWikiContent';

const state = {};

const controlSearch = async (query) => {

    // 1. get query from view
    if (!query) {
        query = todaysWeather.getInput();
    }
    loader();
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. preapere UI for results
        todaysWeather.clearInput();

        // 4. search     
        await state.search.getResults();

        if (state.search.weatherResult) {
            // 5. render results on UI
            todaysWeather.showTodaysWeather(state.search.weatherResult);
            NextDaysWeather.showNextDaysWeatherWeather(state.search.weatherResult);
            updateWikiRes(state.search.wikiResult);
        }

    }
    clearLoader();

}

elements.searchBtn.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

const onLoad = async () => {
    state.city = new Location();
    await state.city.getResults();
    controlSearch(state.city.cityName);
}

onLoad();