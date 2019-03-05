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
            const res = await axios(`${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${this.query}&units=metric&appid=${key}`);
            this.result = res.data;
        } catch (error) {
            alert(error);
        }
        
    }
}

