import axios from 'axios';

export default class googleMap {

    constructor() {
    }

    async getMap() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        // the API key from www.food2fork.com
        const key = 'AIzaSyC2NxQzgP8XBvSoWThbUzNYuanEN2I6MAM';
        try {
            const map = await axios(`${proxy}https://maps.googleapis.com/maps/api/js?key=${key}`);
            this.map = map;
        } catch (error) {
            alert(error + ` While loading the map`);
        }

    };


}
