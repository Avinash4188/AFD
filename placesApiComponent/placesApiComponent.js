import { LightningElement, track,api } from 'lwc';
import getPlaceDetailsList from '@salesforce/apex/PlacesApiHandler.getPlaceDetailsList';
import updateLeadPharmacy from '@salesforce/apex/PlacesApiHandler.updateLeadPharmacy';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class PlacesApiComponent extends LightningElement {
    @api leadId ;
    @track zipCode = '';
    @track locations = [];
    @track selectedLocation = [];
    @track showNextButton = false;
    @track showLocations = false;

    handleZipCodeChange(event) {
        this.zipCode = event.target.value;
    }

    searchLocations() {
        getPlaceDetailsList({ zipCode: this.zipCode })
            .then((result) => {
                this.showLocations = true;
                this.locations = result;
            })
            .catch((error) => {
                console.error('Error fetching locations:', error);
            });
    }

    handleSelectLocation(event) {
        this.showNextButton = true;

        const locationId = event.currentTarget.dataset.id; // Use 'data-id' to retrieve location Id
        console.log('locationId: ', locationId);

        this.selectedLocation = this.locations.find(loc => loc.Id === locationId);
        console.log('location: ',this.selectedLocation);

        // You can also update the UI to reflect the selection here if needed.

        //this.showToast('Success',this.selectedLocation.name, 'success');
    }

    storePharmacy() {
        const selectedPharmacy = {
            Name: this.selectedLocation.name,
            Address__c: this.selectedLocation.formatted_address,
            Phone__c: this.selectedLocation.formatted_phone_number
        };
       

        updateLeadPharmacy({ leadId: this.leadId, pharmacyInfo: selectedPharmacy })
            .then(result => {
                this.showLocations = false;
                console.log('Lead updated with pharmacy information:', result);
                //this.showToast('Success',selectedPharmacy.Name, 'success');
                const nextStepEvent = new CustomEvent('nextstep', {
                    detail: { leadId: this.leadId }
                });
                this.dispatchEvent(nextStepEvent);
                
            })
            .catch(error => {
                //this.showToast('Failed',selectedPharmacy.Name, 'failed');
                console.error('Error updating Lead:', error);
            });
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }
    goBack(){
        console.log('goBack');
        const previousStepEvent = new CustomEvent('previousstep', {
            detail: { leadId: this.leadId }
        });
        
        this.dispatchEvent(previousStepEvent);
        
    }
}