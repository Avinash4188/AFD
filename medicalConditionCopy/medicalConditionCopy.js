import { LightningElement,  api } from 'lwc';
import MedicalConditionController from '@salesforce/apex/MedicalConditionPortalController.MedicalConditionController';
import createMedicalConditionRecord from '@salesforce/apex/MedicalConditionPortalController.createMedicalConditionRecord';
import { CurrentPageReference } from 'lightning/navigation';

export default class MedicalConditionCopy extends LightningElement{
    @api accountId = '001D500001LNoNqIAL';
    selectedCondition = '';
    conditionOptions = [];

    connectedCallback(){
        this.getPicklistValues();
        console.log('accountId:', this.accountId);
    }

    getPicklistValues() {
        // Make an imperative Apex call to fetch the picklist values
        MedicalConditionController()
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
        console.log('accountId:', this.accountId);
        if (!this.selectedCondition) {
            // Display an error message or handle the case where the picklist is not selected
            console.error('Please select a medical condition.');
            return;
        }
        createMedicalConditionRecord({ accountId: this.accountId, conditionValue: this.selectedCondition })
            .then(result => {
                // Handle success
                console.log('Medical Condition created:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error creating Medical Condition:', error);
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