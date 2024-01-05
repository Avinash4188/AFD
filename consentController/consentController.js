import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getConsentRecords from '@salesforce/apex/ConsentController.getConsentRecords';
import saveConsentLogs from '@salesforce/apex/ConsentController.saveConsentLogs';
import {NavigationMixin } from "lightning/navigation";

export default class ConsentController extends NavigationMixin(LightningElement) {
    @api consent;
    @api leadId;
    @track consentRecords = [];
    selectedConsentIds = [];

    async connectedCallback() {
        this.consentRecords = await getConsentRecords();
    }

    handleCheckboxChange(event) {
        const recordId = event.target.dataset.recordId;
        const isChecked = event.target.checked;

        if (isChecked) {
            this.selectedConsentIds.push(recordId);
        } else {
            this.selectedConsentIds = this.selectedConsentIds.filter(id => id !== recordId);
        }
    }

    handlePolicyLink(event) {
        const tcid = event.target.dataset.tcid;
        const policyUrl = window.location.origin+'/afd/s/terms-and-conditions?tcid='+tcid;
        
        console.log(policyUrl,tcid);
    
        if (policyUrl) {
            /*if (this[NavigationMixin.Navigate]) {
                this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                        url: policyUrl,
                    },
                    state: {
                        tcid,
                    },
                });
            } else {*/
                console.log('policyUrl', policyUrl);
                window.open(policyUrl, '_blank');
            
        }
    }
      

    async saveConsentLogs() {
        if (this.selectedConsentIds.length === this.consentRecords.length) {
            const result = await saveConsentLogs({
                selectedConsentIds: this.selectedConsentIds,
                leadId: this.leadId, // Pass the leadId
            });
            if (result === 'Success') {
                //this.showToast('Success', 'Selected consents saved successfully.', 'success');
                const nextStepEvent = new CustomEvent('nextstep', {
                    detail: { leadId: this.leadId }
                });
                this.dispatchEvent(nextStepEvent);
                // Optionally, reset the selection after successful save.
                this.selectedConsentIds = [];
            } else {
                //this.showToast('Error', result, 'error');
            }
        } else {
            //this.showToast('Error', 'Please select all checkboxes before saving.', 'error');
        }
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