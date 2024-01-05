import { LightningElement, api } from 'lwc';
import stateSelector from '@salesforce/apex/stateSelector.stateSelector';
import updateState from '@salesforce/apex/stateSelector.updateState';
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
        stateSelector()
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

    stateSelect() {
        if (!this.selectedCondition) {
            // Display an error message or handle the case where the picklist is not selected
            console.error('Please select a medical condition.');
            return;
        }
        updateState({ leadId: this.leadId, stateValue: this.selectedCondition })
            .then(result => {
                // Handle success
                console.log('State Selected:', result);
            })
            .catch(error => {
                // Handle error
                console.error('Error in State Selection:', error);
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