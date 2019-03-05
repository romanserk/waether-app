import Search from './modules/Search'
import Location from './modules/CurretnLocation'
import * as todaysWeather from './view/todaysWeatherView';
import * as NextDaysWeather from './view/nextDaysWeatherView';
import {
    elements,loader, clearLoader
} from './view/base';

const state = {};

const controlSearch = async (query) => {

    // 1. get query from view
    if (!query) {
        query = todaysWeather.getInput();
    }

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. preapere UI for results
        todaysWeather.clearInput();

        // 4. search
        await state.search.getResults();


        // 5. render results on UI
        todaysWeather.showTodaysWeather(state.search.result);
        NextDaysWeather.showNextDaysWeatherWeather(state.search.result);
        
    }

}
elements.searchBtn.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

const locat = async () => {

    loader();
    state.location = new Location();
    await state.location.getResults();
    await controlSearch(state.location.city);
    clearLoader();
}

locat();