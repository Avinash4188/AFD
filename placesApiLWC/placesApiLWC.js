import { LightningElement, track, api } from 'lwc';
import getPlaceDetailsList from '@salesforce/apex/PlacesApiHandler.getPlaceDetailsList';
import updateLeadPharmacy from '@salesforce/apex/PlacesApiHandler.updateLeadPharmacy';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PlacesApiLWC extends LightningElement {
    @api leadId = '00QD5000009qXrLMAU';
    @track zipCode = '';
    @track pharmacyOptions = [];
    @track selectedPharmacy = '';
    @track showPharmacyList = false;
    @track errorMessage = '';

    handleZipCodeChange(event) {
        this.zipCode = event.target.value;
    }

    searchForPharmacies() {
        this.errorMessage = '';

        if (!this.zipCode) {
            this.errorMessage = 'Please enter a Zip Code.';
            return;
        }

        getPlaceDetailsList({ zipCode: this.zipCode })
            .then(result => {
                this.pharmacyOptions = result.map(item => ({
                    label: `${item.name} - Address: ${item.formatted_address}, Phone: ${item.formatted_phone_number}`,
                    value: JSON.stringify(item),
                }));
                this.showPharmacyList = true;
            })
            .catch(error => {
                this.errorMessage = 'Error fetching pharmacy list: ' + error.body.message;
            });
    }

    handlePharmacyChange(event) {
        this.selectedPharmacy = event.detail.value;
    }

    updateLead() {
        this.errorMessage = '';

        if (!this.selectedPharmacy) {
            this.errorMessage = 'Please select a pharmacy.';
            return;
        }

        updateLeadPharmacy({ leadId: this.leadId, pharmacyInfo: JSON.parse(this.selectedPharmacy) })
            .then(result => {
                // Handle success
                this.showPharmacyList = false;
                this.selectedPharmacy = '';
                this.showToast('Success','Pharmacy Selected', 'success');
            })
            .catch(error => {
                this.errorMessage = 'Error updating Lead: ' + error.body.message;
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
}