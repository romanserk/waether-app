import axios from 'axios';

export default class Location {

    constructor() {
    }

    async getResults() {
       
        try {
            const res = await axios(`http://ip-api.com/json`);
            this.city = res.data.city;
        } catch (error) {
            alert(error);
        }
        
    }
};

