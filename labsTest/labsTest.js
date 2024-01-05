import { LightningElement,api } from 'lwc';
import labTestController from '@salesforce/apex/LabTestController.labTestController';
import createLabTestRecord from '@salesforce/apex/LabTestController.createLabTestRecord';

export default class LabsTest extends LightningElement {
    @api leadId;
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
        createLabTestRecord({ leadId: this.leadId, labTestValue: this.selectedCondition })
            .then(result => {
                // Handle success
                console.log('Labs/Test created:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error creating Labs/Test:', error);
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