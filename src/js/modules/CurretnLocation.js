import axios from 'axios';

export default class Location {

    constructor() {}

    async getResults() {

        try {
            const res = await axios(`https://ipapi.co/json/`);

            this.cityName = res.data.city + ',' + res.data.country.toLowerCase();
            this.countryCode = res.data.country.toLowerCase();

        } catch (error) {

            alert(error);

        }

    }
};
