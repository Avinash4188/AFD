import { LightningElement,  api } from 'lwc';
import MedicalConditionController from '@salesforce/apex/MedicalConditionController.MedicalConditionController';
import createMedicalConditionRecord from '@salesforce/apex/MedicalConditionController.createMedicalConditionRecord';
import { CurrentPageReference } from 'lightning/navigation';

export default class MedicalCondition extends LightningElement{
    @api leadId;
    selectedCondition = '';
    conditionOptions = [];

    connectedCallback(){
        this.getPicklistValues();
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
        console.log('LeadId:', this.leadId);
        if (!this.selectedCondition) {
            // Display an error message or handle the case where the picklist is not selected
            console.error('Please select a medical condition.');
            return;
        }
        createMedicalConditionRecord({ leadId: this.leadId, conditionValue: this.selectedCondition })
            .then(result => {
                // Handle success
                console.log('Medical Condition created:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error creating Medical Condition:', error);
            });
             
        const nextStepEvent = new CustomEvent('nextstep', {
            detail: { leadId: this.leadId }
        });
        this.dispatchEvent(nextStepEvent);
        
    }

    goBack(){
        console.log('goBack');
        const previousStepEvent = new CustomEvent('previousstep', {
            detail: { leadId: this.leadId }
        });
        
        this.dispatchEvent(previousStepEvent);
        
    }

    
}