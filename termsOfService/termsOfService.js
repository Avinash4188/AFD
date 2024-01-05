import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateLeadData from '@salesforce/apex/termsOfService.updateLeadData';

export default class TermsOfService extends LightningElement {
    @api leadId ;

    @track membershipChecked = false;
    @track medicalChecked = false;
    @track privacyChecked = false;
    @track hipaaChecked = false;

    handleMembershipChange(event) {
        this.membershipChecked = event.target.checked;
    }

    handleMedicalChange(event) {
        this.medicalChecked = event.target.checked;
    }

    handlePrivacyChange(event) {
        this.privacyChecked = event.target.checked;
    }

    handleHIPAAChange(event) {
        this.hipaaChecked = event.target.checked;
    }

    updateLead(event) {
        event.preventDefault();
        if (this.membershipChecked && this.medicalChecked && this.privacyChecked && this.hipaaChecked) {
            const checkboxFields = [
                'Membership_Terms_of_Service__c',
                'Medical_Terms_of_Service__c',
                'Privacy_Policy__c',
                'Notice_of_HIPAA_Privacy_Practies__c'
            ];
            console.log('leadId',this.leadId);
    
            updateLeadData({ leadId: this.leadId, checkboxFields })
                .then(result => {
                    this.showToast('Success', 'Welcome to AFD Health!!!', 'success');
                    // You can perform additional actions here if needed
                    console.log('Lead', result); // Move the console.log inside the .then() block
                    const nextStepEvent = new CustomEvent('nextstep', {
                        detail: { leadId: this.leadId }
                    });
                    this.dispatchEvent(nextStepEvent);
                })
                .catch(error => {
                    this.showToast('Error', 'Error updating lead: ' + error.body.message, 'error');
                });
        } else {
            this.showToast('Error', 'Please check all checkboxes.', 'error');
        }
    }
    

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}