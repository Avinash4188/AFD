import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createBaselineHealthOverview from '@salesforce/apex/BaselineHealthOverviewController.createBaselineHealthOverview';
import getAllergies from '@salesforce/apex/BaselineHealthOverviewController.getAllergies';
import getMedication from '@salesforce/apex/BaselineHealthOverviewController.getMedication';
import getMedicalCondition from '@salesforce/apex/BaselineHealthOverviewController.getMedicalCondition';
import getBaselineHealthOverview from '@salesforce/apex/BaselineHealthOverviewController.getBaselineHealthOverview';

export default class BaselineHealth extends LightningElement {
    @api leadId;
    @api Baseline_Health_Overview__c = {
        Add_details_of_your_last_visit__c: '',
        Any_allergic_reaction_to_the_medication__c: '',
        Diastolic_Pressure__c: '',
        Height__c: '',
        High_Blood_Pressure__c: '',
        List_of_environmental_allergies_reaction__c: '',
        List_Of_Medical_Condition__c: '',
        List_Of_Medications__c: '',
        Most_Recent_Physical_Medical_Visit__c: '',
        Systolic_Pressure__c: '',
        Weight__c: '',
        What_happen_when_you_had_allergic_react__c: '',
    };
    @track weight;
    @track height;
    @track visitDetails;
    @track recentVisitDate;
    @track hasAllergicReaction = false;
    @track allergicReactionDetails = '';
    @track hasHighBloodPressure = false;
    @track diastolicPressure = '';
    @track systolicPressure = '';

    @track selectedEnvironmentalAllergies = [];
    picklistValuesAllergies = [];

    @track selectedMedications = [];
    picklistValuesMedication = [];

    @track selectedMedicalConditions = [];
    picklistValuesMC = [];

    @track allergicReactionOptions = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];

    @track highBloodPressureOptions = [
        { label: 'Do you remember the number (Yes)', value: 'Yes' },
        { label: 'No', value: 'No' },
    ];

    @track showAllergicDetails = false;
    @track showBloodPressureDetails = false;


    connectedCallback(){
        this.getPicklistValuesAllergies();
        //this.getPicklistValuesMedication();
        this.getPicklistValuesMC();
        this.loadLeadData();
    }
    getPicklistValuesAllergies() {
        getAllergies()
            .then(result => {
                this.picklistValuesAllergies = result.map(option => ({ label: option, value: option }));
                
            })
            .catch(error => {
                console.error('Error fetching picklist values:', error);
            });
    }

    getPicklistValuesMedication() {
        getMedication()
            .then(result => {
                this.picklistValuesMedication = result.map(option => ({ label: option, value: option }));
                
            })
            .catch(error => {
                console.error('Error fetching picklist values:', error);
            });
    }

    getPicklistValuesMC() {
        getMedicalCondition()
            .then(result => {
                this.picklistValuesMC = result.map(option => ({ label: option, value: option }));
                
            })
            .catch(error => {
                console.error('Error fetching picklist values:', error);
            });
    }

    loadLeadData() {
        getBaselineHealthOverview({ leadId: this.leadId })
            .then(result => {
                this.Baseline_Health_Overview__c = { ...result };
                console.log('Lead', result);
            })
            .catch(error => {
                console.log('Error', error);
            });
    }

    // Event handlers for input field changes
    handleWeightChange(event) {
        this.Baseline_Health_Overview__c.Weight__c = event.target.value;
    }

    handleHeightChange(event) {
        this.Baseline_Health_Overview__c.Height__c = event.target.value;
    }

    handleVisitDetailsChange(event) {
        this.Baseline_Health_Overview__c.Add_details_of_your_last_visit__c = event.target.value;
    }

    handleRecentVisitDateChange(event) {
        this.Baseline_Health_Overview__c.Most_Recent_Physical_Medical_Visit__c = event.target.value;
    }

    handleAllergicReactionChange(event) {
        this.hasAllergicReaction = event.detail.value === 'Yes';
    }
    handleMedicationsChange
    handleAllergicReactionDetailsChange(event) {
        this.Baseline_Health_Overview__c.What_happen_when_you_had_allergic_react__c = event.target.value;
    }

    handleHighBloodPressureChange(event) {
        this.hasHighBloodPressure = event.detail.value === 'Yes';
    }

    handleDiastolicPressureChange(event) {
        this.Baseline_Health_Overview__c.Diastolic_Pressure__c = event.target.value;
    }

    handleSystolicPressureChange(event) {
        this.Baseline_Health_Overview__c.Systolic_Pressure__c = event.target.value;
    }

    handleEnvironmentalAllergiesChange(event) {
        this.selectedEnvironmentalAllergies = event.detail.value;
    }

    handleMedicalConditionsChange(event) {
        this.selectedMedicalConditions = event.detail.value;
    }

    handleMedicationsChange(event) {
        this.Baseline_Health_Overview__c.List_Of_Medications__c = event.target.value;
    }

    saveRecord() {
        if (!this.validateFields()) {
            // Validation failed, do not proceed
            return;
        }
        console.log('this.Baseline_Health_Overview__c',this.Baseline_Health_Overview__c);
        console.log('this.Baseline_Health_Overview__c.Weight__c',this.Baseline_Health_Overview__c.Weight__c);
        console.log('this.Baseline_Health_Overview__c.List_Of_Medications__c',this.Baseline_Health_Overview__c.List_Of_Medications__c);
        // Prepare data for the Apex method and call it
        const recordInput = {
            leadId: this.leadId,
            Any_allergic_reaction_to_the_medication__c: this.hasAllergicReaction,
            High_Blood_Pressure__c: this.hasHighBloodPressure,
            List_Of_Medical_Condition__c: this.selectedMedicalConditions, // Join selected values
        };
        console.log('Allergy',this.selectedEnvironmentalAllergies);
        console.log('recordInput:',recordInput);

        createBaselineHealthOverview({ recordInput, recordData:this.Baseline_Health_Overview__c })
            .then((result) => {
                // Handle success
                console.log('Record created successfully: ', result);
                //this.showSuccessToast();
                const nextStepEvent = new CustomEvent('nextstep', {
                    detail: { leadId: this.leadId }
                });
                this.dispatchEvent(nextStepEvent);
                
                // You can perform additional actions here if needed.
            })
            .catch((error) => {
                // Handle error
                console.error('Error: Select all the required fields.',error);
                //this.showErrorToast(error.body.message);
            });
    }
    showSuccessToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Record created successfully',
            variant: 'success',
        });
        this.dispatchEvent(event);
    }

    // Helper method to display an error toast message
    showErrorToast(message) {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Error: Select all the required fields.',
            variant: 'error',
        });
        this.dispatchEvent(event);
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
    
        const inputFields = this.template.querySelectorAll('input, textarea, lightning-combobox, lightning-dual-listbox');
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