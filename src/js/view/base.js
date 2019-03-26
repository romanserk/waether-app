export const elements = {
    searchBtn: document.querySelector('.find'),
    searchInputCity: document.querySelector('.search__field-city'),
    searchInputCountry: document.querySelector('.search__field-country'),
    todayWeather: document.querySelector('.today'),
    nextDaysWeather: document.querySelectorAll('.days'),
    wikiContainer: document.querySelector('.wiki'),
};



export const loader = () => {
    const page = document.querySelector('.forecast-table');
    const loader = `
        <div class="loader">LOADING...</div>
    `;
    page.insertAdjacentHTML('beforeend', loader);

}

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
}


export const getInput = () => elements.searchInputCity.value;

export const clearInput = () => elements.searchInputCity.value = '';
