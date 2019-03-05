import axios from 'axios';

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getResults() {
        // recive API without domain
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        // the API key from www.food2fork.com
        const key = 'ec4a7d7f52eccdce20c3d822e10336c1';
        try {
            const resWeather = await axios(`${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&units=metric&appid=${key}`);
            this.weatherResult = resWeather.data;
        } catch (error) {
            alert(error + ` Cant find such location as ${this.query}`);
        }
        try {
            this.query = this.query.replace(' ','%20');
            
            const resWiki = await axios(`${proxy}https://en.wikipedia.org/api/rest_v1/page/summary/${this.query}`);
            this.wikiResult = resWiki;

        } catch (error) {
            alert(error);
        }
        
    };
    

}

