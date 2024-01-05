import { LightningElement, track, api } from 'lwc';
import getLeadData from '@salesforce/apex/LeadCreationHandler.getLeadData';
import updateLeadData from '@salesforce/apex/LeadCreationHandler.updateLeadData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ProfileForm extends LightningElement {
    @api leadId = '00QD5000009qXrLMAU';
    @track lead = {
        FirstName: '',
        LastName: '',
        Company: '',
        HealthCloudGA__BirthDate__c: '',
        HealthCloudGA__Gender__c: '',
        Phone: ''
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

    updateLead() {
        console.log(this.lead);
        updateLeadData({ leadData: this.lead })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Profile Created Successfully!!!',
                        variant: 'success',
                    })
                );
                console.log('Lead', result);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Try Again',
                        variant: 'error',
                    })
                );
                console.log('Error', error);
            });
    }
}