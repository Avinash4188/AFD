import { LightningElement, track } from 'lwc';

export default class PharmacyFinder extends LightningElement {
    @track pharmacies = [];
    zipCode = '';
    selectedSortOption = 'name';
    selectedRadiusOption = 5; // Default radius option

    radiusOptions = [
        { label: '5 miles', value: 5 },
        { label: '10 miles', value: 10 },
        { label: '15 miles', value: 15 }
    ];

    sortOptions = [
        { label: 'Name', value: 'name' },
        { label: 'Distance', value: 'distance' }
    ];

    selectionOptions = [
        { label: 'Not Selected', value: 'notselected' },
        { label: 'Selected', value: 'selected' }
    ];

    handleZipCodeChange(event) {
        this.zipCode = event.target.value;
        //this.fetchNearbyPharmacies();
    }

    handleRadiusChange(event) {
        this.selectedRadiusOption = event.detail.value;
        //this.fetchNearbyPharmacies();
    }

    handleSearch() {
       // this.fetchNearbyPharmacies();
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&type=pharmacy&location=18.5045902%2C73.7654297&key=AIzaSyBeq7Gen8UdQq3KeOBaL3kgurNitvJNzr4", { mode:'no-cors' })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response data', data);
      });
  }
    
    handleSortChange(event) {
        this.selectedSortOption = event.detail.value;
        this.sortPharmacies();
    }

    handlePharmacySelection(event) {
        const placeId = event.currentTarget.dataset.id;
        const selectedValue = event.detail.value;
        this.updatePharmacySelection(placeId, selectedValue);
    }

    updatePharmacySelection(placeId, selectedValue) {
        this.pharmacies = this.pharmacies.map(pharmacy => {
            if (pharmacy.place_id === placeId) {
                return { ...pharmacy, selectedOption: selectedValue };
            }
            return pharmacy;
        });
    }

    fetchNearbyPharmacies() {
        const apiKey = 'AIzaSyBeq7Gen8UdQq3KeOBaL3kgurNitvJNzr4';
        const zipCode = this.zipCode;

        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${zipCode}&radius=5000&type=pharmacy&key=${apiKey}`;
       /* fetch(apiUrl, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            this.pharmacies = data.results;
            if (this.pharmacies.length > 0) {
                alert('Pharmacies fetched successfully!');
            } else {
                alert('No pharmacies found in the specified radius.');
            }
        })
        .catch(error => {
            console.error('Error fetching nearby pharmacies:', error);
            alert('An error occurred while fetching pharmacies.'+error);
        });
}*/
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&type=pharmacy&location=18.5045902%2C73.7654297&key=AIzaSyBeq7Gen8UdQq3KeOBaL3kgurNitvJNzr4", { mode:'no-cors' })
            .then(response => response.json())
            .then(data => {
                alert('Pharmacies fetched successfully!');
                console.log('results',data.results);
                //this.fetchPlaceDetails(data.results);
            })
            .catch(error => {
                alert('Pharmacies fetched failed!');
                console.error('Error fetching nearby pharmacies:', error);
            });
    }

    /*fetchPlaceDetails(places) {
        const apiKey = 'AIzaSyBeq7Gen8UdQq3KeOBaL3kgurNitvJNzr4';
        const detailsPromises = places.map(place => {
            const placeId = place.place_id;
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
            return fetch(detailsUrl, {  mode:'no-cors' }).then(response => response.json());
        });

        Promise.all(detailsPromises)
            .then(detailsArray => {
                this.pharmacies = detailsArray.map(details => ({
                    place_id: details.result.place_id,
                    name: details.result.name,
                    formatted_address: details.result.formatted_address,
                    formatted_phone_number: details.result.formatted_phone_number || 'N/A',
                    formatted_fax_number: 'N/A' // Adjust as per your actual data
                }));
            })
            .catch(error => {
                console.error('Error fetching place details:', error);
            });
    }*/

    sortPharmacies() {
        if (this.selectedSortOption === 'name') {
            this.pharmacies.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.selectedSortOption === 'distance') {
            this.pharmacies.sort((a, b) => a.distance - b.distance);
        }
    }

    handleSaveSelected() {
        const selectedPharmacies = this.pharmacies.filter(pharmacy => pharmacy.selectedOption === 'selected');
        // ... Implement logic to save selected pharmacies to your Salesforce records
    }
}