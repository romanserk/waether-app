export const elements = {
    searchBtn: document.querySelector('.find'),
    searchInput: document.querySelector('.search__field'),
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


export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';