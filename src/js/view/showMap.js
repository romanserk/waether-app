import {
    elements
} from './base';

export const showMap = (latLng) => {

    var myLatLng = {
      lat: latLng.lat,
      lng: latLng.lon
    };

    var map = new google.maps.Map(elements.mapElement, {
      zoom: 15,
      center: myLatLng
    });
    
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });

}
