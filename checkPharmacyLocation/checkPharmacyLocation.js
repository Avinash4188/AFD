import { LightningElement, track } from 'lwc';

export default class CheckPharmacyLocation extends LightningElement {
    @track latitude = '';
    @track longitude = '';
    @track pharmacyName = '';
    

    fetchData() {
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&type=pharmacy&location=18.5045902%2C73.7654297&key=AIzaSyBeq7Gen8UdQq3KeOBaL3kgurNitvJNzr4", {Headers : {'Access-Control-Allow-Origin' : '*'}},{credentials: "include"},{mode:'no-cors'}, { method: "GET"} )
            .then((response) => response.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    this.latitude = data.results[0].geometry.location.lat;
                    this.longitude = data.results[0].geometry.location.lng;
                    this.pharmacyName = data.results[0].name;
                } else {
                    // Handle no results
                    this.latitude = '';
                    this.longitude = '';
                    this.pharmacyName = 'No nearby pharmacies found.';
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
}