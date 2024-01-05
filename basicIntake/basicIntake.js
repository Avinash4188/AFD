import { LightningElement, track,api } from 'lwc';
import getLeadData from '@salesforce/apex/LeadCreationHandler.getLeadData';
import updateLeadData from '@salesforce/apex/LeadCreationHandler.updateLeadData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BasicIntake extends LightningElement {
    @api leadId;
    @track lead = {
        FirstName: '',
        LastName: '',
        Company: '',
        HealthCloudGA__BirthDate__c: '',
        HealthCloudGA__Gender__c: '',
        Phone: '',
        Street: '',
        City: '',
        State: '',
        PostalCode:'',
        Country:''
    };

    genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ];

    connectedCallback() {
        this.loadLeadData();
    }

    loadLeadData() {
        getLeadData({ leadId: this.leadId })
            .then(result => {
                this.lead = { ...result };
                console.log('Lead', result);
            })
            .catch(error => {
                console.log('Error', error);
            });
    }

    handleFirstNameChange(event) {
        this.lead.FirstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lead.LastName = event.target.value;
    }

    handlePreferredNameChange(event) {
        this.lead.Company = event.target.value;
    }

    handleDOBChange(event) {
        this.lead.HealthCloudGA__BirthDate__c = event.target.value;
    }

    handleGenderChange(event) {
        this.lead.HealthCloudGA__Gender__c = event.detail.value;
    }

    handlePhoneChange(event) {
        this.lead.Phone = event.target.value;
    }

    handleStreetChange(event) {
        this.lead.Street = event.target.value;
    }

    handleCityChange(event) {
        this.lead.City = event.target.value;
    }

    handleStateChange(event) {
        this.lead.State = event.target.value;
    }

    handlePostalCodeChange(event) {
        this.lead.PostalCode = event.target.value;
    }

    handleCountryChange(event) {
        this.lead.Country = event.target.value;
    }

    

    updateLead() {
        if (!this.validateFields()) {
            // Validation failed, do not proceed
            return;
        }
        console.log(this.lead);
        updateLeadData({ leadData: this.lead })
            .then(result => {
                
                const nextStepEvent = new CustomEvent('nextstep', {
                    detail: { leadId: this.leadId }
                });
                this.dispatchEvent(nextStepEvent);
                console.log('Lead', result);
            })
            .catch(error => {
                
                console.log('Error', error);
            });
    }
    goBack(){
        console.log('goBack');
        const previousStepEvent = new CustomEvent('previousstep', {
            detail: { leadId: this.leadId }
        });
        
        this.dispatchEvent(previousStepEvent);
        
    }
    validateFields() {
        let isValid = true;
    
        const inputFields = this.template.querySelectorAll('input, textarea, lightning-combobox, lightning-dual-listbox, lightning-radio-group, lightning-file-upload');
        inputFields.forEach(inputField => {
            if (!inputField.value) {
                inputField.setCustomValidity('Error: Response is required');
                inputField.reportValidity();
                isValid = false;
            } else {
                inputField.setCustomValidity('');
            }
        });
    
        return isValid;
    }
}