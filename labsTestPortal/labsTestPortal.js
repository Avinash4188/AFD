import { LightningElement,api } from 'lwc';
import labTestController from '@salesforce/apex/LabTestPortalController.labTestController';
import createLabTestRecord from '@salesforce/apex/LabTestPortalController.createLabTestRecord';

export default class LabsTestPortal extends LightningElement {
    @api accountId = '001D500001LNoNqIAL';
    selectedCondition = '';
    conditionOptions = [];

    connectedCallback(){
        this.getPicklistValues();
    }

    getPicklistValues() {
        // Make an imperative Apex call to fetch the picklist values
        labTestController()
            .then(result => {
                // Assuming the result is an array of picklist values
                this.conditionOptions = result.map(item => ({
                    label: item,
                    value: item
                }));
            })
            .catch(error => {
                console.error('Error fetching picklist values:', error);
            });
    }
    


    handleConditionChange(event) {
        this.selectedCondition = event.detail.value;
    }

    createMedicalCondition() {
        if (!this.selectedCondition) {
            // Display an error message or handle the case where the picklist is not selected
            //console.error('Please select a medical condition.');
            return;
        }
        createLabTestRecord({ accountId: this.accountId, labTestValue: this.selectedCondition })
            .then(result => {
                // Handle success
                console.log('Labs/Test created:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error creating Labs/Test:', error);
            });

            const nextStepEvent = new CustomEvent('nextstep', {
                detail: { accountId: this.accountId }
            });
            this.dispatchEvent(nextStepEvent);
    }
    goBack(){
        console.log('goBack');
        const previousStepEvent = new CustomEvent('previousstep', {
            detail: { accountId: this.accountId }
        });
        
        this.dispatchEvent(previousStepEvent);
        
    }
}