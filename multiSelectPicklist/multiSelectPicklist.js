import { LightningElement, api, track, wire } from 'lwc';
import getPicklistValues from '@salesforce/apex/PicklistController.getPicklistValues';

export default class MultiSelectPicklist extends LightningElement {
    @api recordId; // Pass the recordId of the sObject
    @track filteredOptions = [];
    @track selectedOptions = [];

    picklistOptions = [];
    @track finalSelection = [];

    connectedCallback() {
        this.getPicklistValuesAllergies();
    }

    handleSearchChange(event) {
        const searchValue = event.target.value.toLowerCase();
        console.log('selectedOptions1', this.selectedOptions);
        if (searchValue === '') {
            this.filteredOptions = this.picklistOptions; // Show all options when the search field is empty
        } else {
            this.filteredOptions = this.picklistOptions.filter(option => option.label.toLowerCase().includes(searchValue));
        }
        console.log('selectedOptions2', this.selectedOptions);
    }

    getPicklistValuesAllergies() {
        getPicklistValues()
            .then(result => {
                this.picklistOptions = result.map(option => ({ label: option, value: option }));
                this.filteredOptions = this.picklistOptions; // Initialize filteredOptions with all options
            })
            .catch(error => {
                console.error('Error fetching picklist values:', error);
            });
            console.log('selectedOptions3', this.selectedOptions);
    }

    handlePicklistChange(event) {
        this.selectedOptions = event.detail.value;
        console.log('selectedOptions4', this.selectedOptions);
        if(!this.finalSelection.includes(this.selectedOptions)){
            this.finalSelection.push(this.selectedOptions);
            console.log('this.finalSelection', this.finalSelection);
        }else if (this.finalSelection.includes(this.selectedOptions)) {
            this.finalSelection.pop(this.selectedOptions);
        }
    }


    get getTest(){
        console.log('selectedOptions5', this.selectedOptions);
        return this.filteredOptions;

    }

    
}